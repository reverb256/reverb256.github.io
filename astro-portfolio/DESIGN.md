---
version: "1.0"
name: reverb256 Portfolio
description: Cyberpunk Terminal / Rhythm Game inspired portfolio built with Astro 7, React 19, Tailwind v4, and GSAP. Base24-compliant "Inkwell" dark theme with ember orange accent on deep navy foundation. Static-site generated. 7 pages with bento-grid layout, glass morphism, and scroll-driven animations.
colors:
  # Base24 "Inkwell" Palette — Darkest Backgrounds
  base00: "#0a0c10"
  base01: "#141820"
  base02: "#1e2430"
  base03: "#2a3242"
  # Foreground
  base04: "#5a6278"
  base05: "#8a92a8"
  base06: "#c8ced8"
  base07: "#f0f2f8"
  # Accents
  base08: "#ff6b6b"
  base09: "#ff9f5c"
  base0A: "#ffd93d"
  base0B: "#4ecdc4"
  base0C: "#7dd3fc"
  base0D: "#a78bfa"
  base0E: "#f472b6"
  base0F: "#a38d56"
  # Extended ANSI
  base10: "#ff8787"
  base11: "#ffb87a"
  base12: "#ffe066"
  base13: "#6ee7de"
  base14: "#93c5fd"
  base15: "#c4b5fd"
  base16: "#f9a8d4"
  base17: "#d4c4a0"
  # Ink neutral scale (Tailwind @theme)
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
  # Ember accent scale (Tailwind @theme)
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
  # Semantic aliases
  bg-primary: "{base00}"
  bg-elevated: "{base01}"
  bg-surface: "{base02}"
  bg-hover: "{base03}"
  text-primary: "{base07}"
  text-secondary: "{base06}"
  text-muted: "{base05}"
  text-subtle: "{base04}"
  accent-primary: "{base09}"
  accent-secondary: "{base0D}"
  accent-success: "{base0B}"
  accent-error: "{base08}"
  glass-bg: "rgba(30, 36, 48, 0.7)"
  glass-border: "rgba(138, 146, 168, 0.15)"
  glass-blur: "16px"
  glow-color: "rgba(255, 159, 92, 0.4)"
typography:
  h1:
    fontFamily: Bebas Neue
    fontSize: clamp(3rem, 10vw, 8rem)
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0
    textWrap: balance
  h2:
    fontFamily: Bebas Neue
    fontSize: 2.5rem
    fontWeight: 700
    lineHeight: 1.2
    textWrap: balance
  h3:
    fontFamily: Bebas Neue
    fontSize: 2rem
    fontWeight: 700
    lineHeight: 1.2
    textWrap: balance
  h4:
    fontFamily: Bebas Neue
    fontSize: 1.5rem
    fontWeight: 700
    lineHeight: 1.2
    textWrap: balance
  body:
    fontFamily: Inter, system-ui, -apple-system
    fontSize: 1rem
    lineHeight: 1.6
  body-small:
    fontFamily: Inter, system-ui, -apple-system
    fontSize: 0.875rem
    lineHeight: 1.5
  code:
    fontFamily: Fira Code
    fontSize: 0.875rem
    lineHeight: 1.4
  nav:
    fontFamily: Inter, system-ui, -apple-system
    fontSize: 0.875rem
    fontWeight: 500
  stat-value:
    fontFamily: Bebas Neue
    fontSize: 2.5rem
    fontWeight: 700
    lineHeight: 1.1
  stat-label:
    fontFamily: Inter, system-ui, -apple-system
    fontSize: 0.75rem
    fontWeight: 600
rounded:
  none: 0px
  sm: 6px
  md: 10px
  lg: 16px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 64px
motion:
  instant: 0ms
  fast: 150ms
  normal: 300ms
  slow: 600ms
  shimmer-duration: 2000ms
  ease-out: "cubic-bezier(0.16, 1, 0.3, 1)"
  ease-spring: "cubic-bezier(0.34, 1.56, 0.64, 1)"
