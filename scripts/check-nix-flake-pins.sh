#!/usr/bin/env bash
#
# The one Nix flake in this repo must stay in step with the JavaScript Playwright
# runner.
#
# Incidents this closes:
#   1. Browser/runner drift (kanban t_3fa65a83, issue #79, 2026-10-16).
#      astro-portfolio/flake.nix exported
#      PLAYWRIGHT_BROWSERS_PATH=${pkgs.playwright-driver.browsers} from its
#      locked nixpkgs (rev b5aa0fb -> playwright-driver 1.60.0, chromium-1223)
#      while astro-portfolio/package.json / bun.lock installed
#      @playwright/test 1.64.0, which looks for chromium-1248. `bunx playwright
#      test` inside `nix develop` cannot find its browsers that way.
#   2. Duplicate root flake (kanban t_978d7ec2, 2026-10-16). The repo also had
#      flake.nix + flake.lock at the root, hand-repeating this devShell. They are
#      gone: this shell is a strict superset of that one, and a nested flake
#      cannot `follows` a sibling directory, so two copies could only drift.
#      scripts/check-single-source.sh fails a PR that adds one back.
#
# What it enforces, offline (no nix needed):
#   1. astro-portfolio/flake.lock exists and is tracked by git, so the devShell
#      cannot resolve nixos-unstable HEAD on one machine and a pin on another;
#   2. "@playwright/test" in astro-portfolio/package.json is an exact version,
#      not a range: nixpkgs owns the Playwright version, and
#      astro-portfolio/flake.nix refuses to evaluate when the two disagree;
#   3. that exact version is the one astro-portfolio/bun.lock resolves, so a
#      package.json bump cannot land without the lockfile;
#   4. astro-portfolio/flake.nix still exports PLAYWRIGHT_BROWSERS_PATH from the
#      nixpkgs browsers (the wiring that makes `bunx playwright test` work).
#
# The evaluation-time half of check 2 lives in astro-portfolio/flake.nix and is
# exercised by .github/workflows/nix-flake-check.yml
# (`nix flake check --no-build`).
#
# Run locally:
#   bash scripts/check-nix-flake-pins.sh
set -euo pipefail

cd "$(cd "$(dirname "$0")/.." && pwd)"

status=0
fail() {
  echo "FAIL $1"
  echo "::error::$2"
  status=1
}

# --- 1. the lock exists, is tracked, and is readable -------------------------
lock=astro-portfolio/flake.lock
if [ ! -f "$lock" ]; then
  fail "$lock" "$lock is missing — run 'nix flake lock' in astro-portfolio/ and commit it"
elif ! git ls-files --error-unmatch "$lock" >/dev/null 2>&1; then
  fail "$lock" "$lock is not tracked by git — an uncommitted lock is an unpinned flake"
else
  nixpkgs_rev=$(jq -r '.nodes.nixpkgs.locked.rev // empty' "$lock")
  if [ -z "$nixpkgs_rev" ]; then
    fail "$lock" "could not read .nodes.nixpkgs.locked.rev from $lock"
  else
    echo "OK: $lock is committed, nixpkgs $(printf '%s' "$nixpkgs_rev" | cut -c1-7)"
  fi
fi

# --- 2. the Playwright version is an exact pin -------------------------------
pkg=astro-portfolio/package.json
declared=$(jq -r '.devDependencies["@playwright/test"] // empty' "$pkg")
if [ -z "$declared" ]; then
  fail "$pkg" "no @playwright/test in devDependencies"
elif ! printf '%s' "$declared" | grep -qE '^[0-9]+\.[0-9]+\.[0-9]+$'; then
  fail "$pkg" "@playwright/test is \"$declared\"; it must be an exact version, because the nixpkgs playwright-driver it is asserted against is exact. A range lets a fresh 'bun install' pick a browser revision the devShell does not have."
else
  echo "OK: @playwright/test is pinned to $declared"
fi

# --- 3. package.json and bun.lock agree on that version ----------------------
if [ -n "$declared" ]; then
  if grep -qF "@playwright/test@$declared" astro-portfolio/bun.lock; then
    echo "OK: astro-portfolio/bun.lock resolves @playwright/test $declared"
  else
    fail "astro-portfolio/bun.lock" "bun.lock does not contain @playwright/test@$declared. Run 'cd astro-portfolio && bun install' and commit bun.lock with the package.json change."
  fi
fi

# --- 4. the devShell still wires the nixpkgs browsers into the environment ----
if grep -qF 'export PLAYWRIGHT_BROWSERS_PATH=${playwrightBrowsers}' astro-portfolio/flake.nix; then
  echo "OK: astro-portfolio/flake.nix exports PLAYWRIGHT_BROWSERS_PATH"
else
  fail "astro-portfolio/flake.nix" "the devShell no longer exports PLAYWRIGHT_BROWSERS_PATH from the nixpkgs browser trees; without it 'bunx playwright test' falls back to an empty cache and fails with \"Executable doesn't exist\"."
fi

if [ "$status" -eq 0 ]; then
  echo "OK: nix flake pins are consistent."
  exit 0
fi

cat <<'EOF'

Fix:
  cd astro-portfolio && nix flake update     # moves astro-portfolio/flake.lock
  git add astro-portfolio/flake.lock
  # then, if nixpkgs moved its playwright-driver:
  #   set "@playwright/test" in astro-portfolio/package.json to the exact version
  #   that this nixpkgs ships (nix eval --raw --expr
  #   '(builtins.getFlake (toString ./astro-portfolio)).inputs.nixpkgs.legacyPackages.x86_64-linux.playwright-driver.version'),
  #   run `bun install` in astro-portfolio/ and commit bun.lock.

nixpkgs' browsers are the only Playwright browsers that run on NixOS, so the
runner and the driver must be the same version:
https://wiki.nixos.org/wiki/Playwright
EOF
exit 1
