# Astro Portfolio Knowledge Base

**Repository:** reverb256.github.io → astro-portfolio
**Runtime:** Astro 7.0.9 with static site generation
**Domain:** reverb256.dev

---

## OVERVIEW

Personal portfolio with a Linux/TUI terminal aesthetic — solid surface cards, sharp 2px borders, Omarchy ASCII art, interactive terminal with gesture physics, systemd-style footer. No glass, no blur, no glow. Built with Astro 7, React 19, Tailwind CSS v4 (`@theme`-based), and GSAP 3.14 for scroll-triggered animations. Base24 "Inkwell" dark theme, ember orange accent (`#ff9f5c`) on deep navy (`#0a0c10`).

---

## STRUCTURE

```
astro-portfolio/
├── src/
│   ├── pages/          # Route-based .astro files (15 pages)
│   │   ├── index.astro       # Homepage + terminal + gesture interactions
│   │   ├── 404.astro         # Kernel panic 404
│   │   ├── blog/             # Blog listing + posts
│   │   ├── bookmarks/        # Curated links
│   │   ├── components/       # UI component showcase
│   │   ├── craft/            # Story-driven project showcase (w/ phases)
│   │   ├── infrastructure/   # Omarchy cluster deep-dive
│   │   ├── man/              # Unix man page format
│   │   ├── now/              # Current focus page
│   │   ├── setup/            # Dev environment
│   │   └── writing/          # Narrative voice blog
│   ├── layouts/        # GSAP + particles + scratchpad terminal
│   ├── components/     # Header, infrastructure cards, shadcn/ui
│   └── styles/         # global.css (Tailwind v4 @theme + Base24)
├── public/             # Static assets
├── dist/               # Static build output
├── astro.config.mjs    # Output: static, manual chunks for react/gsap
└── (no tailwind.config.mjs — Tailwind v4 uses CSS @theme)
```

---

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Main page | `src/pages/index.astro` | Frontmatter + template + terminal gesture JS + CSS |
| Layout | `src/layouts/Layout.astro` | GSAP ScrollTrigger, particles, scratchpad terminal |
| Theme | `src/styles/global.css` | Base24 "Inkwell" colors, `.surface`/`.glass`/`.bento-item` classes |
| Build output | `dist/` | Static site generation |
| Craft showcase | `src/pages/craft/index.astro` | Story-driven project cards with ACTIVE/EXPERIMENT phases |
| Infrastructure | `src/pages/infrastructure/index.astro` | Cluster stats, timeline, glass-grid layout, hardware specs |

---

## CONVENTIONS

### Astro Component Pattern
```astro
---
interface Props { title: string; }
const { title } = Astro.props;
const db = { /* data */ };
---
<Layout title={title}>
  <div class="surface">{db.items.map(i => <span>{i}</span>)}</div>
</Layout>
<script define:vars={{ db }}>console.log(db);</script>
```

### GSAP Animations (vs Framer Motion)
```javascript
gsap.from(el, { y: 40, opacity: 0, scrollTrigger: { start: "top 85%" } });
```

### Color System (Base24 Inkwell)
```css
color: var(--base07);
background: var(--surface-default);
border: 1px solid var(--border-default);
--accent-primary: var(--base09);  /* ember orange */
--accent-niri: #509475;           /* green focus ring */
```

### Surface Classes
```css
.surface     /* Preferred TUI card — solid bg, sharp border */
.glass       /* Backward-compat alias for .surface */
.bento-item  /* Bento grid project card — niri green hover */
```

---

## ANTI-PATTERNS (ASTRO-SPECIFIC)

- NO `export default` in `.astro` files (use frontmatter)
- NO React imports for static content (use Astro native syntax)
- NO `useState`/useEffect (use `<script>` tags instead)
- NO `data-` attributes without GSAP definitions
- NO client-side API calls (use frontmatter for static data)
- NO hardcoded Base24 colors (use semantic aliases)
- NO Framer Motion (GSAP is the animation library)
- NO glassmorphism (`backdrop-filter`, `blur()`) — use solid `.surface` cards
- NO Apple-style shadows — use 1px solid `var(--border-default)` instead

---

## NIX DEV SHELL AND PLAYWRIGHT

`flake.nix` here is the app devShell; the repo root has a second, smaller one.
Both `flake.lock` files are committed and must pin the same `nixpkgs` revision
(`nix flake update` in both, in one change).

Playwright has one rule, and the flake enforces it: **`@playwright/test` in
`package.json` must be exactly the `playwright-driver` version of the pinned
nixpkgs.** `PLAYWRIGHT_BROWSERS_PATH` points at browser trees that nixpkgs builds
itself; they are the only Playwright browsers that run on NixOS
(https://wiki.nixos.org/wiki/Playwright), and Playwright picks a browser by the
revision compiled into its own version, so any other version fails with
"Executable doesn't exist at .../chromium-<rev>". The flake asserts the two
versions are equal, so `nix develop` and `nix flake check` report the mismatch
with the fix commands instead of failing at test time.

Current pin (2026-10-16): nixpkgs rev `55bfb4d` -> `playwright-driver` 1.63.0,
`chromium-1243`, matching `"@playwright/test": "1.63.0"` in `package.json` and
`bun.lock`. The devShell installs Chromium only (`chromium`,
`chromium-headless-shell`, `ffmpeg`) because the projects in
`playwright.config.ts` are Chromium-only; uncomment `withFirefox` / `withWebkit`
in `flake.nix` if you enable the firefox/webkit projects. The old full set was
~2.2 GB, and the fact that the shell was never instantiated is what let the
version drift go unnoticed — see `scripts/check-nix-flake-pins.sh` and
`.github/workflows/nix-flake-check.yml`, which guard both, and the "Nix dev
shells" section of the root `README.md`.
