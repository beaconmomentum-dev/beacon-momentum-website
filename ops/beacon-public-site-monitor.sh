#!/usr/bin/env bash
# Deterministic public-site monitor for beaconmomentum.com.
#
# Required credential:
#   SLACK_WEBHOOK_URL_FILE — path to a private incoming-webhook URL bound only
#   to #beacon-site-alerts. The system service supplies this through systemd's
#   credential directory rather than an environment file.
#
# The script intentionally checks the public domain from an independent Beacon
# host. It verifies the failure mode that caused the 2026-08-09 white screen:
# an entry document referencing hashed assets unavailable through Nginx.

set -euo pipefail

readonly SITE_BASE_URL="${SITE_BASE_URL:-https://beaconmomentum.com}"
readonly STATE_DIR="${STATE_DIR:-/var/lib/beacon-public-site-monitor}"
readonly STATE_FILE="${STATE_DIR}/state"
readonly LOCK_FILE="${STATE_DIR}/monitor.lock"
readonly CONNECT_TIMEOUT_SECONDS="${CONNECT_TIMEOUT_SECONDS:-8}"
readonly TOTAL_TIMEOUT_SECONDS="${TOTAL_TIMEOUT_SECONDS:-20}"
readonly REPRESENTATIVE_ARTICLE_PATH="${REPRESENTATIVE_ARTICLE_PATH:-/signal/five-questions-keep-you-in-charge}"

mkdir -p "${STATE_DIR}"
exec 9>"${LOCK_FILE}"
if ! flock -n 9; then
  logger -t beacon-public-site-monitor "Skipped overlapping run."
  exit 0
fi

timestamp_utc() {
  date -u +"%Y-%m-%dT%H:%M:%SZ"
}

http_status() {
  curl --silent --show-error --location --max-time "${TOTAL_TIMEOUT_SECONDS}" \
    --connect-timeout "${CONNECT_TIMEOUT_SECONDS}" --output /dev/null \
    --write-out "%{http_code}" "$1" || printf '000'
}

send_slack_message() {
  local message="$1"
  local webhook_url=""
  if [[ -n "${SLACK_WEBHOOK_URL_FILE:-}" && -r "${SLACK_WEBHOOK_URL_FILE}" ]]; then
    webhook_url="$(tr -d '\r\n' < "${SLACK_WEBHOOK_URL_FILE}")"
  fi

  if [[ -z "${webhook_url}" ]]; then
    logger -t beacon-public-site-monitor "Slack delivery skipped: private webhook credential is not available."
    return 1
  fi

  # The message values are generated only from fixed monitor labels and HTTP
  # status codes; no untrusted page content is included in JSON.
  curl --silent --show-error --fail --max-time "${TOTAL_TIMEOUT_SECONDS}" \
    --connect-timeout "${CONNECT_TIMEOUT_SECONDS}" \
    -H 'Content-Type: application/json' \
    --data "{\"text\":\"${message}\"}" \
    "${webhook_url}" >/dev/null
}

record_state() {
  printf '%s\n' "$1" >"${STATE_FILE}"
}

read_state() {
  if [[ -f "${STATE_FILE}" ]]; then
    cat "${STATE_FILE}"
  else
    printf 'healthy:0\n'
  fi
}

run_test_alert() {
  local message="[Beacon Site Monitor] Test alert at $(timestamp_utc). The private alert path is configured; no public-site failure is being reported."
  send_slack_message "${message}"
  logger -t beacon-public-site-monitor "Sent controlled Slack delivery test."
}

if [[ "${1:-}" == "--test-alert" ]]; then
  run_test_alert
  exit 0
fi

declare -a failures=()

homepage_html="$(curl --silent --show-error --location --max-time "${TOTAL_TIMEOUT_SECONDS}" \
  --connect-timeout "${CONNECT_TIMEOUT_SECONDS}" "${SITE_BASE_URL}/" 2>/dev/null || true)"

if [[ -z "${homepage_html}" ]]; then
  failures+=("homepage body unavailable")
elif [[ "${homepage_html}" != *'id="root"'* ]]; then
  failures+=("homepage entry document missing root container")
fi

declare -a assets=()
while IFS= read -r asset; do
  [[ -n "${asset}" ]] && assets+=("${asset}")
done < <(printf '%s' "${homepage_html}" | grep -oE '/assets/[^"'\''[:space:]]+\.(js|css)' | sort -u || true)

if (( ${#assets[@]} == 0 )); then
  failures+=("homepage entry document references no JavaScript or CSS assets")
fi

for asset in "${assets[@]}"; do
  status="$(http_status "${SITE_BASE_URL}${asset}")"
  if [[ "${status}" != "200" ]]; then
    failures+=("asset ${asset} returned ${status}")
  fi
done

for path in "/signal" "${REPRESENTATIVE_ARTICLE_PATH}"; do
  status="$(http_status "${SITE_BASE_URL}${path}")"
  if [[ "${status}" != "200" ]]; then
    failures+=("route ${path} returned ${status}")
  fi
done

legacy_headers="$(curl --silent --show-error --head --max-time "${TOTAL_TIMEOUT_SECONDS}" \
  --connect-timeout "${CONNECT_TIMEOUT_SECONDS}" "${SITE_BASE_URL}/blog" 2>/dev/null || true)"
legacy_status="$(printf '%s\n' "${legacy_headers}" | awk 'toupper($1) ~ /^HTTP/ { status=$2 } END { print status }')"
legacy_location="$(printf '%s\n' "${legacy_headers}" | awk 'tolower($1) == "location:" { print $2 }' | tr -d '\r')"
if [[ ! "${legacy_status}" =~ ^(301|302|307|308)$ ]] || [[ "${legacy_location}" != *"/signal"* ]]; then
  failures+=("legacy /blog redirect is not resolving to /signal")
fi

previous_state="$(read_state)"
previous_status="${previous_state%%:*}"
previous_count="${previous_state##*:}"

if (( ${#failures[@]} == 0 )); then
  if [[ "${previous_status}" == "outage" ]]; then
    message="[Beacon Site Monitor] RECOVERED at $(timestamp_utc): public entry document, current assets, Signal routes, and legacy Blog redirect are healthy again."
    send_slack_message "${message}" || logger -t beacon-public-site-monitor "Recovery alert delivery failed."
  fi
  record_state "healthy:0"
  logger -t beacon-public-site-monitor "Healthy public-site check completed."
  exit 0
fi

next_count=$((previous_count + 1))
if [[ "${previous_status}" != "outage" ]] && (( next_count >= 2 )); then
  failure_text="$(IFS='; '; printf '%s' "${failures[*]}")"
  message="[Beacon Site Monitor] OUTAGE at $(timestamp_utc) after ${next_count} consecutive failed checks: ${failure_text}."
  send_slack_message "${message}" || logger -t beacon-public-site-monitor "Outage alert delivery failed."
  record_state "outage:${next_count}"
else
  record_state "pending:${next_count}"
  logger -t beacon-public-site-monitor "Failure ${next_count}/2: ${failures[*]}"
fi

exit 1
