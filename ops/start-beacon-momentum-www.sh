#!/usr/bin/env bash
# Source-controlled PM2 launcher for the canonical Beacon Momentum site.
# It fails closed unless the built entry document and every referenced hashed
# asset are present in the shared Nginx asset directory before Node starts.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [[ -n "${BEACON_REPO_ROOT:-}" ]]; then
  REPO_ROOT="$BEACON_REPO_ROOT"
elif [[ "$SCRIPT_DIR" == "/root" && -d "/var/www/beacon-momentum-www" ]]; then
  REPO_ROOT="/var/www/beacon-momentum-www"
else
  REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
fi
SITE_ROOT="${BEACON_SITE_ROOT:-$REPO_ROOT/dist/public}"
SHARED_ASSET_DIR="${BEACON_SHARED_ASSET_DIR:-/var/www/beacon-shared-assets}"
ENV_FILE="${BEACON_ENV_FILE:-$REPO_ROOT/.env.production}"
OPTIONAL_RUNTIME_FILE="${BEACON_OPTIONAL_RUNTIME_FILE:-/root/beacon-watch-test-runtime}"
SYNC_SCRIPT="$REPO_ROOT/scripts/sync-beacon-shared-assets.sh"

if [[ ! -r "$ENV_FILE" ]]; then
  echo "ERROR: required environment file is unavailable: $ENV_FILE" >&2
  exit 1
fi
if [[ ! -x "$SYNC_SCRIPT" ]]; then
  echo "ERROR: asset synchronization script is unavailable: $SYNC_SCRIPT" >&2
  exit 1
fi
if [[ ! -f "$SITE_ROOT/index.html" || ! -d "$SITE_ROOT/assets" ]]; then
  echo "ERROR: production client build is incomplete under: $SITE_ROOT" >&2
  exit 1
fi

set -a
# shellcheck source=/dev/null
source "$ENV_FILE"
if [[ -r "$OPTIONAL_RUNTIME_FILE" ]]; then
  # shellcheck source=/dev/null
  source "$OPTIONAL_RUNTIME_FILE"
fi
set +a

"$SYNC_SCRIPT" "$SITE_ROOT/assets" "$SHARED_ASSET_DIR" "$SITE_ROOT/index.html"

if [[ "${BEACON_STARTUP_VALIDATE_ONLY:-0}" == "1" ]]; then
  echo "Beacon startup contract validated without starting Node."
  exit 0
fi

echo "[startup] beacon-momentum-www starting with NODE_ENV=${NODE_ENV:-production} PORT=${PORT:-3012}"
cd "$REPO_ROOT/dist"
exec node index.js
