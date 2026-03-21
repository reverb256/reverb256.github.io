# Interactive Infrastructure Journey - Design Document

**Date:** 2026-03-21
**Status:** Approved
**Author:** Claude (with reverb256)

## Overview

Create a high-impact, scroll-telling experience showcasing the 4-host NixOS cluster with AI-powered monitoring and privacy-first local inference. The page tells the complete story from Windows elimination through NixOS mastery to production Kubernetes cluster with Akash provider.

## Goals

1. **Technical Innovation** - Showcase NFS-based config sync, profile system, custom modules
2. **Operational Excellence** - Demonstrate automation, monitoring, K8s migration
3. **Full-Stack Capabilities** - End-to-end from hardware profiles to AI services to K8s
4. **Timeline Visualization** - Evolution from Windows → Omarchy → CachyOS → NixOS

## Architecture

### Page Structure

```
/infrastructure
├── Hero Section (100vh)
│   ├── 3D Cluster Visualization (center)
│   ├── Floating Stats (around cluster)
│   └── Scroll Indicator
├── Introduction (glass panel)
├── Technical Innovation (3 sections)
├── Operational Excellence (3 sections)
├── Full-Stack Capabilities (3 sections)
├── Timeline (vertical scroll)
└── Interactive Code Explorer
```

### Visual Elements

- **3D Cluster Visualization**: Four nodes in 3D space (Zephyr top, Nexus right, Forge left, Sentry bottom) with particle connections representing NFS/data flow
- **Glass Morphism Cards**: Existing `.glass` design system
- **Parallax Background**: Grid pattern moving at different speeds during scroll
- **Floating Particles**: GSAP-controlled particles flowing between nodes

## Content Sections

### Hero Section (100vh)

**Layout:**
```
┌─────────────────────────────────────────────┐
│  [3D Cluster Visualization - Centered]      │
│                                              │
│    Zephyr ──particles── Nexus               │
│         \             /                      │
│          particles                          │
│         /             \                      │
│    Sentry ──particles── Forge               │
│                                              │
│  Floating Stats Cards:                      │
│  • 4 Hosts • 5 GPUs • 40+ Pods              │
│  • Akash Provider • 0 Leases                │
│  • Istio Service Mesh • Volcano Scheduler   │
│  • 2.2TB Storage • Multi-Cloud Ready       │
│                                              │
│  ↓ Scroll to explore                        │
└─────────────────────────────────────────────┘
```

**Content:**
- Headline: "Living Infrastructure"
- Subtext: "A 4-host NixOS cluster with AI-powered monitoring and privacy-first local inference"
- Stats pulse with GSAP
- Nodes slowly rotate in 3D space
- Particles flow between nodes (NFS sync visualization)

### Introduction Panel

**Glass card with:**
- Problem: "How do you manage a 4-host cluster without config drift?"
- Solution: "NFS-based single source of truth + declarative profiles"
- Quick stats: "78 cores, 123GB RAM, 7 GPUs, 8.4TB storage"

### Technical Innovation (3 glass cards)

**Card 1: NFS Config Sync**
```
┌─────────────────────────────────────┐
│ 🔗 Single Source of Truth           │
├─────────────────────────────────────┤
│                                     │
│  Zephyr exports /etc/nixos via NFS  │
│  Remote hosts mount read-only       │
│  Changes visible instantly          │
│  Zero config drift                  │
│                                     │
│ [Diagram: Zephyr → NFS → 3 nodes]   │
└─────────────────────────────────────┘
```

**Card 2: Profile System**
- Hardware profiles: `amd.zen`, `nvidia.multiGpu`, `amdgpu.enable`
- Role profiles: `workstation`, `mining`, `aiInference`, `vr`
- Network profiles: `tailscale.advertiseRoutes`

**Card 3: Custom Modules**
- AI Inference Gateway (OpenAI-compatible API)
- NixOS-share (NFS server/client)
- GPU scheduler (mining/K8s/gaming marketplace)

### Operational Excellence (3 glass cards)

**Card 1: Automation**
- 50+ Justfile commands
- Examples: `nswitch`, `ndeploy`, `nhealth`
- Auto-pause mining during rebuilds

