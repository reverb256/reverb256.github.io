# Reverb256 Design System v2 — 16-Theme Retro Gaming Site

**Date:** 2026-05-09
**Status:** Approved
**Approach:** A (Song Select) — full structural themes per game/console

## Overview

Complete redesign of reverb256.ca (Astro static site) with 16 switchable retro gaming/computing themes. Each theme recreates the UI of a specific game, console, or computing era. Users pick their theme via a global picker; choice persists in localStorage. Every page respects the active theme.

Deployed to Cloudflare Pages, GitHub Pages, and Neocities (reverb256.neocities.org).

## Theme Roster (16)

### DDR (3)
| Theme | Layout | Visual style |
|-------|--------|-------------|
| DDR 3rd Mix | Jukebox list (vertical scrolling) | Black bg, neon arrows (blue/pink/green), PS1-era pixel aesthetic, character portraits |
| DDR MAX | Vertical song wheel (right side) | Dark bg, color-coded songs (green/blue/yellow), Groove Radar, BPM display |
| DDR Extreme | Horizontal metallic wheel (center) | Dark green radial gradient tunnel, metallic carousel, neon glow (yellow/cyan), Marvelous flash |

### beatmania (6)
| Theme | Layout | Visual style |
|-------|--------|-------------|
| beatmania 5th Mix | 5-key DJ cabinet, flat list | Dark bg, vinyl record aesthetic, records in a crate, DJ crossfader, Level 1-7 |
| IIDX 7th Style | 7-key folder list | Early golden era UI, 7-column grid, difficulty tiers, grade display (AAA-F), turntable accent |
| IIDX 10th Style | Named-themed list | Themed release aesthetic, song list with difficulty ratings, folder navigation |
| IIDX GOLD | Gold navigator | Gold/amber primary, compass aesthetic, gold-trimmed cards, dark bg with gold gradients |
| IIDX PENDUAL | Past/Future toggle (dual mode) | Sepia/warm (Past) and cool/blue (Future), time duality, sections differ per mode |
| IIDX RESIDENT | Dark modern grid | Monochrome with accents, flat design, minimal ornamentation, sleek cards |

### Nintendo (3)
| Theme | Layout | Visual style |
|-------|--------|-------------|
| N64 | Boot menu + 3D icons | Boot sequence animation, controller button palette (A=blue, B=green, Start=red, C=yellow), star select |
| GameCube | Cube spin menu | Indigo primary, spice orange accent, cube spin animation, memory card slots, wavebird colors |
| DS | Dual-screen layout | Top: nav/status, Bottom: content, touch-style buttons, white/light bg, clamshell motif |

