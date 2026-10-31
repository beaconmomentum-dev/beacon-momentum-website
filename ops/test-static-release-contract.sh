#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TMP_ROOT="$(mktemp -d)"
trap 'rm -rf "$TMP_ROOT"' EXIT

SITE_ROOT="$TMP_ROOT/site"
SHARED="$TMP_ROOT/shared"
ENV_FILE="$TMP_ROOT/env.production"
mkdir -p "$SITE_ROOT/assets" "$SHARED"
printf 'NODE_ENV=production\nPORT=3999\n' > "$ENV_FILE"
printf 'console.log("beacon-contract");\n' > "$SITE_ROOT/assets/index-contract.js"
printf ':root{color:#0D1D29}\n' > "$SITE_ROOT/assets/index-contract.css"
cat > "$SITE_ROOT/index.html" <<'HTML'
<!doctype html><html><head><link rel="stylesheet" href="/assets/index-contract.css"></head><body><div id="root"></div><script type="module" src="/assets/index-contract.js"></script></body></html>
HTML

BEACON_SITE_ROOT="$SITE_ROOT" \
BEACON_SHARED_ASSET_DIR="$SHARED" \
BEACON_ENV_FILE="$ENV_FILE" \
BEACON_OPTIONAL_RUNTIME_FILE="$TMP_ROOT/not-present" \
BEACON_STARTUP_VALIDATE_ONLY=1 \
  "$REPO_ROOT/ops/start-beacon-momentum-www.sh"

test -s "$SHARED/index-contract.js"
test -s "$SHARED/index-contract.css"

"$REPO_ROOT/ops/test-readiness-map-route-contract.sh"

rm -f "$SITE_ROOT/assets/index-contract.css"
if BEACON_SITE_ROOT="$SITE_ROOT" \
  BEACON_SHARED_ASSET_DIR="$TMP_ROOT/failing-shared" \
  BEACON_ENV_FILE="$ENV_FILE" \
  BEACON_OPTIONAL_RUNTIME_FILE="$TMP_ROOT/not-present" \
  BEACON_STARTUP_VALIDATE_ONLY=1 \
  "$REPO_ROOT/ops/start-beacon-momentum-www.sh" >/dev/null 2>&1; then
  echo "ERROR: startup contract did not fail when a referenced asset was absent" >&2
  exit 1
fi

echo "Static release and startup asset contract tests passed."

INSTALLER="$REPO_ROOT/ops/deploy-beacon-www-release.sh"
WORKFLOW="$REPO_ROOT/.github/workflows/deploy.yml"
bash -n "$INSTALLER"
grep -Fq 'worktree add --detach "$RELEASE_DIR" "$DEPLOY_SHA"' "$INSTALLER"
grep -Fq 'pnpm@10.34.5' "$INSTALLER"
grep -Fq 'pnpm install --frozen-lockfile --strict-peer-dependencies' "$INSTALLER"
grep -Fq 'WATCH_LIVE_CHECKOUT_ENABLED:-false' "$INSTALLER"
grep -Fq '"--rollback"' "$INSTALLER"
if grep -Fq 'git pull origin main' "$INSTALLER"; then
  echo "ERROR: deployment installer must not pull or mutate the production checkout" >&2
  exit 1
fi
grep -Fq 'ops/deploy-beacon-www-release.sh' "$WORKFLOW"
grep -Fq 'deploy-beacon-www.sh --rollback' "$WORKFLOW"
echo "Versioned exact-SHA installer and rollback contract tests passed."
