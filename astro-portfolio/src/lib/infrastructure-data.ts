/**
 * Infrastructure Cluster Data
 *
 * Last verified: 2026-09-19 (live audit: nproc, meminfo, lspci, kubectl).
 * Source of truth: see refresh script. Treat every numeric claim in here
 * as suspect until you re-query the live cluster. See
 * scripts/refresh-cluster-data.sh before each portfolio release.
 */

// ============================================================================
// TYPES
// ============================================================================

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
  status: 'mining' | 'available' | 'k8s';  // 'akash' removed 2026-07-01 — not deployed
  node: string;
}

export interface TimelineMilestone {
  date: string;
  title: string;
  description: string;
  icon?: string;
}

// ============================================================================
// CLUSTER DATA
// ============================================================================

export const CLUSTER_DATA = {
  hosts: [
    {
      name: 'zephyr',
      role: 'workstation',
      specs: {
        cpu: '32 cores',
        ram: '31GB',
        gpus: ['RTX 3090 (24GB)', 'RTX 3060 Ti (8GB)']
      },
      services: ['nginx', 'ollama', 'comfyui', 'peakminer-3090', 'peakminer-3060ti', 'tailscale'],
      ip: '10.1.1.110'
    },
    {
      name: 'nexus',
      role: 'primary-server+gateway',
      specs: {
        cpu: '24 cores',
        ram: '48GB',
        gpus: ['RTX 3060 Ti (8GB)']
      },
      services: ['etcd', 'ollama', 'memlawb', 'tailscale'],
      ip: '10.1.1.120'
    },
    {
      name: 'forge',
      role: 'gpu-compute',
      specs: {
        cpu: '6 cores',
        ram: '16GB',
        gpus: ['RTX 4060 (8GB)', 'RTX 4060 (8GB)', 'RX 5700 XT (8GB)']
      },
      services: ['peakminer-forge-4060-0', 'peakminer-forge-4060-1'],  // akash-provider dropped 2026-07-01 — not deployed
      ip: '10.1.1.130'
    },
    {
      name: 'sentry',
      role: 'monitoring+rocm-inference',
      specs: {
        cpu: '16 cores',
        ram: '31GB',
        gpus: ['RX 5600 XT (4GB)']
      },
      services: ['etcd', 'nfs-server', 'vmagent (VictoriaMetrics)'],
      ip: '10.1.1.140'
    }
  ],

  stats: {
    // Refreshed: 2026-09-19 via live audit from zephyr — re-run scripts/refresh-cluster-data.sh before each portfolio release.
    totalCores: 78,
    totalRAM: '125GB',
    totalGPUs: 7,
    totalStorage: '9.5TB',
    podCount: 119,
    k8sVersion: 'v1.37.0+k3s1'
  },

  // akash: not deployed as of 2026-07-01 — block removed. Restore only if/when re-deploying.

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
      description: 'First NixOS configuration. Single host (zephyr) with basic desktop + gaming.'
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
      date: 'March 18, 2026',
      title: 'K8s Phase 1-3: Foundation',
      description: 'Control plane, Flannel CNI, CoreDNS, stateful services (GlitchTip PostgreSQL)'
    },
    {
      date: 'March 19, 2026',
      title: 'K8s Phase 4-5: Services & GPU',
      description: 'Stateless services (GlitchTip web/worker, SearXNG, n8n), GPU workloads (llama.cpp)'
    },
    {
      date: 'March 20, 2026',
      title: 'K8s Phase 6-7: Monitoring Stack Complete',
      description: 'Prometheus + Grafana monitoring deployed for cluster-wide observability.'
    },
    {
      date: 'March 21, 2026',
      title: 'Production Cluster Live',
      icon: '🚀',
      description: '60+ pods running across 4 hosts. AI inference, mining, and monitoring workloads in production.'
    },
    {
      date: 'April 1, 2026',
      title: 'Blog Content Collections',
      description: 'Migrated blog to Astro Content Collections. Type-safe content management with automated OG image generation.'
    },
    {
      date: 'April 16, 2026',
      title: 'Infrastructure Extraction',
      description: 'Extracted MCP Registry, Knowledge Fabric, and AI gateway into standalone declarative projects with reproducible config and CI pipelines.'
    },
    {
      date: 'April 17, 2026',
      title: 'Gateway V2.1',
      description: 'Connection pooling, response caching, K8s embed-server integration, and OCI container image builds for the AI inference gateway.'
    },
    {
      date: 'April 23, 2026',
      title: 'Code Quality Automation',
      description: 'Standardized pre-commit hooks (statix, deadnix, lint) across all infrastructure projects. Automated code quality enforcement.'
    },
    {
      date: 'May 9, 2026',
      title: 'Portfolio Design V2',
      description: '16-theme retro gaming design system with Base24-compliant semantic tokens, theme-aware components across the entire portfolio.'
    },
    {
      date: 'May 18, 2026',
      title: 'Semantic Token Redesign',
      description: 'Theme architecture streamlined. Removed theme preview system, migrated to pure semantic tokens for maintainability.'
    },
    {
      date: 'May 19, 2026',
      title: 'Integration Roadmap Complete',
      icon: '🚀',
      description: 'Cross-codebase integration roadmap covering MCP ecosystem, knowledge pipeline, GPU federation, and unified auth across 12 repositories.'
    },
    {
      date: 'Aug 2026',
      title: 'ReverbOS / Omarchy Pivot',
      icon: '🐚',
      description: 'Full-stack migration off NixOS to an owned Omarchy-based OS across all hosts. Home-manager layer, declarative profiles, AI-first tooling. Sovereign infra future-proofing.'
    },
    {
      date: 'September 2026',
      title: 'Migration Complete',
      icon: '✅',
      description: 'All four hosts fully migrated off NixOS to Arch-based Omarchy — K3s, AI inference, mining, and monitoring carried over.'
    },
    {
      date: 'September 2026',
      title: 'Fleet Telemetry Desk',
      icon: '🖥️',
      description: 'Infomarchy desk deployed to every host (fix merged upstream) — live AI sessions, mining, and system health across the fleet.'
    }
  ],

  services: {
    // ai-inference namespace retired (2026) — AI workloads now run per-host and in voice-models/media.
    ai: [
      { name: 'voice-models', namespace: 'voice-models', status: 'running' },
      { name: 'ollama', namespace: 'zephyr (native)', status: 'running' }
    ],
    // akash: not deployed as of 2026-07-01 — services block removed.
    monitoring: [
      { name: 'vmsingle (VictoriaMetrics)', namespace: 'monitoring', status: 'running' },
      { name: 'vmstack-grafana', namespace: 'monitoring', status: 'running' },
      { name: 'vmalert', namespace: 'monitoring', status: 'running' },
      { name: 'node-exporter', namespace: 'monitoring', status: 'running' }
    ],
    // Mining consolidated to native peakminer (systemd) — no k8s mining pods.
    mining: [
      { name: 'peakminer-3090', namespace: 'zephyr/systemd', status: 'running' },
      { name: 'peakminer-3060ti', namespace: 'zephyr/systemd', status: 'running' },
      { name: 'peakminer-nexus-3060ti', namespace: 'nexus/systemd', status: 'running' },
      { name: 'peakminer-forge-4060-0', namespace: 'forge/systemd', status: 'running' },
      { name: 'peakminer-forge-4060-1', namespace: 'forge/systemd', status: 'running' }
    ]
  }
};
