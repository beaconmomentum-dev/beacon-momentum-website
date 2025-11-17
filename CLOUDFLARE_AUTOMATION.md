# Cloudflare Cache Purging Automation

## Overview

This guide shows you how to automatically purge Cloudflare cache after each deployment, so changes appear instantly without manual intervention.

---

## Step 1: Get Your Cloudflare API Token

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Go to **My Profile** → **API Tokens**
3. Click **"Create Token"**
4. Use the **"Edit zone DNS"** template, or create a custom token with these permissions:
   - **Zone** → **Cache Purge** → **Purge**
   - **Zone** → **Zone** → **Read**
5. Set **Zone Resources** to: `Include` → `Specific zone` → `beaconmomentum.com`
6. Click **"Continue to summary"** → **"Create Token"**
7. **Copy the token** (you won't see it again!)

---

## Step 2: Get Your Cloudflare Zone ID

1. In Cloudflare Dashboard, select **beaconmomentum.com**
2. Scroll down on the Overview page
3. Look for **"Zone ID"** in the right sidebar (under API section)
4. Copy the Zone ID (looks like: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`)

---

## Step 3: Update the Deployment Script

SSH into your droplet and update the script with your credentials:

```bash
ssh root@143.198.23.240

# Edit the deployment script
nano /var/www/webhook-deploy.sh
```

Replace the contents with:

```bash
#!/bin/bash
# Enhanced Beacon Momentum Deployment Script
# Pulls from GitHub and purges Cloudflare cache

# Configuration
REPO_DIR="/var/www/beaconmomentum.com/public"
LOG_FILE="/var/www/deploy.log"
CLOUDFLARE_ZONE_ID="YOUR_ZONE_ID_HERE"          # ← Replace this
CLOUDFLARE_API_TOKEN="YOUR_API_TOKEN_HERE"      # ← Replace this

# Function to log messages
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

# Start deployment
log "=== Deployment Started ==="

# Pull latest changes from GitHub
cd "$REPO_DIR" || exit 1
log "Pulling from GitHub..."
git pull origin main >> "$LOG_FILE" 2>&1

if [ $? -eq 0 ]; then
    log "✓ Git pull successful"
    
    # Purge Cloudflare cache
    if [ -n "$CLOUDFLARE_API_TOKEN" ] && [ "$CLOUDFLARE_API_TOKEN" != "YOUR_API_TOKEN_HERE" ]; then
        log "Purging Cloudflare cache..."
        
        PURGE_RESPONSE=$(curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/purge_cache" \
            -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
            -H "Content-Type: application/json" \
            --data '{"purge_everything":true}')
        
        if echo "$PURGE_RESPONSE" | grep -q '"success":true'; then
            log "✓ Cloudflare cache purged successfully"
        else
            log "✗ Cloudflare cache purge failed: $PURGE_RESPONSE"
        fi
    else
        log "⚠ Cloudflare API token not configured - skipping cache purge"
    fi
    
    log "=== Deployment Completed Successfully ==="
else
    log "✗ Git pull failed"
    log "=== Deployment Failed ==="
    exit 1
fi
```

**Important:** Replace `YOUR_ZONE_ID_HERE` and `YOUR_API_TOKEN_HERE` with your actual values.

Save and exit (Ctrl+X, then Y, then Enter).

---

## Step 4: Test the Enhanced Deployment

Test manually first:

```bash
# Run the script
/var/www/webhook-deploy.sh

# Check the log
cat /var/www/deploy.log
```

You should see:
```
[2025-11-17 19:45:00] === Deployment Started ===
[2025-11-17 19:45:01] Pulling from GitHub...
[2025-11-17 19:45:02] ✓ Git pull successful
[2025-11-17 19:45:02] Purging Cloudflare cache...
[2025-11-17 19:45:03] ✓ Cloudflare cache purged successfully
[2025-11-17 19:45:03] === Deployment Completed Successfully ===
```

---

## Step 5: Test End-to-End

1. Make a small change to any file in your repository
2. Commit and push to GitHub
3. Wait 5-10 seconds
4. Check the deployment log: `ssh root@143.198.23.240 "cat /var/www/deploy.log"`
5. Visit your site in an incognito window - changes should be visible immediately!

---

## Manual Purge Command (Backup)

If you ever need to manually purge Cloudflare cache:

```bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/YOUR_ZONE_ID/purge_cache" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'
```

---

## Security Notes

- **Never commit API tokens to GitHub** - they're stored only on the droplet
- The API token has limited permissions (only cache purge for beaconmomentum.com)
- You can revoke the token anytime from Cloudflare dashboard
- Consider using environment variables instead of hardcoding in the script

---

## Troubleshooting

### Cache not purging

1. Check the deployment log: `cat /var/www/deploy.log`
2. Verify Zone ID and API token are correct
3. Test the API token manually with curl
4. Check token hasn't expired in Cloudflare dashboard

### Webhook not triggering

1. Check GitHub webhook delivery status
2. Verify webhook URL is correct: `https://beaconmomentum.com/webhook-deploy.php`
3. Check webhook secret matches: `beacon_deploy_2025`

---

## Complete Automation Flow

Once everything is set up:

```
You push to GitHub
    ↓
GitHub webhook triggers
    ↓
Droplet receives webhook
    ↓
Script runs: git pull
    ↓
Script purges Cloudflare cache
    ↓
Changes are live instantly! 🎉
```

No manual steps required!

---

**Last Updated:** November 17, 2025  
**Maintained By:** Manus AI Assistant
