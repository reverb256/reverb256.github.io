# Reverb256 Portfolio

**Repository:** reverb256.github.io
**Target:** GitHub Pages (reverb256.ca)
**Environment:** NixOS
**Development:** AI TUIs (OpenCode, Qwen)

---

## Project Structure

```
reverb256.github.io/
├── astro-portfolio/    # Main Astro website
│   ├── src/            # Source code
│   ├── tests/          # Playwright tests
│   └── flake.nix       # NixOS dev environment
├── .github/workflows/  # GitHub Actions
└── CNAME               # Custom domain
```

## Main Project

See `astro-portfolio/AGENTS.md` for full documentation.

## Commands

```bash
cd astro-portfolio
bun install --frozen-lockfile   # bun.lock is the only lockfile
bun run dev      # Start dev server
bun run build    # Build for production
bun run preview  # Preview build
bun run test     # Run Playwright tests
```

## Deployment

Pushes to `main` deploy to Cloudflare Pages via
`.github/workflows/cloudflare-pages.yml` (`bun install --frozen-lockfile` then
`bun run build`). GitHub Pages (`.github/workflows/deploy.yml`) is retired; it
only runs on `workflow_dispatch`.