components:
  btn-accent:
    backgroundColor: "{colors.accent-primary}"
    textColor: "{colors.bg-primary}"
    fontWeight: 600
    rounded: "{rounded.full}"
    padding: 12px 24px
    display: inline-flex
    alignItems: center
    justifyContent: center
    border: none
    cursor: pointer
    transition: "transform {motion.normal} {motion.ease-out}, box-shadow {motion.normal} {motion.ease-out}"
  btn-accent-hover:
    transform: "scale(1.05)"
    boxShadow: "0 0 24px {colors.glow-color}"
  btn-accent-active:
    transform: "scale(0.98)"
  btn-outline:
    backgroundColor: transparent
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.full}"
    padding: 12px 24px
    border: "1px solid {colors.text-subtle}"
    transition: "border-color {motion.normal} {motion.ease-out}, color {motion.normal} {motion.ease-out}, background-color {motion.normal} {motion.ease-out}"
  btn-outline-hover:
    borderColor: "{colors.accent-primary}"
    textColor: "{colors.accent-primary}"
    backgroundColor: "rgba(255, 159, 92, 0.1)"
  card:
    backgroundColor: "{colors.glass-bg}"
    backdropFilter: "blur({colors.glass-blur})"
    border: "1px solid {colors.glass-border}"
    rounded: "{rounded.lg}"
    transition: "box-shadow {motion.normal} {motion.ease-out}, transform {motion.normal} {motion.ease-out}"
  card-hover:
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 24px {colors.glow-color}"
    transform: "translateY(-2px)"
  bento-item:
    extends: card
    padding: 24px
    position: relative
    overflow: hidden
  bento-item-hover:
    transform: "translateY(-4px)"
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.4), 0 0 32px {colors.glow-color}"
  glass-card:
    backgroundColor: "{colors.glass-bg}"
    backdropFilter: "blur({colors.glass-blur})"
    border: "1px solid {colors.glass-border}"
    rounded: "{rounded.lg}"
    transition: "box-shadow {motion.normal} {motion.ease-out}, transform {motion.normal} {motion.ease-out}"
  glass-card-hover:
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 24px {colors.glow-color}"
    transform: "translateY(-2px)"
  input:
    backgroundColor: "{colors.bg-surface}"
    border: "1px solid {colors.glass-border}"
    rounded: "{rounded.md}"
    padding: 12px 16px
    textColor: "{colors.text-primary}"
    transition: "border-color {motion.normal} {motion.ease-out}, box-shadow {motion.normal} {motion.ease-out}"
  input-focus:
    borderColor: "{colors.accent-primary}"
    outline: "none"
    boxShadow: "0 0 0 3px {colors.glow-color}"
  nav-link:
    textColor: "{colors.text-muted}"
    fontSize: 0.875rem
    display: flex
    alignItems: center
    gap: 0.375rem
    padding: 0.5rem 0.875rem
    textDecoration: none
    rounded: "{rounded.sm}"
    position: relative
    transition: "color {motion.normal} {motion.ease-out}"
  nav-link-hover:
    textColor: "{colors.accent-primary}"
  nav-link-active:
    textColor: "{colors.accent-primary}"
    after:
      width: 80%
      content: "''"
      position: absolute
      bottom: 0
      left: 50%
      height: 2px
      background: "linear-gradient(90deg, {colors.accent-primary}, {colors.accent-secondary})"
      transform: "translateX(-50%)"
      transition: "width {motion.normal} {motion.ease-out}"
  badge:
    rounded: "{rounded.full}"
    padding: 2px 10px
    fontSize: 0.75rem
    fontWeight: 600
  badge-live:
    backgroundColor: "rgba(78, 205, 196, 0.15)"
    textColor: "{base0B}"
    border: "1px solid rgba(78, 205, 196, 0.3)"
  badge-active:
    backgroundColor: "rgba(255, 159, 92, 0.15)"
    textColor: "{accent-primary}"
    border: "1px solid rgba(255, 159, 92, 0.3)"
  stat-card:
    backgroundColor: "{colors.glass-bg}"
    backdropFilter: "blur({colors.glass-blur})"
    border: "1px solid {colors.glass-border}"
    rounded: "{rounded.lg}"
    padding: 20px
    transition: "box-shadow {motion.normal} {motion.ease-out}, transform {motion.normal} {motion.ease-out}"
  stat-card-hover:
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)"
    transform: "translateY(-2px)"


## Overview

**Theme:** "Inkwell" — Base24 Compliant Dark Theme
**Aesthetic:** Cyberpunk Terminal / Rhythm Game Inspired
**Author:** reverb256
**Last Updated:** 2026-07-14

