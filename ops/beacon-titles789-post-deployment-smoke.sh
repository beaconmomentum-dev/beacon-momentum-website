#!/usr/bin/env bash
# Beacon Titles 7–9 post-deployment verification and smoke test.
# Read-only: this script performs no deployment, restart, content change,
# database mutation, form submission, or rollback.
#
# Usage:
#   chmod +x Beacon_Titles_7_8_9_Post_Deployment_Verification_Smoke_Test_2026-11-15.sh
#   BASE_URL=https://beaconmomentum.com \
#   EXPECTED_DEPLOY_SHA=<optional-sha> \
#   REQUIRE_BROWSER_SMOKE=1 \
#   BROWSER_SMOKE_COMMAND='pnpm exec playwright test tests/live-mobile-smoke.spec.ts' \
#   ./Beacon_Titles_7_8_9_Post_Deployment_Verification_Smoke_Test_2026-11-15.sh
#
# If EXPECTED_DEPLOY_SHA is supplied, the script checks the origin's optional
# deployment marker at /__beacon_deployed_sha. A missing marker is a failure.
# The marker must not expose secrets.

set -Eeuo pipefail
IFS=$'\n\t'

BASE_URL="${BASE_URL:-https://beaconmomentum.com}"
EXPECTED_DEPLOY_SHA="${EXPECTED_DEPLOY_SHA:-}"
EXPECTED_DATE="${EXPECTED_DATE:-November 15, 2026}"
REQUIRE_BROWSER_SMOKE="${REQUIRE_BROWSER_SMOKE:-0}"
BROWSER_SMOKE_COMMAND="${BROWSER_SMOKE_COMMAND:-}"
CURL_MAX_TIME="${CURL_MAX_TIME:-25}"
USER_AGENT="${USER_AGENT:-Beacon-Post-Deploy-Smoke/1.0}"

BASE_URL="${BASE_URL%/}"
WORK_DIR="${TMPDIR:-/tmp}/beacon-post-deploy-smoke.$(date -u +%Y%m%dT%H%M%SZ).$$"
mkdir -p "$WORK_DIR"
trap 'rm -rf "$WORK_DIR"' EXIT

pass_count=0
fail_count=0

pass() {
  pass_count=$((pass_count + 1))
  printf 'PASS  %s\n' "$1"
}

fail() {
  fail_count=$((fail_count + 1))
  printf 'FAIL  %s\n' "$1" >&2
}

require_command() {
  command -v "$1" >/dev/null 2>&1 || {
    echo "Required command is unavailable: $1" >&2
    exit 2
  }
}

fetch() {
  local url="$1"
  local body="$2"
  local headers="$3"
  curl --silent --show-error --location --fail \
    --connect-timeout 10 --max-time "$CURL_MAX_TIME" \
    -A "$USER_AGENT" -D "$headers" -o "$body" "$url"
}

status_code() {
  local url="$1"
  curl --silent --show-error --location \
    --connect-timeout 10 --max-time "$CURL_MAX_TIME" \
    -A "$USER_AGENT" -o /dev/null -w '%{http_code}' "$url"
}

check_contains() {
  local file="$1"
  local marker="$2"
  local description="$3"
  if grep -Fq -- "$marker" "$file"; then
    pass "$description"
  else
    fail "$description (marker not found: $marker)"
  fi
}

check_absent() {
  local file="$1"
  local marker="$2"
  local description="$3"
  if grep -Fqi -- "$marker" "$file"; then
    fail "$description (forbidden marker found: $marker)"
  else
    pass "$description"
  fi
}

check_route() {
  local slug="$1"
  local title_marker="$2"
  local label="$3"
  local body="$WORK_DIR/${slug}.html"
  local headers="$WORK_DIR/${slug}.headers"
  local url="$BASE_URL/signal/$slug"

  if fetch "$url" "$body" "$headers"; then
    pass "$label route returned HTTP 200: $url"
  else
    fail "$label route could not be fetched: $url"
    return
  fi

  check_contains "$body" "$title_marker" "$label title marker is present"
  check_contains "$body" "$EXPECTED_DATE" "$label publication date is present"
  check_absent "$body" '[APPROVED PUBLICATION DATE]' "$label has no publication-date placeholder"
  check_absent "$body" 'PRIVATE — HOLD' "$label has no private-hold marker"
  check_absent "$body" 'PRIVATE — NOT PUBLISHED' "$label has no not-published marker"
  check_absent "$body" 'lorem ipsum' "$label has no placeholder copy"

  if grep -Eqi '<meta[^>]+(name=.*robots|content=.*noindex)' "$body"; then
    fail "$label does not contain a noindex directive"
  else
    pass "$label does not contain an unexpected noindex directive"
  fi

  if grep -Eqi '<link[^>]+rel=.*canonical[^>]+href=.*https://beaconmomentum\.com/signal/' "$body"; then
    pass "$label canonical link remains in /signal/ family"
  else
    fail "$label canonical link is missing or outside /signal/ family"
  fi

  if grep -Eqi '/assets/[^ ]+' "$body"; then
    pass "$label references generated /assets/ bundle"
  else
    fail "$label has no generated /assets/ bundle reference"
  fi

  local asset
  while IFS= read -r asset; do
    [[ -n "$asset" ]] || continue
    local asset_url="$BASE_URL$asset"
    local asset_code
    asset_code="$(status_code "$asset_url")" || asset_code="000"
    if [[ "$asset_code" == "200" ]]; then
      pass "$label asset is reachable: $asset"
    else
      fail "$label asset is not reachable (HTTP $asset_code): $asset"
    fi
  done < <(
    grep -oE "/assets/[^\"' ]+" "$body" | sed 's/[),;]$//' | sort -u
  )
}

