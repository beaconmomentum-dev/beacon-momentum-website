#!/usr/bin/env bash
# Versioned, staged release installer for beaconmomentum.com.
# Deploys an exact Git commit into a separate worktree and never cleans or
# switches the production source checkout, which may contain owner-side files.
set -Eeuo pipefail

APP_ROOT="${BEACON_APP_ROOT:-/var/www/beacon-momentum-www}"
RELEASES_ROOT="${BEACON_RELEASES_ROOT:-/var/www/beacon-momentum-releases}"
ENV_FILE="${BEACON_ENV_FILE:-$APP_ROOT/.env.production}"
OPTIONAL_RUNTIME_FILE="${BEACON_OPTIONAL_RUNTIME_FILE:-/root/beacon-watch-test-runtime}"
PROCESS_NAME="beacon-momentum-www"
PORT="${BEACON_PORT:-3012}"
PUBLIC_HOST="${BEACON_PUBLIC_HOST:-beaconmomentum.com}"
SHARED_ASSET_DIR="${BEACON_SHARED_ASSET_DIR:-/var/www/beacon-shared-assets}"
STATE_FILE="$RELEASES_ROOT/.previous-release"
DEPLOY_SHA="${BEACON_DEPLOY_SHA:-}"
RELEASE_DIR=""
PREVIOUS_ROOT="$APP_ROOT"
PREVIOUS_SITE_ROOT="$APP_ROOT/dist/public"
PREVIOUS_ENV_FILE="$ENV_FILE"
DEPLOY_STARTED=0

health_check() {
  local root_status="000"
  local mutation_status="000"
  local attempt
  for attempt in $(seq 1 20); do
    root_status="$(curl -ksS --max-time 3 -o /dev/null -w '%{http_code}' "http://127.0.0.1:${PORT}/" || true)"
    if [[ "$root_status" == "200" ]]; then
      mutation_status="$(curl -ksS --max-time 3 -o /dev/null -w '%{http_code}' \
        -H "Origin: https://${PUBLIC_HOST}" \
        "http://127.0.0.1:${PORT}/api/trpc/capture.submit?batch=1" || true)"
      if [[ "$mutation_status" == "405" ]]; then
        printf 'Health verified: root=%s payload-free-capture-mutation=%s\n' "$root_status" "$mutation_status"
        return 0
      fi
    fi
    sleep 2
  done
  printf 'ERROR: health failed: root=%s payload-free-capture-mutation=%s\n' "$root_status" "$mutation_status" >&2
  return 1
}

restart_release() {
  local repo_root="$1"
  local site_root="$2"
  local env_file="$3"
  BEACON_REPO_ROOT="$repo_root" \
  BEACON_SITE_ROOT="$site_root" \
  BEACON_ENV_FILE="$env_file" \
  pm2 restart "$PROCESS_NAME" --update-env
}

