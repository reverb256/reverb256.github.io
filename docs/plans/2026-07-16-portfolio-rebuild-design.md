# Portfolio Rebuild: Design Document

**Date:** 2026-07-16  
**Version:** 1.0 — Design Spec (Pre-Implementation)  
**Status:** Draft for Review

---

## 1. Executive Summary

### The Subject
**Reverb256 / Jeremy Kroeker** — a self-taught infrastructure builder from Winnipeg. 15 years in food service, 20 years quietly obsessed with computers. Now runs a 4-host NixOS cluster with K3s, AI inference gateways, and sovereign Canadian data pipelines. No cloud spend. Everything self-hosted.

### The Audience
- **Primary:** Potential employers, collaborators, and clients in the AI/infrastructure space
- **Secondary:** Open-source community, Canadian tech/policy people, fellow self-hosters
- **Tertiary:** Anyone who finds the "food service → cluster builder" story compelling

### The Single Job
Make the visitor understand, within 5 seconds, that this is not another React portfolio. This is someone who builds real infrastructure and has a point of view about it.

### The Aesthetic Risk
The current site has a cool cyberpunk terminal theme that's genuinely distinctive. Most portfolios in this space look like SaaS landing pages. The risk is keeping the terminal as the *core identity* rather than a decoration — committing to it as the primary interface metaphor, not just a gimmick in the hero section.

---

## 2. Narrative Arc

The story isn't about projects. It's about a **builder's evolution**. The repos are artifacts.

```
ACT 1: The Foundation
  "15 years in food service. 20 years curious about computers."
  → Establishes the unlikely arc. Relatable, human, surprising.
  
ACT 2: The Build  
  "Crypto mining built the GPU farm. NixOS built the cluster."
  → Shows the path. Every project is a step, not a destination.
  
ACT 3: The Mission
  "Sovereign Canadian tech. No cloud. No compromise."
  → Where it's all heading. MapleSpike, Mosaic, Frostbite.
```

### Voice Guide

| Quality | Do | Don't |
|---------|----|-------|
| Irreverent but serious | "I spent 15 years serving food. Now I serve models." | "I am a full-stack developer with 5+ years experience." |
| Architect-first | Talk about *systems* — clusters, pipelines, fabrics | Lead with framework names |
| Mission-driven | "Accountability journalism is a defensive weapon." | "A news aggregator using React." |
| Self-aware | Admit stale repos, experiments, dead ends | Polish everything into a success story |
| Gaming-culture-native | COREFLAME has Anaxa's truth engine and Titan blessings | Generic "AI research project" language |

---

## 3. Page Architecture

```
reverb256.ca/
├── /                    # Landing → Terminal + narrative hook + pulse
│   ├── Hero section
│   │   ├── Interactive terminal (persistent across site?)
│   │   ├── The hook line
│   │   └── Live cluster pulse
│   ├── The Arc — scrollable narrative
│   │   ├── Phase 1: Foundation (food service → crypto mining)
│   │   ├── Phase 2: Infrastructure (NixOS → cluster)
│   │   └── Phase 3: Mission (sovereign stack)
│   └── Featured builds — 3-4 highlighted projects with personality
│
├── /craft               # What I build and why
│   ├── MapleSpike / Quill — Canada's sovereign data pipeline
│   ├── Mosaic — Sovereign social identity
│   ├── COREFLAME — Consciousness research
│   ├── Frostbite Gazette — Accountability journalism
│   ├── Astral Key — Auth sidecar
│   ├── AI Inference Gateway
│   └── ...each with: story → what → why → tech → status
│
├── /infrastructure      # The cluster (upgrade existing)
│   ├── Live stats from nixos-config
│   ├── Node topology
│   ├── Service map
│   └── Timeline
│
├── /writing             # Blog + research + manifestos
│   ├── Blog posts (existing MDX)
│   ├── COREFLAME consciousness analyses
│   ├── Frostbite Gazette manifestos
│   └── Technical writing
│
├── /now                 # Current focus (update existing)
│
├── /setup               # Gear, software, environment (update existing)
│
└── /bookmarks           # Curated links (existing)
```

---

## 4. Design System

### Color — Evolving the Base24 "Inkwell" Palette

The existing palette works. We refine, not replace.

