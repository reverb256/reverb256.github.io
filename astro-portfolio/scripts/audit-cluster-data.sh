#!/usr/bin/env bash
# Audit astro-portfolio/src/lib/infrastructure-data.ts for stale data.
# Wired into .github/workflows/audit-cluster-data.yml — fails CI on any
# claimed-but-unverified cluster claim.

set -euo pipefail

# Resolve relative to this script so the workflow's cwd doesn't matter.
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR/.."
if [[ -n "${F_OVERRIDE:-}" ]]; then
  F="$F_OVERRIDE"
else
  F="src/lib/infrastructure-data.ts"
fi

[[ -f "$F" ]] || { echo "audit-cluster-data: missing $F"; exit 2; }

fail=0

# --- 1) 'leases: 0' is only allowed if the same line has a TODO marker ---
while IFS= read -r line; do
  if ! grep -q "TODO" <<<"$line"; then
    echo "FAIL  line=${line%%:*}  leases: 0 without TODO comment"
    fail=1
  fi
done < <(grep -nE "leases:\s*0(,|$)" "$F" || true)

# --- 2) status: 'Active'/'Ready'/'Live' claims must have a TODO marker ---
while IFS= read -r line; do
  if ! grep -q "TODO" <<<"$line"; then
    echo "FAIL  line=${line%%:*}  stale status claim without TODO: $line"
    fail=1
  fi
done < <(grep -nE "status:\s*'(Active|Ready|Live)" "$F" || true)

# --- 3) Last verified header: warn if missing, fail if >60 days old ------
last_verified_line="$(grep -nE "Last verified:\s*[0-9]{4}-[0-9]{2}-[0-9]{2}" "$F" | head -1 || true)"
if [[ -z "$last_verified_line" ]]; then
  echo "WARN  no 'Last verified: YYYY-MM-DD' header found"
else
  date_str="$(grep -oE "[0-9]{4}-[0-9]{2}-[0-9]{2}" <<<"$last_verified_line" | head -1)"
  if ! date_epoch="$(date -d "$date_str" +%s 2>/dev/null)"; then
    echo "WARN  'Last verified: $date_str' is not a parseable date"
  else
    age_days=$(( ( $(date +%s) - date_epoch ) / 86400 ))
    if (( age_days > 60 )); then
      echo "FAIL  'Last verified: $date_str' is $age_days days old (max 60)"
      fail=1
    else
      echo "INFO  'Last verified: $date_str' is $age_days days old"
    fi
  fi
fi

# --- 4) akash block present? — DEPRECATED (not deployed as of 2026-07-01) ---
if grep -q -E "^  akash: \{$" "$F"; then
  echo "WARN  'akash: { ... }' block is present in $F — not deployed; remove the block"
fi

if (( fail == 1 )); then
  echo
  echo "audit-cluster-data: FAILED — run scripts/refresh-cluster-data.sh on the cluster host and update $F."
  exit 1
fi

echo "audit-cluster-data: OK"