read_previous_pm2_paths() {
  local metadata
  metadata="$(pm2 jlist | node -e '
    let raw = "";
    process.stdin.on("data", chunk => raw += chunk);
    process.stdin.on("end", () => {
      const apps = JSON.parse(raw);
      const app = apps.find(item => item.name === "beacon-momentum-www");
      if (!app) process.exit(2);
      const env = app.pm2_env.env || app.pm2_env;
      const root = env.BEACON_REPO_ROOT || app.pm2_env.BEACON_REPO_ROOT || "";
      const site = env.BEACON_SITE_ROOT || app.pm2_env.BEACON_SITE_ROOT || "";
      const file = env.BEACON_ENV_FILE || app.pm2_env.BEACON_ENV_FILE || "";
      process.stdout.write([root, site, file].join("\t"));
    });
  ')"
  IFS=$'\t' read -r pm2_root pm2_site pm2_env_file <<< "$metadata"
  [[ -n "${pm2_root:-}" ]] && PREVIOUS_ROOT="$pm2_root"
  [[ -n "${pm2_site:-}" ]] && PREVIOUS_SITE_ROOT="$pm2_site" || PREVIOUS_SITE_ROOT="$PREVIOUS_ROOT/dist/public"
  [[ -n "${pm2_env_file:-}" ]] && PREVIOUS_ENV_FILE="$pm2_env_file"
  case "$PREVIOUS_ROOT" in
    "$APP_ROOT"|"$RELEASES_ROOT"/*) ;;
    *) echo "ERROR: refusing unexpected prior PM2 repository path" >&2; return 1 ;;
  esac
  [[ "$PREVIOUS_SITE_ROOT" == "$PREVIOUS_ROOT/dist/public" ]] || { echo "ERROR: refusing unexpected prior PM2 site path." >&2; return 1; }
  [[ "$PREVIOUS_ENV_FILE" == "$APP_ROOT/.env.production" ]] || { echo "ERROR: refusing unexpected prior runtime environment path." >&2; return 1; }
  [[ -d "$PREVIOUS_ROOT" ]] || { echo "ERROR: prior PM2 repository is unavailable" >&2; return 1; }
  [[ -f "$PREVIOUS_SITE_ROOT/index.html" ]] || { echo "ERROR: prior PM2 site entry is unavailable" >&2; return 1; }
  [[ -r "$PREVIOUS_ENV_FILE" ]] || { echo "ERROR: prior runtime environment file is unavailable" >&2; return 1; }
}

load_public_build_settings() {
  local source_file="$APP_ROOT/.env"
  [[ -r "$source_file" ]] || return 0
  while IFS=$'\t' read -r key encoded; do
    case "$key" in
      VITE_OAUTH_PORTAL_URL|VITE_APP_ID|VITE_GHL_API_KEY) ;;
      *) echo "ERROR: unexpected dotenv key returned." >&2; return 1 ;;
    esac
    printf -v "$key" '%s' "$(printf '%s' "$encoded" | base64 -d)"
    export "$key"
  done < <(node - "$source_file" <<'NODE'
const fs = require("node:fs");
const dotenv = require("dotenv");
const allowed = new Set(["VITE_OAUTH_PORTAL_URL", "VITE_APP_ID", "VITE_GHL_API_KEY"]);
const values = dotenv.parse(fs.readFileSync(process.argv[2]));
for (const key of allowed) {
  if (values[key]) console.log(`${key}\t${Buffer.from(values[key]).toString("base64")}`);
}
NODE
  )
}

migrate_legacy_ghl_key() {
  local legacy_key="$1"
  local tmp
  [[ -n "$legacy_key" ]] || { echo "ERROR: no existing GHL credential is available to migrate." >&2; return 1; }
  tmp="$(mktemp "$ENV_FILE.migrate.XXXXXX")"
  awk '!/^[[:space:]]*(export[[:space:]]+)?GHL_API_KEY=/' "$ENV_FILE" > "$tmp"
  printf '\nGHL_API_KEY=%q\n' "$legacy_key" >> "$tmp"
  chmod --reference="$ENV_FILE" "$tmp"
  chown --reference="$ENV_FILE" "$tmp"
  mv -f "$tmp" "$ENV_FILE"
  echo "Migrated the existing GHL credential to server-only GHL_API_KEY; retained the legacy alias."
}

rollback_to_previous() {
  local repo_root="$1"
  local site_root="$2"
  local env_file="$3"
  echo "Rolling back Marketing PM2 process to the previously active release."
  if ! restart_release "$repo_root" "$site_root" "$env_file"; then
    echo "ERROR: PM2 could not restart the prior release." >&2
    return 1
  fi
  if ! health_check; then
    echo "ERROR: the prior release did not pass its health check." >&2
    return 1
  fi
  pm2 save
  echo "Rollback completed and verified."
}

if [[ "${1:-}" == "--rollback" ]]; then
  [[ -r "$STATE_FILE" ]] || { echo "ERROR: no recorded previous Marketing release is available." >&2; exit 1; }
  IFS=$'\t' read -r saved_root saved_site saved_env < "$STATE_FILE"
  [[ -n "${saved_root:-}" && -n "${saved_site:-}" && -n "${saved_env:-}" ]] || { echo "ERROR: rollback record is incomplete." >&2; exit 1; }
  case "$saved_root" in
    "$APP_ROOT"|"$RELEASES_ROOT"/*) ;;
    *) echo "ERROR: refusing unexpected rollback repository path." >&2; exit 1 ;;
  esac
  [[ "$saved_site" == "$saved_root/dist/public" && "$saved_env" == "$APP_ROOT/.env.production" ]] || { echo "ERROR: rollback path record is invalid." >&2; exit 1; }
  [[ -d "$saved_root" && -f "$saved_site/index.html" && -r "$saved_env" ]] || { echo "ERROR: rollback target is incomplete." >&2; exit 1; }
  rollback_to_previous "$saved_root" "$saved_site" "$saved_env"
  exit 0
fi

[[ "$DEPLOY_SHA" =~ ^[0-9a-f]{40}$ ]] || { echo "ERROR: BEACON_DEPLOY_SHA must be a full 40-character commit SHA." >&2; exit 2; }
[[ -d "$APP_ROOT/.git" || -f "$APP_ROOT/.git" ]] || { echo "ERROR: production Git repository is unavailable." >&2; exit 1; }
[[ -r "$ENV_FILE" ]] || { echo "ERROR: production runtime environment file is unavailable." >&2; exit 1; }
pm2 describe "$PROCESS_NAME" >/dev/null 2>&1 || { echo "ERROR: Marketing PM2 process is unavailable." >&2; exit 1; }

read_previous_pm2_paths
mkdir -p "$RELEASES_ROOT"
RELEASE_DIR="$RELEASES_ROOT/$DEPLOY_SHA"
[[ ! -e "$RELEASE_DIR" ]] || { echo "ERROR: release path already exists; refusing to overwrite it." >&2; exit 1; }

on_error() {
  local status=$?
  trap - ERR
  if [[ "$DEPLOY_STARTED" == "1" ]]; then
    echo "ERROR: Marketing release failed; attempting automatic rollback." >&2
    rollback_to_previous "$PREVIOUS_ROOT" "$PREVIOUS_SITE_ROOT" "$PREVIOUS_ENV_FILE" || true
  fi
  exit "$status"
}
trap on_error ERR

printf 'Preparing Marketing release %s in isolated worktree.\n' "$DEPLOY_SHA"
git -C "$APP_ROOT" fetch --no-tags origin "$DEPLOY_SHA"
git -C "$APP_ROOT" cat-file -e "$DEPLOY_SHA^{commit}"
git -C "$APP_ROOT" worktree add --detach "$RELEASE_DIR" "$DEPLOY_SHA"

cd "$RELEASE_DIR"
npm exec --yes --package=pnpm@10.34.5 -- pnpm install --frozen-lockfile --strict-peer-dependencies
load_public_build_settings
set -a
# shellcheck source=/dev/null
source "$ENV_FILE"
if [[ -r "$OPTIONAL_RUNTIME_FILE" ]]; then
  # Match the production PM2 launcher environment without printing values.
  # shellcheck source=/dev/null
  source "$OPTIONAL_RUNTIME_FILE"
fi
set +a
if [[ -z "${GHL_API_KEY:-}" ]]; then
  migrate_legacy_ghl_key "${VITE_GHL_API_KEY:-}"
  set -a
  # shellcheck source=/dev/null
  source "$ENV_FILE"
  if [[ -r "$OPTIONAL_RUNTIME_FILE" ]]; then
    # shellcheck source=/dev/null
    source "$OPTIONAL_RUNTIME_FILE"
  fi
  set +a
fi
export NODE_ENV=production
[[ -n "${GHL_API_KEY:-}" ]] || { echo "ERROR: server-only GHL_API_KEY is absent from the production environment." >&2; exit 1; }
[[ "${WATCH_LIVE_CHECKOUT_ENABLED:-false}" != "true" ]] || { echo "ERROR: live Watch checkout is enabled; clear the price/terms verification gate before this release." >&2; exit 1; }

pnpm_version="$(npm exec --yes --package=pnpm@10.34.5 -- pnpm --version)"
[[ "$pnpm_version" == "10.34.5" ]] || { echo "ERROR: exact pinned pnpm version is unavailable." >&2; exit 1; }
printf 'Using pnpm %s with the committed frozen lockfile.\n' "$pnpm_version"
npm exec --yes --package=pnpm@10.34.5 -- pnpm run build

[[ -s "$RELEASE_DIR/dist/index.js" && -s "$RELEASE_DIR/dist/public/index.html" ]] || { echo "ERROR: staged build artifacts are incomplete." >&2; exit 1; }

state_tmp="$(mktemp "$RELEASES_ROOT/.previous-release.XXXXXX")"
printf '%s\t%s\t%s\n' "$PREVIOUS_ROOT" "$PREVIOUS_SITE_ROOT" "$PREVIOUS_ENV_FILE" > "$state_tmp"
chmod 0600 "$state_tmp"
install -m 0600 "$state_tmp" "$STATE_FILE"
rm -f "$state_tmp"

# The source-controlled helper copies content-hashed assets first, validates
# their public origin responses, then publishes the entry document. It also
# installs this release's guarded PM2 launcher.
DEPLOY_STARTED=1
BEACON_SITE_ROOT="$RELEASE_DIR/dist/public" \
BEACON_SHARED_ASSET_DIR="$SHARED_ASSET_DIR" \
BEACON_PUBLIC_HOST="$PUBLIC_HOST" \
BEACON_ORIGIN_IP=127.0.0.1 \
BEACON_LAUNCHER_TARGET=/root/start-beacon-momentum-www.sh \
  "$RELEASE_DIR/ops/deploy-beacon-static-release.sh" "$RELEASE_DIR/dist/public"

restart_release "$RELEASE_DIR" "$RELEASE_DIR/dist/public" "$ENV_FILE"
health_check
pm2 save
DEPLOY_STARTED=0
printf 'Marketing release deployed and verified: %s\n' "$DEPLOY_SHA"
printf 'Active release directory: %s\n' "$RELEASE_DIR"
