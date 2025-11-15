## DNS Configuration Guide
### Beacon Momentum Sites Migration

**Last Updated:** November 12, 2025

---

## Overview

This guide covers DNS configuration for migrating all Beacon Momentum sites to a DigitalOcean droplet.

**Sites to configure:**
1. beaconmomentum.com
2. digitalgrandpa.org (currently on Namecheap/Cloudflare)
3. riseandreclaim.community

---

## Prerequisites

Before updating DNS:

✅ DigitalOcean droplet created and configured  
✅ All websites deployed to droplet  
✅ Nginx configured for all domains  
✅ Sites tested locally on droplet (via IP address)  
✅ **Droplet IP Address noted** (example: 123.45.67.89)

---

## Step 1: Get Your Droplet IP Address

### From DigitalOcean Dashboard:
1. Log into https://cloud.digitalocean.com
2. Click on your droplet name
3. Find "ipv4" address (e.g., `123.45.67.89`)
4. **Copy this IP address** - you'll need it for DNS records

### From Command Line (if SSH'd into droplet):
```bash
curl -4 icanhazip.com
```

---

## Step 2: Configure DigitalGrandpa.org DNS (Cloudflare)

### Current Status:
- **Error:** DNS points to prohibited IP (Error 1000)
- **Hosted on:** Namecheap shared hosting
- **DNS Provider:** Cloudflare

### Fix Steps:

1. **Log into Cloudflare**
   - Go to https://dash.cloudflare.com
   - Select `digitalgrandpa.org` domain

2. **Navigate to DNS Settings**
   - Click "DNS" in the left sidebar
   - You'll see a list of DNS records

