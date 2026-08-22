#!/usr/bin/env bash
# Install the source-controlled Beacon Momentum `/downloads/` Nginx route.
set -euo pipefail

REPO_ROOT="${BEACON_REPO_ROOT:-/var/www/beacon-momentum-www}"
ACTIVE_CONFIG="${BEACON_NGINX_CONFIG:-/etc/nginx/sites-enabled/beacon-dashboard}"
SNIPPET_SOURCE="$REPO_ROOT/ops/nginx/beacon-momentum-downloads-location.conf"
SNIPPET_TARGET="${BEACON_DOWNLOADS_SNIPPET:-/etc/nginx/snippets/beacon-momentum-downloads-location.conf}"
BACKUP_DIR="${BEACON_NGINX_BACKUP_DIR:-/etc/nginx/backups}"
INCLUDE_LINE="    include /etc/nginx/snippets/beacon-momentum-downloads-location.conf;"
ANCHOR="    location /download {"

if [[ ! -r "$SNIPPET_SOURCE" ]]; then
  echo "ERROR: source-controlled downloads snippet is unavailable: $SNIPPET_SOURCE" >&2
  exit 1
fi
if [[ ! -r "$ACTIVE_CONFIG" ]]; then
  echo "ERROR: active Nginx config is unavailable: $ACTIVE_CONFIG" >&2
  exit 1
fi

install -d -m 0755 "$(dirname "$SNIPPET_TARGET")" "$BACKUP_DIR"
install -m 0644 "$SNIPPET_SOURCE" "$SNIPPET_TARGET"

if ! grep -Fq "$INCLUDE_LINE" "$ACTIVE_CONFIG"; then
  timestamp="$(date -u +%Y%m%dT%H%M%SZ)"
  cp -a "$ACTIVE_CONFIG" "$BACKUP_DIR/beacon-dashboard.before-downloads-route.$timestamp"
  python3 - "$ACTIVE_CONFIG" "$ANCHOR" "$INCLUDE_LINE" <<'PY'
from pathlib import Path
import sys

path = Path(sys.argv[1])
anchor = sys.argv[2]
include = sys.argv[3]
text = path.read_text()
if anchor not in text:
    raise SystemExit(f"ERROR: anchor not found in {path}: {anchor}")
text = text.replace(anchor, f"{include}\n\n{anchor}", 1)
path.write_text(text)
PY
fi

nginx -t
systemctl reload nginx

origin_url="https://beaconmomentum.com/downloads/signal-starter-pack-20260822.pdf"
tmp_file="$(mktemp)"
trap 'rm -f "$tmp_file"' EXIT
curl -ksS --resolve beaconmomentum.com:443:127.0.0.1 --fail --max-time 20 -o "$tmp_file" "$origin_url"
if ! file "$tmp_file" | grep -Fq 'PDF document'; then
  echo "ERROR: origin did not serve a PDF after Nginx reload: $origin_url" >&2
  file "$tmp_file" >&2
  exit 1
fi

printf 'Installed and verified Beacon Momentum downloads route: %s\n' "$origin_url"
