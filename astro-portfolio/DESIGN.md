# Design System — reverb256.github.io

**Theme:** "Inkwell" — Base24 Compliant Dark Theme
**Aesthetic:** Cyberpunk Terminal / Rhythm Game Inspired
**Author:** reverb256
**Last Updated:** 2026-03-11

---

## Table of Contents

1. [Color System](#color-system)
2. [Typography](#typography)
3. [Spacing & Layout](#spacing--layout)
4. [Components](#components)
5. [Animations](#animations)
6. [Responsive Breakpoints](#responsive-breakpoints)
7. [Accessibility](#accessibility)
8. [File Structure](#file-structure)

---

## Color System

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
| `--base08` | `#ff6b6b` | Red - errors, deletions |
| `--base09` | `#ff9f5c` | Orange - warnings (primary accent) |
| `--base0A` | `#ffd93d` | Yellow - highlights |
| `--base0B` | `#4ecdc4` | Cyan/Green - success |
| `--base0C` | `#7dd3fc` | Light blue - info |
| `--base0D` | `#a78bfa` | Purple - secondary accent |
| `--base0E` | `#f472b6` | Pink - tertiary accent |
| `--base0F` | `#a38d56` | Brown - deprecated |

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

---

## Typography

### Font Families

| Usage | Font | Source |
|-------|------|--------|
| Headings | `Bebas Neue` | Google Fonts (preloaded) |
| Monospace | `Fira Code` | Google Fonts (preloaded) |
| Body | `Inter`, `system-ui`, `-apple-system` | System fonts |

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

## Spacing & Layout

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

### Content Padding

```css
.page-padding {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

@media (min-width: 768px) {
  .page-padding {
    padding-left: 6rem;
    padding-right: 6rem;
  }
}
```

---

## Components

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

### Cards

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

## Animations

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

## Responsive Breakpoints

| Breakpoint | Width | Changes |
|------------|-------|---------|
| Mobile | `< 480px` | Single column, minimal padding |
| Small | `480px - 767px` | Still single column, adjusted spacing |
| Tablet | `768px - 1023px` | Two-column grid, nav adapts |
| Desktop | `≥ 1024px` | Full layout, desktop navigation |
| Wide | `≥ 1280px` | Max container width |

### Mobile Navigation

Below 768px:
- Desktop nav hidden
- Hamburger menu shown
- Full-screen mobile menu dropdown
- GitHub button moves to mobile menu

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

## File Structure

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

---

## Usage Guidelines

### When Adding New Components

1. **Use semantic color variables**, never hardcode hex values
2. **Follow spacing scale** - use `var(--space-*)` tokens
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
| 2026-03-11 | Initial design spec created, color management added, Header component documented |
