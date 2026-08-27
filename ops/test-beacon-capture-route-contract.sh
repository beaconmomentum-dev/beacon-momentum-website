#!/usr/bin/env bash
set -Eeuo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SCRIPT="$SCRIPT_DIR/ensure-beacon-capture-route.sh"

test -x "$SCRIPT" || { echo "capture-route helper must be executable" >&2; exit 1; }
grep -Fq 'location /api/trpc' "$SCRIPT"
grep -Fq '127.0.0.1:3020' "$SCRIPT"
grep -Fq '127.0.0.1:3012' "$SCRIPT"
grep -Fq 'nginx -T' "$SCRIPT"
grep -Fq 'server_name_match' "$SCRIPT"
grep -Fq 'host == "beaconmomentum.com"' "$SCRIPT"
grep -Fq 'tls_listener' "$SCRIPT"
grep -Fq 'nginx -t' "$SCRIPT"
grep -Fq 'systemctl reload nginx' "$SCRIPT"
grep -Fq 'status" != "405"' "$SCRIPT"
grep -Fq 'trap rollback ERR' "$SCRIPT"

echo "Beacon capture-route deployment contract passed."
