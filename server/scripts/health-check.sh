#!/bin/bash

# Beacon Momentum Health Check Script
# Monitors service health and sends alerts if issues detected

# Configuration
SERVICE_URL="http://localhost:3000/api/health"
LOG_FILE="/var/log/beacon-momentum/health-check.log"
ALERT_EMAIL="admin@beaconmomentum.com"
MAX_RESPONSE_TIME=5  # seconds

# Create log directory if it doesn't exist
mkdir -p "$(dirname "$LOG_FILE")"

# Function to log messages
log_message() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

# Function to send alert (placeholder - requires mail configuration)
send_alert() {
    local subject="$1"
    local message="$2"
    log_message "ALERT: $subject - $message"
    # Uncomment when mail is configured:
    # echo "$message" | mail -s "$subject" "$ALERT_EMAIL"
}

# Check if service is running
log_message "Starting health check..."

# Check HTTP response
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}:%{time_total}" --max-time $MAX_RESPONSE_TIME "$SERVICE_URL" 2>&1)
HTTP_CODE=$(echo "$RESPONSE" | cut -d: -f1)
RESPONSE_TIME=$(echo "$RESPONSE" | cut -d: -f2)

if [ "$HTTP_CODE" = "200" ]; then
    log_message "✓ Service healthy (HTTP $HTTP_CODE, ${RESPONSE_TIME}s)"
    
    # Check response time
    if (( $(echo "$RESPONSE_TIME > $MAX_RESPONSE_TIME" | bc -l) )); then
        send_alert "Slow Response Time" "Service responding slowly: ${RESPONSE_TIME}s (threshold: ${MAX_RESPONSE_TIME}s)"
    fi
else
    log_message "✗ Service unhealthy (HTTP $HTTP_CODE)"
    send_alert "Service Down" "Beacon Momentum API returned HTTP $HTTP_CODE"
fi

# Check PM2 process status
PM2_STATUS=$(pm2 jlist 2>/dev/null | jq -r '.[] | select(.name=="beacon-auth") | .pm2_env.status' 2>/dev/null)

if [ "$PM2_STATUS" = "online" ]; then
    log_message "✓ PM2 process online"
else
    log_message "✗ PM2 process not online (status: $PM2_STATUS)"
    send_alert "PM2 Process Issue" "beacon-auth process status: $PM2_STATUS"
fi

# Check disk space
DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -gt 90 ]; then
    log_message "⚠ Disk usage high: ${DISK_USAGE}%"
    send_alert "High Disk Usage" "Disk usage at ${DISK_USAGE}%"
else
    log_message "✓ Disk usage normal: ${DISK_USAGE}%"
fi

# Check database file
DB_PATH="/var/www/beaconmomentum.com/public/server/database/beacon.db"
if [ -f "$DB_PATH" ]; then
    DB_SIZE=$(du -h "$DB_PATH" | cut -f1)
    log_message "✓ Database accessible ($DB_SIZE)"
else
    log_message "✗ Database file not found"
    send_alert "Database Missing" "Database file not found at $DB_PATH"
fi

log_message "Health check completed"
echo "---" >> "$LOG_FILE"

exit 0
