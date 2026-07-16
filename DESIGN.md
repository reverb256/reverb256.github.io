---
version: 1.0.0
name: reverb256.github.io
description: "Portfolio and personal site for reverb256 — a cyberpunk-terminal aesthetic built with Astro 7, React 19, Tailwind CSS v4, GSAP 3, and the Base24 Inkwell dark theme. Static site hosted on GitHub Pages at reverb256.dev."
colors:
  base00: "#0a0c10"
  base01: "#141820"
  base02: "#1e2430"
  base03: "#2a3242"
  base04: "#5a6278"
  base05: "#8a92a8"
  base06: "#c8ced8"
  base07: "#f0f2f8"
  base08: "#ff6b6b"
  base09: "#ff9f5c"
  base0A: "#ffd93d"
  base0B: "#4ecdc4"
  base0C: "#7dd3fc"
  base0D: "#a78bfa"
  base0E: "#f472b6"
  base0F: "#a38d56"
  base10: "#ff8787"
  base11: "#ffb87a"
  base12: "#ffe066"
  base13: "#6ee7de"
  base14: "#93c5fd"
  base15: "#c4b5fd"
  base16: "#f9a8d4"
  base17: "#d4c4a0"
  ink-50: "#faf8fc"
  ink-100: "#f3eef8"
  ink-200: "#e8def0"
  ink-300: "#d4c6e3"
  ink-400: "#b69cd0"
  ink-500: "#9975bc"
  ink-600: "#7e5aa3"
  ink-700: "#684989"
  ink-800: "#573f71"
  ink-900: "#4a365f"
  ink-950: "#1a1029"
  ember-50: "#fff8f4"
  ember-100: "#fff0e6"
  ember-200: "#ffdfc7"
  ember-300: "#ffc59a"
  ember-400: "#ff9f5c"
  ember-500: "#ff7a2a"
  ember-600: "#f05c1a"
  ember-700: "#c94412"
  ember-800: "#a33814"
  ember-900: "#863116"
  ember-950: "#481809"
  accent-primary: "#ff9f5c"
  accent-secondary: "#a78bfa"
  accent-success: "#4ecdc4"
  accent-error: "#ff6b6b"
typography:
  h1:
    fontFamily: Bebas Neue
    fontSize: clamp(3rem, 10vw, 8rem)
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.02em
    textWrap: balance
  h2:
    fontFamily: Bebas Neue
    fontSize: 2.5rem
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.02em
    textWrap: balance
  h3:
    fontFamily: Bebas Neue
    fontSize: 2rem
    fontWeight: 700
    lineHeight: 1.2
    textWrap: balance
  h4:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: 600
    lineHeight: 1.3
    textWrap: balance
  body:
    fontFamily: Inter
    fontSize: 1rem
    lineHeight: 1.6
    textWrap: pretty
  body-small:
    fontFamily: Inter
    fontSize: 0.875rem
    lineHeight: 1.5
  mono:
    fontFamily: Fira Code
    fontSize: 0.875rem
    lineHeight: 1.6
  label:
    fontFamily: Fira Code
    fontSize: 0.75rem
    fontWeight: 500
    letterSpacing: 0.05em
    textTransform: uppercase
  hero:
    fontFamily: Bebas Neue
    fontSize: clamp(3rem, 10vw, 8rem)
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: 0.02em
  nav:
    fontFamily: Fira Code
    fontSize: 0.875rem
    letterSpacing: 0.025em
rounded:
  sm: 6px
  md: 10px
  lg: 16px
  xl: 24px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 64px
  mega: 96px
motion:
  instant: 0ms
  fast: 150ms
  normal: 300ms
  slow: 600ms
  dramatic: 1500ms
  ease-out: "cubic-bezier(0.16, 1, 0.3, 1)"
  ease-spring: "cubic-bezier(0.34, 1.56, 0.64, 1)"
