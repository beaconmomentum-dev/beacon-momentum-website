#!/usr/bin/env bash
# Configure the Marketing-to-Community Watch Checkout Sessions bridge.
# This script is streamed over the pinned SSH connection and never prints the
# bridge secret or submits a Checkout Session/payment.
set -Eeuo pipefail
umask 077

usage() {
  echo 'Usage: configure-watch-checkout-runtime.sh --validate-inputs|--execute RELEASE_SHA' >&2
}

MODE="${1:-}"
EXPECTED_RELEASE_SHA="${2:-}"
if [[ "$#" -ne 2 || ( "$MODE" != '--validate-inputs' && "$MODE" != '--execute' ) ]]; then
  usage
  exit 2
fi
[[ "$EXPECTED_RELEASE_SHA" =~ ^[0-9a-f]{40}$ ]] || { echo 'ERROR: expected release SHA is invalid.' >&2; exit 2; }
if [[ "$MODE" == '--validate-inputs' ]]; then
  echo 'input_format=valid; production host not contacted; no files changed'
  exit 0
fi

[[ "$(id -u)" -eq 0 ]] || { echo 'ERROR: production configuration must run as root.' >&2; exit 1; }
[[ "$(hostname)" == 'Beacon-Brands-Hub' ]] || { echo 'ERROR: refusing to configure a host other than Beacon-Brands-Hub.' >&2; exit 1; }

APP_ROOT='/var/www/beacon-momentum-www'
RELEASES_ROOT='/var/www/beacon-momentum-releases'
RUNTIME_FILE='/root/beacon-watch-checkout-runtime'
BACKUP_DIR='/root/.work/watch-launch-readiness-20261106'
PM2_NAME='beacon-momentum-www'
PORT='3012'
COMMUNITY_BRIDGE_URL='https://beaconcommunity.net/api/watch/checkout-session'
BRIDGE_SECRET_FILE="${WATCH_CHECKOUT_BRIDGE_SECRET_FILE:-}"
BRIDGE_SECRET=''
BACKUP=''
TEMP_RUNTIME=''
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
RUNTIME_CHANGED=0
HAD_PREVIOUS_RUNTIME=0
SUCCESS=0

PREVIOUS_WATCH_BILLING_MODE_SET="${WATCH_BILLING_MODE+x}"
PREVIOUS_WATCH_BILLING_MODE="${WATCH_BILLING_MODE-}"
PREVIOUS_WATCH_SESSION_ENABLED_SET="${WATCH_CHECKOUT_SESSION_ENABLED+x}"
PREVIOUS_WATCH_SESSION_ENABLED="${WATCH_CHECKOUT_SESSION_ENABLED-}"
PREVIOUS_WATCH_BRIDGE_URL_SET="${WATCH_CHECKOUT_BRIDGE_URL+x}"
PREVIOUS_WATCH_BRIDGE_URL="${WATCH_CHECKOUT_BRIDGE_URL-}"
PREVIOUS_WATCH_BRIDGE_SECRET_SET="${WATCH_CHECKOUT_BRIDGE_SECRET+x}"
PREVIOUS_WATCH_BRIDGE_SECRET="${WATCH_CHECKOUT_BRIDGE_SECRET-}"

restore_watch_environment() {
  unset WATCH_BILLING_MODE WATCH_CHECKOUT_SESSION_ENABLED WATCH_CHECKOUT_BRIDGE_URL WATCH_CHECKOUT_BRIDGE_SECRET
  if [[ "$HAD_PREVIOUS_RUNTIME" == '1' && -s "$RUNTIME_FILE" ]]; then
    set -a
    # shellcheck source=/dev/null
    if ! . "$RUNTIME_FILE"; then
      set +a
      return 1
    fi
    set +a
    return 0
  fi
  [[ "$PREVIOUS_WATCH_BILLING_MODE_SET" != 'x' ]] || export WATCH_BILLING_MODE="$PREVIOUS_WATCH_BILLING_MODE"
  [[ "$PREVIOUS_WATCH_SESSION_ENABLED_SET" != 'x' ]] || export WATCH_CHECKOUT_SESSION_ENABLED="$PREVIOUS_WATCH_SESSION_ENABLED"
  [[ "$PREVIOUS_WATCH_BRIDGE_URL_SET" != 'x' ]] || export WATCH_CHECKOUT_BRIDGE_URL="$PREVIOUS_WATCH_BRIDGE_URL"
  [[ "$PREVIOUS_WATCH_BRIDGE_SECRET_SET" != 'x' ]] || export WATCH_CHECKOUT_BRIDGE_SECRET="$PREVIOUS_WATCH_BRIDGE_SECRET"
}

