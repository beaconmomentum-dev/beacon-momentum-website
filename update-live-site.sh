#!/bin/bash
# Simple deployment script for beaconmomentum.com
# This script should be run ON THE SERVER (143.198.23.240)

echo "🚀 Updating beaconmomentum.com from GitHub..."

cd /var/www/beaconmomentum.com || exit 1
git pull origin main

if [ $? -eq 0 ]; then
    echo "✅ Successfully pulled latest changes"
    systemctl reload nginx
    echo "✅ Nginx reloaded"
    echo ""
    echo "Verifying pricing updates..."
    if grep -q "3,997" pricing.html && grep -q "3,997" founding-member.html; then
        echo "✅ Pricing updated correctly to \$3,997"
    else
        echo "⚠️  Warning: Pricing may not be updated correctly"
    fi
else
    echo "❌ Failed to pull changes from GitHub"
    exit 1
fi