3. **Update A Records**
   
   Find and edit these records (or create if they don't exist):

   | Type | Name | Content | Proxy Status | TTL |
   |------|------|---------|--------------|-----|
   | A | @ | YOUR_DROPLET_IP | ☁️ Proxied | Auto |
   | A | www | YOUR_DROPLET_IP | ☁️ Proxied | Auto |

   **Important:** 
   - Replace `YOUR_DROPLET_IP` with your actual droplet IP
   - Keep "Proxied" enabled (orange cloud icon) for Cloudflare protection
   - Do NOT use Cloudflare IPs - use your droplet IP

4. **Delete Old Records** (if any)
   - Remove any A records pointing to old Namecheap IPs
   - Remove any CNAME records that might conflict

5. **Save Changes**
   - Click "Save" for each record
   - Changes propagate in 5-15 minutes with Cloudflare

### Verification:
```bash
# Wait 5 minutes, then check:
dig digitalgrandpa.org +short
# Should show your droplet IP

# Or use online tool:
# https://www.whatsmydns.net/#A/digitalgrandpa.org
```

---

## Step 3: Configure Beaconmomentum.com DNS

### If DNS is on Cloudflare:

Follow same steps as digitalgrandpa.org above.

### If DNS is on Namecheap:

1. **Log into Namecheap**
   - Go to https://www.namecheap.com
   - Click "Domain List"
   - Click "Manage" next to beaconmomentum.com

2. **Navigate to Advanced DNS**
   - Click "Advanced DNS" tab

3. **Update Host Records**

   Delete existing A records and add:

   | Type | Host | Value | TTL |
   |------|------|-------|-----|
   | A Record | @ | YOUR_DROPLET_IP | Automatic |
   | A Record | www | YOUR_DROPLET_IP | Automatic |

4. **Save Changes**
   - Click "Save All Changes"
   - Propagation: 30 minutes to 24 hours (usually 1-2 hours)

### If DNS is on Another Provider:

General steps for any DNS provider:
1. Log into your DNS provider
2. Find DNS management section
3. Add/update A records:
   - `@` → YOUR_DROPLET_IP
   - `www` → YOUR_DROPLET_IP
4. Save changes

---

## Step 4: Configure Rise & Reclaim Community DNS

### If you own riseandreclaim.community:

Follow the same process as your other domains (Cloudflare or Namecheap steps above).

### If you need to register the domain:

1. **Register at Namecheap or Cloudflare**
   - Namecheap: ~$12/year
   - Cloudflare: ~$10/year

2. **Immediately configure DNS**
   - Add A records pointing to your droplet IP
   - Follow steps from above

### Alternative: Use Subdomain

If you don't want to register a new domain, you can use:
- `community.beaconmomentum.com`
- `riseandreclaim.beaconmomentum.com`

**To set up subdomain:**

In your beaconmomentum.com DNS:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A Record | community | YOUR_DROPLET_IP | Automatic |

Then update Nginx config on droplet:
```bash
# Edit: /etc/nginx/sites-available/riseandreclaim.community
# Change: server_name community.beaconmomentum.com;
```

---

## Step 5: Verify DNS Propagation

### Method 1: Command Line
```bash
# Check each domain:
dig beaconmomentum.com +short
dig www.beaconmomentum.com +short
dig digitalgrandpa.org +short
dig www.digitalgrandpa.org +short
dig riseandreclaim.community +short

# All should return your droplet IP
```

### Method 2: Online Tools
- https://www.whatsmydns.net
- Enter your domain name
- Select "A" record type
- Check multiple locations worldwide

### Method 3: Browser Test
```
# Try accessing sites:
http://YOUR_DROPLET_IP  # Should show Nginx default or one of your sites
https://beaconmomentum.com  # Should load your site (after SSL setup)
https://digitalgrandpa.org  # Should load your site (after SSL setup)
```

---

## DNS Propagation Timeline

| Provider | Typical Time | Maximum Time |
|----------|--------------|--------------|
| Cloudflare | 5-15 minutes | 1 hour |
| Namecheap | 30 minutes | 24 hours |
| Other providers | 1-4 hours | 48 hours |

**Tip:** Cloudflare is fastest due to their global network.

---

## Troubleshooting

### Issue: "DNS_PROBE_FINISHED_NXDOMAIN"
**Cause:** DNS not propagated yet  
**Solution:** Wait longer, clear browser cache, try incognito mode

### Issue: Still seeing Error 1000 on digitalgrandpa.org
**Cause:** DNS cache or incorrect IP  
**Solution:** 
```bash
# Verify you're using droplet IP, not Cloudflare IP
# Cloudflare IPs start with: 104.x.x.x or 172.x.x.x
# Your droplet IP should be different

# Clear Cloudflare cache:
# Cloudflare Dashboard → Caching → Purge Everything
```

### Issue: "Connection refused" or "502 Bad Gateway"
**Cause:** Nginx not configured or not running  
**Solution:**
```bash
# SSH into droplet
sudo systemctl status nginx
sudo systemctl restart nginx
```

### Issue: SSL certificate errors
**Cause:** Trying to access HTTPS before running SSL setup script  
**Solution:** 
- First access via HTTP to verify DNS works
- Then run SSL setup script (03-setup-ssl.sh)

---

## Post-DNS Update Checklist

After updating DNS and waiting for propagation:

- [ ] All domains resolve to droplet IP (use `dig` command)
- [ ] Sites accessible via HTTP (http://domain.com)
- [ ] Run SSL setup script (03-setup-ssl.sh)
- [ ] Sites accessible via HTTPS (https://domain.com)
- [ ] Test all site functionality (forms, payments, etc.)
- [ ] Update any hardcoded URLs in code
- [ ] Test from multiple devices/networks
- [ ] Monitor error logs for issues

---

## Important Notes

### Cloudflare Proxy Status

**Proxied (Orange Cloud) ☁️:**
- ✅ DDoS protection
- ✅ CDN caching
- ✅ SSL/TLS encryption
- ✅ Analytics
- ⚠️ Hides your real IP
- ⚠️ May cache aggressively

**DNS Only (Grey Cloud) ☁️:**
- ✅ Faster DNS updates
- ✅ Direct connection to server
- ❌ No DDoS protection
- ❌ No CDN caching

**Recommendation:** Use Proxied for production sites.

### TTL (Time To Live)

- **Auto/Automatic:** Cloudflare manages (recommended)
- **Low (60-300 seconds):** Fast updates, more DNS queries
- **High (1 hour+):** Slower updates, fewer DNS queries

**Recommendation:** Use "Auto" or 5 minutes during migration, then increase to 1 hour after stable.

---

## Emergency Rollback

If something goes wrong after DNS update:

### Quick Rollback:
1. Log back into DNS provider
2. Change A records back to old IP addresses
3. Wait for propagation (5-30 minutes)

### Keep Old Hosting Active:
- Don't cancel Namecheap hosting until new setup is fully tested
- Keep it active for 1-2 weeks as backup
- This allows instant rollback if needed

---

## Migration Checklist

Use this checklist to track your progress:

### Pre-Migration:
- [ ] Droplet created and IP noted: `_______________`
- [ ] All deployment scripts run successfully
- [ ] Sites tested via droplet IP
- [ ] SSL certificates ready to install
- [ ] Backup of current sites downloaded

### DNS Migration:
- [ ] digitalgrandpa.org DNS updated in Cloudflare
- [ ] beaconmomentum.com DNS updated
- [ ] riseandreclaim.community DNS configured
- [ ] DNS propagation verified (all domains)

### Post-Migration:
- [ ] SSL certificates installed (03-setup-ssl.sh)
- [ ] All sites accessible via HTTPS
- [ ] Forms working (contact, registration)
- [ ] Payment processing tested (Stripe)
- [ ] Email automation working
- [ ] Backups configured (04-setup-backups.sh)
- [ ] Old hosting cancelled (after 1-2 weeks)

---

## Support Resources

### DNS Lookup Tools:
- https://www.whatsmydns.net
- https://mxtoolbox.com/SuperTool.aspx
- https://dnschecker.org

### Cloudflare Documentation:
- https://developers.cloudflare.com/dns/

### DigitalOcean Documentation:
- https://docs.digitalocean.com/products/networking/dns/

---

## Quick Reference

### Your Information:
```
Droplet IP: _______________
Droplet Name: beacon-momentum-main
SSH User: beaconuser

Sites:
- beaconmomentum.com → /var/www/beaconmomentum.com
- digitalgrandpa.org → /var/www/digitalgrandpa.org
- riseandreclaim.community → /var/www/riseandreclaim.community
```

### Essential Commands:
```bash
# Check DNS
dig domain.com +short

# Check Nginx status
sudo systemctl status nginx

# Reload Nginx
sudo systemctl reload nginx

# View error logs
sudo tail -f /var/log/nginx/error.log

# Test SSL
curl -I https://domain.com
```

---

**Ready to update DNS?** Follow Step 2 above to start with digitalgrandpa.org!
