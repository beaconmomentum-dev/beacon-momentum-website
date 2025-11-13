#!/bin/bash
# Beacon Momentum Authentication System - Production Deployment Script
# Run this script on the DigitalOcean droplet

set -e  # Exit on error

echo "========================================="
echo "Beacon Momentum - Authentication Deploy"
echo "========================================="
echo ""

# Configuration
DEPLOY_DIR="/var/www/beaconmomentum"
SERVER_DIR="$DEPLOY_DIR/server"
SESSION_SECRET="deb5b51ae6bb650629d7d03d2c431227b408acfaee04050a43eb48150c1e9e87bd27e1f75b8ce29a0e1ccb0d5758b4381c4714d3ddc28cd01d96b069d823c54b"

echo "Step 1: Pull latest code from GitHub..."
cd $DEPLOY_DIR
git pull origin main

echo ""
echo "Step 2: Install server dependencies..."
cd $SERVER_DIR
npm install --production

echo ""
echo "Step 3: Create .env file..."
cat > $SERVER_DIR/.env << EOF
NODE_ENV=production
PORT=3000
SESSION_SECRET=$SESSION_SECRET
SECURE_COOKIES=true
EOF

echo "✓ Environment file created"

echo ""
echo "Step 4: Create logs directory..."
mkdir -p $SERVER_DIR/logs
chmod 755 $SERVER_DIR/logs

echo ""
echo "Step 5: Set proper permissions..."
chmod 600 $SERVER_DIR/.env
chmod 755 $SERVER_DIR
chmod -R 755 $DEPLOY_DIR

echo ""
echo "Step 6: Install PM2 globally (if not installed)..."
if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
    echo "✓ PM2 installed"
else
    echo "✓ PM2 already installed"
fi

echo ""
echo "Step 7: Stop existing PM2 process (if running)..."
pm2 stop beacon-auth 2>/dev/null || echo "No existing process to stop"

echo ""
echo "Step 8: Start server with PM2..."
cd $SERVER_DIR
pm2 start ecosystem.config.js

echo ""
echo "Step 9: Save PM2 process list..."
pm2 save

echo ""
echo "Step 10: Setup PM2 startup script..."
pm2 startup systemd -u root --hp /root

echo ""
echo "========================================="
echo "✓ Backend deployment complete!"
echo "========================================="
echo ""
echo "Server status:"
pm2 status

echo ""
echo "Next steps:"
echo "1. Configure nginx (see nginx.conf.example)"
echo "2. Enable HTTPS with Let's Encrypt"
echo "3. Configure firewall (UFW)"
echo "4. Test authentication flows"
echo ""
