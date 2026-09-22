#!/usr/bin/env bash
# verify-domains.sh — live checks for the reverb256 public surface.
#
# Past incidents encoded as regression checks:
#   - sites.reverb256.dev "Site not found" (GH Pages had no claiming site) -> sites root must be 200
#   - reverb256.dev apex silently back on GitHub Pages A-records          -> apex must NOT resolve to 185.199.*
#   - www/http not redirecting to canonical apex                         -> redirects asserted for both domains
#   - portfolio canonical drift                                          -> .dev canonical asserted
#
# Used by .github/workflows/site-health.yml (full) and cloudflare-pages.yml (--quick).
# Exit non-zero on any FAIL.
set -uo pipefail

QUICK=0
[[ "${1:-}" == "--quick" ]] && QUICK=1

PASS=0; FAIL=0
SUMMARY="${GITHUB_STEP_SUMMARY:-}"
report() { [[ -n "$SUMMARY" ]] && echo "$1" >> "$SUMMARY" || true; }

check() { # label expected got [detail]
  local label="$1" expected="$2" got="$3" detail="${4:-}"
  if [[ "$got" == "$expected" ]]; then
    printf 'PASS  %-30s %s\n' "$label" "$got"; PASS=$((PASS+1))
  else
    printf 'FAIL  %-30s expected=%s got=%s %s\n' "$label" "$expected" "$got" "$detail"; FAIL=$((FAIL+1))
  fi
}

code() { curl -s -o /dev/null -w '%{http_code}'     -m 15 "$1" 2>/dev/null || echo "000"; }
loc()  { curl -s -o /dev/null -w '%{redirect_url}' -m 15 "$1" 2>/dev/null || echo "none"; }
body() { curl -s -m 15 "$1" 2>/dev/null || true; }

echo "== reverb256.dev (professional site) =="
check "reverb256.dev status" "200" "$(code https://reverb256.dev/)"
check "reverb256.dev title" "yes" "$(body https://reverb256.dev/ | grep -qi 'Reverb256' && echo yes || echo no)"
check "reverb256.dev canonical" "yes" "$(body https://reverb256.dev/ | grep -q 'rel="canonical" href="https://reverb256.dev/"' && echo yes || echo no)"
check "www.reverb256.dev -> apex" "https://reverb256.dev/" "$(loc https://www.reverb256.dev/)"
check "http://reverb256.dev -> https" "https://reverb256.dev/" "$(loc http://reverb256.dev/)"

echo "== reverb256.ca (interim: professional build; personal site planned) =="
check "reverb256.ca status" "200" "$(code https://reverb256.ca/)"
check "www.reverb256.ca -> apex" "https://reverb256.ca/" "$(loc https://www.reverb256.ca/)"

if [[ "$QUICK" -eq 1 ]]; then
  echo; echo "quick: $PASS pass, $FAIL fail"; report "site-health (quick): $PASS pass / $FAIL fail"
  [[ $FAIL -eq 0 ]] || exit 1; exit 0
fi

echo "== sites.reverb256.dev (site-agency publish surface — k3s via ArgoCD) =="
check "sites root" "200" "$(code https://sites.reverb256.dev/)"
check "sites served by k3s" "sites-k8s" "$(curl -sI -m 15 https://sites.reverb256.dev/ | tr -d '\r' | awk -F': ' 'tolower($1)=="x-served-by"{print $2}')"
check "preview noindex" "noindex" "$(curl -sI -m 15 https://sites.reverb256.dev/preview/none/ | tr -d '\r' | grep -i '^x-robots-tag' | grep -o noindex || true)"

echo "== k3s-served =="
check "haven health" "200" "$(code https://haven.reverb256.dev/api/health)"

echo "== DNS sanity =="
dns() { curl -s -m 15 "https://cloudflare-dns.com/dns-query?name=$1&type=A" -H 'accept: application/dns-json' \
  | python3 -c "import sys,json;d=json.load(sys.stdin);print(' '.join(a.get('data','') for a in d.get('Answer',[])))" 2>/dev/null || true; }
DEV="$(dns reverb256.dev)"
check "reverb256.dev resolves" "yes" "$( [[ -n "$DEV" ]] && echo yes || echo no)" "$DEV"
check "reverb256.dev off GitHub IPs" "yes" "$( grep -qE '^185\.199\.' <<<"$DEV" && echo no || echo yes)" "$DEV"
check "sites.reverb256.dev resolves" "yes" "$( [[ -n "$(dns sites.reverb256.dev)" ]] && echo yes || echo no)"

echo
echo "checks: $((PASS+FAIL))  pass: $PASS  fail: $FAIL"
report ""
report "### site-health: $PASS pass / $FAIL fail"
[[ $FAIL -eq 0 ]] || exit 1
