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
