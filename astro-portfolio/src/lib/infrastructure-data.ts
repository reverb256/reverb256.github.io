/**
 * Infrastructure Cluster Data
 *
 * Source: /etc/nixos STATUS.md, kubectl get nodes, akash status
 * Last verified: 2025-03-21
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
  status: 'mining' | 'available' | 'k8s' | 'akash';
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
      role: 'control-plane',
      specs: {
        cpu: '32 cores',
        ram: '32GB',
        gpus: ['RTX 3090 (24GB)', 'RTX 3060 Ti (8GB)']
      },
      services: ['etcd', 'kube-apiserver', 'kube-scheduler', 'kube-controller-manager', 'ingress-nginx', 'nfs-server', 'n8n', 'grafana', 'prometheus'],
      ip: '10.1.1.110'
    },
    {
      name: 'nexus',
      role: 'storage',
      specs: {
        cpu: '24 cores',
        ram: '48GB',
        gpus: ['RTX 3060 Ti (8GB)']
      },
      services: ['etcd', 'nfs-server', 'postgres-n8n', 'postgres-glitchtip'],
      ip: '10.1.1.120'
    },
    {
      name: 'forge',
      role: 'gpu-compute',
      specs: {
        cpu: '6 cores',
        ram: '16GB',
        gpus: ['RTX 4060 (8GB)', 'RTX 4060 (8GB)', 'RX 5700 XT (8GB)', 'RX 5700 XT (8GB)']
      },
      services: ['lolminer-nvidia', 'lolminer-amd', 'akash-provider'],
      ip: '10.1.1.130'
    },
    {
      name: 'sentry',
      role: 'monitoring',
      specs: {
        cpu: '16 cores',
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
    totalGPUs: 8,
    totalStorage: '8.4TB',
    podCount: 60,
    k8sVersion: 'v1.35.2'
  },

  akash: {
    gpus: [
      { model: 'RTX 4060', vram: '8GB', status: 'available', node: 'forge' },
      { model: 'RTX 4060', vram: '8GB', status: 'available', node: 'forge' },
      { model: 'RTX 3060 Ti', vram: '8GB', status: 'available', node: 'nexus' },
      { model: 'RTX 3090', vram: '24GB', status: 'available', node: 'zephyr' },
      { model: 'RTX 3060 Ti', vram: '8GB', status: 'available', node: 'zephyr' }
    ],
    leases: 0,
    storage: ['beta2 (HDD)', 'beta3 (NVMe)', 'ram'],
    endpoints: {
      provider: 'provider.reverb256.ca',
      ingress: '*.ingress.provider.reverb256.ca'
    },
    status: 'Active Provider - Ready for Bids'
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
      title: 'K8s Phase 6-7: Monitoring & Akash',
      description: 'Prometheus + Grafana monitoring, Akash provider with 5 GPUs, audited & ready'
    },
    {
      date: 'March 21, 2026',
      title: 'Production Cluster Live',
      icon: '🚀',
      description: '60+ pods running across 4 hosts. AI inference, mining, monitoring, and Akash provider fully operational'
    }
  ],

  services: {
    ai: [
      { name: 'n8n', namespace: 'ai-inference', status: 'running' },
      { name: 'qdrant', namespace: 'ai-inference', status: 'running' },
      { name: 'vllm-inference', namespace: 'ai-inference', status: 'running' },
      { name: 'llama-cpp-qwen', namespace: 'ai-inference', status: 'running' },
      { name: 'sglang-inference', namespace: 'ai-inference', status: 'running' },
      { name: 'mlflow', namespace: 'ai-inference', status: 'running' },
      { name: 'redis', namespace: 'ai-inference', status: 'running' },
      { name: 'postgres-n8n', namespace: 'ai-inference', status: 'running' }
    ],
    akash: [
      { name: 'akash-provider', namespace: 'akash-services', status: 'running' },
      { name: 'cloudflared', namespace: 'akash-services', status: 'running' },
      { name: 'operator-hostname', namespace: 'akash-services', status: 'running' },
      { name: 'operator-inventory', namespace: 'akash-services', status: 'running' },
      { name: 'akash-node-1', namespace: 'akash-services', status: 'running' }
    ],
    monitoring: [
      { name: 'prometheus', namespace: 'ai-inference', status: 'running' },
      { name: 'grafana', namespace: 'monitoring', status: 'running' },
      { name: 'alertmanager', namespace: 'monitoring', status: 'running' }
    ],
    mining: [
      { name: 'gpu-miner-zephyr', namespace: 'mining', status: 'running' },
      { name: 'xmrig-zephyr', namespace: 'mining', status: 'running' },
      { name: 'gpu-miner-nexus', namespace: 'mining', status: 'running' },
      { name: 'xmrig-nexus', namespace: 'mining', status: 'running' },
      { name: 'gpu-miner-forge-nvidia-0', namespace: 'mining', status: 'running' },
      { name: 'gpu-miner-forge-nvidia-1', namespace: 'mining', status: 'running' }
    ]
  }
};
