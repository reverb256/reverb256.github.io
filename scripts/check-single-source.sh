#!/usr/bin/env bash
#
# One JavaScript manifest and one Nix flake: astro-portfolio's.
#
# Incidents this closes (kanban t_978d7ec2, 2026-10-16 — three leftovers found
# while fixing the Playwright drift in t_3fa65a83 / issue #79):
#
#   1. Shadow root manifest. `package.json` + `bun.lock` at the repo root were a
#      stale copy of astro-portfolio/'s: astro `^6.0.4` against `^7.0.9`, and
#      `@playwright/test` `^1.64.0` against the exact `1.63.0` that the flake's
#      nixpkgs ships. Nothing installed the root tree — the Cloudflare Pages
#      deploy, the required "Deploy gate" check and the flake all run in
#      astro-portfolio/ — but `.github/dependabot.yml` had a bun entry for "/",
#      so dependabot kept opening PRs for that dead tree (#65 "bump astro from
#      6.0.4 to 7.3.8").
#
#   2. Duplicate root flake. `flake.nix` + `flake.lock` at the repo root
#      hand-repeated the astro-portfolio devShell (nodejs, bun, typescript,
#      eslint, git, jq, fd, ripgrep, bat, eza) and `cd astro-portfolio` in its
#      shellHook, and its `apps.build` re-ran the same build. A nested flake
#      cannot `follows` a sibling directory, so the two could only be kept equal
#      by hand — and they were not: on 2026-10-16 the root floated to nixpkgs
#      55bfb4d (bun 1.4.2, nodejs 24.21.0) while astro-portfolio/flake.lock was
#      pinned to b5aa0fb (bun 1.3.13, nodejs 24.16.0). The astro shell is a
#      strict superset of the root one, so the root flake only duplicated.
#
#   3. Nested, dead workflow. `astro-portfolio/.github/workflows/deploy.yml`
#      could never run: GitHub Actions reads only the repository's top-level
#      `.github/workflows/`. It also deployed to GitHub Pages, which the root
#      `.github/workflows/deploy.yml` records as retired on 2026-09-19 in favour
#      of Cloudflare Pages.
#
# What it enforces, offline (no nix needed):
#   1. no `package.json` / `bun.lock` / `flake.nix` / `flake.lock` at the root;
#   2. the only flake in the repo (and its lock) is astro-portfolio's;
#   3. no workflow file anywhere below the repository root's `.github/workflows/`;
#   4. no dependabot bun entry for "/" (with no manifest there it updates nothing).
#
# Run locally:
#   bash scripts/check-single-source.sh
set -euo pipefail

cd "$(cd "$(dirname "$0")/.." && pwd)"

status=0
fail() {
  echo "FAIL $1"
  echo "::error::$2"
  status=1
}

# --- 1. no shadow manifest at the repo root ----------------------------------
for f in package.json bun.lock flake.nix flake.lock; do
  if [ -e "$f" ]; then
    fail "$f" "the repo root has a $f again. astro-portfolio/ holds the only JavaScript manifest and the only flake — the Cloudflare deploy, the \"Deploy gate\" check and the dev shell all run there. Delete it, or move the docs and every workflow to the root tree in the same change."
  fi
done
[ "$status" -eq 0 ] && echo "OK: no package.json / bun.lock / flake.nix / flake.lock at the repo root"

# --- 2. exactly one flake in the repo ----------------------------------------
flakes=$(git ls-files | grep -E '(^|/)flake\.(nix|lock)$' | sort || true)
expected=$(printf 'astro-portfolio/flake.lock\nastro-portfolio/flake.nix')
if [ "$flakes" != "$expected" ]; then
  fail "flake.nix" "the repo must track exactly one flake — astro-portfolio/flake.nix plus its flake.lock. Tracked flake files: $(printf '%s' "$flakes" | tr '\n' ' ')"
else
  echo "OK: the only flake is astro-portfolio/flake.nix (+ committed flake.lock)"
fi

# --- 3. workflows live only at the repository root ---------------------------
nested=$(git ls-files | grep -E '(^|/)\.github/workflows/.*\.ya?ml$' | grep -vE '^\.github/workflows/' || true)
if [ -n "$nested" ]; then
  fail "nested workflow" "GitHub Actions never reads a workflow below the repository root, so this file is dead: $(printf '%s' "$nested" | tr '\n' ' '). Move it to .github/workflows/ or delete it."
else
  echo "OK: no workflow file outside .github/workflows/"
fi

# --- 4. dependabot drives no dead root tree ----------------------------------
if [ -f .github/dependabot.yml ]; then
  if grep -A1 -E '^[[:space:]]*- package-ecosystem: "bun"' .github/dependabot.yml \
     | grep -qE '^[[:space:]]*directory: "/"[[:space:]]*$'; then
    fail ".github/dependabot.yml" "dependabot still has a bun entry for \"/\", but the repo root has no manifest and no lockfile. Point it at \"/astro-portfolio\" (the tree the deploy installs) or remove the entry."
  else
    echo "OK: no dependabot bun entry for the repo root"
  fi
fi

if [ "$status" -eq 0 ]; then
  echo "OK: one manifest, one flake, workflows at the root."
  exit 0
fi

cat <<'EOF'

Fix: astro-portfolio/ is the only tree that installs, builds and deploys.
  - dependencies and scripts: astro-portfolio/package.json, astro-portfolio/bun.lock
  - dev shell:                astro-portfolio/flake.nix (cd astro-portfolio && nix develop)
  - workflows:                .github/workflows/ at the repository root

No duplicate copy of any of those belongs at, or below, the repo root.
EOF
exit 1
