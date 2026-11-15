#!/usr/bin/env bash
# Fail-closed, read-only SSH transport and authentication preflight for GitHub Actions.
# Intended to run before any production fallback or deployment command.
set -Eeuo pipefail
IFS=$'\n\t'

: "${SSH_HOST:?Set SSH_HOST to the production origin address}"
SSH_USER="${SSH_USER:-root}"
SSH_PORT="${SSH_PORT:-22}"
SSH_KEY="${SSH_KEY:-$HOME/.ssh/deploy_key}"
SSH_KNOWN_HOSTS="${SSH_KNOWN_HOSTS:-$HOME/.ssh/known_hosts}"
SSH_CONNECT_TIMEOUT="${SSH_CONNECT_TIMEOUT:-10}"
LOG_PREFIX="${LOG_PREFIX:-SSH_PREFLIGHT}"

log() { printf '%s %s %s\n' "$(date -u '+%Y-%m-%dT%H:%M:%S.%3NZ')" "$LOG_PREFIX" "$*"; }

classify_failure() {
  local text="$1"
  case "$text" in
    *"Connection timed out"*|*"Operation timed out"*) printf '%s' timeout ;;
    *"Connection refused"*) printf '%s' connection_refused ;;
    *"Could not resolve hostname"*|*"Name or service not known"*) printf '%s' dns_resolution_failed ;;
    *"No route to host"*|*"Network is unreachable"*) printf '%s' route_unreachable ;;
    *"Permission denied"*|*"Too many authentication failures"*) printf '%s' authentication_failed ;;
    *"Host key verification failed"*|*"REMOTE HOST IDENTIFICATION HAS CHANGED"*) printf '%s' host_key_verification_failed ;;
    *) printf '%s' ssh_command_failed ;;
  esac
}

[[ "$SSH_PORT" =~ ^[0-9]+$ ]] && (( SSH_PORT >= 1 && SSH_PORT <= 65535 )) || { log "ERROR=invalid_port value=$SSH_PORT"; exit 2; }
[[ "$SSH_CONNECT_TIMEOUT" =~ ^[0-9]+$ ]] && (( SSH_CONNECT_TIMEOUT >= 1 )) || { log "ERROR=invalid_connect_timeout value=$SSH_CONNECT_TIMEOUT"; exit 2; }
test -r "$SSH_KEY" || { log "ERROR=ssh_key_unreadable path=$SSH_KEY"; exit 2; }
test -r "$SSH_KNOWN_HOSTS" || { log "ERROR=known_hosts_unreadable path=$SSH_KNOWN_HOSTS"; exit 2; }

log "START host=$SSH_HOST port=$SSH_PORT user=$SSH_USER timeout=${SSH_CONNECT_TIMEOUT}s"

# First verify that the configured host:port is reachable without authenticating.
scan_output=""
set +e
scan_output="$(ssh-keyscan -T "$SSH_CONNECT_TIMEOUT" -p "$SSH_PORT" -H "$SSH_HOST" 2>&1)"
scan_rc=$?
set -e
if (( scan_rc != 0 )); then
  failure_class="$(classify_failure "$scan_output")"
  log "ERROR=ssh_keyscan_failed class=$failure_class exit=$scan_rc details=$(printf '%s' "$scan_output" | tr '\n' ' ')"
  exit 1
fi

# Use the pre-populated known_hosts file for identity verification; do not trust
# a fresh scan as the identity source. The scan above is transport-only.
ssh_output=""
set +e
ssh_output="$(ssh \
  -i "$SSH_KEY" \
  -p "$SSH_PORT" \
  -o BatchMode=yes \
  -o ConnectTimeout="$SSH_CONNECT_TIMEOUT" \
  -o ConnectionAttempts=1 \
  -o StrictHostKeyChecking=yes \
  -o UserKnownHostsFile="$SSH_KNOWN_HOSTS" \
  -o IdentitiesOnly=yes \
  "$SSH_USER@$SSH_HOST" true 2>&1)"
ssh_rc=$?
set -e
if (( ssh_rc != 0 )); then
  failure_class="$(classify_failure "$ssh_output")"
  log "ERROR=ssh_auth_or_command_failed class=$failure_class exit=$ssh_rc details=$(printf '%s' "$ssh_output" | tr '\n' ' ')"
  exit 1
fi

log "PASS transport=reachable authentication=verified remote_command=true"
