---
title: "Managing a 4-Host NixOS Cluster with Colmena"
description: "Lessons learned from deploying NixOS across four machines with GPU mining workloads and AI inference services using Colmena multi-host deployment."
date: 2026-01-20
tags: ["NixOS", "Infrastructure", "Colmena"]
readTime: 10
---

## The Setup

Four machines. Different hardware. Different workloads. One declarative configuration to rule them all.

My cluster isn't a cloud deployment — it's four physical machines in my home, originally built for GPU mining, now repurposed for development infrastructure and AI workloads. Here's how I manage it all with NixOS and Colmena.

### The Hosts

| Host | GPU | Role | Workload |
|------|-----|------|----------|
| **Zephyr** | RTX 3090 + 3060 Ti | Main workstation | Dev environment, AI inference |
| **Nexus** | 1x NVIDIA | Utility node | Monitoring, light compute |
| **Forge** | 2x RTX 4060 + 2x RX 5700 XT | Compute node | Distributed tasks, GPU workloads |
| **Sentry** | 1x AMD | Infrastructure node | Services, networking |

All running NixOS. All configured from a single flake repository.

## Why Colmena

Colmena is to NixOS deployment what NixOS is to system configuration: declarative, reproducible, and composable.

Before Colmena, I was SSH-ing into each machine and running `nixos-rebuild switch --flake .#hostname`. It worked, but it didn't scale. Four machines meant four separate operations, four chances to forget a step, four places for config drift to creep in.

With Colmena, one command deploys to all four:

```bash
colmena apply
```

That's it. Every host gets its configuration, every service comes up, every secret gets deployed. If anything fails, the rollback is automatic.

## The Flake Structure

My flake repo is organized like this:

```
flake/
├── flake.nix              # Inputs, outputs
├── hosts/
│   ├── common/            # Shared config
│   │   ├── base.nix       # All hosts get this
│   │   ├── gui.nix        # Desktop environments
│   │   └── gpu.nix        # GPU drivers and CUDA
│   ├── zephyr/            # Main workstation
│   │   ├── configuration.nix
│   │   └── hardware.nix
│   ├── nexus/
│   ├── forge/
│   └── sentry/
├── modules/               # Custom NixOS modules
│   ├── ai-gateway.nix
│   ├── monitoring.nix
│   └── networking.nix
├── secrets/               # Agenix-encrypted secrets
└── colmena.nix            # Deployment config
```

### Shared Configuration

Every host inherits from `common/base.nix`:

```nix
{ config, pkgs, ... }: {
  # Basic system config shared across all hosts
  time.timeZone = "America/Winnipeg";
  networking.domain = "reverb256.local";

  # Common packages
  environment.systemPackages = with pkgs; [
    git
    htop
    tmux
    curl
    jq
  ];

  # SSH hardening
  services.openssh = {
    enable = true;
    settings = {
      PermitRootLogin = "no";
      PasswordAuthentication = false;
    };
  };

  # Automatic garbage collection
  nix.gc = {
    automatic = true;
    dates = "weekly";
    options = "--delete-older-than 7d";
  };
}
```

### Per-Host Configuration

Zephyr (my main workstation) gets the full development treatment:

```nix
{ config, pkgs, ... }: {
  imports = [ ../common/base.nix ../common/gui.nix ../common/gpu.nix ];

  networking.hostName = "zephyr";

  # AI inference stack
  services.ollama = {
    enable = true;
    acceleration = "cuda";
  };

  # Development environment
  environment.systemPackages = with pkgs; [
    rustc cargo
    nodejs_22
    bun
    astro
  ];
}
```

### Colmena Deployment

The Colmena config maps each host:

```nix
{
  meta = {
    nixpkgs = import nixpkgs { system = "x86_64-linux"; };
    specialArgs = { inherit inputs; };
  };

  zephyr = { name, nodes, ... }: {
    imports = [ ./hosts/zephyr/configuration.nix ];
    deployment = {
      targetHost = "zephyr.reverb256.local";
      targetUser = "reverb";
    };
  };

  nexus = { name, nodes, ... }: {
    imports = [ ./hosts/nexus/configuration.nix ];
    deployment.targetHost = "nexus.reverb256.local";
  };

  forge = { name, nodes, ... }: {
    imports = [ ./hosts/forge/configuration.nix ];
    deployment.targetHost = "forge.reverb256.local";
  };

  sentry = { name, nodes, ... }: {
    imports = [ ./hosts/sentry/configuration.nix ];
    deployment.targetHost = "sentry.reverb256.local";
  };
}
```

## Secrets Management with Agenix

Plain-text secrets in Nix configs are a non-starter. I use agenix to encrypt secrets with age encryption, keyed to each host's SSH key.

```nix
# secrets.nix - maps secrets to host public keys
let
  zephyr = "ssh-ed25519 AAAA... zephyr";
  forge = "ssh-ed25519 AAAA... forge";
  # ...
in {
  "secrets/ai-api-key.age".publicKeys = [ zephyr ];
  "secrets/wireguard-key.age".publicKeys = [ zephyr forge nexus sentry ];
}
```

Encrypted secrets live in the repo. Decrypted at deploy time. Never in the Nix store as plain text.

## Lessons Learned

### 1. Start with Common Config Early

I initially configured each host independently. By host three, I was copy-pasting configs. Take the time to factor out common modules early — it pays dividends immediately.

### 2. GPU Drivers in NixOS Are Actually Great

NVIDIA drivers on Linux are notoriously painful. NixOS handles them declaratively:

```nix
hardware.nvidia = {
  enable = true;
  package = config.boot.kernelPackages.nvidiaPackages.stable;
  nvidiaSettings = true;
};
```

No runfiles, no DKMS headaches. One rebuild and CUDA works.

### 3. Colmena Handles Partial Failures Gracefully

If one host fails to build, Colmena continues with the others and reports the failure at the end. This saved me more than once when I had a bad config on one machine.

### 4. Flake Inputs Are Your Dependency Pinning

Every input in my flake is pinned to a specific commit hash. This means every deployment is reproducible — I can rebuild the exact same system months later and get identical results.

```nix
inputs = {
  nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.05";
  home-manager.url = "github:nix-community/home-manager/release-25.05";
  agenix.url = "github:ryantm/agenix";
};
```

### 5. Network Bootstrapping Is the Hardest Part

Getting SSH keys distributed and hostnames resolving across the network was the most frustrating part. Once that's in place, everything else is just Nix config.

## The Kubernetes Migration

I'm currently migrating services from individual NixOS systemd units to Kubernetes pods running on the cluster. This is a 9-week project that involves:

1. Setting up K3s on the compute nodes
2. Writing Helm charts for existing services
3. Migrating persistent storage to PVs
4. Configuring ingress with TLS
5. Setting up monitoring with Prometheus + Grafana

The NixOS configs stay — Kubernetes runs on top of NixOS, not instead of it. The declarative host configuration handles the infrastructure layer; Kubernetes handles the application layer.

## The Verdict

Managing four NixOS hosts with Colmena is one of those decisions that seemed intimidating upfront but paid for itself within the first week. The ability to say "deploy everything" and trust that it'll work — or tell you exactly why it didn't — is transformative.

If you're running more than one Linux machine, especially if they're doing similar things, NixOS + Colmena is worth the learning curve. The upfront investment in declarative config returns compound interest every time you add a host, update a package, or recover from a failure.
