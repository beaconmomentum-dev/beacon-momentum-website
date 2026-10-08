#!/usr/bin/env bash
# Static contract for the Beacon-owned Readiness Map delivery path.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SNIPPET="$ROOT/ops/nginx/beacon-momentum-downloads-location.conf"
INSTALLER="$ROOT/ops/install-beacon-momentum-downloads-route.sh"
SERVICE="$ROOT/server/readinessMap.ts"

[[ -r "$SNIPPET" ]] || { echo "Missing Nginx route snippet" >&2; exit 1; }
[[ -x "$INSTALLER" ]] || { echo "Installer must be executable" >&2; exit 1; }
[[ -r "$SERVICE" ]] || { echo "Missing Readiness Map service" >&2; exit 1; }

grep -Fq 'location ^~ /downloads/' "$SNIPPET"
grep -Fq 'location ^~ /api/readiness-map/' "$SNIPPET"
grep -Fq 'proxy_pass http://127.0.0.1:3012;' "$SNIPPET"
grep -Fq '/api/readiness-map/request' "$INSTALLER"
grep -Fq 'api_status' "$INSTALLER"
grep -Fq 'app.post("/api/readiness-map/request"' "$SERVICE"
grep -Fq 'app.get("/downloads/readiness-map"' "$SERVICE"
grep -Fq 'marketingConsent' "$SERVICE"
grep -Fq 'readiness_map_delivery_requested' "$SERVICE"
grep -Fq 'readiness_map_marketing_consent_granted' "$SERVICE"

echo "Readiness Map route deployment contract passed."
