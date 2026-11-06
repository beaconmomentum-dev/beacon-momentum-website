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
grep -Fq 'migrate_legacy_ghl_key' "$INSTALLER"
grep -Fq 'legacy GHL credential was detected in the public build' "$INSTALLER"
grep -Fq '"--rollback"' "$INSTALLER"
if grep -Fq 'git pull origin main' "$INSTALLER"; then
  echo "ERROR: deployment installer must not pull or mutate the production checkout" >&2
  exit 1
fi
grep -Fq 'ops/deploy-beacon-www-release.sh' "$WORKFLOW"
grep -Fq 'inputs.release_sha' "$WORKFLOW"
grep -Fq 'deploy-beacon-www.sh --rollback' "$WORKFLOW"
grep -Fq 'runs-on: [self-hosted, macOS, ARM64, signalman-release]' "$WORKFLOW"
grep -Fq 'workflow_dispatch:' "$WORKFLOW"
if grep -Fq 'deploy/marketing-release-2026-10-31' "$WORKFLOW"; then
  echo "ERROR: the Marketing release branch must require explicit exact-SHA dispatch" >&2
  exit 1
fi
grep -Fq 'StrictHostKeyChecking=yes' "$WORKFLOW"
grep -Fq 'UserKnownHostsFile="$GITHUB_WORKSPACE/ops/production_known_hosts"' "$WORKFLOW"
grep -Fq 'KEY_PATH="$RUNNER_TEMP/beacon-production-deploy-key-${GITHUB_RUN_ID}-${GITHUB_RUN_ATTEMPT}"' "$WORKFLOW"
grep -Fq 'BEACON_DEPLOY_KEY_PATH=%s' "$WORKFLOW"
grep -Fq 'if: ${{ always() }}' "$WORKFLOW"
grep -Fq 'rm -f "$KEY_PATH"' "$WORKFLOW"
KEY_USE_COUNT="$(grep -oF -- '-i "$BEACON_DEPLOY_KEY_PATH"' "$WORKFLOW" | wc -l | tr -d '[:space:]')"
[[ "$KEY_USE_COUNT" == "4" ]]
if grep -Eq 'StrictHostKeyChecking=no|ssh-keyscan|base64 -d|~/.ssh|/\.ssh/' "$WORKFLOW"; then
  echo "ERROR: production workflow must use the tracked host pin and a cleaned runner-temp key" >&2
  exit 1
fi
ssh-keygen -F 159.203.81.39 -f "$REPO_ROOT/ops/production_known_hosts" >/dev/null
sed -n '/^migrate_legacy_ghl_key() {/,/^}/p' "$INSTALLER" > "$TMP_ROOT/migration-function.sh"
printf 'VITE_GHL_API_KEY=legacy-placeholder\n' > "$TMP_ROOT/migration.env"
chmod 0600 "$TMP_ROOT/migration.env"
TEST_LEGACY='dummy-secret#with spaces$and'
export ENV_FILE="$TMP_ROOT/migration.env" TEST_LEGACY
cat >> "$TMP_ROOT/migration-function.sh" <<'TEST'
migrate_legacy_ghl_key "$TEST_LEGACY"
set -a
source "$ENV_FILE"
set +a
[[ "${VITE_GHL_API_KEY:-}" == "legacy-placeholder" ]]
[[ "${GHL_API_KEY:-}" == "$TEST_LEGACY" ]]
if stat -c '%a' "$ENV_FILE" >/dev/null 2>&1; then
  env_mode="$(stat -c '%a' "$ENV_FILE")"
else
  env_mode="$(stat -f '%Lp' "$ENV_FILE")"
fi
[[ "$env_mode" == "600" ]]
TEST
bash "$TMP_ROOT/migration-function.sh" >/dev/null
echo "Versioned exact-SHA installer and rollback contract tests passed."
