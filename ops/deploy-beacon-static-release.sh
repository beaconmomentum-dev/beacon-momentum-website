#!/usr/bin/env bash
# Deploy a pre-built Beacon public static release without exposing a new Vite
# entry document until every referenced hashed asset is in the live Nginx alias.
#
# Usage (run on the Beacon production host):
#   ops/deploy-beacon-static-release.sh /path/to/dist/public
#
# This script intentionally handles only static output. If the server bundle
# changes, deploy dist/index.js through the approved process separately, then
# restart beacon-momentum-www only after this script has completed successfully.
set -euo pipefail

BUILD_PUBLIC_DIR="${1:?Usage: $0 /path/to/dist/public}"
SITE_ROOT="${BEACON_SITE_ROOT:-/var/www/beacon-momentum-www/dist/public}"
SHARED_ASSET_DIR="${BEACON_SHARED_ASSET_DIR:-/var/www/beacon-shared-assets}"
ORIGIN_IP="${BEACON_ORIGIN_IP:-127.0.0.1}"
PUBLIC_HOST="${BEACON_PUBLIC_HOST:-beaconmomentum.com}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SYNC_SCRIPT="$SCRIPT_DIR/../scripts/sync-beacon-shared-assets.sh"
STARTUP_SCRIPT="$REPO_ROOT/ops/start-beacon-momentum-www.sh"
LAUNCHER_TARGET="${BEACON_LAUNCHER_TARGET:-/root/start-beacon-momentum-www.sh}"
BUILD_INDEX="$BUILD_PUBLIC_DIR/index.html"

if [[ ! -x "$SYNC_SCRIPT" ]]; then
  echo "ERROR: shared-asset sync script is unavailable or not executable: $SYNC_SCRIPT" >&2
  exit 1
fi
if [[ ! -x "$STARTUP_SCRIPT" ]]; then
  echo "ERROR: guarded startup script is unavailable or not executable: $STARTUP_SCRIPT" >&2
  exit 1
fi

if [[ ! -f "$BUILD_INDEX" ]]; then
  echo "ERROR: built entry document not found: $BUILD_INDEX" >&2
  exit 1
fi

"$SYNC_SCRIPT" "$BUILD_PUBLIC_DIR/assets" "$SHARED_ASSET_DIR" "$BUILD_INDEX"

mapfile -t referenced_assets < <(
  grep -oE '(src|href)="/assets/[^"]+"' "$BUILD_INDEX" \
    | sed -E 's/^(src|href)="\/assets\///; s/"$//' \
    | sort -u
)

for asset in "${referenced_assets[@]}"; do
  asset_url="https://${PUBLIC_HOST}/assets/${asset}"
  if ! curl -ksS --noproxy '*' --resolve "${PUBLIC_HOST}:443:${ORIGIN_IP}" --fail --max-time 10 -o /dev/null "$asset_url"; then
    echo "ERROR: origin did not serve required asset: $asset_url" >&2
    exit 1
  fi
done

install -m 0644 "$BUILD_INDEX" "$SITE_ROOT/index.html"

for asset in "${referenced_assets[@]}"; do
  if ! grep -Fq "/assets/${asset}" "$SITE_ROOT/index.html"; then
    echo "ERROR: deployed entry document does not reference expected asset: $asset" >&2
    exit 1
  fi
done

install -m 0755 "$STARTUP_SCRIPT" "$LAUNCHER_TARGET"

printf 'Static release published safely: %s\n' "$BUILD_PUBLIC_DIR"
printf 'Verified public assets: %s\n' "${referenced_assets[*]}"
printf 'Guarded PM2 launcher installed: %s\n' "$LAUNCHER_TARGET"
