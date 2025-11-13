#!/bin/bash
# Setup UFW firewall for Beacon Momentum
# Run with sudo

set -e

echo "========================================="
echo "Firewall Configuration (UFW)"
echo "========================================="
echo ""

echo "Step 1: Allow SSH (port 22)..."
ufw allow 22/tcp
echo "✓ SSH allowed"

echo ""
echo "Step 2: Allow HTTP (port 80)..."
ufw allow 80/tcp
echo "✓ HTTP allowed"

echo ""
echo "Step 3: Allow HTTPS (port 443)..."
ufw allow 443/tcp
echo "✓ HTTPS allowed"

echo ""
echo "Step 4: Enable UFW..."
echo "y" | ufw enable
echo "✓ Firewall enabled"

echo ""
echo "========================================="
echo "✓ Firewall configuration complete!"
echo "========================================="
echo ""
echo "Firewall status:"
ufw status verbose

echo ""
