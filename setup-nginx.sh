#!/bin/bash
# Setup nginx for Beacon Momentum
# Run with sudo

set -e

echo "========================================="
echo "Nginx Configuration Setup"
echo "========================================="
echo ""

DEPLOY_DIR="/var/www/beaconmomentum"
NGINX_CONFIG="$DEPLOY_DIR/server/nginx-production.conf"
NGINX_AVAILABLE="/etc/nginx/sites-available/beaconmomentum"
NGINX_ENABLED="/etc/nginx/sites-enabled/beaconmomentum"

echo "Step 1: Copy nginx configuration..."
cp $NGINX_CONFIG $NGINX_AVAILABLE
echo "✓ Configuration copied to $NGINX_AVAILABLE"

echo ""
echo "Step 2: Remove default nginx site..."
rm -f /etc/nginx/sites-enabled/default
echo "✓ Default site removed"

echo ""
echo "Step 3: Enable Beacon Momentum site..."
ln -sf $NGINX_AVAILABLE $NGINX_ENABLED
echo "✓ Site enabled"

echo ""
echo "Step 4: Test nginx configuration..."
nginx -t

echo ""
echo "Step 5: Reload nginx..."
systemctl reload nginx

echo ""
echo "========================================="
echo "✓ Nginx configuration complete!"
echo "========================================="
echo ""
echo "Nginx status:"
systemctl status nginx --no-pager -l

echo ""
echo "Next step: Enable HTTPS with Let's Encrypt"
echo "Run: sudo certbot --nginx -d beaconmomentum.com -d www.beaconmomentum.com"
echo ""
