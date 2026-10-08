#!/usr/bin/env bash
# Private, loopback-only Readiness Map staging launcher.
# Do not proxy this process through a public hostname or production site route.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="${BEACON_REPO_ROOT:-$(cd "$SCRIPT_DIR/.." && pwd)}"
ENV_FILE="${BEACON_STAGING_ENV_FILE:-$REPO_ROOT/.env.staging}"
PORT="${BEACON_STAGING_PORT:-4011}"
HOST="${BEACON_STAGING_HOST:-127.0.0.1}"

if [[ ! -r "$ENV_FILE" ]]; then
  echo "ERROR: required private staging environment is unavailable: $ENV_FILE" >&2
  exit 1
fi
if [[ ! -f "$REPO_ROOT/dist/index.js" || ! -f "$REPO_ROOT/dist/public/index.html" ]]; then
  echo "ERROR: staging build is incomplete under: $REPO_ROOT/dist" >&2
  exit 1
fi

set -a
# shellcheck source=/dev/null
source "$ENV_FILE"
set +a

export NODE_ENV=production
export HOST
export PORT

cd "$REPO_ROOT/dist"
exec node index.js