### Computer (4)
| Theme | Layout | Visual style |
|-------|--------|-------------|
| Win95 | Desktop + taskbar + windows | 3D beveled borders, teal (#008080), navy (#000080), taskbar, desktop icons, system fonts |
| WinXP | Luna blue + Bliss | Green Start button, Luna blue title bar gradient, Bliss sky/hill bg, XP window chrome |
| DOS Games | EGA/VGA pixel art | EGA 16-color palette, Commander Keen pogo, Duke Nukem HUD, C&C sidebar, DOS boot sequence |
| Linux Tiling WM | i3/bspwm grid + status bar | Gruvbox Dark, JetBrains Mono, tiling grid with gaps, status bar with workspace tags, zero border-radius |

## Pages (7)

- `/` — Home/About
- `/cluster` — Infrastructure (k3s, 4 nodes)
- `/projects` — Portfolio work
- `/services` — Self-hosted services
- `/builds` — Hardware/software builds
- `/writes` — Blog (Astro Content Collections)
- `/links` — Social, GitHub, contact

## Navigation Mapping

Each franchise maps site sections to its native UI paradigm:

- **DDR:** Sections are "songs" on the wheel/list. Active section gets judgment flash. BPM counter in corner.
- **IIDX:** Sections are folders/songs. Difficulty tier colors indicate section type (BEGINNER=about, NORMAL=projects, HYPER=cluster, ANOTHER=services, LEGGENDARIA=builds). EX SCORE = visitor count.
- **Nintendo:** Sections are menu items (N64 boot icons, GameCube cube faces, DS touch buttons).
- **Computer:** Win95/XP sections are desktop icons opening windows. DOS Games sections are C&C sidebar items. Linux sections are workspace tiles.

## CSS Architecture

```
src/styles/
  tokens-retro.css          # Shared base tokens (font families, spacing scale)
  components-retro.css      # Shared components (88x31, counter, webring, badges, CRT)
  themes/
    ddr-3rd.css             # DDR 3rd Mix — all tokens + layout + components
    ddr-max.css             # DDR MAX
    ddr-extreme.css         # DDR Extreme
    bm-5th.css              # beatmania 5th Mix
    iidx-7th.css            # IIDX 7th Style
    iidx-10th.css           # IIDX 10th Style
    iidx-gold.css           # IIDX GOLD
    iidx-pendual.css        # IIDX PENDUAL
    iidx-resident.css       # IIDX RESIDENT
    n64.css                 # Nintendo 64
    gamecube.css            # GameCube
    ds.css                  # Nintendo DS
    win95.css               # Windows 95
    winxp.css               # Windows XP
    dos-games.css           # MS-DOS Games (Commander Keen, Duke Nukem, C&C, Jill)
    linux-wm.css            # Linux Tiling WM (Gruvbox + i3/bspwm)
```

Each theme file is self-contained: `[data-theme="ddr-extreme"] { ... }` wraps all tokens, layout rules, and component overrides. All 16 loaded at build time (static site — no runtime CSS cost).

## Theme Switcher

- Floating pill widget, bottom-right corner
- Franchise icons (music note, controller, monitor) open sub-menus
- Persisted to `localStorage` via inline vanilla JS
- Default theme: **DDR Extreme**
- No page reload — instant swap via `data-theme` attribute change on `<body>`

## Theme Switcher UX

```
[DDR]  [IIDX]  [Nintendo]  [Computer]
```

Each dropdown shows the franchise variants. Selected theme gets a highlight. Franchise icon shows current theme's franchise.

## DOS Games Theme Specifics

EGA/VGA pixel art aesthetic drawing from:
- **Commander Keen:** Pogo bounce animation, Vorticon-style pixel borders, Keen helmet icon
- **Duke Nukem:** Gritty font, HUD-style section headers, action bar
- **Command & Conquer:** Sidebar navigation (build sidebar metaphor), minimap-style footer, EVA-style status readout
- **Jill of the Jungle:** Lush green vine borders, tropical accent colors
- **Boot sequence:** DOS prompt → autoexec.bat → game launch
- **Extra:** CGA/EGA/VGA mode toggle (changes color palette depth)

## WinXP Theme Specifics

- Luna blue window title bars with gradient
- Green Start button (opens nav menu)
- Bliss-style blue sky / green hills gradient background
- XP taskbar with clock, system tray
- Window chrome: red close, yellow minimize, green maximize buttons
- Tahoma/Segoe UI font stack, ClearType smooth feel
- Classic XP error/info/warning icons for status indicators

## Shared Components (all themes)

From `components-retro.css`, inherit theme colors:
- 88x31 buttons
- Visitor counter
- Webring navigation
- Changelog / update log
- Badges (NEW!, BETA, LV.XX, BEST VIEWED)
- Under construction banner
- CRT effects (scanlines, VHS glitch, phosphor tint)

## Technical Stack

- **Framework:** Astro (zero JS frameworks, `.astro` templates only)
- **Theme switching:** Inline `<script>` (vanilla JS), sets `data-theme` on `<body>`, saves to `localStorage`
- **CSS:** 16 theme files + tokens-retro.css + components-retro.css, all loaded at build time
- **Fonts:** Google Fonts (Anton, Bebas Neue, Exo 2, Fira Code, Inter, Orbitron, Oswald, Press Start 2P, VT323, JetBrains Mono)
- **Deployment:** Cloudflare Pages + GitHub Pages + Neocities
- **Responsive:** Desktop-first (authentic to source material), mobile-responsive where feasible

## Key Differences from v1 (6-theme system)

- 16 themes (was 6)
- Per-page fixed mapping removed — all themes global
- Full structural layouts per theme (was color/font swaps only)
- Theme files moved to `src/styles/themes/` directory
- Theme switcher upgraded from per-page to global floating widget
- PENDUAL dual-mode is unique interactive theme variant
- DOS Games and WinXP added to Computer franchise
