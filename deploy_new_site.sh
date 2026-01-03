#!/bin/bash

# Deployment Script for Maritime Modernism Site
# This script backs up the current site and deploys the new React build.

echo "🚀 Starting deployment of Beacon Momentum (Maritime Modernism)..."

# 1. Create backup directory
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="backup_old_site_$TIMESTAMP"
mkdir -p "$BACKUP_DIR"

echo "📦 Backing up current site to $BACKUP_DIR..."

# 2. Move all current root HTML/CSS/JS files to backup
# We exclude the new_site_build directory, .git, and the backup directory itself
find . -maxdepth 1 -type f -not -name "deploy_new_site.sh" -not -name ".gitignore" -exec mv {} "$BACKUP_DIR/" \;
find . -maxdepth 1 -type d -not -name "." -not -name ".." -not -name ".git" -not -name "new_site_build" -not -name "$BACKUP_DIR" -exec mv {} "$BACKUP_DIR/" \;

echo "✅ Backup complete."

# 3. Move new site files to root
echo "🚢 Deploying new site..."
cp -r new_site_build/* .

echo "✅ New site deployed successfully!"
echo "To rollback, run: ./rollback_site.sh $BACKUP_DIR"

# 4. Create rollback script
cat > rollback_site.sh <<EOF
#!/bin/bash
BACKUP_DIR=\$1
if [ -z "\$BACKUP_DIR" ]; then
  echo "Usage: ./rollback_site.sh <backup_directory>"
  exit 1
fi

echo "Start rollback from \$BACKUP_DIR..."
# Remove current files (carefully)
rm -rf assets images index.html
# Restore from backup
cp -r \$BACKUP_DIR/* .
echo "Rollback complete."
EOF

chmod +x rollback_site.sh

echo "🎉 Deployment finished."