**Card 2: Service Mesh**
- Istio service mesh deployed
- Volcano batch scheduler
- NGINX ingress controller
- mTLS and traffic management

**Card 3: Monitoring Stack**
- Prometheus + Grafana
- GPU exporters (NVIDIA/AMD)
- Qdrant vector DB monitoring

### Full-Stack Capabilities (3 glass cards)

**Card 1: Hardware Profiles**
- CPU: Zen 1/2/3, Coffee Lake tuning
- GPU: 5× NVIDIA (RTX 3060 Ti ×2, RTX 3090 ×1, RTX 4060 ×2)
- Storage: beta2 (HDD), beta3 (NVMe), ram

**Card 2: AI/ML Services**
- n8n workflow automation
- Qdrant vector database
- PostgreSQL + Redis
- Grafana dashboards

**Card 3: Akash Provider**
```
┌─────────────────────────────────────────┐
│ 🌐 Decentralized Cloud Provider         │
├─────────────────────────────────────────┤
│ GPU Capacity:                           │
│ • 5 GPUs advertised (3 mining, 2 idle)  │
│ • RTX 3060 Ti (8GB) ×2                  │
│ • RTX 3090 (24GB) ×1                    │
│ • RTX 4060 (8GB) ×2                     │
│                                         │
│ Storage Classes:                        │
│ • beta2 (HDD) - All 4 nodes             │
│ • beta3 (NVMe) - All 4 nodes            │
│ • ram - All 4 nodes                     │
│                                         │
│ Network:                                │
│ • provider.reverb256.ca                 │
│ • *.ingress.provider.reverb256.ca       │
│ • Cloudflare tunnel integration         │
│                                         │
│ Status: ✅ AUDITED & READY              │
│ Leases: 0 (Accepting tenants)           │
└─────────────────────────────────────────┘
```

### Timeline Section (Vertical scroll)

**The Journey**
```
┌─────────────────────────────────────────┐
│  📱 Operating System Evolution          │
│  ────────────────────────────────       │
│                                         │
│  Before Sept 2025                        │
│  Windows + Proxmox (dual-boot)          │
│                                         │
│  September 2025 🎯                      │
│  "Accidentally killed Windows"           │
│                                         │
│  Sept 2025 → Feb 2026                    │
│  Evolution: Omarchy → CachyOS → NixOS    │
│                                         │
│  🚀 NixOS Mastery (March 2-4, 2026)      │
│  • Initial commit                       │
│  • AI Gateway v1.0 → v2.0               │
│  • Mining infrastructure                 │
│                                         │
│  🌐 Cluster Expansion (Mid-March 2026)   │
│  • Added nexus, forge, sentry            │
│  • NFS config sync                       │
│  • Profile system                        │
│                                         │
│  ☸️  Kubernetes Migration (March 19-21)  │
│  • 7 phases, 100% complete               │
│  • 31 services migrated                  │
│  • Akash provider deployed               │
└─────────────────────────────────────────┘
```

**Timeline triggers:**
- Each phase shows → relevant nodes animate
- Phase 5 (GPU workloads) → llama.cpp pod spins up
- GSAP draws line to next phase on scroll

### Interactive Code Explorer

**Tabbed Interface:**
```
[Overview] [Key Patterns] [Deep Dive]
```

**Overview Tab:**
- Architecture diagram (NFS sync)
- Module structure tree
- Quick stats

**Key Patterns Tab:**
- 4-5 syntax-highlighted snippets
- Brief annotations
- "Copy to clipboard" buttons

**Deep Dive Tab:**
- 8-10 complete examples
- Detailed comments
- Collapsible sections

## Animation Strategy

### Hero Section
- **3D Cluster**: Three.js or CSS 3D transforms
  - Nodes slowly rotate
  - Particles flow between nodes
  - Mouse hover pauses rotation
- **Floating Stats**: GSAP pulse (1.0 → 1.05 scale)
- **Scroll Indicator**: Gentle bounce

### Scroll Animations
- **GSAP ScrollTrigger**: Trigger animations as sections enter viewport
- **Parallax Background**: Grid at 0.3x scroll speed
- **Section Reveals**: Glass cards fade in (y: 50 → 0, opacity: 0 → 1)
- **Timeline**: GSAP draws line to next phase

