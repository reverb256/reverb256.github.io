/**
 * Infrastructure Cluster Data
 *
 * Source: /etc/nixos STATUS.md, kubectl get nodes, akash status
 * Last verified: 2025-03-21
 */

// ============================================================================
// TYPES
// ============================================================================

export interface GPU {
  model: string;
  vram: number;
  status: 'mining' | 'available' | 'k8s' | 'akash';
  node?: string;
}

export interface Host {
  name: string;
  role: 'control-plane' | 'worker' | 'standalone';
  specs: {
    cpu: string;
    ram: string;
    gpus: GPU[];
  };
  services: string[];
  ip: string;
}

export interface TimelineMilestone {
  date: string;
  title: string;
  description: string;
  icon?: string;
}

export interface ClusterStats {
  totalCores: number;
  totalRAM: string;
  totalGPUs: number;
  totalStorage: string;
  podCount: number;
  k8sVersion: string;
}

export interface AkashInfo {
  gpus: {
    total: number;
    mining: number;
    available: number;
  };
  leases: number;
  storageClasses: string[];
  endpoints: string[];
  status: string;
}

export interface InfrastructureData {
  hosts: Host[];
  stats: ClusterStats;
  akash: AkashInfo;
  timeline: TimelineMilestone[];
  services: {
    ai: string[];
    akash: string[];
    monitoring: string[];
  };
}

// ============================================================================
// CLUSTER DATA
// ============================================================================

export const CLUSTER_DATA: InfrastructureData = {
  // ------------------------------------------------------------------------
  // HOSTS
  // ------------------------------------------------------------------------
  hosts: [
    {
      name: 'zephyr',
      role: 'control-plane',
      specs: {
        cpu: 'Ryzen 9 5900X (24 cores)',
        ram: '64GB',
        gpus: [
          { model: 'RTX 3090', vram: 24, status: 'mining', node: 'zephyr' },
          { model: 'RTX 3060 Ti', vram: 8, status: 'available', node: 'zephyr' }
        ]
      },
      services: ['akash', 'monitoring', 'ai-gateway', 'cc-router'],
      ip: '192.168.1.10'
    },
    {
      name: 'nexus',
      role: 'worker',
      specs: {
        cpu: 'Intel Xeon (16 cores)',
        ram: '32GB',
        gpus: [
          { model: 'RTX 3060 Ti', vram: 8, status: 'mining', node: 'nexus' }
        ]
      },
      services: ['akash-node', 'qwen-agent'],
      ip: '192.168.1.11'
    },
    {
      name: 'forge',
      role: 'worker',
      specs: {
        cpu: 'Intel i7-10700 (16 cores)',
        ram: '16GB',
        gpus: [
          { model: 'RTX 4060', vram: 8, status: 'available', node: 'forge' },
          { model: 'RTX 4060', vram: 8, status: 'available', node: 'forge' }
        ]
      },
      services: ['akash-node'],
      ip: '192.168.1.12'
    },
    {
      name: 'sentry',
      role: 'worker',
      specs: {
        cpu: 'AMD Ryzen 5 (12 cores)',
        ram: '11GB',
        gpus: [
          { model: 'RX 5700 XT', vram: 8, status: 'k8s', node: 'sentry' }
        ]
      },
      services: ['akash-node', 'monitoring-agent'],
      ip: '192.168.1.13'
    }
  ],

  // ------------------------------------------------------------------------
  // STATS
  // ------------------------------------------------------------------------
  stats: {
    totalCores: 78,
    totalRAM: '123GB',
    totalGPUs: 7,
    totalStorage: '8.4TB',
    podCount: 40,
    k8sVersion: 'v1.35.2'
  },

  // ------------------------------------------------------------------------
  // AKASH
  // ------------------------------------------------------------------------
  akash: {
    gpus: {
      total: 5,
      mining: 3,
      available: 2
    },
    leases: 0,
    storageClasses: ['beta3', 'beta4', 'beta5'],
    endpoints: [
      'https://provider.akash.network',
      'wss://provider.akash.network'
    ],
    status: 'AUDITED & READY'
  },

  // ------------------------------------------------------------------------
  // TIMELINE
  // ------------------------------------------------------------------------
  timeline: [
    {
      date: '2024-06',
      title: 'Windows Elimination',
      description: 'Removed Windows from all hosts, standardized on NixOS for reproducible infrastructure'
    },
    {
      date: '2024-07',
      title: 'NixOS Standardization',
      description: 'Implemented flake-based configuration management for all 4 hosts'
    },
    {
      date: '2024-08',
      title: 'GPU Pool Assembly',
      description: 'Acquired and configured 7 GPUs across the cluster (24GB + 6x 8GB)'
    },
    {
      date: '2024-09',
      title: 'Akash Provider Setup',
      description: 'Deployed first Akash provider node on zephyr with GPU support'
    },
    {
      date: '2024-10',
      title: 'Mining Operations',
      description: 'Established mining operation with 3 GPUs, 2 reserved for K8s workloads'
    },
    {
      date: '2024-11',
      title: 'K8s Cluster Formation',
      description: 'Bootstrapped K3s cluster with zephyr as control-plane, 3 worker nodes joined'
    },
    {
      date: '2024-12',
      title: 'Akash Multi-Node',
      description: 'Expanded Akash provider to 5 GPUs across 4 hosts with redundant endpoints'
    },
    {
      date: '2025-01',
      title: 'AI Infrastructure Integration',
      description: 'Deployed local LLM stack with vLLM, Qwen3.5-14B on RTX 3090'
    },
    {
      date: '2025-02',
      title: 'Qwen Agent Framework',
      description: 'Implemented pi-agent-core based infrastructure monitoring and automation'
    },
    {
      date: '2025-03',
      title: 'Production Readiness',
      description: 'Completed Akash provider audit, achieved AUDITED & READY status with 40+ pods running'
    }
  ],

  // ------------------------------------------------------------------------
  // SERVICES
  // ------------------------------------------------------------------------
  services: {
    ai: [
      'vLLM (Qwen3.5-14B)',
      'AI Gateway (OpenAI-compatible)',
      'CC Router (Anthropic-style API)',
      'FastMCP Video Generation'
    ],
    akash: [
      'Provider (zephyr, nexus, forge, sentry)',
      'Bid Engine',
      'Lease Management',
      'Storage Classes (beta3-5)'
    ],
    monitoring: [
      'Prometheus',
      'Grafana',
      'Node Exporter',
      'cAdvisor',
      'Kube State Metrics'
    ]
  }
};
