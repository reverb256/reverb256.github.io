# Interactive Infrastructure Journey Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a high-impact, scroll-telling experience showcasing the 4-host NixOS cluster with 3D visualization, GSAP animations, timeline, and interactive code explorer.

**Architecture:** Single-page Astro application with React components for interactivity, GSAP ScrollTrigger for scroll-based animations, CSS 3D transforms for cluster visualization, and static data for accurate cluster representation.

**Tech Stack:** Astro, React, TypeScript, GSAP + ScrollTrigger, shadcn/ui components, Tailwind CSS

---

## Task 1: Create Data Structure for Cluster Information

**Files:**
- Create: `astro-portfolio/src/lib/infrastructure-data.ts`
- Reference: `/etc/nixos/STATUS.md` for accurate data

**Step 1: Create data structure file**

Write `astro-portfolio/src/lib/infrastructure-data.ts`:

```typescript
export interface Host {
  name: string;
  role: string;
  specs: {
    cpu: string;
    ram: string;
    gpus: string[];
  };
  services: string[];
  ip: string;
}

export interface GPU {
  model: string;
  vram: string;
  status: 'mining' | 'available' | 'k8s' | 'akash';
  node: string;
}

export interface TimelineMilestone {
  date: string;
  title: string;
  description: string;
  icon?: string;
}

export const CLUSTER_DATA = {
  hosts: [
    {
      name: 'zephyr',
      role: 'control-plane',
      specs: {
        cpu: '16 cores',
        ram: '32GB',
        gpus: ['RTX 3090 (24GB)', 'RTX 3060 Ti (8GB)']
      },
      services: ['etcd', 'kube-apiserver', 'kube-scheduler', 'kube-controller-manager', 'n8n', 'grafana'],
      ip: '10.1.1.110'
    },
    {
      name: 'nexus',
      role: 'storage',
      specs: {
        cpu: '12 cores',
        ram: '32GB',
        gpus: ['RTX 3060 Ti (8GB)']
      },
      services: ['etcd', 'nfs-server', 'postgres-glitchtip', 'postgres-n8n'],
      ip: '10.1.1.120'
    },
    {
      name: 'forge',
      role: 'gpu-compute',
      specs: {
        cpu: '24 cores',
        ram: '32GB',
        gpus: ['RTX 4060 (8GB)', 'RTX 4060 (8GB)', 'RX 5700 XT (8GB)', 'RX 5700 XT (8GB)']
      },
      services: ['lolminer-nvidia', 'lolminer-amd'],
      ip: '10.1.1.130'
    },
    {
      name: 'sentry',
      role: 'monitoring',
      specs: {
        cpu: '26 cores',
        ram: '27GB',
        gpus: ['RX 5600 XT (4GB)']
      },
      services: ['etcd', 'prometheus', 'alertmanager', 'promtail'],
      ip: '10.1.1.140'
    }
  ],

  stats: {
    totalCores: 78,
    totalRAM: '123GB',
    totalGPUs: 7,
    totalStorage: '8.4TB',
    podCount: 40,
    k8sVersion: 'v1.35.2'
  },

  akash: {
    gpus: [
      { model: 'RTX 3060 Ti', vram: '8GB', status: 'mining', node: 'zephyr' },
      { model: 'RTX 3090', vram: '24GB', status: 'mining', node: 'zephyr' },
      { model: 'RTX 4060', vram: '8GB', status: 'available', node: 'forge' },
      { model: 'RTX 4060', vram: '8GB', status: 'available', node: 'forge' },
      { model: 'RTX 3060 Ti', vram: '8GB', status: 'mining', node: 'nexus' }
    ],
    leases: 0,
    storage: ['beta2 (HDD)', 'beta3 (NVMe)', 'ram'],
    endpoints: {
      provider: 'provider.reverb256.ca',
      ingress: '*.ingress.provider.reverb256.ca'
    },
    status: 'AUDITED & READY'
  },

  timeline: [
    {
      date: 'Before Sept 2025',
      title: 'Windows + Proxmox',
      description: 'Dual-boot setup with Proxmox servers for testing, Windows as daily driver'
    },
    {
      date: 'September 2025',
      title: 'Killed Windows',
      icon: '🎯',
      description: 'Full commitment to Linux. Started distro hopping journey.'
    },
    {
      date: 'Sept 2025 - Feb 2026',
      title: 'OS Evolution',
      description: 'Omarchy (Arch-based) → CachyOS (optimized Arch) → NixOS (declarative + reproducible)'
    },
    {
      date: 'March 2, 2026',
      title: 'NixOS Initial Commit',
      description: 'First NixOS configuration. Single host (zephyr) with basic desktop + gaming'
    },
    {
      date: 'March 3, 2026',
      title: 'AI Gateway v1.0',
      description: 'OpenAI-compatible API, mining infrastructure, multi-GPU support'
    },
    {
      date: 'March 4, 2026',
      title: 'Gateway v2.0',
      description: 'Middleware architecture with circuit breaker, rate limiting, Redis caching'
    },
    {
      date: 'Mid-March 2026',
      title: 'Cluster Expansion',
      description: 'Added nexus, forge, sentry. Implemented NFS config sync, profile system, 50+ Justfile commands'
    },
    {
      date: 'March 19, 2026',
      title: 'K8s Phase 1-3: Foundation',
      description: 'Control plane, Flannel CNI, CoreDNS, stateful services (GlitchTip PostgreSQL)'
    },
    {
      date: 'March 19, 2026',
      title: 'K8s Phase 4-5: Services & GPU',
      description: 'Stateless services (GlitchTip web/worker, SearXNG, n8n), GPU workloads (llama.cpp)'
    },
    {
      date: 'March 21, 2026',
      title: 'K8s Phase 6-7: Monitoring & Akash',
      description: 'Prometheus + Grafana monitoring, Akash provider with 5 GPUs, audited & ready'
    }
  ],

  services: {
    ai: [
      { name: 'n8n', namespace: 'ai-inference', status: 'running' },
      { name: 'qdrant', namespace: 'ai-inference', status: 'running' },
      { name: 'grafana', namespace: 'ai-inference', status: 'running' },
      { name: 'prometheus', namespace: 'ai-inference', status: 'running' }
    ],
    akash: [
      { name: 'akash-provider', namespace: 'akash-services', status: 'running' },
      { name: 'cloudflared', namespace: 'akash-services', status: 'running' },
      { name: 'operator-hostname', namespace: 'akash-services', status: 'running' }
    ],
    monitoring: [
      { name: 'prometheus', namespace: 'ai-inference', status: 'running' },
      { name: 'grafana', namespace: 'ai-inference', status: 'running' },
      { name: 'alertmanager', namespace: 'ai-inference', status: 'running' }
    ]
  }
};
```