components:
  btn-accent:
    backgroundColor: "{colors.accent-primary}"
    textColor: "{colors.base00}"
    rounded: "{rounded.full}"
    padding: 12px 24px
    fontWeight: 600
    fontSize: 0.875rem
    fontFamily: Fira Code
    transition: "transform {motion.fast} {motion.ease-out}, box-shadow {motion.fast} {motion.ease-out}"
  btn-accent-hover:
    transform: "scale(1.05)"
    boxShadow: "0 0 24px rgba(255, 159, 92, 0.4)"
  btn-accent-active:
    transform: "scale(0.98)"
  btn-outline:
    backgroundColor: transparent
    textColor: "{colors.base06}"
    rounded: "{rounded.full}"
    padding: 12px 24px
    border: "1px solid {colors.base04}"
    fontSize: 0.875rem
    fontFamily: Fira Code
    transition: "border-color {motion.normal} {motion.ease-out}, color {motion.normal} {motion.ease-out}, background-color {motion.normal} {motion.ease-out}"
  btn-outline-hover:
    border-color: "{colors.accent-primary}"
    textColor: "{colors.accent-primary}"
    backgroundColor: "rgba(255, 159, 92, 0.1)"
  glass:
    backgroundColor: "rgba(30, 36, 48, 0.7)"
    border: "1px solid rgba(138, 146, 168, 0.15)"
    rounded: "{rounded.lg}"
    padding: 24px
    backdropFilter: "blur(16px)"
    transition: "transform {motion.normal} {motion.ease-out}, box-shadow {motion.normal} {motion.ease-out}"
  glass-hover:
    transform: "translateY(-2px)"
    boxShadow: "0 8px 32px rgba(0,0,0,0.3), 0 0 24px rgba(255,159,92,0.4)"
  bento-item:
    extends: glass
    position: relative
    overflow: hidden
  bento-item-hover:
    transform: "translateY(-4px)"
    boxShadow: "0 12px 40px rgba(0,0,0,0.4), 0 0 32px rgba(255,159,92,0.4)"
  badge-live:
    backgroundColor: "rgba(78, 205, 196, 0.15)"
    textColor: "{colors.base0B}"
    border: "1px solid rgba(78, 205, 196, 0.3)"
    rounded: "{rounded.full}"
    padding: "2px 10px"
    fontSize: 0.75rem
    fontWeight: 600
    fontFamily: Fira Code
  badge-active:
    backgroundColor: "rgba(255, 159, 92, 0.15)"
    textColor: "{colors.accent-primary}"
    border: "1px solid rgba(255, 159, 92, 0.3)"
    rounded: "{rounded.full}"
    padding: "2px 10px"
    fontSize: 0.75rem
    fontWeight: 600
    fontFamily: Fira Code
  badge-dev:
    backgroundColor: "rgba(167, 139, 250, 0.15)"
    textColor: "{colors.accent-secondary}"
    border: "1px solid rgba(167, 139, 250, 0.3)"
    rounded: "{rounded.full}"
    padding: "2px 10px"
    fontSize: 0.75rem
    fontWeight: 600
    fontFamily: Fira Code
  nav-link:
    textColor: "{colors.base04}"
    fontSize: 0.875rem
    fontFamily: Fira Code
    letterSpacing: 0.025em
    rounded: "{rounded.sm}"
    transition: "color {motion.normal} {motion.ease-out}"
    textDecoration: none
  nav-link-hover:
    textColor: "{colors.accent-primary}"
  nav-link-active:
    textColor: "{colors.accent-primary}"
  nav-underline:
    height: 2px
    background: "linear-gradient(90deg, {colors.accent-primary}, {colors.accent-secondary})"
    transition: "width {motion.normal} {motion.ease-out}"
  site-header:
    backgroundColor: "rgba(10, 12, 16, 0.85)"
    borderBottom: "1px solid {colors.base02}"
    backdropFilter: "blur(12px)"
    zIndex: 1000
  site-header-scrolled:
    borderBottom-color: "{colors.base03}"
    backgroundColor: "rgba(10, 12, 16, 0.95)"
  input:
    backgroundColor: "{colors.base02}"
    textColor: "{colors.base06}"
    border: "1px solid {colors.base03}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
    fontSize: 0.875rem
    fontFamily: Fira Code
    transition: "border-color {motion.normal} {motion.ease-out}"
  input-focus:
    border-color: "{colors.accent-primary}"
    outline: none
    boxShadow: "0 0 0 3px rgba(255, 159, 92, 0.15)"
  tag:
    backgroundColor: "{colors.base02}"
    textColor: "{colors.base05}"
    rounded: "{rounded.full}"
    padding: "2px 10px"
    fontSize: 0.75rem
    fontFamily: Fira Code
    border: "1px solid {colors.base03}"
  tag-hover:
    border-color: "{colors.accent-primary}"
    textColor: "{colors.accent-primary}"
  terminal-line:
    fontFamily: Fira Code
    fontSize: 0.875rem
    lineHeight: 1.8
    textColor: "{colors.base05}"
  terminal-prompt:
    textColor: "{colors.base0B}"
  terminal-command:
    textColor: "{colors.base06}"
  terminal-error:
    textColor: "{colors.base08}"
  progress-bar:
    backgroundColor: "{colors.base02}"
    rounded: "{rounded.full}"
    height: 4px
    overflow: hidden
  progress-fill:
    backgroundColor: "{colors.accent-primary}"
    rounded: "{rounded.full}"
    transition: "width {motion.normal} {motion.ease-out}"
  separator:
    height: 1px
    background: "linear-gradient(90deg, transparent, rgba(138, 146, 168, 0.15), transparent)"
  tooltip:
    backgroundColor: "{colors.base03}"
    textColor: "{colors.base06}"
    rounded: "{rounded.md}"
    padding: "6px 12px"
    fontSize: 0.75rem
    fontFamily: Fira Code
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
---

