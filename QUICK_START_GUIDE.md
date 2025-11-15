# Beacon Momentum - DigitalOcean Migration Quick Start

**Complete migration in ~4-5 hours**

---

## What You're Getting

✅ **3 websites consolidated** onto one DigitalOcean droplet  
✅ **Automated deployment scripts** for easy setup  
✅ **SSL certificates** for all domains  
✅ **Automated daily backups**  
✅ **Professional Nginx configuration**  
✅ **Complete documentation**

**Monthly cost:** $12 (vs $30-50 on separate hosting)

---

## Files Included

```
beacon-momentum-deployment-package.tar.gz
├── deployment-scripts/
│   ├── 01-server-setup.sh          # Install all required software
│   ├── 02-configure-nginx.sh       # Configure web server
│   ├── 03-setup-ssl.sh             # Get SSL certificates
│   └── 04-setup-backups.sh         # Set up automated backups
├── digitalgrandpa-site/            # Complete DG.org website files
├── rise-reclaim-api/               # Rise & Reclaim community files
├── digitalocean_migration_plan.md  # Detailed migration guide
├── DNS_Configuration_Guide.md      # DNS setup instructions
└── QUICK_START_GUIDE.md            # This file
```

---

## Prerequisites

Before you begin:

1. **DigitalOcean Account**
   - Sign up at https://www.digitalocean.com
   - Add payment method
   - Have $12/month budget

2. **Domain Access**
   - Cloudflare account for digitalgrandpa.org
   - DNS access for beaconmomentum.com
   - (Optional) riseandreclaim.community domain

3. **GitHub Access**
   - Token: `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`
   - Repo: beaconmomentum-dev/beacon-momentum-website

4. **Stripe Keys** (for payment processing)
   - Secret key
   - Publishable key
   - Webhook secret

---

## 5-Step Migration Process

### Step 1: Create DigitalOcean Droplet (10 minutes)

1. Log into https://cloud.digitalocean.com
2. Click "Create" → "Droplets"
3. Choose:
   - **Image:** Ubuntu 22.04 LTS
   - **Plan:** Basic $12/month (2GB RAM, 1 vCPU, 50GB SSD)
   - **Datacenter:** Choose closest to your users
   - **Authentication:** SSH key (recommended) or password
   - **Hostname:** `beacon-momentum-main`
4. Click "Create Droplet"
5. **Note your droplet IP address** (e.g., 123.45.67.89)

### Step 2: Upload Files and Run Setup (60 minutes)

```bash
# From your local machine, upload the deployment package
scp beacon-momentum-deployment-package.tar.gz root@YOUR_DROPLET_IP:/root/

# SSH into your droplet
ssh root@YOUR_DROPLET_IP

# Extract files
cd /root
tar -xzf beacon-momentum-deployment-package.tar.gz

# Run server setup script
cd deployment-scripts
chmod +x *.sh
./01-server-setup.sh

# This will install:
# - Nginx (web server)
# - PHP 8.1 (backend)
# - Node.js 18 (build tools)
# - Certbot (SSL certificates)
# - Security configurations
```

### Step 3: Deploy Websites (90 minutes)

#### 3A. Deploy Beaconmomentum.com
```bash
# Clone from GitHub
cd /var/www/beaconmomentum.com
git clone https://github.com/beaconmomentum-dev/beacon-momentum-website.git .

# Configure Nginx
cd /root/deployment-scripts
./02-configure-nginx.sh
```

#### 3B. Deploy DigitalGrandpa.org
```bash
# Copy files
cp -r /root/digitalgrandpa-site/* /var/www/digitalgrandpa.org/

# Build React components
cd /var/www/digitalgrandpa.org
pnpm install
pnpm build

# Create .env file with Stripe keys
nano .env
# Add:
# STRIPE_SECRET_KEY=sk_live_your_key
# STRIPE_PUBLISHABLE_KEY=pk_live_your_key
# STRIPE_WEBHOOK_SECRET=whsec_your_secret

chmod 600 .env

# Create writable directories
mkdir -p logs uploads email_queue
chmod 755 logs uploads email_queue
chown -R www-data:www-data logs uploads email_queue
```

#### 3C. Deploy Rise & Reclaim Community
```bash
# Copy files
cp -r /root/rise-reclaim-api/* /var/www/riseandreclaim.community/

# Set up database
cd /var/www/riseandreclaim.community
mkdir -p data
php init-database.php
chmod 664 data/community.db
chown www-data:www-data data/community.db

# Update Stripe keys in config.php
nano config.php
# Update the STRIPE_* constants with your production keys
```

### Step 4: Update DNS (30 minutes + propagation time)

**IMPORTANT:** Don't update DNS until websites are deployed and tested!

#### Test sites via IP first:
```bash
# Test Beaconmomentum
curl -H "Host: beaconmomentum.com" http://YOUR_DROPLET_IP

# Test DigitalGrandpa
curl -H "Host: digitalgrandpa.org" http://YOUR_DROPLET_IP

# Test Rise & Reclaim
curl -H "Host: riseandreclaim.community" http://YOUR_DROPLET_IP
```

#### Update DNS:

