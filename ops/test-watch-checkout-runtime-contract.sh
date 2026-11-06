#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LAUNCHER="$ROOT/ops/start-beacon-momentum-www.sh"
DEPLOYER="$ROOT/ops/deploy-beacon-www-release.sh"
CONFIG="$ROOT/ops/configure-watch-checkout-runtime.sh"
WORKFLOW="$ROOT/.github/workflows/configure-watch-checkout-live.yml"
CI="$ROOT/.github/workflows/marketing-validation.yml"

fail() { echo "FAIL: $*" >&2; exit 1; }
contains() { grep -Fq -- "$2" "$1" || fail "$1 missing required contract: $2"; }

contains "$LAUNCHER" 'WATCH_SESSION_RUNTIME_FILE="${BEACON_WATCH_SESSION_RUNTIME_FILE:-/root/beacon-watch-checkout-runtime}"'
contains "$LAUNCHER" 'source "$WATCH_SESSION_RUNTIME_FILE"'
contains "$DEPLOYER" 'WATCH_SESSION_RUNTIME_FILE="${BEACON_WATCH_SESSION_RUNTIME_FILE:-/root/beacon-watch-checkout-runtime}"'
contains "$DEPLOYER" 'source "$WATCH_SESSION_RUNTIME_FILE"'
contains "$CONFIG" "[[ \"\$(hostname)\" == 'Beacon-Brands-Hub' ]]"
contains "$CONFIG" 'git -C "$ACTIVE_ROOT" rev-parse HEAD'
contains "$CONFIG" 'WATCH_CHECKOUT_SESSION_ENABLED'
contains "$CONFIG" 'WATCH_CHECKOUT_BRIDGE_URL'
contains "$CONFIG" 'WATCH_CHECKOUT_BRIDGE_SECRET'
contains "$CONFIG" 'chmod 600'
contains "$CONFIG" 'mv -f "$TEMP_RUNTIME" "$RUNTIME_FILE"'
contains "$CONFIG" 'rollback_runtime=previous_file_restored'
contains "$CONFIG" 'watch_bridge_runtime_loaded='
contains "$WORKFLOW" 'runs-on: [self-hosted, macOS, ARM64, signalman-release]'
contains "$WORKFLOW" 'environment: production'
contains "$WORKFLOW" 'secrets.WATCH_CHECKOUT_BRIDGE_SECRET'
contains "$WORKFLOW" 'StrictHostKeyChecking=yes'
contains "$WORKFLOW" 'UserKnownHostsFile=$MARKETING_WATCH_KNOWN_HOSTS'
contains "$WORKFLOW" 'MARKETING_WATCH_REMOTE_SECRET_FILE'
contains "$WORKFLOW" 'if: always()'
contains "$CI" 'bash ops/test-watch-checkout-runtime-contract.sh'

if grep -E 'curl[^#]*(/the-watch/checkout|checkout-session)' "$CONFIG" "$WORKFLOW" >/dev/null; then
  fail 'contract must not probe the live Checkout route or create a session'
fi

echo 'PASS: Marketing Watch runtime is isolated, exact-SHA guarded, protected, rollback-capable, and has no live checkout probe.'