# Design System — reverb256.github.io

**Theme:** "Inkwell" — Base24 Compliant Dark Theme
**Aesthetic:** Cyberpunk Terminal / Rhythm Game Inspired
**Author:** reverb256
**Repository:** [reverb256.github.io](https://github.com/reverb256/reverb256.github.io)
**Domain:** [reverb256.dev](https://reverb256.dev)
**Last Updated:** 2026-07-14

---

## 1. Overview

reverb256.dev is a static portfolio and personal website hosted on GitHub Pages. It uses Astro 7 with static site generation, React 19 for interactive islands, Tailwind CSS v4 for utility-first styling, and GSAP 3 for scroll-triggered and micro-interaction animations.

The design language blends a **cyberpunk terminal aesthetic** (Fira Code mono, prompt-style UI, glitch/scan-line effects) with **rhythm-game-inspired micro-interactions** (combo counters, hit feedback, staggered reveals). The Base24 "Inkwell" dark theme provides the color foundation, with ember orange (`--base09`) as the primary accent and purple (`--base0D`) as the secondary accent.

**Design Philosophy:**
- **Calm Competence** — Show, don't tell. Let work speak for itself.
- **Progressive Disclosure** — Minimal by default, expand on demand.
- **Non-Intrusive Guidance** — Tooltips and highlights, never blocking modals.
- **Generous Space** — Breathing room between content clusters.
- **Consistent Motion** — Standardized animation timing across all interactions.

**Tone:** Direct, technical, humble. Never mystical or flowery. Clean, maintainable code is the priority.

---

## 2. Architecture & Page Layout

### 2.1 Framework

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Static Site Generator | Astro 7.0.9 | SSG output with island architecture |
| UI Framework | React 19.2.7 | Interactive components (terminal, filters) |
| CSS | Tailwind CSS v4.3.2 | Utility-first via `@tailwindcss/vite` |
| Animation | GSAP 3.14.2 | ScrollTrigger reveals, micro-interactions |
| Smooth Scroll | Lenis 1.3.18 | Available in deps but not actively imported in components (CSS scroll-behavior used instead) |
| Deployment | GitHub Pages | `reverb256.dev` (custom CNAME) |

### 2.2 Route Map

| Path | Page | Description |
|------|------|-------------|
| `/` | Home | Hero, about, projects (bento grid), blog feed, setup/stack |
| `/blog` | Blog Listing | Chronological article index |
| `/blog/[slug]` | Blog Post | Markdown/MDX rendered article |
| `/bookmarks` | Bookmarks | Curated link collection with tags |
| `/components` | UI Showcase | Live component library preview |
| `/infrastructure` | Homelab Infra | Network topology, node specs, services |
| `/now` | Now Page | Current focus, reading, projects |
| `/setup` | Dev Setup | Editor, hardware, software stack |

### 2.3 Section Sequence (Homepage)

1. **Hero** — Full-viewport: dynamic terminal greeting, name, tagline, dual CTAs
2. **About** — Blurb with terminal-style ASCII section header
3. **Projects** — Bento-grid project cards with glass-morphism, hover effects
4. **Blog Feed** — Recent posts with excerpt, date, tags
5. **Setup / Stack** — Tech stack visualization, hardware showcase
6. **Footer** — Nav links, socials, copyright

---

## 3. Color System & Tokens

### 3.1 Base24 "Inkwell" Palette

#### Base (Backgrounds)

| Token | Hex | Usage |
|-------|-----|-------|
| `--base00` | `#0a0c10` | Darkest background (page) |
| `--base01` | `#141820` | Dark bg elevated |
| `--base02` | `#1e2430` | Surface (cards, inputs) |
| `--base03` | `#2a3242` | Surface hover, borders |

#### Foreground (Text)

| Token | Hex | Usage |
|-------|-----|-------|
| `--base04` | `#5a6278` | Muted text, subtle labels |
| `--base05` | `#8a92a8` | Secondary text, metadata |
| `--base06` | `#c8ced8` | Primary body text |
| `--base07` | `#f0f2f8` | Bright text, headings |

#### Accents

| Token | Hex | Meaning |
|-------|-----|---------|
| `--base08` | `#ff6b6b` | Red — errors, deletions |
| `--base09` | `#ff9f5c` | **Ember Orange** — primary accent, warnings |
| `--base0A` | `#ffd93d` | Yellow — highlights, stars |
| `--base0B` | `#4ecdc4` | Teal — success, live indicators |
| `--base0C` | `#7dd3fc` | Light blue — info, links |
| `--base0D` | `#a78bfa` | **Purple** — secondary accent |
| `--base0E` | `#f472b6` | Pink — tertiary accent |
| `--base0F` | `#a38d56` | Brown — deprecated |

#### Extended ANSI

| Token | Hex | Token | Hex |
|-------|-----|-------|-----|
| `--base10` | `#ff8787` | `--base11` | `#ffb87a` |
| `--base12` | `#ffe066` | `--base13` | `#6ee7de` |
| `--base14` | `#93c5fd` | `--base15` | `#c4b5fd` |
| `--base16` | `#f9a8d4` | `--base17` | `#d4c4a0` |

### 3.2 Custom Scales

#### Ink (Neutral)

| Token | Hex | Token | Hex |
|-------|-----|-------|-----|
| `--color-ink-50` | `#faf8fc` | `--color-ink-100` | `#f3eef8` |
| `--color-ink-200` | `#e8def0` | `--color-ink-300` | `#d4c6e3` |
| `--color-ink-400` | `#b69cd0` | `--color-ink-500` | `#9975bc` |
| `--color-ink-600` | `#7e5aa3` | `--color-ink-700` | `#684989` |
| `--color-ink-800` | `#573f71` | `--color-ink-900` | `#4a365f` |
| `--color-ink-950` | `#1a1029` | | |

#### Ember (Accent)

| Token | Hex | Token | Hex |
|-------|-----|-------|-----|
| `--color-ember-50` | `#fff8f4` | `--color-ember-100` | `#fff0e6` |
| `--color-ember-200` | `#ffdfc7` | `--color-ember-300` | `#ffc59a` |
| `--color-ember-400` | `#ff9f5c` | `--color-ember-500` | `#ff7a2a` |
| `--color-ember-600` | `#f05c1a` | `--color-ember-700` | `#c94412` |
| `--color-ember-800` | `#a33814` | `--color-ember-900` | `#863116` |
| `--color-ember-950` | `#481809` | | |

### 3.3 Semantic Aliases

```css
/* Backgrounds */
--bg-primary:     var(--base00);
--bg-elevated:    var(--base01);
--bg-surface:     var(--base02);
--bg-hover:       var(--base03);

/* Text */
--text-primary:   var(--base07);
--text-secondary: var(--base06);
--text-muted:     var(--base05);
--text-subtle:    var(--base04);

/* Brand Accents */
--accent-primary:   var(--base09);   /* Ember orange */
--accent-secondary: var(--base0D);   /* Purple */
--accent-success:   var(--base0B);   /* Teal */
--accent-error:     var(--base08);   /* Red */

/* Effects */
--glass-bg:     rgba(30, 36, 48, 0.7);
--glass-border: rgba(138, 146, 168, 0.15);
--glass-blur:   16px;
--glow-color:   rgba(255, 159, 92, 0.4);
```

### 3.4 Wide Gamut Support

```css
@media (color-gamut: p3) {
  --base09: color(display-p3 1 0.65 0.4);
  --base0D: color(display-p3 0.7 0.6 1);
}

@media (color-gamut: rec2020) {
  --base09: color(rec2020 1 0.6 0.35);
}
```

### 3.5 Tailwind CSS v4 Theme Declaration

All custom colors and animations are declared via CSS `@theme` in `global.css`:

```css
@theme {
  --color-ink-50: #faf8fc;
  /* ... full ink + ember scales ... */
  --animate-fade-up: fadeUp 0.6s ease-out forwards;
  --animate-fade-in: fadeIn 0.4s ease-out forwards;
  --animate-scale-in: scaleIn 0.5s ease-out forwards;
  --animate-slide-right: slideRight 0.6s ease-out forwards;
  --animate-glow-pulse: glowPulse 2s ease-in-out infinite;
}
```

---

## 4. Typography

### 4.1 Font Families

| Usage | Font | Source |
|-------|------|--------|
| Headings (h1–h3) | `Bebas Neue` | Google Fonts (preloaded, `display=swap`) |
| Body (h4+, text) | `Inter` | System font stack |
| Code, Terminal, Labels | `Fira Code` | Google Fonts (preloaded, `display=swap`) |
| Fallback | `system-ui, -apple-system, sans-serif` | System |

### 4.2 Font Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--text-xs` | `0.75rem` (12px) | Labels, badges, metadata |
| `--text-sm` | `0.875rem` (14px) | Body small, nav links |
| `--text-base` | `1rem` (16px) | Default body text |
| `--text-lg` | `1.125rem` (18px) | Large body, subheadings |
| `--text-xl` | `1.25rem` (20px) | Small section headings (h4) |
| `--text-2xl` | `1.5rem` (24px) | Section headings (h3) |
| `--text-3xl` | `2rem` (32px) | Medium headings (h3 display) |
| `--text-4xl` | `2.5rem` (40px) | Large headings (h2) |
| `--text-5xl` | `3rem` (48px) | Hero heading (h1) |
| `--text-hero` | `clamp(3rem, 10vw, 8rem)` | Dynamic hero intro |

### 4.3 Heading Styles

```css
h1, h2, h3, h4, h5, h6 {
  color: var(--text-primary);
  font-weight: 700;
  line-height: 1.2;
  text-wrap: balance;
}
```

### 4.4 Body Text

- **Line height:** 1.6
- **Max width:** 65ch for readability
- **Text wrap:** `pretty` for optimal breaks
- **Code inline:** `background: var(--base01)`, `color: var(--base0C)`, `border-radius: 4px`, `padding: 1px 4px`

---

## 5. Component Catalog

### 5.1 Accent Button (`.btn-accent`)

Primary call-to-action. Ember orange fill with pill shape.

```css
.btn-accent {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: var(--space-3) var(--space-6);
  background: var(--accent-primary);
  color: var(--bg-primary);
  font-family: 'Fira Code', monospace;
  font-weight: 600;
  font-size: 0.875rem;
  border-radius: var(--radius-full);
  border: none;
  cursor: pointer;
  transition: transform 150ms ease-out, box-shadow 150ms ease-out;
}
.btn-accent:hover {
  transform: scale(1.05);
  box-shadow: 0 0 24px var(--glow-color);
}
.btn-accent:active {
  transform: scale(0.98);
}
```

### 5.2 Outline Button (`.btn-outline`)

Secondary action. Ghost with border.

```css
.btn-outline {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: var(--space-3) var(--space-6);
  background: transparent;
  color: var(--text-secondary);
  font-family: 'Fira Code', monospace;
  font-weight: 600;
  font-size: 0.875rem;
  border: 1px solid var(--text-subtle);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: border-color 300ms ease, color 300ms ease, background 300ms ease;
}
.btn-outline:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
  background: rgba(255, 159, 92, 0.1);
}
```

### 5.3 Glass Card (`.glass`)

Foundation card pattern with backdrop blur.

```css
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  transition: transform 300ms ease-out, box-shadow 300ms ease-out;
}
.glass:hover {
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 24px var(--glow-color);
  transform: translateY(-2px);
}
```

### 5.4 Bento Grid Item (`.bento-item`)

Interactive project card used on the homepage grid.

```css
.bento-item {
  composes: glass;
  padding: var(--space-6);
  position: relative;
  overflow: hidden;
}
.bento-item:hover {
  transform: translateY(-4px);
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.4),
    0 0 32px var(--glow-color);
}
```

### 5.5 Status Badges

| Badge | Background | Text Color | Border |
|-------|-----------|------------|--------|
| `.badge-live` | `rgba(78, 205, 196, 0.15)` | `--base0B` (teal) | `rgba(78, 205, 196, 0.3)` |
| `.badge-active` | `rgba(255, 159, 92, 0.15)` | `--accent-primary` | `rgba(255, 159, 92, 0.3)` |
| `.badge-dev` | `rgba(167, 139, 250, 0.15)` | `--accent-secondary` (purple) | `rgba(167, 139, 250, 0.3)` |
| `.badge-deprecated` | `rgba(163, 141, 86, 0.15)` | `--base0F` (brown) | `rgba(163, 141, 86, 0.3)` |

All badges: `border-radius: 9999px; padding: 2px 10px; font-size: 0.75rem; font-family: 'Fira Code', monospace;`.

### 5.6 Site Header (`.site-header`)

Fixed top navigation bar.

```css
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(10, 12, 16, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--base02);
  transition: background 300ms ease, border-color 300ms ease;
}
.site-header.scrolled {
  background: rgba(10, 12, 16, 0.95);
  border-bottom-color: var(--base03);
}
```

### 5.7 Nav Link (`.nav-link`)

Desktop navigation link with animated gradient underline.

```css
.nav-link {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.875rem;
  font-size: 0.875rem;
  font-family: 'Fira Code', monospace;
  color: var(--text-subtle);
  text-decoration: none;
  border-radius: var(--radius-sm);
  position: relative;
  transition: color 300ms ease;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
  transform: translateX(-50%);
  transition: width 300ms ease;
}
.nav-link:hover::after { width: 60%; }
.nav-link.active { color: var(--accent-primary); }
.nav-link.active::after { width: 80%; }
```

### 5.8 Terminal Line (`.terminal-line`)

Used in the hero terminal animation and code displays.

```css
.terminal-line {
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
  line-height: 1.8;
  color: var(--text-muted);
}
.terminal-prompt { color: var(--accent-success); }   /* $  or ❯ */
.terminal-command { color: var(--text-secondary); }
.terminal-output { color: var(--text-muted); }
.terminal-error { color: var(--accent-error); }
```

### 5.9 Section Divider

Horizontal rule between sections. Use a styled `<hr>` or `border-b` utility:

```css
.section-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(138, 146, 168, 0.15), transparent);
  margin: var(--space-16) 0;
}
```

### 5.10 Progress Bar

```css
.progress-bar {
  background: var(--bg-surface);
  border-radius: 9999px;
  height: 4px;
  overflow: hidden;
}
.progress-fill {
  background: var(--accent-primary);
  border-radius: 9999px;
  height: 100%;
  transition: width 0.6s ease-out;
}
```

---

## 6. Component State Matrix

| Component | Rest | Hover | Active / Focus | Disabled | Mobile |
|-----------|------|-------|----------------|----------|--------|
| **btn-accent** | `bg--base09`, `color--base00` | `scale(1.05)`, `glow` | `scale(0.98)` | `opacity: 0.5`, cursor default | Full-width on `<480px` |
| **btn-outline** | `border--base04`, `color--base06` | `border--base09`, `color--base09`, `bg: rgba(255,159,92,0.1)` | — | `opacity: 0.5` | Full-width on `<480px` |
| **card-glass** | `bg: rgba(30,36,48,0.7)`, default shadow | `translateY(-2px)`, glow | — | — | Padding reduced to `1rem` |
| **bento-item** | Glass + `padding: 1.5rem` | `translateY(-4px)`, intense glow | — | — | Single column, `padding: 1rem` |
| **nav-link** | `color--base04` | `color--base09`, underline 60% | `color--base09`, underline 80% | — | Hidden (hamburger) |
| **badge-live** | Teal bg/border | — | — | — | Inline |
| **input** | `bg--base02`, `border--base03` | `border--base09` | `border--base09`, `ring` | `opacity: 0.5` | Reduced padding |
| **site-header** | `bg: rgba(10,12,16,0.85)` | — | Scrolled: `bg: 0.95`, `border--base03` | — | Fixed, hamburger nav |

---

## 7. Layout & Elevation

### 7.1 Spacing Scale (4px Base)

| Token | Rem | PX | Usage |
|-------|-----|----|-------|
| `--space-1` | `0.25rem` | 4px | Tiny gaps |
| `--space-2` | `0.5rem` | 8px | Small gaps, icon spacing |
| `--space-3` | `0.75rem` | 12px | Compact padding |
| `--space-4` | `1rem` | 16px | Standard element spacing |
| `--space-6` | `1.5rem` | 24px | Section padding, card padding |
| `--space-8` | `2rem` | 32px | Large spacing |
| `--space-12` | `3rem` | 48px | XL section spacing |
| `--space-16` | `4rem` | 64px | XXL page sections |

### 7.2 Elevation (Z-Index Scale)

| Layer | Z-Index | Elements |
|-------|---------|----------|
| Base | `0` | Page content |
| Surface | `1` | Cards, bento items |
| Elevated | `10` | Dropdowns, tooltips |
| Sticky | `100` | Section headers |
| Nav | `1000` | Site header |
| Overlay | `2000` | Mobile menu, modals |
| Toast | `3000` | Notifications, combo popups |

### 7.3 Container Widths

| Breakpoint | Max Width |
|------------|-----------|
| Mobile | `100%` |
| Tablet | `768px` |
| Desktop | `1024px` |
| Wide | `1280px` |
| Ultra | `1400px` |

### 7.4 Glass Effect Definition

```css
--glass-bg:     rgba(30, 36, 48, 0.7);
--glass-border: rgba(138, 146, 168, 0.15);
--glass-blur:   16px;
--glass-radius: var(--radius-lg);
```

---

## 8. Motion

### 8.1 Timing & Easing

| Token | Value | Cubic Bezier | Usage |
|-------|-------|--------------|-------|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Deceleration | Standard reveals |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Overshoot | Pop/bounce effects |

| Token | Value | Usage |
|-------|-------|-------|
| `--duration-fast` | 150ms | Quick interactions, hover states |
| `--duration-normal` | 300ms | Standard transitions |
| `--duration-slow` | 600ms | Content reveals, entrance animations |

### 8.2 GSAP Animation Patterns

Used via `<script>` tags in Astro components — no React hooks for animation.

```javascript
// 1. Fade Up (content reveal) — most common
gsap.from(el, {
  y: 40,
  opacity: 0,
  duration: 0.6,
  ease: "power2.out"
});

// 2. Scale In (subtle zoom)
gsap.from(el, {
  scale: 0.95,
  opacity: 0,
  duration: 0.4,
  ease: "power2.out"
});

// 3. Scroll Trigger (standard reveal pattern)
gsap.from(el, {
  y: 40,
  opacity: 0,
  duration: 0.6,
  ease: "power2.out",
  scrollTrigger: {
    trigger: el,
    start: "top 85%",
    once: true
  }
});

// 4. Staggered Children (grid/listing reveals)
gsap.from(container.children, {
  y: 30,
  opacity: 0,
  duration: 0.5,
  stagger: 0.08,
  ease: "power2.out",
  scrollTrigger: {
    trigger: container,
    start: "top 85%",
    once: true
  }
});
```

### 8.3 Data Attributes for Animation

| Attribute | Values | Effect |
|-----------|--------|--------|
| `data-animate` | `fade-up`, `fade-in`, `slide-right` | Animation type |
| `data-delay` | `0`, `0.1`, `0.2`, etc. | Delay in seconds |
| `data-stagger` | (container) | Enables staggered children |
| `data-stagger-item` | (child items) | Mark for stagger animation |

### 8.4 CSS Keyframe Animations

```css
/* Border Rotate — rotating gradient on bento items */
@keyframes border-rotate {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Combo Pop — celebration for interaction milestones */
@keyframes combo-pop {
  0%   { transform: translateX(-50%) scale(0.5); opacity: 0; }
  60%  { transform: translateX(-50%) scale(1.1);  opacity: 1; }
  100% { transform: translateX(-50%) scale(1);    opacity: 0; }
}

/* Glow Pulse — subtle breathing glow on accent elements */
@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0 20px rgba(255, 122, 42, 0.3); }
  50%      { box-shadow: 0 0 40px rgba(255, 122, 42, 0.6); }
}

/* Beat Flash — rhythm-game-style hit confirmation */
@keyframes beat-flash {
  0%   { width: 100%; opacity: 1; }
  100% { width: 100%; opacity: 0.3; }
}
```

### 8.5 Animation Decision Framework

| Interaction | Duration | Easing | Technique |
|-------------|----------|--------|-----------|
| Button hover | 150ms | `ease-out` | `transform: scale()` |
| Button click | 100ms | `ease-out` | `transform: scale(0.98)` |
| Card hover lift | 300ms | `ease-out` | `transform: translateY()` + shadow |
| Content reveal (scroll) | 600ms | `power2.out` | GSAP `from()` with ScrollTrigger |
| Staggered grid | 500ms / item | `power2.out` | GSAP `stagger: 0.08` |
| Page load sequence | 200ms offset | `power2.out` | Manual delay cascade |
| Combo/achievement | 500ms | `ease-spring` | Keyframe `combo-pop` |
| Pulse/glow (idle) | 2s loop | `ease-in-out` | Keyframe `glowPulse` |

### 8.6 Page Load Sequencing (Hero)

1. **0ms** — Terminal typewriter animation starts
2. **200ms** — Name/title fades up
3. **400ms** — Tagline subtitle fades up
4. **600ms** — CTA buttons scale in
5. **800ms** — Background particles/glow settle

### 8.7 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

The reduced motion media query in `global.css` disables all CSS animations and transitions. GSAP animations are also suppressed for users who prefer reduced motion; the `Layout.astro` script checks `prefers-reduced-motion` and CSS `@media (prefers-reduced-motion: reduce)` targets guarantee animations are stopped at the CSS level for fallback safety.

---

## 9. Accessibility

### 9.1 Focus States

```css
*:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
}
```

### 9.2 Skip Link

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--accent-primary);
  color: var(--bg-primary);
  padding: 8px;
  z-index: 100;
}
.skip-link:focus { top: 0; }
```

### 9.3 ARIA Attributes

| Element | Attribute | Value |
|---------|-----------|-------|
| `nav` | `role` / `aria-label` | `navigation` / `"Main navigation"` |
| Active link | `aria-current` | `"page"` |
| Mobile toggle | `aria-expanded`, `aria-controls` | Dynamic |
| Sections | `aria-labelledby` | Points to heading `id` |
| Images | `alt` | Descriptive (never empty for meaningful images) |

### 9.4 Color Contrast

- All body text meets **WCAG AA** (4.5:1 minimum)
- Large text ≥24px meets **WCAG AA** (3:1 minimum)
- Interactive elements have visible non-color indicators (underline, transform)

### 9.5 Screen Reader Utilities

```css
.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