| Role | Token | Current | Change |
|------|-------|---------|--------|
| Deepest bg | `--base00` | `#0a0c10` | Keep |
| Cardinal accent | `--base08` | `#ff6b6b` | Keep — errors, deletions, "red team" |
| **Ember accent** | `--base09` | `#ff9f5c` | **Keep as primary brand** |
| Success/growth | `--base0B` | `#4ecdc4` | Keep |
| **Consciousness accent** | `--base0D` | `#a78bfa` | **Elevate — purple for COREFLAME/consciousness content** |
| Glass surface | `--glass-bg` | rgba(30,36,48,0.7) | Keep |
| Glow | `--glow-color` | rgba(255,159,92,0.4) | Keep |

**New additions:**
- `--accent-cardinal: var(--base08)` — For Frostbite Gazette's "red team / defensive" branding
- `--accent-consciousness: var(--base0D)` — For COREFLAME's purple/indigo identity
- `--accent-maple: #d4a843` — Gold/amber for MapleSpike's Canadian identity

### Typography

| Role | Face | Size | Weight |
|------|------|------|--------|
| Hero / Display | Bebas Neue | `clamp(3rem, 10vw, 8rem)` | 700 |
| Section heads | Bebas Neue | `2.5rem` | 700 |
| Subheads / Craft names | Inter | `1.25rem` | 600 |
| Body | Inter | `1rem` | 400 |
| Small / metadata | Inter | `0.875rem` | 400 |
| Code / terminal | Fira Code | `0.875rem` | 400 |

No changes from current. The Bebas Neue + Inter + Fira Code trio is distinctive and fits the identity.

### Layout

- **Max content width:** 1280px (unchanged)
- **Grid:** Currently 4-col bento. Evolve to responsive 4/2/1 column with narrative card sizes
- **Section padding:** `py-24` (96px) sections, `py-16` (64px) for secondary
- **Spacing:** 4px base unit (unchanged)

### Components

| Component | Design | Notes |
|-----------|--------|-------|
| **Terminal** | Full interactive terminal, persistent header element | The signature — commit to it |
| **Story Cards** | Larger, narrative-first project cards with phase badges | Not metric-driven, story-driven |
| **Phase Tracker** | Visual timeline of the 3-act arc on homepage | Animated scroll-through |
| **Cluster Pulse** | Live-readout strip showing node status | Pulls from real data |
| **Glass Cards** | Existing glassmorphism cards | Refine hover states with apple-design principles |
| **Header** | Thin, translucent, backdrop-blur | Current design works, refine active states |

### The Signature Element

**The terminal.** Not just a hero gimmick — make it a persistent interface layer that runs throughout the site. The terminal in the hero responds to commands, but the terminal frame itself (the CRT overlay, the Fira Code text, the prompt character) becomes a visual motif that appears in:
- Section headers rendered as command outputs
- Cluster stats displayed as `systemctl status` output
- Project descriptions structured like man pages
- Error states rendered as kernel panics

This is the single memorable thing. The risk is that it's already partially implemented — the commitment is to go *further*, not abandon it.

---

## 5. Motion & Interaction

Based on the installed skills (emil-design-eng, apple-design, animation-vocabulary):

| Principle | Implementation | Timing |
|-----------|---------------|--------|
| Press feedback | `:active { transform: scale(0.97) }` | 160ms ease-out |
| Card hover | `translateY(-4px)` + glow | 300ms ease-out |
| Scroll reveals | `data-animate` with GSAP | 600ms ease-out, from `top 85%` |
| Stagger | Items enter 50ms apart | 50ms stagger |
| Spring physics | For interactive gestures | `{ type: "spring", duration: 0.5, bounce: 0.2 }` |
| No `scale(0)` | All entrances from `scale(0.95)` + opacity | Already done ✅ |
| Reduced motion | Cross-fade replaces slide | Already done ✅ |
| Hover media query | `@media (hover: hover) and (pointer: fine)` | Already done ✅ |

**New motion to add:**
- **Phase tracker scroll animation** — The 3-act narrative scrolls with parallax-like depth between phases
- **Cluster pulse data refresh** — Subtle pulse animation when live stats update
- **Terminal command typing effect** — Any command-like text on the site types in, doesn't just appear

---

## 6. Content Map — Page by Page

### Landing (`/`)

