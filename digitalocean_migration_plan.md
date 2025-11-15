# DigitalOcean Droplet Migration Plan
## Consolidating All Beacon Momentum Sites

**Date:** November 12, 2025  
**Sites to Migrate:**
1. beaconmomentum.com (currently on GitHub Pages or similar)
2. digitalgrandpa.org (currently on Namecheap shared hosting)
3. Rise & Reclaim Community (new deployment)

---

## Architecture Overview

### Single Droplet Setup (Recommended)

```
DigitalOcean Droplet ($12/month - 2GB RAM)
├── Nginx (Web Server)
├── PHP 8.1-FPM (Backend Processing)
├── Node.js 18+ (Build Tools)
├── SQLite (Database for Rise & Reclaim)
├── Certbot (SSL Certificates)
└── Sites:
    ├── /var/www/beaconmomentum.com
    ├── /var/www/digitalgrandpa.org
    └── /var/www/riseandreclaim.community
```

### Technology Stack Summary

| Site | Frontend | Backend | Database | Special Requirements |
|------|----------|---------|----------|---------------------|
| beaconmomentum.com | Static HTML/CSS/JS | None | None | Simple static hosting |
| digitalgrandpa.org | React + HTML | PHP | None | Stripe integration, email automation |
| Rise & Reclaim | HTML/PHP | PHP | SQLite | User auth, membership system, Stripe |

---

## Step-by-Step Migration Guide

### Phase 1: Create and Configure Droplet (30 minutes)

#### 1.1 Create Droplet
```bash
# DigitalOcean Dashboard:
# - Click "Create" → "Droplets"
# - Choose: Ubuntu 22.04 LTS
# - Plan: Basic $12/month (2GB RAM, 1 vCPU, 50GB SSD)
# - Datacenter: Choose closest to your users
# - Authentication: SSH key (recommended) or password
# - Hostname: beacon-momentum-main
# - Click "Create Droplet"
# - Note the IP address (e.g., 123.45.67.89)
```

#### 1.2 Initial Server Setup
```bash
# SSH into your droplet
ssh root@YOUR_DROPLET_IP

# Update system
apt update && apt upgrade -y

# Create non-root user with sudo privileges
adduser beaconuser
usermod -aG sudo beaconuser

# Configure firewall
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable

# Switch to new user
su - beaconuser
```

---

### Phase 2: Install Required Software (45 minutes)

#### 2.1 Install Nginx
```bash
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

#### 2.2 Install PHP 8.1 and Extensions
```bash
sudo apt install php8.1-fpm php8.1-cli php8.1-common php8.1-curl \
  php8.1-json php8.1-mbstring php8.1-xml php8.1-zip php8.1-sqlite3 \
  php8.1-gd php8.1-intl -y

# Verify installation
php -v
```

#### 2.3 Install Node.js 18+
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs -y

# Install pnpm globally
sudo npm install -g pnpm

# Verify installation
node -v
pnpm -v
```

#### 2.4 Install Certbot for SSL
```bash
sudo apt install certbot python3-certbot-nginx -y
```

#### 2.5 Install Git
```bash
sudo apt install git -y
```

---

### Phase 3: Deploy Beaconmomentum.com (30 minutes)

#### 3.1 Create Directory and Clone Repository
```bash
sudo mkdir -p /var/www/beaconmomentum.com
sudo chown -R beaconuser:beaconuser /var/www/beaconmomentum.com

cd /var/www/beaconmomentum.com

# Clone from GitHub (you'll need to authenticate)
git clone https://github.com/beaconmomentum-dev/beacon-momentum-website.git .
```

#### 3.2 Configure Nginx for Beaconmomentum.com
```bash
sudo nano /etc/nginx/sites-available/beaconmomentum.com
```

Paste this configuration:
```nginx
server {
    listen 80;
    server_name beaconmomentum.com www.beaconmomentum.com;
    root /var/www/beaconmomentum.com;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    error_page 404 /404.html;
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/beaconmomentum.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

### Phase 4: Deploy DigitalGrandpa.org (60 minutes)

#### 4.1 Create Directory and Upload Files
```bash
sudo mkdir -p /var/www/digitalgrandpa.org
sudo chown -R beaconuser:beaconuser /var/www/digitalgrandpa.org

# Upload files via SFTP or rsync
# From your local machine:
# rsync -avz /path/to/digitalgrandpa-site/ beaconuser@YOUR_DROPLET_IP:/var/www/digitalgrandpa.org/
```

#### 4.2 Build React Components
```bash
cd /var/www/digitalgrandpa.org

# Install dependencies
pnpm install

# Build for production
pnpm build

# The build output will be in 'dist' folder
```

#### 4.3 Set Up Environment Variables
```bash
cd /var/www/digitalgrandpa.org

# Create .env file
nano .env
```

Add your Stripe keys:
```env
STRIPE_SECRET_KEY=sk_live_your_actual_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_actual_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