The design system powers a personal portfolio with a terminal-inspired dark interface, glass morphism components, GSAP scroll-driven animations, and a bento-grid project layout. Built on Astro 7 with static-site generation and Tailwind CSS v4 theming via `@theme` directives.

Every color references the Base24 "Inkwell" palette with ember orange as the primary accent. All components use semantic CSS custom properties — never hardcoded hex values. The system supports Display P3 wide gamut and OKLCH perceptual color for vibrant rendering on capable displays.

---

## Architecture / Page Layout

The site serves 7 pages built with Astro's static-site generation:

| # | Route | Page | Description |
|---|-------|------|-------------|
| 1 | `/` | Homepage | Terminal intro, bento-grid project showcase, beat indicators |
| 2 | `/blog/` | Blog listing | Article cards with category badges, pagination |
| 3 | `/blog/[slug]` | Blog post | Markdown-rendered articles with code blocks |
| 4 | `/now/` | Now page | Current focus, reading, projects — /now page format |
| 5 | `/setup/` | Setup page | Dev environment, hardware, software stack |
| 6 | `/bookmarks/` | Bookmarks | Curated link collection with tag/category grouping |
| 7 | (404) | Custom 404 | Terminal-themed error page |

### File Structure

```
astro-portfolio/
├── src/
│   ├── components/
│   │   └── Header.astro          # Persistent navigation
│   ├── layouts/
│   │   └── Layout.astro           # Base layout with GSAP
│   ├── pages/
│   │   ├── index.astro            # Homepage with terminal
│   │   ├── blog/
│   │   │   ├── index.astro        # Blog listing
│   │   │   └── [slug].astro       # Blog post pages
│   │   ├── now/index.astro        # /now page
│   │   ├── setup/index.astro      # /setup page
│   │   └── bookmarks/index.astro   # /bookmarks page
│   └── styles/
│       ├── global.css             # Design tokens, base styles
│       └── animations.css         # Animation keyframes
├── public/                        # Static assets
├── DESIGN.md                      # This file
└── AGENTS.md                      # Conventions for AI assistants
```

### Content Padding

Page content uses Tailwind padding utilities (`px-6` / `px-6 md:px-24`) rather than a dedicated class:

---

## Color System & Tokens

### Base24 "Inkwell" Palette

The theme uses the Base24 color system with dark mode variant.

#### Base Colors (Backgrounds)

| Token | Hex | Usage |
|-------|-----|-------|
| `--base00` | `#0a0c10` | Darkest background |
| `--base01` | `#141820` | Dark bg elevated |
| `--base02` | `#1e2430` | Surface |
| `--base03` | `#2a3242` | Surface hover |

#### Foreground Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--base04` | `#5a6278` | Muted text |
| `--base05` | `#8a92a8` | Secondary text |
| `--base06` | `#c8ced8` | Primary text |
| `--base07` | `#f0f2f8` | Bright text |

#### Accent Colors

| Token | Hex | Meaning |
|-------|-----|---------|
| `--base08` | `#ff6b6b` | Red — errors, deletions |
| `--base09` | `#ff9f5c` | Orange — warnings (primary accent) |
| `--base0A` | `#ffd93d` | Yellow — highlights |
| `--base0B` | `#4ecdc4` | Cyan/Green — success |
| `--base0C` | `#7dd3fc` | Light blue — info |
| `--base0D` | `#a78bfa` | Purple — secondary accent |
| `--base0E` | `#f472b6` | Pink — tertiary accent |
| `--base0F` | `#a38d56` | Brown — deprecated |

#### Extended ANSI (Base24)

| Token | Hex | Usage |
|-------|-----|-------|
| `--base10` | `#ff8787` | Bright red |
| `--base11` | `#ffb87a` | Bright orange |
| `--base12` | `#ffe066` | Bright yellow |
| `--base13` | `#6ee7de` | Bright cyan |
| `--base14` | `#93c5fd` | Bright blue |
| `--base15` | `#c4b5fd` | Bright purple |
| `--base16` | `#f9a8d4` | Bright pink |
| `--base17` | `#d4c4a0` | Bright brown |

### Semantic Aliases

**Always use these in components instead of direct color values:**

