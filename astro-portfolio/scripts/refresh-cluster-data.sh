#!/usr/bin/env bash
# Refresh cluster data for astro-portfolio/src/lib/infrastructure-data.ts.
#
# Re-queries kubectl for nodes, total cores, RAM, advertised GPU count,
# running pod count, and k8s server version. Prints a fresh `stats:` block
# to stdout, dated today. Paste the output above the existing block in
# `infrastructure-data.ts` and bump the comment's "Refreshed:" date.
#
# Akash is not deployed here, so this script intentionally does NOT
# query an Akash provider. Do not reintroduce an `akash:` block.
#
# Required tools on PATH: kubectl, jq.
# Required env: KUBECONFIG (auto-falls-back to ~/.kube/config).
#
# Usage:  ./scripts/refresh-cluster-data.sh > refreshed.stats.ts
#         Then hand-edit infrastructure-data.ts to merge.

set -euo pipefail

today="$(date -u +%Y-%m-%d)"

command -v kubectl >/dev/null || { echo "kubectl missing" >&2; exit 1; }
command -v jq     >/dev/null || { echo "jq missing"     >&2; exit 1; }

export KUBECONFIG="${KUBECONFIG:-$HOME/.kube/config}"

if ! kubectl get nodes >/dev/null 2>&1; then
  echo "# kubectl cannot reach the cluster — check KUBECONFIG" >&2
  exit 2
fi

cores="$(kubectl get nodes -o json | jq '[.items[].status.capacity.cpu | tonumber] | add // 0')"
ram_gb="$(kubectl get nodes -o json | jq '
  [.items[].status.capacity.memory
   | sub("Ki$"; "")
   | tonumber
   | ./1048576]
  | add | floor')"
# Physical GPUs are maintained by hand: k3s does not advertise them as node
# resources, and counting advertised resources under-reports (2026-09-22: it
# emitted "1" while the fleet runs 7). Update when hardware changes:
# zephyr 2 (RTX 3090, RTX 3060 Ti) | nexus 1 (RTX 3060 Ti)
# forge 3 (2x RTX 4060, RX 5700 XT) | sentry 1 (RX 5600 XT)
gpus="7"
pods="$(kubectl get pods -A --no-headers 2>/dev/null | wc -l | tr -d ' ')"
k8s_ver="$(kubectl version -o json 2>/dev/null | jq -r '.serverVersion.gitVersion // "unknown"')"

cat <<STATS
  // refreshed on $today — emit from scripts/refresh-cluster-data.sh
  stats: {
    totalCores: $cores,
    totalRAM: '${ram_gb}GB',
    totalGPUs: $gpus,
    totalStorage: 'TODO: df -h /nfs',
    podCount: $pods,
    k8sVersion: '$k8s_ver',
  },
STATS

echo "# refresh-cluster-data run on $today — paste above into infra data" >&2
