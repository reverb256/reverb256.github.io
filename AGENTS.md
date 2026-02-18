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