```css
/* Backgrounds */
--bg-primary: var(--base00);
--bg-elevated: var(--base01);
--bg-surface: var(--base02);
--bg-hover: var(--base03);

/* Text */
--text-primary: var(--base07);
--text-secondary: var(--base06);
--text-muted: var(--base05);
--text-subtle: var(--base04);

/* Brand Accents */
--accent-primary: var(--base09);    /* Ember orange */
--accent-secondary: var(--base0D);  /* Purple */
--accent-success: var(--base0B);    /* Teal */
--accent-error: var(--base08);      /* Red */

/* Effects */
--glass-bg: rgba(30, 36, 48, 0.7);
--glass-border: rgba(138, 146, 168, 0.15);
--glass-blur: 16px;
--glow-color: rgba(255, 159, 92, 0.4);
```

### Wide Gamut Support

The design supports Display P3 and Rec.2020 color spaces for vibrant colors on capable displays:

```css
@media (color-gamut: p3) {
  --base09: color(display-p3 1 0.65 0.4);   /* More vibrant ember */
  --base0D: color(display-p3 0.7 0.6 1);     /* Richer purple */
}

@media (color-gamut: rec2020) {
  --base09: color(rec2020 1 0.6 0.35);     /* HDR ember */
}
```

### OKLCH Perceptual Colors

For consistent appearance across displays:

```css
@media (color-gamut: p3) {
  --accent-primary: oklch(0.72 0.18 55);     /* Ember */
  --accent-secondary: oklch(0.68 0.15 290);  /* Purple */
  --accent-success: oklch(0.7 0.12 195);     /* Teal */
}
```

### Tailwind v4 Custom Colors

The ink (neutral) and ember (accent) custom color scales are declared as CSS `@theme` variables:

```css
@theme {
  /* Ink neutral scale */
  --color-ink-50: #faf8fc;
  --color-ink-100: #f3eef8;
  --color-ink-200: #e8def0;
  --color-ink-300: #d4c6e3;
  --color-ink-400: #b69cd0;
  --color-ink-500: #9975bc;
  --color-ink-600: #7e5aa3;
  --color-ink-700: #684989;
  --color-ink-800: #573f71;
  --color-ink-900: #4a365f;
  --color-ink-950: #1a1029;

  /* Ember accent scale */
  --color-ember-50: #fff8f4;
  --color-ember-100: #fff0e6;
  --color-ember-200: #ffdfc7;
  --color-ember-300: #ffc59a;
  --color-ember-400: #ff9f5c;
  --color-ember-500: #ff7a2a;
  --color-ember-600: #f05c1a;
  --color-ember-700: #c94412;
  --color-ember-800: #a33814;
  --color-ember-900: #863116;
  --color-ember-950: #481809;
}
```

These replace the custom colors previously defined in `tailwind.config.mjs` under `theme.extend.colors`.

### Custom Animations via @theme

```css
@theme {
  --animate-fade-up: fadeUp 0.6s ease-out forwards;
  --animate-fade-in: fadeIn 0.4s ease-out forwards;
  --animate-scale-in: scaleIn 0.5s ease-out forwards;
  --animate-slide-right: slideRight 0.6s ease-out forwards;
  --animate-glow-pulse: glowPulse 2s ease-in-out infinite;
}
```

### Tailwind Usage

Reference these colors and animations directly in Astro components using Tailwind utility classes:

```html
<div class="bg-ink-950 text-ember-400 animate-fade-up">
  Hello, world!
</div>
```

---

## Typography

### Font Families

| Usage | Font | Source |
|-------|------|--------|
| Headings (h1–h3) | `Bebas Neue` | Google Fonts (preloaded) |
| Subheadings (h4+) | `Inter`, `system-ui`, `-apple-system` | Inherits body font |
| Monospace | `Fira Code` | Google Fonts (preloaded) |
| Body | `Inter`, `system-ui`, `-apple-system` | System fonts |
| Navigation | `Inter`, `system-ui`, `-apple-system` | Inherits body font |

