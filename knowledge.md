# reverb256 Portfolio — Knowledge Base

## What is this?

Personal portfolio for **reverb256.dev** — a Linux/TUI terminal-inspired site. Built with **Astro 7** (static), **React 19**, **Tailwind CSS v4**, and **GSAP 3.14** for scroll-triggered animations. Base24 "Inkwell" dark theme with ember orange (`#ff9f5c`) accent on deep navy background (`#0a0c10`).

**Key aesthetic:** Solid terminal cards (`.surface` class), TUI-style sharp borders (`--radius-sm: 2px`), interactive terminal with gesture physics, NixOS ASCII art, systemd-style footer. No glass, no blur, no glow. Pure terminal.

---

## Where key code lives

- **Root website dir:** `astro-portfolio/`
- **Pages:** `astro-portfolio/src/pages/` — `index.astro` (home + terminal), `blog/`, `blog/[slug]`, `infrastructure/`, `now/`, `setup/`, `bookmarks/`, **`man/`** (Unix man page), **`writing/`** (narrative voice), **`craft/`** (phase-tagged projects), **`404.astro`** (kernel panic)
- **Components:** `astro-portfolio/src/components/` — `Header.astro` + infrastructure sub-components + shadcn/ui-style components in `ui/`
- **Layout:** `astro-portfolio/src/layouts/Layout.astro` — GSAP ScrollTrigger, particles canvas, console easter egg, global scratchpad terminal
- **Styles:**
  - `global.css` — Tailwind v4 `@theme`, Base24 color tokens, semantic aliases, `.surface`/`glass`/`bento-item`/button classes
  - `animations.css` — Terminal micro-interactions (beat indicators, scroll feedback)
- **Content (blog):** `astro-portfolio/src/content/blog/` — Markdown (`.md`) files (converted from `.mdx`)
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
- **Animations:** `animate-fade-up`, `animate-fade-in`, `animate-scale-in`, `animate-slide-right`
- **Use:** `bg-ink-950`, `text-ember-400`, `border-ink-700`

Tailwind v4 integration is via `@tailwindcss/vite` plugin in `astro.config.mjs`.

### Color system

- **Always use semantic CSS variables** — never hardcoded hex values
- Semantic aliases: `--bg-primary` (`#0a0c10`), `--text-primary` (`#f0f2f8`), `--accent-primary` (ember orange `#ff9f5c`), `--accent-niri` (green `#509475`), `--surface-default` (`#141820`), `--border-default` (`#2a3242`)
- Base24 palette: `--base00` through `--base0F` (darkest bg → accents)
- **No wide-gamut/Display P3/Rec.2020** — all colors are solid hex/rgba values
- **No OKLCH/OKLAB** perceptual color overrides
- **No `--glow-color`** or `--glass-bg` variables (removed in TUI purge)
- **All surfaces are solid** — no `backdrop-filter`, no `blur()`, no glassmorphism. TUI aesthetic uses flat backgrounds with 1px solid borders.

### Surface classes

- **`.surface`** — Preferred TUI card container. Solid `--surface-default` background, `--radius-sm` (2px) corners. Replaces `.glass`.
- **`.glass`** — Backward-compatible alias for `.surface`. Same styling. Will be removed in a future cleanup.
- **`.bento-item`** — Bento grid project card. Solid surface, niri-style green focus on hover.
- **`.terminal-card`** — Terminal-style card with `--surface-default` bg, hover state.

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
- **Blog content:** Uses `.md` files (not `.mdx`). `@astrojs/mdx` is not installed due to npm registry date constraints. The content config glob (`**/*.{md,mdx}`) handles both formats.

### Animation rules

- GSAP via `<script>` tags with `define:vars`
- `data-animate` / `data-delay` / `data-stagger` / `data-stagger-item` attributes for declarative animations
- GSAP ScrollTrigger: start at `top 85%`, `once: true`
- Only animate `transform` and `opacity` (GPU compositing)
- Never animate from `scale(0)`
- All animations gated behind `@media (prefers-reduced-motion: reduce)`
- Terminal interactions use spring physics (rubber-banding, momentum projection) — these are also gated behind reduced motion

### Terminal gesture interactions

The homepage terminal supports Apple Design-style physics for a fluid feel:
- **Drag to resize:** Bottom-right handle with 40×40px touch target and `::after` pseudo-element for extended tap area
- **Rubber-banding:** Progressive resistance at min/max bounds
- **Momentum projection:** Flick velocity projects to resting position
- **Spring settle:** Critically-damped spring via `requestAnimationFrame`, fully interruptible
- **Flick-to-minimize/maximize:** Downward/upward flicks (>600px/s) snap terminal
- **Touch-optimized:** `touch-action: none` on draggable surfaces, controls always visible on touch devices

### Global scratchpad terminal

A persistent terminal available on every page:
- Floating `$_` button (bottom-right), slides up from bottom
- Ctrl+` to toggle, Escape to close
- Commands: help, clear, whoami, neofetch, status, banner, date, echo
- XSS-safe: user input via `textContent`, trusted display via `innerHTML`

### Accessibility

- Skip link, `aria-current="page"`, `aria-expanded`/`aria-controls` for mobile nav
- WCAG AA color contrast (4.5:1 normal text, 3:1 large text)
- `forced-colors: active` media query support
- Terminal interactions respect `prefers-reduced-motion` (spring → instant snap)
