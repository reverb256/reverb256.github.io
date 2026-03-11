# Code Conventions

## File Type Conventions

### Astro (.astro)
- Frontmatter (---) at top for imports, data, server-side code
- HTML template below frontmatter
- Use `<Layout />` wrapper for pages
- Client-side scripts in `<script>` tags (no attributes = module scope)

### TypeScript
- Strict mode enabled (extends astro/tsconfigs/strict)
- Type imports: `import type { ... } from '...'`
- Prefer explicit return types on exported functions

## CSS/Tailwind Conventions

### Color System
Uses custom CSS variables in index.astro:
- `--bg`, `--bg-elevated`, `--bg-surface` - Background layers
- `--fg`, `--fg-muted`, `--fg-subtle` - Text hierarchy
- `--accent` (#00bcd4 cyan) - Hyprland theme accent
- `--terminal-green` (#00ff41), `--terminal-amber` (#ffb000)

### Tailwind Config
Custom theme extends:
- `ink` color scale (monochromatic purple)
- `ember` color scale (warm orange accent)
- `slate` neutral scale with 850/950 shades
- `fontFamily`: sans (Inter), display (Bebas Neue), mono (Fira Code)

## Naming Conventions

### IDs/Classes
- kebab-case for CSS classes: `desktop-container`, `waybar`
- camelCase for JavaScript references: `matrixRain`, `waybarTitle`

### Data Structures
- `db` object for terminal database (subjects, categories, classifications)
- `projects` array for work section
- `skills`, `traits` arrays for about section

## JavaScript Conventions

### Event Handlers
- Use event delegation where possible
- Prefer `addEventListener` over inline handlers

### Animation (GSAP)
- Register ScrollTrigger once in Layout.astro
- Use `data-animate` attributes for declarative animations
- Animation types: `fade-up`, `fade-in`, `slide-right`
- Optional `data-delay` for stagger (ms)

### Accessibility
- Skip links at top of main content
- ARIA labels on interactive elements
- `aria-label` for icon-only buttons
- Reduced motion support in global.css

## Terminal Code Pattern
The terminal simulation uses:
1. Command database (`db` object)
2. Command parser (switch/case on trimmed input)
3. Output formatter (classification-based coloring)
4. History tracking (array + index)
5. Autocomplete (filter on Tab)

## Design Philosophy (from DESIGN_SYSTEM.md)

### Core Principles
1. **Calm Competence** - Show, don't tell
2. **Progressive Disclosure** - Minimal by default, expand on demand
3. **Non-Intrusive Guidance** - Tooltips, not modals
4. **Direct Language** - Avoid mystical/philosophical phrasing

### Tone Guidelines
- Avoid: "digital alchemist", "consciousness engineering", "reality architect"
- Use: "full-stack developer", "problem solver", "building applications"
