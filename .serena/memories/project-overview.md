# Project Overview: reverb256.github.io

**Purpose:** Personal portfolio website deployed at reverb256.ca

## Tech Stack

### Core Framework
- **Bun** - Fast JavaScript runtime and package manager (replaces npm)
- **Astro 5.17** - Static site generator with React integration
- **TypeScript** - Strict type checking (extends astro/tsconfigs/strict)

### Frontend Dependencies
- **PixiJS 8.16** - GPU-accelerated Matrix rain wallpaper
- **xterm.js 6.0** - Real terminal emulator with ANSI colors
- **interact.js 1.10** - Draggable/resizable windows
- **Howler.js 2.2** - Sound effects for UI interactions
- **GSAP 3.14** - Scroll-triggered animations (ScrollTrigger registered in Layout.astro)
- **Lenis** - Smooth scrolling
- **React 19** - Component framework via @astrojs/react
- **Tailwind 3.4** - Utility-first CSS framework

### Testing
- **Playwright 1.57.0** - E2E testing (pinned for NixOS browser compatibility)
- Tests run against `npm run preview` (production build)

## Project Structure

```
astro-portfolio/
├── src/
│   ├── pages/
│   │   └── index.astro         # Single-page app with terminal logic
│   ├── layouts/
│   │   └── Layout.astro        # Minimal base layout with GSAP setup
│   └── styles/
│       └── global.css          # Base styles and reduced motion
├── public/                     # Static assets
├── tests/                      # Playwright E2E tests
├── dist/                       # Build output (gitignored)
└── package.json                # Dependencies and scripts
```

## Key Features

### Hero: Hyprland Desktop Simulation
- PixiJS GPU-accelerated Matrix rain
- xterm.js terminal emulator with boot sequence
- interact.js window management (draggable/resizable)
- Waybar top bar with workspaces, window title, tray icons, live clock
- Window decorations with close/minimize/maximize buttons
- Window focus system with cyan border glow

### Terminal Commands
- `help`, `list`, `read [ID]`, `random`, `search [q]`, `clear`
- `matrix`, `about`, `neofetch`, `whoami`, `uname`, `ls`, `history`
- `echo`, `cat`, `pwd`
- Autocomplete via Tab key, command history via arrow keys

### Classification Colors
- TOP SECRET (red), RESTRICTED (orange), INTERNAL (teal), PUBLIC (green)

### Animation System (GSAP)
- Elements use `data-animate="fade-up|fade-in|slide-right"` attributes
- Optional `data-delay` for staggered entry
- ScrollTrigger starts animations at 85% viewport

### Page Sections
1. Hero (Hyprland desktop)
2. Work (Project cards grid)
3. About (Two-column: content + sidebar)
4. Contact (Email + GitHub CTAs)
