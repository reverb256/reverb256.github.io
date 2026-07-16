# reverb256 Portfolio — Knowledge Base

## What is this?

Personal portfolio for **reverb256.ca** — a cyberpunk terminal / rhythm-game-inspired site. Built with **Astro 7** (static), **React 19**, **Tailwind CSS v4**, and **GSAP 3.14** for scroll-triggered animations. Base24 "Inkwell" dark theme with ember orange (`#ff9f5c`) accent on deep navy background (`#0a0c10`).

**Key aesthetic:** Glass morphism cards, bento-grid project layout, CRT scanlines, floating particles, terminal-style interactive homepage.

---

## Where key code lives

- **Root website dir:** `astro-portfolio/`
- **Pages:** `astro-portfolio/src/pages/` — `index.astro` (home + terminal), `blog/`, `blog/[slug]`, `infrastructure/`, `now/`, `setup/`, `bookmarks/`, `components/`
- **Components:** `astro-portfolio/src/components/` — `Header.astro` + infrastructure sub-components + shadcn/ui-style components in `ui/`
- **Layout:** `astro-portfolio/src/layouts/Layout.astro` — GSAP ScrollTrigger, particles canvas, cursor glow
- **Styles:**
  - `global.css` — Tailwind v4 `@theme`, Base24 color tokens, semantic aliases, glass/bento/button classes, Display P3 / Rec.2020 wide gamut
  - `animations.css` — Rhythm-game micro-interactions (combo, beat indicators, terminal feedback)
- **Content (blog):** `astro-portfolio/src/content/blog/` — MDX files
- **Data:** `astro-portfolio/src/lib/infrastructure-data.ts` (infrastructure page data)
- **Tests:** `astro-portfolio/tests/` — Playwright cross-browser tests
- **CI/CD:** `.github/workflows/deploy.yml` — deploys to GitHub Pages on push to `main`

---

## Commands

All commands run from `astro-portfolio/`:

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build (requires `node --max-old-space-size=8192` — already configured in `package.json` scripts) |
| `npm run preview` | Preview production build |
| `npm run test` | Run all Playwright tests |
| `npm run test:chromium` | Chromium only |
| `npm run test:firefox` | Firefox only |
| `npm run test:webkit` | Webkit only |
| `npm run generate:og-image` | Generate OG images |

---

## Notable conventions & constraints

### NixOS development

Project has a **`flake.nix`** / **`flake.lock`** for NixOS dev shells. Run `nix develop` from `astro-portfolio/` to enter.

### Tailwind v4 (no tailwind.config.mjs!)

Tailwind CSS v4 is configured entirely via CSS `@theme` directives in `global.css`, not a separate config file. Color utilities use these names:

- **Neutral:** `ink-50` through `ink-950`
- **Accent:** `ember-50` through `ember-950` (primary accent: `ember-400 = #ff9f5c`)
- **Animations:** `animate-fade-up`, `animate-fade-in`, `animate-scale-in`, `animate-slide-right`, `animate-glow-pulse`
- **Use:** `bg-ink-950`, `text-ember-400`, `border-ink-700`

Tailwind v4 integration is via `@tailwindcss/vite` plugin in `astro.config.mjs`.

### Color system

- **Always use semantic CSS variables** — never hardcoded hex values
- Semantic aliases: `--bg-primary`, `--text-primary`, `--accent-primary` (ember orange), `--glass-bg`, `--glow-color`
- Base24 palette: `--base00` through `--base0F` (darkest bg → accents)
- Display P3 and Rec.2020 wide-gamut overrides in `@media (color-gamut: p3)` and `@media (color-gamut: rec2020)`
- OKLCH perceptual color overrides under `@media (color-gamut: p3)`

### Astro 7 specifics

- **No `export default`** in `.astro` files (use frontmatter `---`)
- **No React imports for static content** — use Astro native syntax
- **No client-side API calls** — all data is static frontmatter
- **GSAP only** (no Framer Motion)
- Astro 7 uses **Rolldown** instead of Rollup — client build config uses `environments.client.build.rollupOptions`
- `compressHTML: true` configured in `astro.config.mjs`
- Manual chunks configured for `react`, `react-dom`, and `gsap`

### Build gotchas

- **Node.js v24+ required** with `--max-old-space-size=8192` for Vite 8 memory — already in `package.json` build script
- **OG images:** generated via `scripts/generate-og-image.cjs` using sharp — called during CI
- **No `@astrojs/tailwind` integration** — replaced with `@tailwindcss/vite` in Tailwind v4 migration

### Animation rules

- GSAP via `<script>` tags with `define:vars`
- `data-animate` / `data-delay` / `data-stagger` / `data-stagger-item` attributes for declarative animations
- GSAP ScrollTrigger: start at `top 85%`, `once: true`
- Only animate `transform` and `opacity` (GPU compositing)
- Never animate from `scale(0)`
- All animations gated behind `@media (prefers-reduced-motion: reduce)`

### Accessibility

- Skip link, `aria-current="page"`, `aria-expanded`/`aria-controls` for mobile nav
- WCAG AA color contrast (4.5:1 normal text, 3:1 large text)
- `forced-colors: active` media query support
