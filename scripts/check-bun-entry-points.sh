#!/usr/bin/env bash
#
# Dev entry points install and run with bun.
#
# Incident (kanban t_0d28625d -> t_70ced502, 2026-10-16): the deploy and the dev
# tooling were pointed at two different installers. `astro-portfolio/package-lock.json`
# was deleted because the npm client could not install from it any more
# (EUSAGE: gsap 3.14.2 vs ^3.15.0, lenis 1.3.18 vs ^1.3.27,
# @playwright/test 1.61.1 vs ^1.64.1, tailwind-merge 3.5.0 vs ^3.7.0), yet both
# Nix flakes and the developer docs still printed npm commands. Those commands
# could not work: there is no npm lockfile left, and the lockfile the deploy
# installs is astro-portfolio/bun.lock.
#
# This check fails the PR when the npm client is reintroduced into a file that a
# developer or a flake app runs. It is deliberately narrow:
#
#   * it scans the *.nix files and an explicit list of developer docs, so prose
#     that records the removed npm setup (.github/dependabot.yml) is untouched;
#   * it matches commands only (npm ci / npm install / npm run / npx), so
#     sentences such as "the npm lockfile is gone" still pass;
#   * dated plan documents under docs/plans/ are excluded on purpose: they record
#     what was run on that date and must not be rewritten.
#
# Run locally:
#   bash scripts/check-bun-entry-points.sh
set -euo pipefail

cd "$(cd "$(dirname "$0")/.." && pwd)"

# Every *.nix file plus every doc that hands out commands to a developer.
mapfile -t files < <(
  git ls-files '*.nix'
  printf '%s\n' \
    README.md \
    AGENTS.md \
    knowledge.md \
    DESIGN.md \
    astro-portfolio/README.md \
    astro-portfolio/AGENTS.md \
    astro-portfolio/DESIGN.md \
    astro-portfolio/SEO_IMPLEMENTATION_PLAN.md \
    .serena/memories/suggested-commands.md \
    .serena/memories/project-overview.md
)

pattern='(^|[^[:alnum:]_-])(npm (ci|install|run)|npx |nodePackages[.]npm)'

status=0
for f in "${files[@]}"; do
  [ -f "$f" ] || continue
  if hits=$(grep -nE "$pattern" "$f"); then
    echo "::error file=$f::npm command in a dev entry point — this repo installs and runs with bun"
    echo "FAIL $f"
    printf '%s\n' "$hits" | sed 's/^/    /'
    status=1
  fi
done

if [ "$status" -eq 0 ]; then
  echo "OK: ${#files[@]} dev entry point files use bun only."
  exit 0
fi

cat <<'EOF'

Fix: point the file at bun.
  npm ci            -> bun install --frozen-lockfile
  npm install       -> bun install --frozen-lockfile
  npm run <script>  -> bun run <script>
  npx <binary>      -> bunx <binary>

astro-portfolio/bun.lock is the one lockfile; astro-portfolio/package-lock.json
was deleted on 2026-10-16 and the Cloudflare deploy installs with
`bun install --frozen-lockfile`.
EOF
exit 1