**Step 2: Commit data structure**

```bash
git add astro-portfolio/src/lib/infrastructure-data.ts
git commit -m "feat(infrastructure): add cluster data structure"
```

---

## Task 2: Create Glass Card Component

**Files:**
- Create: `astro-portfolio/src/components/infrastructure/GlassCard.astro`
- Reference: Existing glass morphism styles in `astro-portfolio/src/styles/global.css`

**Step 1: Write GlassCard component**

Write `astro-portfolio/src/components/infrastructure/GlassCard.astro`:

```astro
---
interface Props {
  title: string;
  icon?: string;
  children: any;
  class?: string;
}

const { title, icon, children, class: className = '' } = Astro.props;
---

<div class={`glass-card ${className}`}>
  {icon && <div class="card-icon">{icon}</div>}
  <h3 class="card-title">{title}</h3>
  <div class="card-content">
    {children}
  </div>
</div>

<style>
  .glass-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    padding: 2rem;
    margin-bottom: 2rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .glass-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }

  .card-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .card-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: var(--color-text);
  }

  .card-content :global(p) {
    margin-bottom: 0.75rem;
    line-height: 1.6;
  }

  .card-content :global(ul) {
    list-style: none;
    padding: 0;
  }

  .card-content :global(li) {
    padding: 0.5rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .card-content :global(li:last-child) {
    border-bottom: none;
  }
</style>
```

**Step 2: Commit GlassCard component**

```bash
git add astro-portfolio/src/components/infrastructure/GlassCard.astro
git commit -m "feat(infrastructure): add GlassCard component"
```

---

## Task 3: Create Hero Cluster Visualization Component

**Files:**
- Create: `astro-portfolio/src/components/infrastructure/HeroCluster.astro`
- Create: `astro-portfolio/src/components/infrastructure/Cluster3D.tsx` (React component)

**Step 1: Create 3D cluster React component**

Write `astro-portfolio/src/components/infrastructure/Cluster3D.tsx`:

```tsx
import { useEffect, useRef } from 'react';
import { CLUSTER_DATA } from '../../lib/infrastructure-data';

export default function Cluster3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const nodes = containerRef.current.querySelectorAll('.cluster-node');
    const particles = containerRef.current.querySelectorAll('.particle');

    // Slow rotation animation
    let rotation = 0;
    const animate = () => {
      rotation += 0.002;
      nodes.forEach((node, index) => {
        const angle = rotation + (index * Math.PI * 2) / 4;
        const radius = 150;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        (node as HTMLElement).style.transform = `translate(${x}px, ${y}px)`;
      });
      requestAnimationFrame(animate);
    };
    animate();

    // Particle animation
    particles.forEach((particle) => {
      const p = particle as HTMLElement;
      const animateParticle = () => {
        const time = Date.now() * 0.001;
        const x = Math.sin(time) * 50;
        const y = Math.cos(time) * 50;
        p.style.transform = `translate(${x}px, ${y}px)`;
        requestAnimationFrame(animateParticle);
      };
      animateParticle();
    });

    return () => {
      // Cleanup
    };
  }, []);

  return (
    <div ref={containerRef} className="cluster-container">
      {CLUSTER_DATA.hosts.map((host, index) => (
        <div
          key={host.name}
          className="cluster-node"
          style={{
            position: 'absolute',
            transition: 'transform 0.5s ease'
          }}
        >
          <div className="node-content">
            <div className="node-name">{host.name}</div>
            <div className="node-role">{host.role}</div>
            <div className="node-gpus">{host.specs.gpus.length} GPUs</div>
          </div>
        </div>
      ))}

      {/* Particles representing NFS/data flow */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            position: 'absolute',
            width: '4px',
            height: '4px',
            background: 'rgba(147, 51, 234, 0.6)',
            borderRadius: '50%',
            transition: 'transform 0.3s ease'
          }}
        />
      ))}
    </div>
  );
}
```