**DigitalGrandpa.org (Cloudflare):**
1. Log into Cloudflare
2. Select digitalgrandpa.org
3. Go to DNS settings
4. Update A records:
   - `@` → YOUR_DROPLET_IP (Proxied)
   - `www` → YOUR_DROPLET_IP (Proxied)

**Beaconmomentum.com:**
1. Log into your DNS provider
2. Update A records:
   - `@` → YOUR_DROPLET_IP
   - `www` → YOUR_DROPLET_IP

**Wait 15-60 minutes for DNS propagation**

Verify:
```bash
dig digitalgrandpa.org +short
dig beaconmomentum.com +short
# Both should show YOUR_DROPLET_IP
```

### Step 5: Configure SSL and Backups (30 minutes)

```bash
cd /root/deployment-scripts

# Get SSL certificates (only after DNS is propagated!)
./03-setup-ssl.sh
# Enter your email when prompted
# Certificates will be installed for all 3 domains

# Set up automated backups
./04-setup-backups.sh
# Backups will run daily at 2 AM
```

---

## Verification Checklist

After migration, verify everything works:

### Website Access:
- [ ] https://beaconmomentum.com loads correctly
- [ ] https://digitalgrandpa.org loads correctly
- [ ] https://riseandreclaim.community loads correctly
- [ ] All pages have valid SSL (green padlock)

### Functionality Tests:
- [ ] DigitalGrandpa payment processing works
- [ ] Rise & Reclaim user registration works
- [ ] Rise & Reclaim login works
- [ ] Contact forms submit successfully
- [ ] Images and assets load properly

### Server Health:
```bash
# Check Nginx status
sudo systemctl status nginx

# Check PHP-FPM status
sudo systemctl status php8.1-fpm

# Check disk space
df -h

# Check memory usage
free -h

# View error logs
sudo tail -f /var/log/nginx/error.log
```

---

## Troubleshooting

### Issue: 502 Bad Gateway
```bash
sudo systemctl restart php8.1-fpm
sudo systemctl restart nginx
```

### Issue: Permission Denied
```bash
sudo chown -R www-data:www-data /var/www/digitalgrandpa.org
sudo chmod -R 755 /var/www/digitalgrandpa.org
```

### Issue: Database Errors (Rise & Reclaim)
```bash
cd /var/www/riseandreclaim.community
sudo chown www-data:www-data data/community.db
sudo chmod 664 data/community.db
```

### Issue: SSL Certificate Errors
```bash
# Make sure DNS is propagated first!
dig domain.com +short

# Then retry SSL setup
cd /root/deployment-scripts
./03-setup-ssl.sh
```

---

## Post-Migration Tasks

### Week 1:
- [ ] Monitor error logs daily
- [ ] Test all functionality thoroughly
- [ ] Update any hardcoded URLs in code
- [ ] Notify users of any downtime
- [ ] Keep old Namecheap hosting active as backup

### Week 2:
- [ ] Verify backups are running (check /home/beaconuser/backups)
- [ ] Test restore from backup
- [ ] Monitor server resources (CPU, RAM, disk)
- [ ] Optimize if needed

### After 2 Weeks:
- [ ] Cancel old Namecheap hosting (if everything works)
- [ ] Document any custom configurations
- [ ] Set up monitoring/alerts (optional)

---

## Useful Commands

```bash
# Restart services
sudo systemctl restart nginx
sudo systemctl restart php8.1-fpm

# View logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# Check disk space
df -h

# Check memory
free -h

# Check running processes
htop

# Manual backup
sudo /usr/local/bin/backup-beacon-sites.sh

# Update beaconmomentum.com from GitHub
cd /var/www/beaconmomentum.com
git pull origin main
sudo systemctl reload nginx
```

---

## Getting Help

### Documentation:
- **Detailed migration:** `digitalocean_migration_plan.md`
- **DNS setup:** `DNS_Configuration_Guide.md`

### DigitalOcean Support:
- https://docs.digitalocean.com
- https://www.digitalocean.com/community

### Emergency Rollback:
If something goes wrong, revert DNS to old IPs:
1. Log into Cloudflare/DNS provider
2. Change A records back to old IP addresses
3. Wait 15-30 minutes for propagation

---

## Success Metrics

You'll know migration is successful when:

✅ All 3 sites load via HTTPS  
✅ SSL certificates show valid (green padlock)  
✅ Payment processing works on DigitalGrandpa  
✅ User registration/login works on Rise & Reclaim  
✅ No errors in Nginx logs  
✅ Backups running daily  
✅ Old hosting can be cancelled

---

## Cost Savings

| Service | Before | After | Savings |
|---------|--------|-------|---------|
| Namecheap Shared Hosting | $15/mo | $0 | $15/mo |
| GitHub Pages (if paid) | $0-10/mo | $0 | $0-10/mo |
| Other hosting | $10-20/mo | $0 | $10-20/mo |
| **DigitalOcean Droplet** | **$0** | **$12/mo** | **-$12/mo** |
| **Total** | **$25-45/mo** | **$12/mo** | **$13-33/mo** |

**Annual savings:** $156-396

---

## Ready to Start?

1. Create your DigitalOcean droplet
2. Note the IP address
3. Follow Step 2 above
4. Refer to detailed guides as needed

**Estimated time:** 4-5 hours total

Good luck! 🚀