---

## 10. Responsive Design

### 10.1 Breakpoints

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| Mobile | `< 480px` | Single column, 1rem padding, hamburger nav |
| Small | `480px – 767px` | Single column, adjusted spacing |
| Tablet | `768px – 1023px` | Two-column grid, desktop nav visible |
| Desktop | `≥ 1024px` | Full layout with bento grid |
| Wide | `≥ 1280px` | Max container (1280px), full hero scale |

### 10.2 Mobile Navigation

- Desktop nav links hidden below `768px`
- Hamburger icon toggles full-screen overlay menu
- GitHub/CTA buttons move into mobile menu drawer
- Backdrop blur on overlay, ember accent for active items

### 10.3 Content Padding

Page content uses Tailwind padding utilities (`px-6` / `px-6 md:px-24`) rather than a dedicated class.

### 10.4 Grid Adaptations

| Component | Mobile | Tablet | Desktop |
|-----------|--------|--------|---------|
| Bento grid | 1 col | 2 cols | 3 cols (masonry) |
| Blog feed | 1 col | 1 col, wider | 2 col with sidebar |
| Bookmarks | 1 col | 2 cols | 3 cols |
| Infrastructure | 1 col | 2 cols | Full-width diagram + details |

---

## 11. Build Configuration

### 11.1 Requirements