### Interactive Elements
- **Host Cards**: Click to expand (detailed specs + services)
- **Service Status**: Animated health indicators
- **GPU Marketplace**: Hover shows allocation (mining/K8s/Akash/idle)
- **Timeline Milestones**: Click to jump to section

## Component Structure

```
astro-portfolio/src/
├── pages/
│   └── infrastructure/
│       └── index.astro (main page)
├── components/
│   ├── infrastructure/
│   │   ├── HeroCluster.astro (3D visualization)
│   │   ├── GlassCard.astro (reusable card)
│   │   ├── HostCard.astro (expandable host details)
│   │   ├── Timeline.astro (vertical scroll)
│   │   ├── CodeExplorer.astro (tabbed code viewer)
│   │   └── ServiceStatus.astro (animated health)
│   └── ui/
│       └── (existing shadcn/ui components)
└── lib/
    ├── animations.ts (GSAP animations)
    └── infrastructure-data.ts (static data)
```

## Data Structure

```typescript
export const CLUSTER_DATA = {
  hosts: [
    {
      name: "zephyr",
      role: "control-plane",
      specs: {
        cpu: "16 cores",
        ram: "32GB",
        gpus: ["RTX 3090", "RTX 3060 Ti"]
      },
      services: ["etcd", "kube-apiserver", "n8n", "grafana"]
    },
    // ... nexus, forge, sentry
  ],
  akash: {
    gpus: [
      { model: "RTX 3060 Ti", vram: "8GB", status: "mining" },
      { model: "RTX 3090", vram: "24GB", status: "mining" },
      { model: "RTX 4060", vram: "8GB", status: "available" }
    ],
    leases: 0,
    storage: ["beta2", "beta3", "ram"]
  },
  timeline: [
    { date: "2025-09", title: "Killed Windows", description: "Full commitment to Linux" },
    // ... all phases
  ]
};
```

## Performance Considerations

- **Lazy Loading**: Load 3D visualization only when in viewport
- **Code Splitting**: Separate bundles for animations
- **Optimized Images**: WebP format for screenshots
- **GSAP**: ScrollTrigger batch for efficient scroll handling
- **Debouncing**: Debounce resize events for 3D canvas

## Success Criteria

### Functional Requirements
- ✅ All sections scroll smoothly with animations
- ✅ Interactive elements respond within 100ms
- ✅ Code explorer tabs switch without reload
- ✅ Timeline draws correctly on all screen sizes
- ✅ Host cards expand/collapse smoothly

### Performance Targets
- ✅ Lighthouse Score: 90+ Performance
- ✅ First Contentful Paint: < 2s
- ✅ Time to Interactive: < 3s
- ✅ Smooth 60fps scrolling

### Accessibility
- ✅ Keyboard navigation for all interactive elements
- ✅ ARIA labels for screen readers
- ✅ Sufficient color contrast (4.5:1 minimum)
- ✅ Focus indicators on all interactive elements

## Testing Plan

### Manual Testing Checklist
- [ ] All animations trigger on scroll
- [ ] Host cards expand/collapse correctly
- [ ] Code explorer tabs work
- [ ] Timeline draws lines between phases
- [ ] Mobile responsive (320px - 1920px)
- [ ] Keyboard navigation works
- [ ] Screen reader announces content correctly

### Browser Testing
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Key Innovations to Showcase

1. **NFS-based Config Sync**: Unique approach to single source of truth
2. **Profile System**: Declarative hardware/role/network profiles
3. **Rapid Execution**: 19 days from initial commit to production K8s cluster
4. **Akash Integration**: Decentralized cloud provider with 5 GPUs
5. **GPU Marketplace**: Resource allocation across mining/K8s/Akash/gaming

## Timeline Accuracy

All dates and milestones verified via:
- Git commit history (2026-03-02 initial commit)
- STATUS.md (100% K8s migration complete)
- kubectl output (40+ pods running)
- Akash audit (2026-03-21, ready for tenants)

## Next Steps

1. Create implementation plan via writing-plans skill
2. Begin component development
3. Implement animations with GSAP
4. Deploy and test
5. Measure performance metrics