**Step 2: Create Hero wrapper component**

Write `astro-portfolio/src/components/infrastructure/HeroCluster.astro`:

```astro
---
import Cluster3D from './Cluster3D';
import { CLUSTER_DATA } from '../../lib/infrastructure-data';
---

<section class="hero-section">
  <div class="hero-content">
    <Cluster3D client:load />

    <div class="floating-stats">
      <div class="stat-card" data-gsap-pulse>
        <div class="stat-value">{CLUSTER_DATA.hosts.length}</div>
        <div class="stat-label">Hosts</div>
      </div>
      <div class="stat-card" data-gsap-pulse>
        <div class="stat-value">{CLUSTER_DATA.stats.totalGPUs}</div>
        <div class="stat-label">GPUs</div>
      </div>
      <div class="stat-card" data-gsap-pulse>
        <div class="stat-value">{CLUSTER_DATA.stats.podCount}+</div>
        <div class="stat-label">Pods</div>
      </div>
      <div class="stat-card" data-gsap-pulse>
        <div class="stat-value">Akash</div>
        <div class="stat-label">Provider</div>
      </div>
    </div>

    <div class="hero-text">
      <h1>Living Infrastructure</h1>
      <p>A 4-host NixOS cluster with AI-powered monitoring and privacy-first local inference</p>
    </div>

    <div class="scroll-indicator">
      <span>Scroll to explore</span>
      <div class="scroll-arrow">↓</div>
    </div>
  </div>
</section>

<style>
  .hero-section {
    min-height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .cluster-container {
    position: relative;
    width: 600px;
    height: 600px;
  }

  .cluster-node {
    position: absolute;
    width: 120px;
    height: 120px;
    background: rgba(147, 51, 234, 0.2);
    border: 2px solid rgba(147, 51, 234, 0.5);
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .cluster-node:hover {
    background: rgba(147, 51, 234, 0.3);
    border-color: rgba(147, 51, 234, 0.8);
    transform: scale(1.1) !important;
  }

  .node-content {
    text-align: center;
    color: white;
  }

  .node-name {
    font-weight: 700;
    font-size: 1.1rem;
    margin-bottom: 0.25rem;
  }

  .node-role {
    font-size: 0.75rem;
    opacity: 0.8;
    margin-bottom: 0.25rem;
  }

  .node-gpus {
    font-size: 0.7rem;
    opacity: 0.6;
  }

  .floating-stats {
    position: absolute;
    top: 10%;
    right: 5%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .stat-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    padding: 1.5rem;
    text-align: center;
    min-width: 120px;
  }

  .stat-value {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #a78bfa, #818cf8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .stat-label {
    font-size: 0.875rem;
    opacity: 0.8;
  }

  .hero-text {
    position: absolute;
    bottom: 15%;
    left: 5%;
    max-width: 500px;
  }

  .hero-text h1 {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #a78bfa, #818cf8, #6366f1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .hero-text p {
    font-size: 1.25rem;
    opacity: 0.8;
    line-height: 1.6;
  }

  .scroll-indicator {
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateX(-50%) translateY(0);
    }
    40% {
      transform: translateX(-50%) translateY(-10px);
    }
    60% {
      transform: translateX(-50%) translateY(-5px);
    }
  }

  .scroll-arrow {
    font-size: 2rem;
    margin-top: 0.5rem;
  }

  @media (max-width: 768px) {
    .cluster-container {
      width: 300px;
      height: 300px;
    }

    .cluster-node {
      width: 80px;
      height: 80px;
    }

    .floating-stats {
      position: static;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      margin-bottom: 2rem;
    }

    .hero-text {
      position: static;
      text-align: center;
      padding: 0 1rem;
    }

    .hero-text h1 {
      font-size: 2rem;
    }
  }
</style>
```

**Step 3: Commit hero components**

```bash
git add astro-portfolio/src/components/infrastructure/HeroCluster.astro astro-portfolio/src/components/infrastructure/Cluster3D.tsx
git commit -m "feat(infrastructure): add hero cluster visualization"
```

