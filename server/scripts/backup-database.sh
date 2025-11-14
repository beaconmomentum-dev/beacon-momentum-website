#!/bin/bash

# Beacon Momentum Database Backup Script
# Automated daily backups with 30-day retention

# Configuration
DB_PATH="/var/www/beaconmomentum.com/public/server/database/beacon.db"
BACKUP_DIR="/var/backups/beacon-momentum"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="beacon_backup_${DATE}.db"
RETENTION_DAYS=30

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Check if database exists
if [ ! -f "$DB_PATH" ]; then
    echo "Error: Database file not found at $DB_PATH"
    exit 1
fi

# Create backup
echo "Starting backup: $BACKUP_FILE"
cp "$DB_PATH" "$BACKUP_DIR/$BACKUP_FILE"

# Verify backup
if [ -f "$BACKUP_DIR/$BACKUP_FILE" ]; then
    BACKUP_SIZE=$(du -h "$BACKUP_DIR/$BACKUP_FILE" | cut -f1)
    echo "Backup completed successfully: $BACKUP_SIZE"
    
    # Compress backup
    gzip "$BACKUP_DIR/$BACKUP_FILE"
    echo "Backup compressed: ${BACKUP_FILE}.gz"
else
    echo "Error: Backup failed"
    exit 1
fi

# Delete backups older than retention period
echo "Cleaning up old backups (older than $RETENTION_DAYS days)..."
find "$BACKUP_DIR" -name "beacon_backup_*.db.gz" -type f -mtime +$RETENTION_DAYS -delete

# Count remaining backups
BACKUP_COUNT=$(find "$BACKUP_DIR" -name "beacon_backup_*.db.gz" -type f | wc -l)
echo "Total backups retained: $BACKUP_COUNT"

# Log backup completion
echo "Backup completed at $(date)" >> "$BACKUP_DIR/backup.log"

exit 0
