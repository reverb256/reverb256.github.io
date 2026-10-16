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

## Nix dev shell

There is one flake — `astro-portfolio/flake.nix`, with its `flake.lock`
committed. Enter it from the app directory:

```bash
cd astro-portfolio
nix develop
```

Move the pin and commit the lock in one change:

```bash
cd astro-portfolio
nix flake update
git add astro-portfolio/flake.lock
```

There were two flakes until 2026-10-16, and the root one was a hand-copy of this
shell's toolchain (nodejs, bun, typescript, eslint, git, jq, fd, ripgrep, bat,
eza, then `cd astro-portfolio`) with a re-run of the same build in its `apps`.
The two drifted apart twice: the root had no lock at all until that day, and it
resolved nixpkgs `55bfb4d` (bun 1.4.2, nodejs 24.21.0) while `astro-portfolio`
was pinned to `b5aa0fb` (bun 1.3.13, nodejs 24.16.0). A nested flake cannot
`follows` a sibling directory, so a copy at the root can only drift again — and
it carries none of the Playwright browsers. `scripts/check-single-source.sh`
fails a PR that adds a root manifest, lock or flake back.

`scripts/check-nix-flake-pins.sh` runs as a step of the required "Deploy gate"
check and fails a PR when the lock is untracked or unreadable, when
`@playwright/test` is not an exact version, or when `package.json` and `bun.lock`
disagree. `.github/workflows/nix-flake-check.yml` additionally runs
`nix flake check --no-build` on the flake.

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