---

## Task 4: Create Timeline Component

**Files:**
- Create: `astro-portfolio/src/components/infrastructure/Timeline.astro`
- Reference: CLUSTER_DATA.timeline for data

**Step 1: Write Timeline component**

Write `astro-portfolio/src/components/infrastructure/Timeline.astro`:

```astro
---
import { CLUSTER_DATA } from '../../lib/infrastructure-data';
---

<section class="timeline-section" id="timeline">
  <div class="timeline-container">
    <h2 class="timeline-title">The Journey</h2>

    <div class="timeline">
      {CLUSTER_DATA.timeline.map((milestone, index) => (
        <div class={`timeline-milestone ${milestone.icon ? 'milestone-highlight' : ''}`} data-index={index}>
          <div class="milestone-marker">
            {milestone.icon || <span>{index + 1}</span>}
          </div>
          <div class="milestone-content">
            <div class="milestone-date">{milestone.date}</div>
            <h3 class="milestone-title">{milestone.title}</h3>
            <p class="milestone-description">{milestone.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

<style>
  .timeline-section {
    padding: 4rem 2rem;
    position: relative;
  }

  .timeline-container {
    max-width: 800px;
    margin: 0 auto;
  }

  .timeline-title {
    font-size: 2.5rem;
    font-weight: 800;
    text-align: center;
    margin-bottom: 4rem;
    background: linear-gradient(135deg, #a78bfa, #818cf8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .timeline {
    position: relative;
    padding-left: 2rem;
  }

  .timeline::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, rgba(147, 51, 234, 0.5), rgba(99, 102, 241, 0.5));
  }

  .timeline-milestone {
    position: relative;
    margin-bottom: 3rem;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
  }

  .timeline-milestone.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .milestone-marker {
    position: absolute;
    left: -2.5rem;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: rgba(147, 51, 234, 0.2);
    border: 2px solid rgba(147, 51, 234, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: white;
    transition: all 0.3s ease;
  }

  .milestone-highlight .milestone-marker {
    background: rgba(147, 51, 234, 0.4);
    font-size: 1.2rem;
  }

  .timeline-milestone:hover .milestone-marker {
    background: rgba(147, 51, 234, 0.6);
    transform: scale(1.1);
  }

  .milestone-content {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    padding: 1.5rem;
    margin-left: 1rem;
    transition: all 0.3s ease;
  }

  .timeline-milestone:hover .milestone-content {
    transform: translateX(10px);
    box-shadow: 0 10px 30px rgba(147, 51, 234, 0.2);
  }

  .milestone-date {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 0.5rem;
  }

  .milestone-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: white;
  }

  .milestone-description {
    font-size: 1rem;
    line-height: 1.6;
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    .timeline-section {
      padding: 2rem 1rem;
    }

    .timeline-title {
      font-size: 2rem;
    }

    .timeline {
      padding-left: 1.5rem;
    }

    .milestone-marker {
      left: -2rem;
      width: 1.5rem;
      height: 1.5rem;
      font-size: 0.875rem;
    }

    .milestone-highlight .milestone-marker {
      font-size: 1rem;
    }

    .milestone-content {
      margin-left: 0.5rem;
      padding: 1rem;
    }
  }
</style>
```

**Step 2: Commit Timeline component**

```bash
git add astro-portfolio/src/components/infrastructure/Timeline.astro
git commit -m "feat(infrastructure): add timeline component"
```

---

## Task 5: Create Code Explorer Component

**Files:**
- Create: `astro-portfolio/src/components/infrastructure/CodeExplorer.astro`
- Create: `astro-portfolio/src/components/infrastructure/CodeExplorer.tsx` (React interactive component)

**Step 1: Create React CodeExplorer component**

Write `astro-portfolio/src/components/infrastructure/CodeExplorer.tsx`:

```tsx
import { useState } from 'react';

interface CodeTab {
  id: string;
  label: string;
  codes: { code: string; description: string }[];
}

const CODE_TABS: CodeTab[] = [
  {
    id: 'overview',
    label: 'Overview',
    codes: [
      {
        code: `# NFS-based Config Sync
{ config, pkgs, ... }:
{
  # Mount config from zephyr
  fileSystems."/etc/nixos".device = "/dev/disk/by-label/nixos-config";
  fileSystems."/etc/nixos".fsType = "nfs";
  fileSystems."/etc/nixos".options = [ "ro" "nolock" ];
}`,
        description: 'All hosts mount /etc/nixos read-only via NFS from zephyr'
      }
    ]
  },
  {
    id: 'patterns',
    label: 'Key Patterns',
    codes: [
      {
        code: `# Hardware Profile
hardware.gpu = {
  nvidia.enable = true;
  amd.enable = true;
  multiGpu = true;
};

