# Unified Design System Specification

**Version:** 1.0.0
**Purpose:** Reusable design system for portfolio and business websites
**Target:** Static sites deployed to GitHub Pages, built with React + Tailwind

---

## Design Philosophy

### Core Principles

1. **Calm Competence** - Show, don't tell. Let work speak for itself.
2. **Progressive Disclosure** - Minimal by default, expand on demand.
3. **Non-Intrusive Guidance** - Tooltips and highlights, never blocking modals.
4. **Generous Space** - Breathing room between content clusters.
5. **Consistent Motion** - Standardized animation timing across all interactions.

### Tone Guidelines ("Harsh Reality" Softening)

| Instead of... | Write... |
|---------------|----------|
| "Revolutionary consciousness-driven development" | "Full-stack development with AI integration" |
| "Digital alchemist bridging ancient wisdom" | "Developer focused on practical solutions" |
| "Architecting digital realms of quantum innovation" | "Building scalable web applications" |
| "Weaving consciousness into code" | "Writing clean, maintainable code" |
| "Consciousness Engineer, Reality Architect" | "Developer, Problem Solver" |

**Rule:** Remove mystical/philosophical language. Be direct. Be humble.

---

## Color System

### Base Palette (Dark Theme)

```css
:root {
  /* Backgrounds */
  --bg-primary: #0a0a0a;
  --bg-secondary: #121212;
  --bg-glass: rgba(18, 18, 18, 0.7);
  
  /* Text */
  --text-primary: #ffffff;
  --text-secondary: #a0a0a0;
  --text-muted: #666666;
  
  /* Brand Colors */
  --brand-primary: #ff6b6b;     /* Coral - primary actions */
  --brand-secondary: #4ecdc4;   /* Teal - secondary actions */
  --brand-accent: #ffd93d;      /* Gold - highlights */
  
  /* Glass Effects */
  --glass-blur: 16px;
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-radius: 16px;
}
```

### Alternative Palettes

**Professional (Business Sites)**
```css
--brand-primary: #00BCD4;    /* Cyan */
--brand-secondary: #009688;  /* Teal */
--brand-accent: #A4D65E;     /* Green */
```

**Jewelry/E-commerce**
```css
--brand-primary: #2F8B8B;    /* Turquoise */
--brand-secondary: #B8860B;  /* Gold */
--brand-accent: #C0C0C0;     /* Silver */
```

---

## Typography

```css
:root {
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'Fira Code', monospace;
  
  /* Scale */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.5rem;
  --text-2xl: 2rem;
  --text-3xl: 2.5rem;
  --text-4xl: 3rem;
}
```

**Headings:** Bold, short, direct
**Body:** 1.6 line-height, max 65ch width
**Labels:** Uppercase, letter-spacing 0.05em

---

## Spacing System

```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-24: 6rem;     /* 96px */
}
```

**Section padding:** `--space-16` to `--space-24`
**Card padding:** `--space-6`
**Element gaps:** `--space-4` to `--space-6`

---

## Animation Standards

### Timing Scale

```typescript
const timing = {
  instant: 0.1,   // Tap/click feedback
  quick: 0.2,     // Hover states
  standard: 0.4,  // Content reveals
  slow: 0.8,      // Page transitions
  dramatic: 1.5   // Special moments (rare)
};
```

### Motion Patterns

**1. Fade Up (Content Reveal)**
```tsx
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' }
};
```

**2. Scale on Hover (Cards)**
```tsx
const cardHover = {
  whileHover: { y: -4, scale: 1.02 },
  transition: { type: 'spring', stiffness: 300 }
};
```

**3. Pulsing Highlight (New Features)**
```tsx
const pulseHighlight = {
  animate: {
    boxShadow: ['0 0 0 0 rgba(255,107,107,0.4)', '0 0 0 10px rgba(255,107,107,0)']
  },
  transition: { duration: 2, repeat: Infinity }
};
```

**4. Staggered Children**
```tsx
const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};
const staggerChild = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};
```

---

## Component Patterns

### Glass Card

```tsx
<div className="bg-[rgba(18,18,18,0.7)] backdrop-blur-xl border border-white/10 rounded-2xl p-6
                transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
  {children}
</div>
```