```
HERO:
  > Who:   Jeremy Kroeker
  > Does:  Infrastructure builder. Cluster operator. Citizen developer.
  > Voice: "15 years in food service. Now I run 4 NixOS nodes."
  
  Terminal prompt below or beside — interactive, accepting commands
  
THE ARC (scroll):
  PHASE 1 — Foundation (1995–2025)
    "IBM 486. DOS Shell. GameCube DNS exploits. Crypto mining GPU farm.
     15 years of food service while the obsession never stopped."
  
  PHASE 2 — Infrastructure (2025–2026: The Year of NixOS)
    "Killed Windows. Went full NixOS. 4 hosts, Colmena, K3s.
     AI Inference Gateway. Knowledge Fabric. MCP Registry.
     Every service self-hosted. Zero cloud spend."
  
  PHASE 3 — Mission (Now)
    "MapleSpike — Canada's sovereign data pipeline.
     Mosaic — Sovereign social identity.
     Frostbite Gazette — Accountability journalism.
     COREFLAME — AI consciousness through character psychology."
  
FEATURED BUILDS:
  [MapleSpike] [Mosaic] [COREFLAME] [Frostbite Gazette]
  (4 cards with story, not just tech tags)

LIVE PULSE:
  Cluster: 4/4 nodes online
  Uptime: -- days
  Services: -- running
  [Link to /infrastructure]
```

### Craft (`/craft`)

Each project gets a narrative page (or section) structured:

```
[Project Name]
  Phase: [Current / Active / Stale / Archived]
  
  THE STORY
    How this project came to be. What problem it solves.
    Why it matters to me personally.
  
  WHAT IT IS
    One-paragraph elevator pitch.
    Architecture: diagram or text description.
    Stack: languages, tools, infrastructure.
  
  WHY IT MATTERS
    The mission angle. The values behind it.
    For MapleSpike: "Canadian government data should be
    accessible, auditable, and independent."
    For Frostbite: "Cognitive warfare is real. This is the shield."
    For COREFLAME: "Character consciousness as AI training data."
  
  STATUS
    Active development / Live in production / Experiment completed
    GitHub link
    Live demo link (if applicable)
```

### Infrastructure (`/infrastructure`)

Upgrade the existing page:
- Pull node configs from the real nixos-config repo
- Show 4 nodes (zephyr, sentry, nexus, forge) with live status
- Service map showing what runs where
- Timeline (already exists — update from real git history)
- Code explorer (already exists — connect to real files)

### Writing (`/writing`)

Rename from "Blog" to better match the voice:
- Blog posts (existing MDX — the 4 posts)
- COREFLAME consciousness analyses (link to the 221+ analyses)
- Frostbite Gazette manifestos (the manifesto, Trivium methodology)
- Technical writing (any design docs worth publishing)

### Now (`/now`), Setup (`/setup`), Bookmarks (`/bookmarks`)

Keep existing pages. Update content to match voice.

---

## 7. Implementation Phasing

| Phase | What | Effort |
|-------|------|--------|
| **1** | Design system refinements (improve easings, press feedback, stagger entrances across existing components) | 1 session |
| **2** | Homepage rebuild — new hero with stronger hook, the 3-act narrative scroll, featured builds section | 2 sessions |
| **3** | /craft page — narrative project cards for MapleSpike, Mosaic, COREFLAME, Frostbite Gazette | 3 sessions |
| **4** | Infrastructure page upgrade — pull live data structure, refine visuals | 1 session |
| **5** | Navigation and global polish — new header active states, consistent voice, writing page rename | 1 session |
| **6** | COREFLAME and Frostbite Gazette dedicated pages (deeper dives with their own sub-pages) | 2-3 sessions |
| **7** | Final polish — animation audit, responsive testing, performance, accessibility | 1 session |

---

## 8. Open Questions for the User

1. **Terminal persistence** — Should the terminal be a hero-only feature, or a persistent UI element (collapsible footer bar / slide-out panel) across the whole site?
2. **Phase distinction for projects** — How to handle stale/archived repos? "Experiment completed" badge vs simply not listing them?
3. **Live data** — Do you want the cluster pulse to actually hit your live gateway endpoints, or use static data from the nixos-config repo?
4. **COREFLAME depth** — A full sub-page with the 7-pillar methodology, character browser, and consciousness agent grid? Or a single project card?
5. **Writing vs Blog** — Rename the section? Keep "/blog" as URL but call it "/writing" in the nav?
6. **WHOIS privacy** — Want me to walk through enabling it on Namecheap?
