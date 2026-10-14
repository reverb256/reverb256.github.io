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
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview build
npm run test     # Run Playwright tests
```

## Deployment

Pushes to `main` trigger automatic deployment to GitHub Pages via `.github/workflows/deploy.yml`.

## Preview server

The workspace IS the main checkout — no env files or secrets needed. Dependencies live in `astro-portfolio/node_modules/` (reinstall with `cd astro-portfolio && bun install` if missing).

Build the static site to `astro-portfolio/dist/`:

```bash
cd astro-portfolio && bun run build
```

Run the preview with the Node.js static server (most reliable for the preview harness):

```bash
PORT=4330 node astro-portfolio/preview-server.mjs &
```

- **Port:** 4330 (check `lsof` first — 4321 is often taken by other projects)
- **Type:** Node.js HTTP static file server with SPA fallback
- **Why Node over Python:** Python `http.server` dies when the preview harness tries to attach; the Node server persists.

Alternatives (less reliable):

```bash
# Python static server
cd astro-portfolio/dist && python3 -m http.server <FREE_PORT> --bind 0.0.0.0 &

# Astro dev server
cd astro-portfolio && nohup node --max-old-space-size=8192 ./node_modules/astro/bin/astro.mjs dev --port <FREE_PORT> --host 0.0.0.0 > .freebuff/preview.log 2>&1 &
```