### Font Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--text-xs` | `0.75rem` (12px) | Small labels |
| `--text-sm` | `0.875rem` (14px) | Body text |
| `--text-base` | `1rem` (16px) | Default |
| `--text-lg` | `1.125rem` (18px) | Large body |
| `--text-xl` | `1.25rem` (20px) | Subheadings |
| `--text-2xl` | `1.5rem` (24px) | Small headings |
| `--text-3xl` | `2rem` (32px) | Medium headings |
| `--text-4xl` | `2.5rem` (40px) | Large headings |
| `--text-5xl` | `3rem` (48px) | Hero text |
| `--text-hero` | `clamp(3rem, 10vw, 8rem)` | Dynamic hero |

### Heading Styles

```css
h1, h2, h3, h4, h5, h6 {
  color: var(--text-primary);
  font-weight: 700;
  line-height: 1.2;
  text-wrap: balance;
}
```

---

## Component Catalog

### Buttons

#### Accent Button (`.btn-accent`)

Primary call-to-action button with ember orange accent.

```css
.btn-accent {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3) var(--space-6);
  background: var(--accent-primary);
  color: var(--bg-primary);
  font-weight: 600;
  border-radius: var(--radius-full);
  border: none;
  cursor: pointer;
}

.btn-accent:hover {
  transform: scale(1.05);
  box-shadow: 0 0 24px var(--glow-color);
}

.btn-accent:active {
  transform: scale(0.98);
}
```

#### Outline Button (`.btn-outline`)

Secondary button with border styling.

```css
.btn-outline {
  padding: var(--space-3) var(--space-6);
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--text-subtle);
  border-radius: var(--radius-full);
}

.btn-outline:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
  background-color: rgba(255, 159, 92, 0.1);
}
```

### Glass Cards

#### Glass Card (`.glass`)

Semi-transparent card with backdrop blur effect.

```css
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
}

.glass:hover {
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 24px var(--glow-color);
  transform: translateY(-2px);
}
```

#### Bento Grid Item (`.bento-item`)

Interactive project card with hover effects.

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

### Badges

#### Live Badge (`.badge-live`)

Indicates production/live status.

```css
.badge-live {
  background: rgba(78, 205, 196, 0.15);
  color: var(--base0B);
  border: 1px solid rgba(78, 205, 196, 0.3);
}
```

#### Active Badge (`.badge-active`)

Indicates active development status.

```css
.badge-active {
  background: rgba(255, 159, 92, 0.15);
  color: var(--accent-primary);
  border: 1px solid rgba(255, 159, 92, 0.3);
}
```

### Navigation

#### Header (`.site-header`)

Fixed navigation bar with backdrop blur.

```css
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: color(display-p3 0.04 0.05 0.06 / 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--base02);
}

.site-header.scrolled {
  border-bottom-color: var(--base03);
  background: color(display-p3 0.04 0.05 0.06 / 0.95);
}
```

#### Nav Link (`.nav-link`)

Desktop navigation link with hover underline.

```css
.nav-link {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.875rem;
  font-size: 0.875rem;
  color: var(--text-muted);
  text-decoration: none;
  border-radius: var(--radius-sm);
  position: relative;
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
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 60%;
}

.nav-link.active {
  color: var(--accent-primary);
}

.nav-link.active::after {
  width: 80%;
}
```

---

## Component State Matrix

| Component | Hover | Active | Focus | Disabled | Loading |
|-----------|-------|--------|-------|----------|---------|
| btn-accent | scale(1.05) + glow | scale(0.98) | — | opacity 0.4 | shimmer |
| btn-outline | border + bg fill | — | — | opacity 0.4 | — |
| glass / bento-item | translateY(-2px / -4px) + shadow | — | — | — | — |
| input | — | — | border + glow ring | opacity 0.5 | — |
| nav-link | underline 60% | — | — | — | — |
| badge-live / badge-active | — | — | — | — | — |

---

## Layout

### Spacing Scale (4px base unit)

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | `0.25rem` (4px) | Tiny gaps |
| `--space-2` | `0.5rem` (8px) | Small gaps |
| `--space-3` | `0.75rem` (12px) | Compact padding |
| `--space-4` | `1rem` (16px) | Standard spacing |
| `--space-6` | `1.5rem` (24px) | Section padding |
| `--space-8` | `2rem` (32px) | Large spacing |
| `--space-12` | `3rem` (48px) | XL spacing |
| `--space-16` | `4rem` (64px) | XXL spacing |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `6px` | Small elements |
| `--radius-md` | `10px` | Medium elements |
| `--radius-lg` | `16px` | Cards, large buttons |
| `--radius-xl` | `24px` | Hero elements |
| `--radius-full` | `9999px` | Pills, badges |

