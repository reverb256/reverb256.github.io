# PROJECT KNOWLEDGE BASE

**Repository:** reverb256.github.io
**Target:** GitHub Pages (reverb256.ca)
**Environment:** NixOS
**Development:** AI TUIs (OpenCode, Qwen)

---

## QUICK START

```bash
# Enter development environment
nix develop

# Install dependencies (first time or after lockfile changes)
npm ci

# Start dev server
npm run dev

# Build for production
npm run build:static

# Preview production build
npm run preview
```

---

## BUILD COMMANDS

| Command | Description |
|---------|-------------|
| `nix develop` | Enter Nix dev shell with Node 20 + tools |
| `npm run dev` | Dev server on port 5173 |
| `npm run build:static` | Build static site → `dist-static/` |
| `npm run preview` | Preview built site locally |
| `npm run lint` | ESLint check |

---

## PROJECT STRUCTURE

```
reverb256.github.io/
├── client/src/
│   ├── components/     # React components
│   │   └── ui/        # shadcn/ui primitives
│   ├── pages/         # Route pages
│   ├── App.tsx        # Root with providers
│   └── main.tsx       # Entry point
├── server/            # Dev server only (not deployed)
├── .github/workflows/ # GitHub Pages CI/CD
├── flake.nix          # NixOS dev environment
└── vite.config.static.ts  # Production build config
```

---

## CODE STYLE

### TypeScript

```typescript
// Props interface
interface CardProps {
  title: string;
  description?: string;
}

// Functional component
const Card: React.FC<CardProps> = ({ title, description }) => (
  <article>...</article>
);

// Page component (default export)
export default function Index() { ... }

// Utility component (named export)
export default Navbar;
```

### Imports

```typescript
import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
```

### Styling

```tsx
// Tailwind + CSS variables
<div className="min-h-screen bg-black" style={{ color: "var(--brand-primary)" }}>

// BEM-like classes
<span className="status-badge status-badge--production">
```

### Naming

| Type | Convention |
|------|------------|
| Components | `PascalCase.tsx` |
| Utilities | `camelCase.ts` |
| CSS classes | `kebab-case` |
| CSS variables | `--brand-primary` |

---

## PATH ALIASES

```
@/*      → client/src/*
@shared/* → shared/*
```

---

## DEPLOYMENT

**Automatic:** Push to `main` → GitHub Actions builds and deploys to GitHub Pages.

**Manual trigger:** Actions tab → "Deploy to GitHub Pages" → "Run workflow"

**Custom domain:** CNAME file contains `reverb256.ca`

---

## AI TUI WORKFLOW

When working with OpenCode/Qwen:

1. **Always** run `nix develop` first to ensure correct Node version
2. **Always** verify build before committing: `npm run build:static`
3. **Always** check diagnostics: `lsp_diagnostics` on changed files
4. **Never** commit without user request
5. **Never** use `as any` or `@ts-ignore`

---

## ANTI-PATTERNS

- NO `as any` / `@ts-ignore`
- NO empty catch blocks
- NO hardcoded data in components (use /api/* endpoints)
- NO server code in static build

---

## TECH STACK

| Layer | Tech |
|-------|------|
| Frontend | React 18, TypeScript, Vite |
| Styling | Tailwind CSS, shadcn/ui |
| Dev Env | NixOS (flake.nix) |
| Deploy | GitHub Pages |
| CI/CD | GitHub Actions |