require_command curl
grep --version >/dev/null 2>&1 || true

printf '%s\n' 'Beacon Titles 7–9 post-deployment verification'
printf 'Base URL: %s\n' "$BASE_URL"
printf 'Expected date: %s\n' "$EXPECTED_DATE"
printf 'Started UTC: %s\n' "$(date -u '+%Y-%m-%dT%H:%M:%SZ')"
printf '%s\n' 'Read-only mode: enabled'
printf '%s\n' '--- origin checks ---'

root_body="$WORK_DIR/root.html"
root_headers="$WORK_DIR/root.headers"
if fetch "$BASE_URL/" "$root_body" "$root_headers"; then
  pass 'public origin returned HTTP 200'
else
  fail 'public origin did not return HTTP 200'
fi

if grep -Eqi '<title>[^<]*Beacon' "$root_body"; then
  pass 'public origin has Beacon title metadata'
else
  fail 'public origin is missing expected Beacon title metadata'
fi

if grep -Eqi '/assets/[^ ]+' "$root_body"; then
  pass 'public origin references a generated asset bundle'
else
  fail 'public origin has no generated asset bundle reference'
fi

if [[ -n "$EXPECTED_DEPLOY_SHA" ]]; then
  deploy_sha_body="$WORK_DIR/deployed-sha"
  deploy_sha_code="$(status_code "$BASE_URL/__beacon_deployed_sha")" || deploy_sha_code="000"
  if [[ "$deploy_sha_code" != "200" ]]; then
    fail "deployment marker endpoint unavailable; expected SHA verification cannot run (HTTP $deploy_sha_code)"
  else
    fetch "$BASE_URL/__beacon_deployed_sha" "$deploy_sha_body" "$WORK_DIR/deployed-sha.headers"
    actual_sha="$(tr -d '[:space:]' < "$deploy_sha_body")"
    if [[ "$actual_sha" == "$EXPECTED_DEPLOY_SHA" ]]; then
      pass "deployment marker matches expected commit $EXPECTED_DEPLOY_SHA"
    else
      fail "deployment marker mismatch: expected $EXPECTED_DEPLOY_SHA, got $actual_sha"
    fi
  fi
else
  pass 'commit-marker check skipped because EXPECTED_DEPLOY_SHA was not supplied'
fi

printf '%s\n' '--- Titles 7–9 route checks ---'
check_route \
  'ai-advertising-agent-measurement' \
  'AI Advertising Agent' \
  'Title 7 — AI Advertising Agent Measurement'
check_route \
  'a-forecast-is-not-a-finish-line' \
  'A Forecast Is Not a Finish Line' \
  'Title 8 — A Forecast Is Not a Finish Line'
check_route \
  'claude-meetings-a-permission-system-not-a-notetaker' \
  'Claude Meetings' \
  'Title 9 — Claude Meetings'

printf '%s\n' '--- capture endpoint check ---'
capture_url="$BASE_URL/api/trpc/capture.submit?batch=1"
capture_code="$(curl --silent --show-error --max-time "$CURL_MAX_TIME" \
  -o /dev/null -w '%{http_code}' \
  -H 'Origin: https://beaconmomentum.com' \
  "$capture_url")" || capture_code="000"
if [[ "$capture_code" == "405" ]]; then
  pass 'payload-free capture endpoint rejects the read-only probe with HTTP 405'
else
  fail "payload-free capture endpoint returned HTTP $capture_code instead of 405"
fi

printf '%s\n' '--- cache and security headers ---'
for header in 'strict-transport-security' 'x-content-type-options'; do
  if grep -Eqi "^${header}:" "$root_headers"; then
    pass "root response includes $header"
  else
    fail "root response is missing $header"
  fi
done

printf '%s\n' '--- optional browser/mobile/system review ---'
if [[ -n "$BROWSER_SMOKE_COMMAND" ]]; then
  printf 'Running configured browser command (output saved under %s)\n' "$WORK_DIR/browser-smoke.log"
  if bash -lc "$BROWSER_SMOKE_COMMAND" >"$WORK_DIR/browser-smoke.log" 2>&1; then
    pass 'configured browser/mobile smoke command passed'
  else
    fail 'configured browser/mobile smoke command failed; see browser-smoke.log'
  fi
elif [[ "$REQUIRE_BROWSER_SMOKE" == "1" ]]; then
  fail 'browser/mobile smoke is required but BROWSER_SMOKE_COMMAND is not configured'
else
  printf 'NOTE  Browser/mobile/system-wide congruence review was not automated in this run.\n'
  printf 'NOTE  Complete the mandatory desktop/mobile/system-wide review before release closure.\n'
fi

printf '%s\n' '--- summary ---'
printf 'PASS=%s FAIL=%s\n' "$pass_count" "$fail_count"
printf 'Finished UTC: %s\n' "$(date -u '+%Y-%m-%dT%H:%M:%SZ')"
printf 'Evidence directory: %s\n' "$WORK_DIR"

if (( fail_count > 0 )); then
  echo 'RESULT: BLOCKED — do not announce or close the release.' >&2
  exit 1
fi

echo 'RESULT: HTTP/asset smoke checks passed.'
if [[ "$REQUIRE_BROWSER_SMOKE" != "1" || -n "$BROWSER_SMOKE_COMMAND" ]]; then
  echo 'Release closure still requires recorded desktop, mobile, and system-wide congruence acceptance.'
fi
