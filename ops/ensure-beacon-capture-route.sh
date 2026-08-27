#!/usr/bin/env bash
# Ensure Beacon Momentum's public tRPC location routes to its own Node runtime.
#
# This script is intentionally narrow and idempotent. It changes only the
# proxy_pass inside `location /api/trpc` in the already-active Beacon virtual
# host, keeps a timestamped backup, validates Nginx before reload, and restores
# the backup if validation or the post-reload no-payload mutation probe fails.
set -Eeuo pipefail

SITE_CONFIG=""
BACKUP_DIR="${BEACON_NGINX_BACKUP_DIR:-/var/backups/beacon-momentum-nginx}"
PUBLIC_HOST="${BEACON_PUBLIC_HOST:-beaconmomentum.com}"
BACKUP=""
CHANGED=0
effective_nginx=""
tmp=""

cleanup() {
  [[ -n "$effective_nginx" ]] && rm -f "$effective_nginx"
  [[ -n "$tmp" ]] && rm -f "$tmp"
}
trap cleanup EXIT

if [[ -n "${BEACON_NGINX_SITE:-}" ]]; then
  SITE_CONFIG="$(readlink -f "$BEACON_NGINX_SITE")"
else
  effective_nginx="$(mktemp /tmp/beacon-nginx-effective.XXXXXX)"
  nginx -T 2>/dev/null > "$effective_nginx"
  SITE_CONFIG="$(awk '
    /^# configuration file / {
      file=$4
      sub(/:$/, "", file)
      next
    }
    /^[[:space:]]*server[[:space:]]*\{/ {
      in_server=1
      depth=1
      server_file=file
      server_name_match=0
      tls_listener=0
      next
    }
    in_server {
      if ($1 == "server_name") {
        for (i = 2; i <= NF; i++) {
          host=$i
          sub(/;$/, "", host)
          if (host == "beaconmomentum.com") server_name_match=1
        }
      }
      if ($0 ~ /^[[:space:]]*listen[[:space:]]+443[[:space:]].*ssl/) tls_listener=1
      opens=gsub(/\{/, "{", $0)
      closes=gsub(/\}/, "}", $0)
      depth += opens - closes
      if (depth <= 0) {
        if (!printed && server_name_match && tls_listener) {
          print server_file
          printed=1
        }
        in_server=0
      }
    }
  ' "$effective_nginx")"
fi

if [[ -z "$SITE_CONFIG" ]]; then
  echo "ERROR: no effective Beacon TLS virtual host was found" >&2
  exit 1
fi

SITE_CONFIG="$(readlink -f "$SITE_CONFIG")"

if [[ ! -f "$SITE_CONFIG" ]]; then
  echo "ERROR: Beacon Nginx site configuration is unavailable: $SITE_CONFIG" >&2
  exit 1
fi

rollback() {
  local status=$?
  if [[ "$CHANGED" -eq 1 && -n "$BACKUP" && -f "$BACKUP" ]]; then
    echo "Restoring Beacon Nginx configuration from $BACKUP" >&2
    install -m 0644 "$BACKUP" "$SITE_CONFIG"
    nginx -t >/dev/null 2>&1 && systemctl reload nginx || true
  fi
  exit "$status"
}
trap rollback ERR

tmp="$(mktemp "${SITE_CONFIG}.capture-route.XXXXXX")"

awk '
  /^[[:space:]]*location[[:space:]]+\/api\/trpc[[:space:]]*\{/ { in_capture=1 }
  in_capture && /^[[:space:]]*proxy_pass[[:space:]]+http:\/\/127\.0\.0\.1:3020;[[:space:]]*$/ {
    sub("127.0.0.1:3020", "127.0.0.1:3012")
    changed += 1
  }
  { print }
  in_capture && /^[[:space:]]*\}[[:space:]]*$/ { in_capture=0 }
  END {
    if (changed > 1) {
      print "ERROR: more than one Beacon tRPC proxy target matched" > "/dev/stderr"
      exit 42
    }
  }
' "$SITE_CONFIG" > "$tmp"

if grep -qE '^[[:space:]]*location[[:space:]]+/api/trpc[[:space:]]*\{' "$SITE_CONFIG"; then
  :
else
  echo "ERROR: Beacon tRPC location is absent from $SITE_CONFIG" >&2
  exit 1
fi

if ! grep -A12 -E '^[[:space:]]*location[[:space:]]+/api/trpc[[:space:]]*\{' "$tmp" | grep -q 'proxy_pass http://127.0.0.1:3012;'; then
  echo "ERROR: Beacon tRPC location did not resolve to port 3012" >&2
  exit 1
fi

if ! cmp -s "$SITE_CONFIG" "$tmp"; then
  install -d -m 0700 "$BACKUP_DIR"
  BACKUP="$BACKUP_DIR/$(basename "$SITE_CONFIG").$(date -u +%Y%m%dT%H%M%SZ).bak"
  cp -p "$SITE_CONFIG" "$BACKUP"
  install -m 0644 "$tmp" "$SITE_CONFIG"
  CHANGED=1
fi

nginx -t
systemctl reload nginx

status="$(curl -ksS --resolve "${PUBLIC_HOST}:443:127.0.0.1" -o /tmp/beacon-capture-route-probe -w '%{http_code}' \
  -H "Origin: https://${PUBLIC_HOST}" \
  "https://${PUBLIC_HOST}/api/trpc/capture.submit?batch=1")"
if [[ "$status" != "405" ]]; then
  echo "ERROR: capture route probe expected 405 for payload-free mutation GET, received $status" >&2
  false
fi

echo "Beacon capture route verified: direct-origin no-payload mutation probe returned 405."
if [[ "$CHANGED" -eq 1 ]]; then
  echo "Beacon capture route rewired with backup: $BACKUP"
else
  echo "Beacon capture route already targeted port 3012; no Nginx content change required."
fi