### Container Widths

| Breakpoint | Max Width |
|------------|------------|
| Mobile | `100%` |
| Tablet | `768px` |
| Desktop | `1024px` |
| Wide | `1280px` |
| Ultra | `1400px` |

---

## Elevation

Flat design hierarchy. Depth is achieved through background layering (base00 → base01 → base02 → base03) rather than box shadows.

Shadows are reserved for interactive states only:
- **Glass cards (default):** no shadow — depth from backdrop blur + border
- **Glass cards (hover):** `0 8px 32px rgba(0,0,0,0.3), 0 0 24px var(--glow-color)`
- **Bento items (hover):** `0 12px 40px rgba(0,0,0,0.4), 0 0 32px var(--glow-color)`
- **Buttons (hover):** `0 0 24px var(--glow-color)`

The glow-color (`rgba(255, 159, 92, 0.4)`) provides the ember accent glow that ties elevated states to the brand.

---

## Motion

### Timing Functions

| Token | Value | Usage |
|-------|-------|-------|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Smooth deceleration |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Spring/bounce effect |

### Durations

| Token | Value | Usage |
|-------|-------|-------|
| `--duration-fast` | `150ms` | Quick interactions |
| `--duration-normal` | `300ms` | Standard transitions |
| `--duration-slow` | `600ms` | Deliberate animations |

### GSAP Animation Patterns

Used for scroll-triggered animations in `Layout.astro`:

```javascript
// Fade up from below
gsap.from(el, {
  y: 40,
  opacity: 0,
  duration: 0.6,
  ease: "power2.out"
});

// Scale in
gsap.from(el, {
  scale: 0.95,
  opacity: 0,
  duration: 0.4,
  ease: "power2.out"
});

// Scroll trigger
gsap.from(el, {
  ...config,
  scrollTrigger: {
    trigger: el,
    start: "top 85%",
    once: true
  }
});
```

### Data Attributes for Animation

| Attribute | Values | Effect |
|-----------|--------|--------|
| `data-animate` | `fade-up`, `fade-in`, `slide-right` | Animation type |
| `data-delay` | `0`, `0.1`, `0.2`, etc. | Delay in seconds |
| `data-stagger` | (container) | Enables staggered children |
| `data-stagger-item` | (child items) | Mark for stagger animation |

### Keyframe Animations

#### Border Rotate

Rotating gradient border on bento items.

```css
@keyframes border-rotate {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

#### Combo Pop

Celebration animation for interaction milestones.

```css
@keyframes combo-pop {
  0% {
    transform: translateX(-50%) scale(0.5);
    opacity: 0;
  }
  60% {
    transform: translateX(-50%) scale(1.1);
    opacity: 1;
  }
  100% {
    transform: translateX(-50%) scale(1);
    opacity: 0;
  }
}
```

### Animation Decision Framework

Before adding any animation, evaluate the frequency:

| Frequency | Decision |
|-----------|----------|
| 100+ times/day | No animation. Ever. |
| Tens of times/day | Remove or drastically reduce |
| Occasional | Standard animation |
| Rare / first-time | Can add delight |

### Easing & Timing

- **Enter/exit:** `ease-out` or custom `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Hover/color:** 300ms `ease`.
- **Button press:** 150ms `ease-out`.
- **UI animations stay under 300ms.** Deliberate animations (entrance): 600ms.
- **Never animate from `scale(0)`.**
- **Only animate `transform` and `opacity`** for GPU compositing.

### Reduced Motion

Always respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Accessibility

### Focus States

All interactive elements must have visible focus:

```css
*:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
}
```

### Skip Links

Skip-to-content link for keyboard users:

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