Set permissions:
```bash
chmod 600 .env
```

#### 4.4 Create Writable Directories
```bash
cd /var/www/digitalgrandpa.org
mkdir -p logs uploads email_queue
chmod 755 logs uploads email_queue
chown -R www-data:www-data logs uploads email_queue
```

#### 4.5 Configure Nginx for DigitalGrandpa.org
```bash
sudo nano /etc/nginx/sites-available/digitalgrandpa.org
```

Paste this configuration:
```nginx
server {
    listen 80;
    server_name digitalgrandpa.org www.digitalgrandpa.org;
    root /var/www/digitalgrandpa.org;
    index index.html index.php;

    # Serve built React files from dist directory
    location / {
        try_files $uri $uri/ /index.html;
    }

    # PHP processing
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    # API endpoints
    location /api/ {
        try_files $uri $uri/ /api/index.php?$query_string;
    }

    # Deny access to sensitive files
    location ~ /\.(env|git|htaccess) {
        deny all;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/digitalgrandpa.org /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

### Phase 5: Deploy Rise & Reclaim Community (60 minutes)

#### 5.1 Create Directory and Upload Files
```bash
sudo mkdir -p /var/www/riseandreclaim.community
sudo chown -R beaconuser:beaconuser /var/www/riseandreclaim.community

# Upload files via SFTP or rsync
# From your local machine:
# rsync -avz /path/to/rise-reclaim-api/ beaconuser@YOUR_DROPLET_IP:/var/www/riseandreclaim.community/
```

#### 5.2 Set Up Database
```bash
cd /var/www/riseandreclaim.community

# Create data directory
mkdir -p data
chmod 755 data

# Initialize database
php init-database.php

# Set proper permissions
chmod 664 data/community.db
chown www-data:www-data data/community.db
```

#### 5.3 Configure Environment
```bash
cd /var/www/riseandreclaim.community