| Tool | Version | Notes |
|------|---------|-------|
| Node.js | v24+ | Vite 8 memory management requires `--max-old-space-size=8192` |
| npm | 10+ | Bundled with Node |
| Astro | 7.0.9 | Static output |
| Tailwind CSS | 4.3.2 | CSS-based config (`@theme`), no `tailwind.config.mjs` |
| GSAP | 3.14.2 | ScrollTrigger plugin |
| Lenis | 1.3.18 | Smooth scroll |

### 11.2 Commands

```bash
npm run dev                     # Start dev server (localhost)
npm run build                   # Production build (--max-old-space-size=8192)
npm run preview                 # Preview production build
npm run test                    # Playwright end-to-end tests
npm run generate:og-image       # Generate OG image assets
```

### 11.3 Astro Configuration (Key Settings)

```js
// astro.config.mjs
export default defineConfig({
  output: "static",
  site: "https://reverb256.dev",
  compressHTML: true,
  build: {
    assets: "_assets",
    inlineStylesheets: "auto",
  },
  vite: {
    plugins: [tailwindcss()],
    environments: {
      client: {
        build: {
          rollupOptions: {
            output: {
              manualChunks(id) {
                if (id.includes("react"))   return "vendor";
                if (id.includes("gsap"))    return "gsap";
              },
            },
          },
        },
      },
    },
  },
});
```