.skip-link:focus {
  top: 0;
}
```

### Screen Reader Utilities

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

### ARIA Attributes

- **Navigation**: `role="menubar"`, `aria-label="Main navigation"`
- **Active links**: `aria-current="page"`
- **Mobile toggle**: `aria-expanded`, `aria-controls`
- **Sections**: `aria-labelledby` with corresponding `id` on headings

### Color Contrast

All text meets WCAG AA standards (4.5:1 for normal text, 3:1 for large text).

---

## Responsive

### Breakpoints

| Breakpoint | Width | Changes |
|------------|-------|---------|
| Mobile | `< 480px` | Single column, minimal padding |
| Small | `480px — 767px` | Still single column, adjusted spacing |
| Tablet | `768px — 1023px` | Two-column grid, nav adapts |
| Desktop | `≥ 1024px` | Full layout, desktop navigation |
| Wide | `≥ 1280px` | Max container width |

### Mobile Navigation

Below 768px:
- Desktop nav hidden
- Hamburger menu shown
- Full-screen mobile menu dropdown
- GitHub button moves to mobile menu

---

## Build Configuration

**Node.js:** v24+ (requires `--max-old-space-size=8192` for Vite 8 memory management)

### Build Command

```bash
NODE_OPTIONS="--max-old-space-size=8192" npm run build
```

This is required due to Vite 8's increased memory usage during production builds. Without this flag, builds may fail with a JavaScript heap out of memory error.

---

## Framework Versions

| Framework | Version | Notes |
|-----------|---------|-------|
| Astro | 7.0.9 | Upgraded from 5.18.1 on 2026-07-14 |
| React | 19.2.7 | |
| Tailwind CSS | v4.3.2 | Migrated from v3 on 2026-07-14 |
| GSAP | 3.14.2 | |

### Tailwind v4 Migration Notes

Tailwind CSS v4 uses CSS-based configuration via the `@theme` directive instead of `tailwind.config.mjs`. The `@astrojs/tailwind` integration has been replaced with `@tailwindcss/vite`.

```css
/* No more tailwind.config.mjs — all configuration is in CSS */
```

---

## Agent Prompt Guide

**Context:** reverb256 portfolio — a personal site at `reverb256.ca` built with Astro 7 (static), React 19, Tailwind v4 (`@theme`-based), and GSAP 3.14 for scroll-triggered animations. Design system in `src/styles/global.css` (Base24 Inkwell, semantic aliases) and `src/styles/animations.css`. 7 pages: Home (terminal + bento grid), Blog listing + posts, /now, /setup, /bookmarks.

**Bias:** dark canvas (`#0a0c10`), ember orange accent (`#ff9f5c`) on glass cards with backdrop blur, rhythm-game beat indicators, bento-grid project layout, GSAP ScrollTrigger (fade-up from `top 85%`), Bebas Neue headings, Inter body, Fira Code for mono.

**Reject:** light backgrounds, serif fonts, hex hardcodes (use semantic vars), Framer Motion (GSAP only), `scale(0)` animations, missing ARIA, client-side API calls (static frontmatter), `export default` in `.astro` files, React imports for static content.

**Tailwind:** use `ink-*` (neutral) and `ember-*` (accent) color utilities: `bg-ink-950`, `text-ember-400`, `border-ink-700`. GSAP via `<script>` tags in `.astro` files with `define:vars`. All animations gated behind `@media (prefers-reduced-motion: reduce)`.

---

## Usage Guidelines

### When Adding New Components

1. **Use semantic color variables**, never hardcode hex values
2. **Follow spacing scale** — use `var(--space-*)` tokens
3. **Include reduced motion** support for animations
4. **Add proper ARIA attributes** for accessibility
5. **Test in both light/dark** forced color modes

### When Adding New Pages

1. **Import Layout** from `../layouts/Layout.astro`
2. **Use appropriate page padding**: `px-6 py-16` or `max-w-3xl mx-auto`
3. **Add data-animate attributes** for fade-in effects
4. **Include beat indicators** for rhythm-game feel
5. **Add back navigation** to home at the bottom

### GSAP Integration

For custom animations:

```javascript
// In a <script> tag within .astro files
gsap.from(element, {
  y: 40,
  opacity: 0,
  duration: 0.6,
  ease: "power2.out",
  scrollTrigger: {
    trigger: element,
    start: "top 85%",
    once: true
  }
});
```

---

## Changelog

| Date | Changes |
|------|---------|
| 2026-07-14 | Astro 7.0.9 upgrade, Tailwind v3→v4 migration (CSS @theme), Framework Versions section, Build Requirements section. Restructured DESIGN.md with YAML frontmatter. |
| 2026-03-11 | Initial design spec created, color management added, Header component documented |