wait_for_local_homepage() {
  local attempt
  for ((attempt=1; attempt<=30; attempt++)); do
    if curl -fsS --max-time 2 "http://127.0.0.1:$PORT/" >/dev/null 2>&1; then
      return 0
    fi
    sleep 1
  done
  return 1
}

rollback_on_error() {
  local rc=$?
  trap - EXIT
  if [[ "$rc" -ne 0 && "$RUNTIME_CHANGED" == '1' ]]; then
    if [[ "$HAD_PREVIOUS_RUNTIME" == '1' && -s "$BACKUP" ]]; then
      local restore_tmp
      restore_tmp="$(mktemp "$RUNTIME_FILE.rollback.XXXXXX")"
      cp -a "$BACKUP" "$restore_tmp"
      mv -f "$restore_tmp" "$RUNTIME_FILE"
      echo 'rollback_runtime=previous_file_restored'
    else
      rm -f -- "$RUNTIME_FILE"
      echo 'rollback_runtime=new_file_removed'
    fi
    restore_watch_environment || echo 'rollback_environment=restore_failed' >&2
    pm2 restart "$PM2_NAME" --update-env >"/tmp/marketing-watch-runtime-rollback-$STAMP.log" 2>&1 || true
    if wait_for_local_homepage; then
      echo 'rollback_health=local_homepage_200'
    else
      echo 'rollback_health=not_confirmed' >&2
    fi
  fi
  [[ -z "$BRIDGE_SECRET_FILE" ]] || rm -f -- "$BRIDGE_SECRET_FILE"
  [[ -z "$TEMP_RUNTIME" ]] || rm -f -- "$TEMP_RUNTIME"
  unset BRIDGE_SECRET
  if [[ "$SUCCESS" != '1' && "$rc" -ne 0 ]]; then
    echo 'watch_checkout_runtime=failed_closed; no Checkout Session or payment was submitted.' >&2
  fi
  exit "$rc"
}
trap rollback_on_error EXIT

case "$BRIDGE_SECRET_FILE" in
  /root/.work/watch-launch-readiness-20261106/marketing-watch-bridge-[0-9]*) ;;
  *) echo 'ERROR: protected bridge-secret file path is invalid.' >&2; exit 1 ;;
esac
[[ -f "$BRIDGE_SECRET_FILE" && "$(stat -c '%a' "$BRIDGE_SECRET_FILE")" == '600' ]] || {
  echo 'ERROR: protected bridge-secret file is missing or has unsafe permissions.' >&2
  exit 1
}
BRIDGE_SECRET="$(cat "$BRIDGE_SECRET_FILE")"
rm -f -- "$BRIDGE_SECRET_FILE"
BRIDGE_SECRET_FILE=''
unset WATCH_CHECKOUT_BRIDGE_SECRET_FILE
[[ "${#BRIDGE_SECRET}" -ge 32 && "$BRIDGE_SECRET" != *$'\n'* && "$BRIDGE_SECRET" != *$'\r'* ]] || {
  echo 'ERROR: bridge secret is missing, too short, or contains a line break.' >&2
  exit 1
}