### 11.4 Manual Chunks Strategy

| Chunk | Contents | Rationale |
|-------|----------|-----------|
| `vendor` | React, ReactDOM | Rarely changes; long browser cache |
| `gsap` | GSAP + ScrollTrigger | Animation library; versioned separately |
| Everything else | App components | Auto-split by Rolldown |

### 11.5 Deployment

- **Platform:** GitHub Pages
- **Domain:** `reverb256.dev` (CNAME record)
- **Trigger:** Push to `main` branch
- **CI:** `.github/workflows/deploy.yml` — builds with `NODE_OPTIONS="--max-old-space-size=8192"` then deploys `dist/`
- **Cache:** GitHub Pages sets 1h cache on HTML, 1y on hashed assets

---

## 12. Agent Prompt Guide

### When Adding New Components

1. **Use semantic color variables**, never hardcode hex values
2. **Follow spacing scale** (`var(--space-*)` tokens)
3. **Include reduced motion** support for all animations
4. **Add proper ARIA attributes** for accessibility
5. **Use Fira Code** for code/terminal elements, Inter for body, Bebas Neue for headings
6. **Wrap interactive text** in Fira Code with ember accent for terminal feel

### When Adding New Pages

1. **Import Layout** from `../layouts/Layout.astro`
2. **Use appropriate page padding**: `px-6 py-16` or `max-w-3xl mx-auto`
3. **Add `data-animate` attributes** for GSAP fade-in effects
4. **Include section dividers** between major content blocks
5. **Add back navigation** link to home at the bottom of content pages
6. **Set `<title>`** and `<meta name="description">` in frontmatter
7. **Ensure page title follows** `"Page Name — reverb256"` format

