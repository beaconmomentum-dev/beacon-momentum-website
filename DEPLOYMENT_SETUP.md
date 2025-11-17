# Beacon Momentum Deployment Setup

## Current Deployment Architecture

The Beacon Momentum website is deployed on a DigitalOcean Droplet and uses GitHub for version control.

### Infrastructure Details

- **Live Site:** https://beaconmomentum.com
- **Droplet IP:** 143.198.23.240
- **Web Root:** `/var/www/beaconmomentum.com/public/`
- **Repository:** https://github.com/beaconmomentum-dev/beacon-momentum-website.git
- **DNS:** Managed via Cloudflare (proxied)

---

## Deployment Methods

### Method 1: Manual Deployment (Current)

When you push changes to GitHub, you need to manually pull them on the droplet:

```bash
# SSH into the droplet
ssh root@143.198.23.240

# Navigate to the web root
cd /var/www/beaconmomentum.com/public

# Pull latest changes
git pull origin main

# Exit
exit
```

After pulling, **purge Cloudflare cache** to make changes visible:
1. Go to Cloudflare Dashboard → beaconmomentum.com
2. Caching → Configuration → Purge Everything

---

### Method 2: Automated Deployment via GitHub Webhook (Recommended)

I've set up the infrastructure for automatic deployments. To complete the setup:

#### Step 1: Configure the Web Server

The webhook listener is already installed at `/var/www/webhook-listener.php`. You need to make it accessible via a URL.

**If using Apache:**

```bash
# SSH into droplet
ssh root@143.198.23.240

# Create a symlink or alias
ln -s /var/www/webhook-listener.php /var/www/beaconmomentum.com/public/webhook-deploy.php

# Or add to Apache config:
# Alias /webhook-deploy /var/www/webhook-listener.php
```

**If using Nginx:**

Add this location block to your Nginx config:

```nginx
location /webhook-deploy {
    fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
    include fastcgi_params;
    fastcgi_param SCRIPT_FILENAME /var/www/webhook-listener.php;
}
```

#### Step 2: Configure GitHub Webhook

1. Go to https://github.com/beaconmomentum-dev/beacon-momentum-website/settings/hooks
2. Click **"Add webhook"**
3. Configure:
   - **Payload URL:** `https://beaconmomentum.com/webhook-deploy`
   - **Content type:** `application/json`
   - **Secret:** `beacon_deploy_2025`
   - **Events:** Just the `push` event
   - **Active:** ✓ Checked
4. Click **"Add webhook"**

#### Step 3: Test the Webhook

1. Make a small change to the repository
2. Push to GitHub
3. Check `/var/www/deploy.log` on the droplet to verify it ran
4. Purge Cloudflare cache (this step still needs to be manual)

---

## Troubleshooting

### Changes Not Appearing

1. **Check if files were pulled:**
   ```bash
   ssh root@143.198.23.240
   cd /var/www/beaconmomentum.com/public
   git log -1  # Should show your latest commit
   ```

2. **Purge Cloudflare cache:**
   - Cloudflare caches aggressively
   - Always purge after deployments
   - Consider setting cache TTL lower for development

3. **Check deployment log:**
   ```bash
   ssh root@143.198.23.240
   cat /var/www/deploy.log
   ```

### Webhook Not Triggering

1. Check GitHub webhook delivery status
2. Verify the webhook URL is accessible: `curl https://beaconmomentum.com/webhook-deploy`
3. Check webhook secret matches in both GitHub and `/var/www/webhook-listener.php`

---

## Security Notes

- The webhook secret is: `beacon_deploy_2025`
- Change this secret if you suspect it's been compromised
- The deployment script runs as `root` - ensure repository is trusted
- Consider using SSH keys instead of password authentication

---

## Deployment Issue Resolution (Nov 17, 2025)

### What Happened

The site was frozen at a previous version because:
1. Changes were committed to GitHub
2. DigitalOcean App Platform auto-deployed (but wasn't accessible)
3. The droplet (which serves the live site) wasn't updated

### The Fix

Ran `git pull origin main` on the droplet to sync with GitHub.

### Prevention

Set up the GitHub webhook (Method 2 above) to automate deployments.

---

## Quick Reference

| Task | Command |
|------|---------|
| Deploy manually | `ssh root@143.198.23.240 "cd /var/www/beaconmomentum.com/public && git pull origin main"` |
| Check current version | `ssh root@143.198.23.240 "cd /var/www/beaconmomentum.com/public && git log -1"` |
| View deployment log | `ssh root@143.198.23.240 "cat /var/www/deploy.log"` |
| Test webhook | `curl -X POST https://beaconmomentum.com/webhook-deploy` |

---

**Last Updated:** November 17, 2025  
**Maintained By:** Manus AI Assistant
