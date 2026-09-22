/**
 * Infrastructure Cluster Data
 *
 * Last verified: 2026-09-22 (live audit: kubectl node/pod inventory, host nproc/free).
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
      role: 'workstation + k3s agent',
      specs: {
        cpu: '32 cores',
        ram: '31GB',
        gpus: ['RTX 3090 (24GB)', 'RTX 3060 Ti (8GB)']
      },
      // Miners moved from systemd natives to k3s pods (2026-09-21).
      services: ['k3s agent', 'ollama', 'comfyui', 'tailscale'],
      ip: '10.1.1.110'
    },
    {
      name: 'nexus',
      role: 'primary-server + builder',
      specs: {
        cpu: '24 cores',
        ram: '48GB',
        gpus: ['RTX 3060 Ti (8GB)']
      },
      services: ['etcd', 'k3s control plane', 'ollama', 'memlawb', 'tailscale'],
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
      // akash-provider dropped 2026-07-01; miners run as k3s pods.
      services: ['etcd', 'k3s control plane'],
      ip: '10.1.1.130'
    },
    {
      name: 'sentry',
      role: 'control-plane + automation',
      specs: {
        cpu: '16 cores',
        ram: '31GB',
        gpus: ['RX 5600 XT (4GB)']
      },
      services: ['etcd', 'k3s control plane', 'GitHub Actions runner'],
      ip: '10.1.1.140'
    },
    {
      name: 'krash3',
      role: 'windows + wsl2 compute',
      specs: {
        cpu: '12 cores (Ryzen 9 5900X)',
        ram: '32GB',
        gpus: []
      },
      services: ['k3s agent (WSL2)'],
      ip: '10.1.1.150'
    }
  ],

  stats: {
    // Refreshed: 2026-09-22 via live audit from zephyr — re-run scripts/refresh-cluster-data.sh before each portfolio release.
    // totalGPUs is maintained by hand (k3s does not advertise GPUs as node resources).
    totalCores: 102,
    totalRAM: '140GB',
    totalGPUs: 7,
    totalStorage: '9.5TB',
    podCount: 158,
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
      description: 'Every host migrated off NixOS to Arch-based Omarchy — K3s, AI inference, mining, and monitoring carried over without breakage.'
    },
    {
      date: 'September 2026',
      title: 'Fleet Telemetry Desk',
      icon: '🖥️',
      description: 'Infomarchy desk deployed to every host (fix merged upstream) — live AI sessions, mining, and system health across the fleet.'
    },
    {
      date: 'September 2026',
      title: 'GitOps Everywhere',
      icon: '🔁',
      description: 'Every cluster stack moved under ArgoCD app-of-apps management — media, Quill/MapleSpike, Haven, and trading deploy from git. No kubectl, no drift.'
    },
    {
      date: 'September 21, 2026',
      title: 'Mining Joins the Cluster',
      icon: '⛏️',
      description: 'All five GPU rigs migrated from native systemd services to K3s pods managed by ArgoCD (mining-helm). Zephyr joined as an agent to serve its two GPUs — rollback is one git revert.'
    },
    {
      date: 'September 2026',
      title: 'Self-Hosted, Full Stack',
      icon: '🌐',
      description: 'Community server (Haven) live at haven.reverb256.dev with a full Discord mirror; an autonomous agent fleet runs daily operations.'
    }
  ],

  services: {
    // ai-inference namespace retired (2026) — AI workloads now run per-host and in voice-models/media.
    ai: [
      { name: 'voice-models', namespace: 'voice-models', status: 'running' },
      { name: 'ollama', namespace: 'zephyr + nexus (native)', status: 'running' }
    ],
    // akash: not deployed as of 2026-07-01 — services block removed.
    monitoring: [
      { name: 'vmsingle (VictoriaMetrics)', namespace: 'monitoring', status: 'running' },
      { name: 'vmstack-grafana', namespace: 'monitoring', status: 'running' },
      { name: 'vmalert', namespace: 'monitoring', status: 'running' },
      { name: 'node-exporter', namespace: 'monitoring', status: 'running' }
    ],
    // All mining runs as ArgoCD-managed K3s pods (namespace: mining) — systemd natives retired 2026-09-21.
    mining: [
      { name: 'peakminer-zephyr-3090', namespace: 'mining (k3s)', status: 'running' },
      { name: 'peakminer-zephyr-3060ti', namespace: 'mining (k3s)', status: 'running' },
      { name: 'peakminer-nexus-3060ti', namespace: 'mining (k3s)', status: 'running' },
      { name: 'peakminer-forge-4060-0', namespace: 'mining (k3s)', status: 'running' },
      { name: 'peakminer-forge-4060-1', namespace: 'mining (k3s)', status: 'running' }
    ]
  }
};
