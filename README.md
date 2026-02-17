# Reverb256 Portfolio

**[reverb256.ca](https://reverb256.ca)** — Full-stack developer portfolio with AI consciousness integration.

## Quick Start

```bash
# Enter NixOS dev environment
nix develop

# Install dependencies
npm ci

# Start dev server (port 5173)
npm run dev

# Build for production
npm run build:static

# Preview production build
npm run preview
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui |
| Backend | Node.js, Express (dev server only) |
| State | TanStack Query |
| Mobile | React Native (see `/mobile`) |
| Deploy | GitHub Pages |
| CI/CD | GitHub Actions |
| Dev Env | NixOS (flake.nix) |

## Project Structure

```
├── client/src/
│   ├── components/     # UI components
│   │   └── ui/        # shadcn/ui primitives
│   ├── pages/         # Route pages
│   ├── App.tsx        # Root component
│   └── main.tsx       # Entry point
├── server/            # Dev server (not deployed)
├── mobile/            # React Native app
├── .github/workflows/ # GitHub Pages CI/CD
├── flake.nix          # NixOS dev environment
└── vite.config.static.ts
```

## Deployment

Push to `main` triggers automatic deployment to GitHub Pages via GitHub Actions.

**Custom domain:** reverb256.ca (CNAME file)

## Features

- Dark glassmorphic theme with quantum gradients
- Real-time API integration (consciousness metrics, system health)
- Mobile-first responsive design
- WCAG AAA accessibility compliance
- 60fps animations with Framer Motion

## Project Highlights

### QuantumRhythm
Multi-chain trading & forensic analysis platform with AI-powered insights.

### AstralVibe.ca
Personal AI agent running on Proxmox cluster with FOSS-first philosophy.

### Local-Cleaning-Service
PWA with advanced accessibility and AI orchestration.

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/consciousness-live` | Real-time consciousness metrics |
| `/api/system-health` | Server health and memory stats |
| `/api/projects` | Dynamic project information |
| `/api/health` | System health check |

## Development

For AI coding agents (OpenCode, Qwen, etc.), see [AGENTS.md](./AGENTS.md) for:
- Build/lint commands
- Code style guidelines
- Path aliases
- Anti-patterns

## License

MIT