# Edit config.php to add production Stripe keys
nano config.php
```

Update Stripe keys:
```php
define('STRIPE_SECRET_KEY', 'sk_live_your_actual_stripe_secret_key');
define('STRIPE_PUBLISHABLE_KEY', 'pk_live_your_actual_stripe_publishable_key');
define('STRIPE_WEBHOOK_SECRET', 'whsec_your_webhook_secret');
```

#### 5.4 Configure Nginx for Rise & Reclaim
```bash
sudo nano /etc/nginx/sites-available/riseandreclaim.community
```

Paste this configuration:
```nginx
server {
    listen 80;
    server_name riseandreclaim.community www.riseandreclaim.community;
    root /var/www/riseandreclaim.community;
    index index.php index.html;

    # Main site
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    # PHP processing
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    # API endpoints
    location /api/ {
        try_files $uri $uri/ /api/index.php?$query_string;
    }

    # Protect sensitive files
    location ~ /\.(env|git|htaccess|db)$ {
        deny all;
    }

    location ~ /data/ {
        deny all;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot|pdf)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/riseandreclaim.community /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

### Phase 6: Configure SSL Certificates (15 minutes)

#### 6.1 Get SSL Certificates for All Domains
```bash
# Beaconmomentum.com
sudo certbot --nginx -d beaconmomentum.com -d www.beaconmomentum.com

# DigitalGrandpa.org
sudo certbot --nginx -d digitalgrandpa.org -d www.digitalgrandpa.org

# Rise & Reclaim Community
sudo certbot --nginx -d riseandreclaim.community -d www.riseandreclaim.community
```

Follow the prompts:
- Enter email address
- Agree to terms
- Choose to redirect HTTP to HTTPS (recommended)

#### 6.2 Test Auto-Renewal
```bash
sudo certbot renew --dry-run
```

---

### Phase 7: Update DNS Settings (30 minutes)

#### 7.1 Cloudflare DNS for DigitalGrandpa.org

Log into Cloudflare → Select digitalgrandpa.org → DNS

Update A records:
```
Type    Name    Content              Proxy Status    TTL
A       @       YOUR_DROPLET_IP      Proxied         Auto
A       www     YOUR_DROPLET_IP      Proxied         Auto
```

#### 7.2 DNS for Beaconmomentum.com

Update wherever your DNS is hosted (Cloudflare/Namecheap/etc.):
```
Type    Name    Content              TTL
A       @       YOUR_DROPLET_IP      Auto
A       www     YOUR_DROPLET_IP      Auto
```

#### 7.3 DNS for Rise & Reclaim Community

If you own riseandreclaim.community, update DNS:
```
Type    Name    Content              TTL
A       @       YOUR_DROPLET_IP      Auto
A       www     YOUR_DROPLET_IP      Auto
```

**Wait 15-60 minutes for DNS propagation**

---

### Phase 8: Testing and Verification (30 minutes)

#### 8.1 Test Each Site
```bash
# Test Beaconmomentum.com
curl -I https://beaconmomentum.com

# Test DigitalGrandpa.org
curl -I https://digitalgrandpa.org

# Test Rise & Reclaim
curl -I https://riseandreclaim.community
```

#### 8.2 Test PHP Processing
```bash
# Create test PHP file
echo "<?php phpinfo(); ?>" | sudo tee /var/www/digitalgrandpa.org/test.php

# Visit: https://digitalgrandpa.org/test.php
# Should show PHP info page

# Remove test file
sudo rm /var/www/digitalgrandpa.org/test.php
```

#### 8.3 Test Stripe Integration
- Visit DigitalGrandpa.org store page
- Try to initiate a payment (use Stripe test mode)
- Check logs: `tail -f /var/www/digitalgrandpa.org/logs/error.log`

#### 8.4 Test Rise & Reclaim Features
- Visit riseandreclaim.community
- Test user registration
- Test login
- Check database: `sqlite3 /var/www/riseandreclaim.community/data/community.db "SELECT * FROM users;"`

---

## Post-Migration Tasks

### 1. Set Up Automated Backups
```bash
# Create backup script
sudo nano /usr/local/bin/backup-sites.sh
```

Paste:
```bash
#!/bin/bash
BACKUP_DIR="/home/beaconuser/backups"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Backup websites
tar -czf $BACKUP_DIR/beaconmomentum_$DATE.tar.gz /var/www/beaconmomentum.com
tar -czf $BACKUP_DIR/digitalgrandpa_$DATE.tar.gz /var/www/digitalgrandpa.org
tar -czf $BACKUP_DIR/riseandreclaim_$DATE.tar.gz /var/www/riseandreclaim.community

# Keep only last 7 days
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
```

Make executable and schedule:
```bash
sudo chmod +x /usr/local/bin/backup-sites.sh
crontab -e
# Add: 0 2 * * * /usr/local/bin/backup-sites.sh
```

### 2. Set Up Monitoring
```bash
# Install monitoring tools
sudo apt install htop iotop nethogs -y

# Check resource usage
htop
```

### 3. Configure Log Rotation
```bash
sudo nano /etc/logrotate.d/beacon-sites
```

Paste:
```
/var/www/*/logs/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 www-data www-data
    sharedscripts
}
```

### 4. Update GitHub Webhook (Optional)
If you want auto-deployment from GitHub:
```bash
# Install webhook listener
# Configure GitHub to POST to your droplet on push
# Auto-pull and reload
```

---

## Security Checklist

- [ ] Firewall configured (UFW)
- [ ] SSH key authentication enabled
- [ ] Root login disabled
- [ ] SSL certificates installed
- [ ] .env files have 600 permissions
- [ ] Database files not web-accessible
- [ ] Regular backups scheduled
- [ ] PHP display_errors disabled in production
- [ ] Nginx security headers configured
- [ ] Rate limiting enabled for APIs

---

## Troubleshooting

### Issue: "502 Bad Gateway"
```bash
# Check PHP-FPM status
sudo systemctl status php8.1-fpm

# Restart if needed
sudo systemctl restart php8.1-fpm
```

### Issue: "Permission Denied" on PHP files
```bash
# Fix permissions
sudo chown -R www-data:www-data /var/www/digitalgrandpa.org
sudo chmod -R 755 /var/www/digitalgrandpa.org
```

### Issue: Database connection errors
```bash
# Check SQLite file permissions
ls -la /var/www/riseandreclaim.community/data/community.db
sudo chown www-data:www-data /var/www/riseandreclaim.community/data/community.db
sudo chmod 664 /var/www/riseandreclaim.community/data/community.db
```

### Issue: SSL certificate errors
```bash
# Renew certificates
sudo certbot renew --force-renewal
```

---

## Cost Summary

| Item | Monthly Cost |
|------|-------------|
| DigitalOcean Droplet (2GB) | $12.00 |
| Domain renewals (separate) | ~$10-15/year each |
| **Total** | **$12/month** |

**Savings:** Consolidating from multiple hosting providers saves $20-40/month

---

## Timeline

| Phase | Duration | Can Start After |
|-------|----------|-----------------|
| Create Droplet | 5 min | Immediately |
| Install Software | 45 min | Droplet created |
| Deploy Beaconmomentum | 30 min | Software installed |
| Deploy DigitalGrandpa | 60 min | Software installed |
| Deploy Rise & Reclaim | 60 min | Software installed |
| Configure SSL | 15 min | Sites deployed |
| Update DNS | 5 min (+ 15-60 min propagation) | SSL configured |
| Testing | 30 min | DNS propagated |
| **Total** | **~4-5 hours** | |

---

## Next Steps

1. **Create DigitalOcean account** (if you don't have one)
2. **Create droplet** following Phase 1
3. **Save droplet IP address**
4. **Follow phases 2-8 in order**
5. **Update DNS last** (after everything is working)
6. **Test thoroughly before switching DNS**

Would you like me to create automated deployment scripts to speed up this process?
