#!/bin/bash

# Setup Monitoring and Automated Backups for Beacon Momentum
# Run this script once to configure cron jobs

echo "Setting up monitoring and automated backups..."

# Get the script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Make scripts executable
chmod +x "$SCRIPT_DIR/backup-database.sh"
chmod +x "$SCRIPT_DIR/health-check.sh"

# Create log directories
sudo mkdir -p /var/log/beacon-momentum
sudo mkdir -p /var/backups/beacon-momentum
sudo chown -R $USER:$USER /var/log/beacon-momentum
sudo chown -R $USER:$USER /var/backups/beacon-momentum

echo "✓ Directories created"

# Setup cron jobs
CRON_FILE="/tmp/beacon-cron"

# Remove existing beacon cron jobs
crontab -l 2>/dev/null | grep -v "beacon-momentum" > "$CRON_FILE" || true

# Add new cron jobs
echo "" >> "$CRON_FILE"
echo "# Beacon Momentum Automated Tasks" >> "$CRON_FILE"
echo "" >> "$CRON_FILE"

# Daily database backup at 2 AM
echo "0 2 * * * $SCRIPT_DIR/backup-database.sh >> /var/log/beacon-momentum/backup.log 2>&1" >> "$CRON_FILE"

# Health check every 5 minutes
echo "*/5 * * * * $SCRIPT_DIR/health-check.sh" >> "$CRON_FILE"

# Weekly log rotation (Sunday at 3 AM)
echo "0 3 * * 0 find /var/log/beacon-momentum -name '*.log' -type f -mtime +30 -delete" >> "$CRON_FILE"

# Install new crontab
crontab "$CRON_FILE"
rm "$CRON_FILE"

echo "✓ Cron jobs configured"

# Display configured jobs
echo ""
echo "Configured automated tasks:"
echo "  - Daily database backup at 2:00 AM"
echo "  - Health check every 5 minutes"
echo "  - Log cleanup weekly (30-day retention)"
echo ""

# Run initial backup
echo "Running initial backup..."
"$SCRIPT_DIR/backup-database.sh"

# Run initial health check
echo "Running initial health check..."
"$SCRIPT_DIR/health-check.sh"

echo ""
echo "✓ Monitoring and backups configured successfully!"
echo ""
echo "Logs:"
echo "  - Backup logs: /var/backups/beacon-momentum/backup.log"
echo "  - Health check logs: /var/log/beacon-momentum/health-check.log"
echo ""
echo "Backups:"
echo "  - Location: /var/backups/beacon-momentum/"
echo "  - Retention: 30 days"
echo ""

exit 0