# Role Profile
roles = {
  workstation.enable = true;
  aiInference.enable = true;
  mining.enable = false;
};`,
        description: 'Declarative hardware and role profiles'
      },
      {
        code: `# Custom AI Inference Module
services.ai-inference = {
  enable = true;
  gateway = {
    enable = true;
    port = 8080;
    models = [
      {
        name = "qwen3.5-0.8b";
        backend = "llama.cpp";
      }
    ];
  };
};`,
        description: 'Reusable NixOS module for AI inference gateway'
      }
    ]
  },
  {
    id: 'deep',
    label: 'Deep Dive',
    codes: [
      {
        code: `# Profile System Implementation
{ lib, ... }:
{
  options.hardware.gpu = {
    nvidia = lib.mkEnableOption "NVIDIA GPU support";
    amd = lib.mkEnableOption "AMD GPU support";
    multiGpu = lib.mkEnableOption "Multi-GPU setup";
  };

  config = lib.mkIf cfg.enable {
    # NVIDIA-specific config
    services.xserver.videoDrivers = lib.mkIf cfg.nvidia [ "nvidia" ];

    # AMD-specific config
    hardware.opengl.extraPackages = lib.mkIf cfg.amd [
      pkgs.rocm-opencl-icd
      pkgs.rocm-opencl-runtime
    ];

    # Multi-GPU CUDA setup
    environment.etc."cuda-devices.conf".text = lib.mkIf cfg.multiGpu ''
      CUDA_VISIBLE_DEVICES=0,1
    '';
  };
}`,
        description: 'Complete NixOS module for GPU hardware profiles'
      },
      {
        code: `# GPU Marketplace Service
{ config, pkgs, ... }:
{
  systemd.services.gpu-marketplace = {
    description = "GPU Resource Marketplace";
    wantedBy = [ "multi-user.target" ];

    serviceConfig = {
      ExecStart = "${pkgs.gpu-marketplace}/bin/gpu-marketplace";
      Restart = "always";
      RestartSec = "10s";
    };

    # Auto-pause during nixos-rebuild
    restartTriggers = [ config.systemd.services.nixos-rebuild ];
  };
}`,
        description: 'Systemd service with auto-pause during rebuilds'
      }
    ]
  }
];

export default function CodeExplorer() {
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const activeCodes = CODE_TABS.find(tab => tab.id === activeTab)?.codes || [];

  const copyToClipboard = async (code: string, index: number) => {
    await navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="code-explorer">
      <div className="code-tabs">
        {CODE_TABS.map(tab => (
          <button
            key={tab.id}
            className={`code-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="code-content">
        {activeCodes.map((item, index) => (
          <div key={index} className="code-block">
            <div className="code-header">
              <span className="code-description">{item.description}</span>
              <button
                className="copy-button"
                onClick={() => copyToClipboard(item.code, index)}
              >
                {copiedIndex === index ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="code">
              <code>{item.code}</code>
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Step 2: Create Astro wrapper**

Write `astro-portfolio/src/components/infrastructure/CodeExplorer.astro`:

```astro
---
import CodeExplorer from './CodeExplorer';
---

<section class="code-explorer-section" id="code">
  <div class="code-explorer-container">
    <h2 class="section-title">Code Patterns</h2>
    <CodeExplorer client:load />
  </div>
</section>

<style>
  .code-explorer-section {
    padding: 4rem 2rem;
  }

  .code-explorer-container {
    max-width: 900px;
    margin: 0 auto;
  }

  .section-title {
    font-size: 2.5rem;
    font-weight: 800;
    text-align: center;
    margin-bottom: 3rem;
    background: linear-gradient(135deg, #a78bfa, #818cf8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>
```

**Step 3: Add styles for CodeExplorer**

Add to `astro-portfolio/src/components/infrastructure/CodeExplorer.astro` (append to style tag):

```css
  .code-explorer :global(.code-tabs) {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 2rem;
    border-bottom: 2px solid rgba(255, 255, 255, 0.1);
  }

  .code-explorer :global(.code-tab) {
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.6);
    padding: 1rem 1.5rem;
    font-size: 1rem;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: all 0.3s ease;
  }

  .code-explorer :global(.code-tab:hover) {
    color: white;
  }

  .code-explorer :global(.code-tab.active) {
    color: white;
    border-bottom-color: #a78bfa;
  }

  .code-explorer :global(.code-content) {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .code-explorer :global(.code-block) {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;
    overflow: hidden;
  }

  .code-explorer :global(.code-header) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .code-explorer :global(.code-description) {
    font-size: 0.875rem;
    opacity: 0.8;
  }

  .code-explorer :global(.copy-button) {
    background: rgba(147, 51, 234, 0.2);
    border: 1px solid rgba(147, 51, 234, 0.5);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.3s ease;
  }

  .code-explorer :global(.copy-button:hover) {
    background: rgba(147, 51, 234, 0.4);
  }

  .code-explorer :global(.code) {
    padding: 1.5rem;
    overflow-x: auto;
  }

  .code-explorer :global(code) {
    font-family: 'Monaco', 'Menlo', monospace;
    font-size: 0.875rem;
    line-height: 1.6;
    color: #e2e8f0;
  }
```

**Step 4: Commit CodeExplorer component**

```bash
git add astro-portfolio/src/components/infrastructure/CodeExplorer.astro astro-portfolio/src/components/infrastructure/CodeExplorer.tsx
git commit -m "feat(infrastructure): add code explorer component"
```

---

## Task 6: Create Main Infrastructure Page

**Files:**
- Create: `astro-portfolio/src/pages/infrastructure/index.astro`
- Reference: All components created so far

**Step 1: Create main page**

Write `astro-portfolio/src/pages/infrastructure/index.astro`:

```astro
---
import Layout from '../../layouts/Layout.astro';
import HeroCluster from '../../components/infrastructure/HeroCluster.astro';
import GlassCard from '../../components/infrastructure/GlassCard.astro';
import Timeline from '../../components/infrastructure/Timeline.astro';
import CodeExplorer from '../../components/infrastructure/CodeExplorer.astro';
import { CLUSTER_DATA } from '../../lib/infrastructure-data';
---

<Layout title="Infrastructure | Reverb256">
  <main class="infrastructure-page">
    <HeroCluster />

    <section class="intro-section">
      <div class="container">
        <GlassCard title="The Challenge" icon="🤔">
          <p>How do you manage a 4-host cluster without configuration drift?</p>
          <p>Traditional approaches require manual synchronization, leading to inconsistencies and difficult rollbacks.</p>
        </GlassCard>

        <GlassCard title="The Solution" icon="💡">
          <p><strong>NFS-based single source of truth</strong> with declarative profiles.</p>
          <p>Zephyr exports <code>/etc/nixos</code> via NFS. Remote hosts mount read-only. Changes are instantly visible across all nodes with zero config drift.</p>
        </GlassCard>

        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-value">{CLUSTER_DATA.stats.totalCores}</div>
            <div class="stat-label">CPU Cores</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{CLUSTER_DATA.stats.totalRAM}</div>
            <div class="stat-label">RAM</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{CLUSTER_DATA.stats.totalGPUs}</div>
            <div class="stat-label">GPUs</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{CLUSTER_DATA.stats.totalStorage}</div>
            <div class="stat-label">Storage</div>
          </div>
        </div>
      </div>
    </section>

    <section class="innovation-section">
      <div class="container">
        <h2 class="section-title">Technical Innovation</h2>

        <GlassCard title="🔗 NFS Config Sync">
          <ul>
            <li>Zephyr exports <code>/etc/nixos</code> via NFS</li>
            <li>Remote hosts mount read-only</li>
            <li>Changes visible instantly</li>
            <li>Zero configuration drift</li>
          </ul>
        </GlassCard>

        <GlassCard title="⚙️ Profile System">
          <p><strong>Hardware Profiles:</strong></p>
          <ul>
            <li><code>amd.zen</code> - CPU microarchitecture tuning</li>
            <li><code>nvidia.multiGpu</code> - Multi-GPU CUDA setup</li>
            <li><code>amdgpu.enable</code> - AMD GPU support</li>
          </ul>
          <p><strong>Role Profiles:</strong></p>
          <ul>
            <li><code>workstation</code> - Desktop environment</li>
            <li><code>mining</code> - GPU mining configuration</li>
            <li><code>aiInference</code> - Local LLM services</li>
          </ul>
        </GlassCard>

        <GlassCard title="🧩 Custom Modules">
          <ul>
            <li><strong>AI Inference Gateway</strong> - OpenAI-compatible API with middleware</li>
            <li><strong>NixOS-share</strong> - NFS server/client automation</li>
            <li><strong>GPU Marketplace</strong> - Coordinates mining/K8s/Akash/gaming</li>
          </ul>
        </GlassCard>
      </div>
    </section>

    <section class="operations-section">
      <div class="container">
        <h2 class="section-title">Operational Excellence</h2>

        <GlassCard title="🤖 Automation">
          <p><strong>50+ Justfile Commands:</strong></p>
          <ul>
            <li><code>nswitch</code> - Rebuild local host</li>
            <li><code>ndeploy</code> - Deploy to all nodes</li>
            <li><code>nhealth</code> - Check cluster health</li>
          </ul>
          <p>Auto-pause mining during rebuilds to prevent conflicts.</p>
        </GlassCard>

        <GlassCard title="🔐 Service Mesh">
          <ul>
            <li><strong>Istio</strong> - Service mesh with mTLS</li>
            <li><strong>Volcano</strong> - Batch scheduler for GPU workloads</li>
            <li><strong>NGINX Ingress</strong> - Ingress controller</li>
          </ul>
        </GlassCard>

        <GlassCard title="📊 Monitoring Stack">
          <ul>
            <li><strong>Prometheus</strong> - Metrics collection</li>
            <li><strong>Grafana</strong> - Visualization dashboards</li>
            <li><strong>GPU Exporters</strong> - NVIDIA/AMD metrics</li>
            <li><strong>Qdrant</strong> - Vector DB monitoring</li>
          </ul>
        </GlassCard>
      </div>
    </section>

    <section class="capabilities-section">
      <div class="container">
        <h2 class="section-title">Full-Stack Capabilities</h2>

        <GlassCard title="🖥️ Hardware Profiles">
          <p><strong>CPU Optimization:</strong></p>
          <ul>
            <li>Zen 1/2/3 microarchitecture tuning</li>
            <li>Coffee Lake optimizations</li>
          </ul>
          <p><strong>GPU Configuration:</strong></p>
          <ul>
            <li>5× NVIDIA GPUs (RTX 3060 Ti ×2, RTX 3090 ×1, RTX 4060 ×2)</li>
            <li>2× AMD GPUs (RX 5700 XT ×2, RX 5600 XT ×1)</li>
            <li>CUDA + ROCm + Vulkan support</li>
          </ul>
        </GlassCard>

        <GlassCard title="🤖 AI/ML Services">
          <ul>
            <li><strong>n8n</strong> - Workflow automation</li>
            <li><strong>Qdrant</strong> - Vector database</li>
            <li><strong>PostgreSQL + Redis</strong> - Data persistence</li>
            <li><strong>Grafana</strong> - Monitoring dashboards</li>
          </ul>
        </GlassCard>

        <GlassCard title="🌐 Akash Provider">
          <p><strong>GPU Capacity:</strong> {CLUSTER_DATA.akash.gpus.length} GPUs advertised</p>
          <ul>
            {CLUSTER_DATA.akash.gpus.map(gpu => (
              <li>{gpu.model} ({gpu.vram}) - {gpu.status}</li>
            ))}
          </ul>
          <p><strong>Storage Classes:</strong> {CLUSTER_DATA.akash.storage.join(', ')}</p>
          <p><strong>Status:</strong> ✅ {CLUSTER_DATA.akash.status}</p>
          <p><strong>Leases:</strong> {CLUSTER_DATA.akash.leases} (Accepting tenants)</p>
        </GlassCard>
      </div>
    </section>

    <Timeline />

    <CodeExplorer />
  </main>
</Layout>

<style>
  .infrastructure-page {
    min-height: 100vh;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .intro-section,
  .innovation-section,
  .operations-section,
  .capabilities-section {
    padding: 4rem 0;
  }

  .section-title {
    font-size: 2.5rem;
    font-weight: 800;
    text-align: center;
    margin-bottom: 3rem;
    background: linear-gradient(135deg, #a78bfa, #818cf8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
  }

  .stat-item {
    text-align: center;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
  }

  .stat-value {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #a78bfa, #818cf8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .stat-label {
    font-size: 1.125rem;
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    .container {
      padding: 0 1rem;
    }

    .section-title {
      font-size: 2rem;
    }

    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }

    .stat-value {
      font-size: 2rem;
    }
  }
</style>
```

**Step 2: Commit main page**

```bash
git add astro-portfolio/src/pages/infrastructure/index.astro
git commit -m "feat(infrastructure): add main infrastructure page"
```

---

## Task 7: Add GSAP Animations

**Files:**
- Create: `astro-portfolio/src/lib/animations.ts`
- Modify: `astro-portfolio/src/pages/infrastructure/index.astro` (add script)

**Step 1: Install GSAP dependencies**

```bash
cd astro-portfolio
bun add gsap
```

**Step 2: Create animations module**

Write `astro-portfolio/src/lib/animations.ts`:

```typescript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initInfrastructureAnimations() {
  // Animate stat cards on hover
  const statCards = document.querySelectorAll('[data-gsap-pulse]');
  statCards.forEach((card) => {
    gsap.to(card, {
      scale: 1.05,
      duration: 0.3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
  });

  // Animate sections on scroll
  const sections = document.querySelectorAll('.innovation-section, .operations-section, .capabilities-section');
  sections.forEach((section) => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 50,
      duration: 0.6
    });
  });

  // Animate glass cards
  const glassCards = document.querySelectorAll('.glass-card');
  glassCards.forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 30,
      duration: 0.5,
      delay: index * 0.1
    });
  });

  // Animate timeline milestones
  const milestones = document.querySelectorAll('.timeline-milestone');
  milestones.forEach((milestone) => {
    ScrollTrigger.create({
      trigger: milestone,
      start: 'top 80%',
      onEnter: () => milestone.classList.add('visible'),
      onLeaveBack: () => milestone.classList.remove('visible')
    });
  });

  // Parallax background effect
  gsap.to('.infrastructure-page', {
    backgroundPosition: `50% ${window.innerHeight * 0.3}px`,
    ease: 'none',
    scrollTrigger: {
      trigger: '.infrastructure-page',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
}

export function cleanupAnimations() {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
}
```

**Step 3: Add animation script to page**

Add to `astro-portfolio/src/pages/infrastructure/index.astro` (before closing `</main>`):

```astro
    <script>
      import { initInfrastructureAnimations } from '../../lib/animations';

      // Initialize animations on mount
      initInfrastructureAnimations();

      // Cleanup on unmount
      import { onCleanup } from 'astro';
      onCleanup(() => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      });
    </script>
```

**Step 4: Commit animations**

```bash
git add astro-portfolio/src/lib/animations.ts astro-portfolio/src/pages/infrastructure/index.astro
git commit -m "feat(infrastructure): add GSAP scroll animations"
```

---

## Task 8: Add Parallax Background Effect

**Files:**
- Modify: `astro-portfolio/src/pages/infrastructure/index.astro` (add background styles)

**Step 1: Add parallax background**

Add to `<style>` section in `astro-portfolio/src/pages/infrastructure/index.astro`:

```css
  .infrastructure-page {
    min-height: 100vh;
    background-image:
      linear-gradient(rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.9)),
      linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px);
    background-size: 100% 100%, 50px 50px, 50px 50px;
    background-position: 0 0, 0 0, 0 0;
    background-attachment: fixed;
  }
```

**Step 2: Commit parallax background**

```bash
git add astro-portfolio/src/pages/infrastructure/index.astro
git commit -m "feat(infrastructure): add parallax grid background"
```

---

## Task 9: Update Navigation Links

**Files:**
- Modify: `astro-portfolio/src/components/Header.astro` (add Infrastructure link)

**Step 1: Add Infrastructure navigation link**

Find the navigation section in `astro-portfolio/src/components/Header.astro` and add:

```astro
<a href="/infrastructure" class:active={currentPath === '/infrastructure'}>
  Infrastructure
</a>
```

**Step 2: Commit navigation update**

```bash
git add astro-portfolio/src/components/Header.astro
git commit -m "feat(infrastructure): add navigation link"
```

---

## Task 10: Test and Deploy

**Files:**
- Test: `astro-portfolio/` (build and preview)

**Step 1: Build the project**

```bash
cd astro-portfolio
bun run build
```

Expected: Successful build with no errors

**Step 2: Preview locally**

```bash
bun run preview
```

Expected: Site runs on http://localhost:4321

**Step 3: Test functionality**

Manual testing checklist:
- [ ] Navigate to /infrastructure
- [ ] Hero section loads with 3D cluster
- [ ] Stats cards pulse with GSAP animation
- [ ] Scroll sections animate on view
- [ ] Timeline milestones highlight on scroll
- [ ] Code explorer tabs switch correctly
- [ ] Copy code button works
- [ ] All links work
- [ ] Mobile responsive (320px - 1920px)
- [ ] Keyboard navigation works
- [ ] No console errors

**Step 4: Deploy to GitHub Pages**

```bash
git add .
git commit -m "feat(infrastructure): complete infrastructure showcase page"
git push origin main
```

Expected: GitHub Actions deploy to https://reverb256.ca/infrastructure

**Step 5: Verify deployment**

Visit https://reverb256.ca/infrastructure and verify:
- [ ] Page loads correctly
- [ ] All animations work
- [ ] No mixed content warnings
- [ ] SSL certificate valid
- [ ] Performance score > 90

---

## Success Criteria

After completion, verify:

### Functional Requirements
- ✅ All sections scroll smoothly with GSAP animations
- ✅ Interactive elements respond within 100ms
- ✅ Code explorer tabs switch without page reload
- ✅ Timeline draws correctly on all screen sizes
- ✅ Host cards expand/collapse smoothly (if implemented)

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

---

## Testing Commands

```bash
# Build and test
cd astro-portfolio
bun run build
bun run preview

# Lighthouse CI
npm install -g @lhci/cli
lhci autorun --collect.url=http://localhost:4321/infrastructure

# Accessibility audit
npx pa11y http://localhost:4321/infrastructure
```

---

## Documentation Updates

After completion, update:
- `README.md` - Add infrastructure section
- `astro-portfolio/src/config/site.ts` - Update metadata
- Create screenshot of page for portfolio showcase

---

## Rollback Plan

If issues arise:
```bash
# Revert to previous commit
git revert HEAD

# Or reset to known good state
git reset --hard <previous-commit-hash>
git push origin main --force
```

---

## Next Steps After Implementation

1. **Analytics Integration** - Track visitor engagement with sections
2. **Real-time Metrics** - Connect to Prometheus/Grafana APIs (optional)
3. **Interactive Host Cards** - Click to expand with live service status
4. **Video Demo** - Screen recording of infrastructure in action
5. **Blog Post** - Write technical deep-dive on architecture decisions

---

**End of Implementation Plan**
