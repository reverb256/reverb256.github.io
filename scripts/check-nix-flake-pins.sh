#!/usr/bin/env bash
#
# The two Nix flakes in this repo must stay in step with each other and with the
# JavaScript Playwright runner.
#
# Incidents this closes (kanban t_3fa65a83, issue #79, 2026-10-16):
#   1. Browser/runner drift. astro-portfolio/flake.nix exported
#      PLAYWRIGHT_BROWSERS_PATH=${pkgs.playwright-driver.browsers} from its
#      locked nixpkgs (rev b5aa0fb -> playwright-driver 1.60.0, chromium-1223)
#      while astro-portfolio/package.json / bun.lock installed
#      @playwright/test 1.64.0, which looks for chromium-1248. `bunx playwright
#      test` inside `nix develop` cannot find its browsers that way.
#   2. Unpinned root flake. flake.nix had no flake.lock in git, so every
#      evaluation resolved nixos-unstable HEAD (rev 55bfb4d, bun-1.4.2,
#      nodejs-24.21.0) while the astro-portfolio flake was pinned to b5aa0fb
#      (bun-1.3.13, nodejs-24.16.0): two dev shells, two toolchains, and the
#      root one changed under us on any day.
#
# What it enforces, offline (no nix needed):
#   1. both flake.lock files exist and are tracked by git;
#   2. both pin the same nixpkgs revision, so the repo has one toolchain;
#   3. "@playwright/test" in astro-portfolio/package.json is an exact version,
#      not a range: nixpkgs owns the Playwright version, and
#      astro-portfolio/flake.nix refuses to evaluate when the two disagree;
#   4. that exact version is the one astro-portfolio/bun.lock resolves, so a
#      package.json bump cannot land without the lockfile;
#   5. astro-portfolio/flake.nix still exports PLAYWRIGHT_BROWSERS_PATH from the
#      nixpkgs browsers (the wiring that makes `bunx playwright test` work).
#
# The evaluation-time half of check 3 lives in astro-portfolio/flake.nix and is
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

# --- 1/2. both locks exist, are tracked, and pin the same nixpkgs ------------
for lock in flake.lock astro-portfolio/flake.lock; do
  if [ ! -f "$lock" ]; then
    fail "$lock" "$lock is missing — run 'nix flake lock' in its directory and commit it"
    continue
  fi
  if ! git ls-files --error-unmatch "$lock" >/dev/null 2>&1; then
    fail "$lock" "$lock is not tracked by git — an uncommitted lock is an unpinned flake"
  fi
done

if [ -f flake.lock ] && [ -f astro-portfolio/flake.lock ]; then
  root_rev=$(jq -r '.nodes.nixpkgs.locked.rev // empty' flake.lock)
  astro_rev=$(jq -r '.nodes.nixpkgs.locked.rev // empty' astro-portfolio/flake.lock)
  if [ -z "$root_rev" ] || [ -z "$astro_rev" ]; then
    fail "flake.lock" "could not read .nodes.nixpkgs.locked.rev from one of the lock files"
  elif [ "$root_rev" != "$astro_rev" ]; then
    fail "flake.lock" "nixpkgs pin differs between the two flakes: root=$root_rev astro-portfolio=$astro_rev. Update both locks together (nix flake update in each) and commit both."
  else
    echo "OK: both flakes pin nixpkgs $root_rev"
  fi
fi

# --- 3. the Playwright version is an exact pin -------------------------------
pkg=astro-portfolio/package.json
declared=$(jq -r '.devDependencies["@playwright/test"] // empty' "$pkg")
if [ -z "$declared" ]; then
  fail "$pkg" "no @playwright/test in devDependencies"
elif ! printf '%s' "$declared" | grep -qE '^[0-9]+\.[0-9]+\.[0-9]+$'; then
  fail "$pkg" "@playwright/test is \"$declared\"; it must be an exact version, because the nixpkgs playwright-driver it is asserted against is exact. A range lets a fresh 'bun install' pick a browser revision the devShell does not have."
else
  echo "OK: @playwright/test is pinned to $declared"
fi

# --- 4. package.json and bun.lock agree on that version ----------------------
if [ -n "$declared" ]; then
  if grep -qF "@playwright/test@$declared" astro-portfolio/bun.lock; then
    echo "OK: astro-portfolio/bun.lock resolves @playwright/test $declared"
  else
    fail "astro-portfolio/bun.lock" "bun.lock does not contain @playwright/test@$declared. Run 'cd astro-portfolio && bun install' and commit bun.lock with the package.json change."
  fi
fi

# --- 5. the devShell still wires the nixpkgs browsers into the environment ----
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
  nix flake update            # inside the repo root, and inside astro-portfolio/
  git add flake.lock astro-portfolio/flake.lock
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