### GSAP Integration in Astro

```astro
<script>
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll('[data-animate]').forEach(el => {
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 0.6,
      delay: parseFloat(el.dataset.delay ?? 0),
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
    });
  });
</script>
```

### Tailwind CSS v4 Migration Notes

- **No `tailwind.config.mjs`** — all configuration is in CSS via `@theme`
- Use `@tailwindcss/vite` plugin instead of `@astrojs/tailwind`
- Custom animations use `--animate-*` prefix in `@theme`
- Color scales (`ink-*`, `ember-*`) are `@theme` variables
- Reference colors: `bg-ink-950`, `text-ember-400`, `animate-fade-up`

### Anti-Patterns Checklist

- [ ] NO hardcoded hex colors (use CSS variables)
- [ ] NO `export default` in `.astro` files (use frontmatter)
- [ ] NO `useState`/`useEffect` for animations (use GSAP `<script>`)
- [ ] NO Framer Motion (GSAP is the animation library)
- [ ] NO inline `style` props for design tokens (use classes/variables)
- [ ] NO client-side API calls (use frontmatter for static data)
- [ ] NO mystical/flowery language in copy (direct and technical)
- [ ] NO missing `alt` text on images
- [ ] NO animations without `prefers-reduced-motion` respect

---

## Changelog

| Date | Changes |
|------|---------|
| 2026-07-14 | Initial design doc created. YAML frontmatter with design tokens. Sections 1–12 complete. Color system, typography, component catalog, motion framework, accessibility, responsive, build config, agent guide all documented. |
