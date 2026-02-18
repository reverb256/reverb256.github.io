# Astro Portfolio Knowledge Base

**Repository:** reverb256.github.io → astro-portfolio
**Runtime:** Astro.js 5.17.1 with static site generation

---

## OVERVIEW
Alternative portfolio using Astro.js with static generation, GSAP animations, and Base24-compliant theming.

---

## STRUCTURE

```
astro-portfolio/
├── src/
│   ├── pages/         # Route-based .astro files
│   ├── layouts/       # GSAP-powered layouts
│   └── styles/        # Base24 global.css
├── public/            # Static assets
├── dist/              # Static build output
├── astro.config.mjs   # Output: static + manual chunks
└── tailwind.config.mjs # Custom ink/ember colors + bento grid
```

---

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Main page | `src/pages/index.astro` | Frontmatter + template + client scripts |
| Layout | `src/layouts/Layout.astro` | GSAP ScrollTrigger integration |
| Theme | `src/styles/global.css` | Base24 "Inkwell" color system |
| Build output | `dist/` | Static site generation |

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
  <div class="glass">{db.items.map(i => <span>{i}</span>)}</div>
</Layout>
<script define:vars={{ db }}>console.log(db);</script>
```

### GSAP Animations (vs Framer Motion)
```javascript
gsap.from(el, { y: 40, opacity: 0, scrollTrigger: { start: "top 85%" } });
```

### Color System (Base24 Inkwell)
```css
color: var(--base07); background: var(--glass-bg); --accent-primary: var(--base09);
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