### Non-Intrusive Tooltip

```tsx
// Position near element, don't block main content
<div className="relative inline-block">
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="absolute -top-12 left-1/2 -translate-x-1/2
               bg-slate-900/95 backdrop-blur px-3 py-2 rounded-lg
               text-sm text-slate-300 whitespace-nowrap"
  >
    {message}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 
                    w-2 h-2 bg-slate-900/95" />
  </motion.div>
  {trigger}
</div>
```

### Progressive Disclosure Card

```tsx
// Minimal by default, expand on hover
<div className="group">
  {/* Always visible */}
  <h3>{title}</h3>
  <p className="line-clamp-2">{description}</p>
  
  {/* Revealed on hover */}
  <div className="hidden group-hover:block mt-4 pt-4 border-t border-slate-700">
    <TechStack tags={tech} />
    <Links links={links} />
  </div>
</div>
```

### Status Badge

```tsx
// Consistent status indicators
const statusStyles = {
  live: 'bg-green-500/20 text-green-400 border-green-500/30',
  active: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  development: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  research: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
};

<span className={`px-2 py-1 text-xs rounded-full border ${statusStyles[status]}`}>
  {status}
</span>
```

---

## Layout Patterns

### Hero Section

```tsx
// Full viewport, centered content
<section className="min-h-screen flex items-center justify-center px-6">
  <div className="max-w-4xl text-center">
    <h1 className="text-6xl md:text-8xl font-bold mb-6">{name}</h1>
    <p className="text-xl md:text-2xl text-slate-400 mb-8">{tagline}</p>
    <div className="flex gap-4 justify-center">
      <Button primary>View Work</Button>
      <Button secondary>Contact</Button>
    </div>
  </div>
</section>
```

### Project Grid

```tsx
// Responsive grid with consistent gaps
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {projects.map(project => (
    <ProjectCard key={project.id} {...project} />
  ))}
</div>
```

### Section Divider

```tsx
// Subtle visual separation
<div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-16" />
```

---

## Accessibility Requirements

1. **Contrast Ratios:** WCAG AAA (7:1 for text)
2. **Focus States:** Visible outline on all interactive elements
3. **Reduced Motion:** Respect `prefers-reduced-motion`
4. **Skip Links:** Allow keyboard users to skip navigation
5. **Semantic HTML:** Use proper heading hierarchy, landmarks, ARIA labels

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Hoyoverse-Inspired Interactions

### Tooltip with Pulsing Highlight
- Non-intrusive positioning
- Single short sentence
- Pulsing border animation
- No blocking modals

### Secondary Motion Polish
- Small geometric shapes (dots, particles)
- Subtle, non-distracting
- Synced with primary animation
- Uses brand colors at 20-30% opacity

### Anticipatory Sequencing
- Staged animation reveals
- Build slight suspense before content
- Clear visual cues at each stage

---

## Implementation Checklist

When building a new page:

- [ ] Colors use CSS variables from system
- [ ] Spacing follows scale (4px increments)
- [ ] Animations use defined timing constants
- [ ] Content is minimal by default
- [ ] Tooltips are non-blocking
- [ ] Focus states are visible
- [ ] Reduced motion is respected
- [ ] Language is direct, not flowery

---

## File Structure

```
client/src/
├── styles/
│   ├── design-tokens.css    # CSS variables
│   ├── animations.css       # Keyframes
│   └── components.css       # Reusable patterns
├── components/
│   ├── ui/                  # shadcn/ui primitives
│   ├── GlassCard.tsx
│   ├── Tooltip.tsx
│   └── Badge.tsx
└── pages/
    └── Index.tsx            # Main page
```

---

## Quick Reference

**Card:** `bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-2xl p-6`
**Button Primary:** `bg-brand-primary text-white px-6 py-3 rounded-lg font-medium`
**Button Secondary:** `border border-slate-600 text-slate-300 px-6 py-3 rounded-lg`
**Section:** `py-16 md:py-24 px-6`
**Container:** `max-w-6xl mx-auto`
**Text Muted:** `text-slate-400`
**Divider:** `h-px bg-gradient-to-r from-transparent via-white/10 to-transparent`