[[ -d "$APP_ROOT" && -d "$RELEASES_ROOT" ]] || { echo 'ERROR: managed Marketing release directories are unavailable.' >&2; exit 1; }
ACTIVE_RECORD="$(pm2 jlist | node -e '
let raw = "";
process.stdin.on("data", chunk => raw += chunk);
process.stdin.on("end", () => {
  const app = JSON.parse(raw).find(item => item.name === "beacon-momentum-www");
  if (!app) process.exit(2);
  const env = app.pm2_env.env || app.pm2_env;
  process.stdout.write([app.pm2_env.status || "", env.BEACON_REPO_ROOT || ""].join("\t"));
});
')"
IFS=$'\t' read -r ACTIVE_STATUS ACTIVE_ROOT <<< "$ACTIVE_RECORD"
[[ "$ACTIVE_STATUS" == 'online' ]] || { echo 'ERROR: Marketing PM2 process is not online.' >&2; exit 1; }
case "$ACTIVE_ROOT" in "$RELEASES_ROOT"/*) ;; *) echo 'ERROR: active Marketing process is not using a managed release.' >&2; exit 1 ;; esac
[[ "$(git -C "$ACTIVE_ROOT" rev-parse HEAD)" == "$EXPECTED_RELEASE_SHA" ]] || {
  echo 'ERROR: active Marketing release SHA differs from the explicitly expected SHA; no files changed.' >&2
  exit 1
}
[[ -f "$ACTIVE_ROOT/server/payment/watchPaymentLink.ts" && -f "$ACTIVE_ROOT/ops/start-beacon-momentum-www.sh" ]] || {
  echo 'ERROR: active release does not contain the Watch bridge handler and launcher.' >&2
  exit 1
}
grep -Fq 'source "$WATCH_SESSION_RUNTIME_FILE"' "$ACTIVE_ROOT/ops/start-beacon-momentum-www.sh" || {
  echo 'ERROR: active release launcher does not load the isolated Watch runtime file.' >&2
  exit 1
}

install -d -o root -g root -m 700 "$BACKUP_DIR"
if [[ -e "$RUNTIME_FILE" ]]; then
  [[ -f "$RUNTIME_FILE" && ! -L "$RUNTIME_FILE" ]] || { echo 'ERROR: Watch runtime path is not a regular file.' >&2; exit 1; }
  [[ "$(stat -c '%u:%g:%a' "$RUNTIME_FILE")" == '0:0:600' ]] || {
    echo 'ERROR: existing Watch runtime file has unexpected owner or permissions.' >&2
    exit 1
  }
  BACKUP="$BACKUP_DIR/marketing-watch-runtime.before.$STAMP"
  cp -a "$RUNTIME_FILE" "$BACKUP"
  HAD_PREVIOUS_RUNTIME=1
fi
TEMP_RUNTIME="$(mktemp "$RUNTIME_FILE.tmp.XXXXXX")"
chmod 600 "$TEMP_RUNTIME"
{
  printf 'export WATCH_BILLING_MODE=%q\n' 'LIVE'
  printf 'export WATCH_CHECKOUT_SESSION_ENABLED=%q\n' 'true'
  printf 'export WATCH_CHECKOUT_BRIDGE_URL=%q\n' "$COMMUNITY_BRIDGE_URL"
  printf 'export WATCH_CHECKOUT_BRIDGE_SECRET=%q\n' "$BRIDGE_SECRET"
} > "$TEMP_RUNTIME"
chown root:root "$TEMP_RUNTIME"
chmod 600 "$TEMP_RUNTIME"
mv -f "$TEMP_RUNTIME" "$RUNTIME_FILE"
TEMP_RUNTIME=''
RUNTIME_CHANGED=1

set -a
# shellcheck source=/dev/null
. "$RUNTIME_FILE"
set +a
[[ "$WATCH_BILLING_MODE" == 'LIVE' && "$WATCH_CHECKOUT_SESSION_ENABLED" == 'true' && "$WATCH_CHECKOUT_BRIDGE_URL" == "$COMMUNITY_BRIDGE_URL" && "$WATCH_CHECKOUT_BRIDGE_SECRET" == "$BRIDGE_SECRET" ]] || {
  echo 'ERROR: isolated Watch runtime file did not read back as expected.' >&2
  exit 1
}

if ! pm2 restart "$PM2_NAME" --update-env >"/tmp/marketing-watch-runtime-pm2-$STAMP.log" 2>&1; then
  echo 'ERROR: Marketing PM2 restart failed; restoring the prior runtime.' >&2
  exit 1
fi
if ! wait_for_local_homepage; then
  echo 'ERROR: local Marketing homepage health check failed after runtime update.' >&2
  exit 1
fi
pm2 jlist | WATCH_EXPECTED_BRIDGE_SECRET="$BRIDGE_SECRET" node -e '
let raw = "";
process.stdin.on("data", chunk => raw += chunk);
process.stdin.on("end", () => {
  const app = JSON.parse(raw).find(item => item.name === "beacon-momentum-www");
  const env = app?.pm2_env?.env || app?.pm2_env || {};
  const ok = app?.pm2_env?.status === "online" &&
    env.WATCH_BILLING_MODE === "LIVE" &&
    env.WATCH_CHECKOUT_SESSION_ENABLED === "true" &&
    env.WATCH_CHECKOUT_BRIDGE_URL === "https://beaconcommunity.net/api/watch/checkout-session" &&
    env.WATCH_CHECKOUT_BRIDGE_SECRET === process.env.WATCH_EXPECTED_BRIDGE_SECRET;
  console.log(`watch_bridge_runtime_loaded=${ok ? "yes" : "no"}`);
  process.exit(ok ? 0 : 1);
});
' || { echo 'ERROR: PM2 process did not load the isolated Watch runtime settings.' >&2; exit 1; }

SUCCESS=1
unset BRIDGE_SECRET WATCH_CHECKOUT_BRIDGE_SECRET WATCH_CHECKOUT_BRIDGE_SECRET_FILE
printf 'watch_checkout_runtime=complete active_release_sha=%s\n' "$EXPECTED_RELEASE_SHA"
printf 'runtime_file_permissions=600; pm2_status=online; bridge_secret_value=withheld\n'
printf 'health_checks=local_homepage_200,runtime_flags_loaded; no Checkout Session or payment was submitted\n'
