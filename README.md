# Reverb256 Portfolio

Personal portfolio website built with Astro, GSAP, and Tailwind CSS.

## Quick Start

```bash
cd astro-portfolio

# Enter NixOS dev environment (optional)
nix develop

# Install dependencies (bun.lock is the only lockfile — there is no npm lockfile)
bun install --frozen-lockfile

# Start dev server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

bun is the only supported installer. The Cloudflare Pages deploy runs
`bun install --frozen-lockfile` and `bun run build`
(`.github/workflows/cloudflare-pages.yml`), and `astro-portfolio/package-lock.json`
was deleted on 2026-10-16 because its npm lockfile no longer matched the tree.
`scripts/check-bun-entry-points.sh` fails a PR that points a dev entry point back
at the npm client.

## Nix dev shells

There are two flakes, and both `flake.lock` files are committed:

- `flake.nix` (repo root) — bun + node, then `cd astro-portfolio`;
- `astro-portfolio/flake.nix` — the full app shell: bun, node, the Playwright
  browsers, `gh`, `watchexec`.

Refresh the two together, in one change:

```bash
nix flake update            # repo root
cd astro-portfolio
nix flake update
```

Both locks must pin the same `nixpkgs` revision: one repo must not build with two
toolchains. `scripts/check-nix-flake-pins.sh` runs as a step of the required
"Deploy gate" check and fails a PR when they differ, when a lock is untracked, or
when `package.json` and `bun.lock` disagree.
`.github/workflows/nix-flake-check.yml` additionally runs
`nix flake check --no-build` on both flakes.

### Playwright is owned by nixpkgs

`astro-portfolio/package.json` pins `@playwright/test` to an exact version, and
that version must equal the `playwright-driver` of the flake's locked nixpkgs.
The browsers in the devShell are built by nixpkgs — they are the only Playwright
browsers that run on NixOS (https://wiki.nixos.org/wiki/Playwright) — and
Playwright resolves a browser by the revision compiled into its own version. The
flake asserts the two versions are equal, so `nix develop` and `nix flake check`
fail with the mismatch instead of `bunx playwright test` failing later with
"Executable doesn't exist".

As of 2026-10-16 `nixpkgs` rev `55bfb4d` ships `playwright-driver` 1.63.0
(`chromium-1243`), and `astro-portfolio/package.json` pins
`"@playwright/test": "1.63.0"`. When `nix flake update` moves nixpkgs, set the
exact `playwright-driver` version as `@playwright/test` and run `bun install` in
`astro-portfolio/` in the same change. The devShell ships Chromium only
(`chromium`, `chromium-headless-shell`, `ffmpeg`), matching the Chromium projects
in `playwright.config.ts`; re-enable `withFirefox` / `withWebkit` in
`astro-portfolio/flake.nix` if those projects are uncommented.

## Tech Stack

- **Astro** - Static site generator
- **GSAP** - Animations
- **Tailwind CSS** - Styling
- **Base24** - Color scheme
- **NixOS** - Declarative development environment
- **Playwright** - Cross-browser testing

## Structure

```
astro-portfolio/
├── src/
│   ├── layouts/    # Page layouts
│   ├── pages/      # Routes
│   └── styles/     # Global styles
├── tests/          # Playwright tests
└── public/         # Static assets
```

## License

MIT
