---
title: "Building a Privacy-First AI Gateway on NixOS"
description: "How I built a local LLM stack with Claude-compatible APIs on NixOS, reducing cloud dependencies while maintaining full control over my AI development workflow."
date: 2026-03-08
tags: ["NixOS", "AI", "Privacy"]
featured: true
readTime: 8
---

## Why Local AI Matters

Every time you send a prompt to a cloud API, you're trusting a third party with your data. For most tasks that's fine. But when you're working with proprietary code, sensitive infrastructure configs, or personal notes, the calculus changes.

I wanted an AI workflow that let me:

1. Keep sensitive workloads on my own hardware
2. Fall back to cloud APIs when I need larger models
3. Do it all through a unified interface so I'm not switching tools

The answer turned out to be a local AI gateway running on NixOS.

## The Architecture

My setup has three layers:

```
[Client Apps] → [AI Gateway (localhost)] → [Local LLMs | Cloud APIs]
```

The gateway is a lightweight proxy that routes requests based on rules I define. Sensitive requests go to local models. Complex reasoning tasks route to cloud APIs. Everything uses an OpenAI-compatible API format so my tools don't need special configuration.

### Hardware

I'm running this on my 4-host NixOS cluster. The main inference node is **Zephyr**, my workstation with an RTX 3090. It handles 7B and 13B parameter models comfortably at usable token speeds.

The other nodes — **Forge**, **Nexus**, and **Sentry** — handle their own workloads but can be tapped for distributed inference when needed.

### Software Stack

- **Ollama** — Model management and inference server, packaged for NixOS
- **LiteLLM** — Unified API proxy that speaks OpenAI format
- **Nginx** — Local reverse proxy with TLS (self-signed certs via NixOS config)
- **Caddy** — Alternative when I want automatic cert management

## The NixOS Configuration

This is where NixOS shines. My entire AI stack is declarative:

```nix
# In my NixOS host config for Zephyr
services.ollama = {
  enable = true;
  package = pkgs.ollama;
  acceleration = "cuda";
  models = [ "llama3:8b" "mistral:7b" "codellama:7b" ];
};

# LiteLLM proxy config
systemd.services.litellm = {
  description = "LiteLLM AI Gateway";
  wantedBy = [ "multi-user.target" ];
  serviceConfig = {
    ExecStart = "${pkgs.litellm}/bin/litellm --config /etc/litellm/config.yaml --port 4000";
  };
};

# Config file managed declaratively
environment.etc."litellm/config.yaml".text = ''
  model_list:
    - model_name: local-llama3
      litellm_params:
        model: ollama/llama3:8b
        api_base: http://localhost:11434
    - model_name: cloud-claude
      litellm_params:
        model: anthropic/claude-sonnet-4-20250514
        api_key: os.environ/ANTHROPIC_API_KEY
  router_settings:
    default_model: local-llama3
'';
```

One `nixos-rebuild switch` and the entire stack comes up. Rollbacks are atomic if anything breaks.

## Routing Rules

My routing strategy is simple:

- **Code generation, refactoring, general Q&A** → Local models (LLaMA 3, Mistral)
- **Complex reasoning, architecture decisions, code review** → Cloud (Claude)
- **Anything with personal data or proprietary code** → Local only (enforced at the proxy level)

LiteLLM handles this through model aliases. My editor and terminal tools all point to `localhost:4000` and the gateway decides where the request actually goes.

## Performance

On the RTX 3090:

| Model | Parameters | Tokens/sec | Quality (coding) |
|-------|-----------|------------|-------------------|
| LLaMA 3 | 8B | ~45 | Good for boilerplate |
| Mistral | 7B | ~50 | Solid general purpose |
| CodeLlama | 7B | ~42 | Best for code completion |

These aren't benchmark numbers — they're real-world usage during development. Good enough for interactive work, and the privacy trade-off is worth it.

## What I Learned

1. **NixOS makes this reproducible.** I can rebuild my AI stack on any machine with one command. No manual setup, no dependency hell.
2. **Local models are surprisingly capable.** For day-to-day coding tasks, an 8B model on consumer hardware is genuinely useful.
3. **The hybrid approach is the sweet spot.** Local for privacy, cloud for complexity. Having a unified API makes it seamless.
4. **Declarity pays off.** When I upgraded my cluster config, the AI stack came along for free. No reinstall needed.

## Next Steps

I'm working on migrating the gateway to a Kubernetes deployment within my cluster. This will let me scale inference across multiple nodes and handle failover automatically. The NixOS configs are already written — I'm just waiting on the K8s migration to complete.

If you're running NixOS and doing AI work, I'd recommend starting with Ollama and seeing if local models cover 80% of your needs. They probably do.
