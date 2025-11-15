# DigitalGrandpa.org Hosting Solution & DNS Configuration

**Date:** November 12, 2025  
**Current Status:** Error 1000 - DNS points to prohibited IP  
**Site Files:** Extracted and analyzed

---

## Site Analysis

### Technology Stack
- **Frontend:** HTML, CSS, JavaScript (React-based with Vite build system)
- **Backend:** PHP (payment processing, email automation, webhooks)
- **Dependencies:** Node.js/pnpm for build, PHP for server-side processing
- **Payment Integration:** Stripe
- **Email:** Automated email queue system
- **Build Tool:** Vite (requires Node.js 18+)

### Key Features Requiring Server-Side Processing
1. **Stripe Payment Processing** (`integrated-payment-processor.php`)
2. **Email Automation** (`integrated-email-automation.php`, `process-email-queue.php`)
3. **Webhook Handlers** (`strategic-rest-protocol-webhook.php`)
4. **API Endpoints** (`api/create_intent.php`, `api/diag.php`)
5. **Contact Forms** (PHP backend)

### Hosting Requirements
- **Web Server:** Apache or Nginx
- **PHP:** Version 7.4+ (preferably 8.0+)
- **Node.js:** Version 18+ (for building React components)
- **SSL Certificate:** Required (for Stripe and secure forms)
- **Environment Variables:** Stripe API keys, email credentials
- **Writable Directories:** For logs, email queue, uploads

---

## Recommended Hosting Solutions

### Option 1: DigitalOcean Droplet (Recommended)

**Pros:**
- Full control over server configuration
- Can host both beaconmomentum.com and digitalgrandpa.org
- Cost-effective ($6-12/month)
- Easy to scale
- Root access for all configurations

**Setup Steps:**

1. **Create/Use Existing Droplet**
   - Ubuntu 22.04 LTS
   - Minimum: 1GB RAM, 1 vCPU ($6/month)
   - Recommended: 2GB RAM ($12/month for better performance)

2. **Install LAMP/LEMP Stack**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Nginx
   sudo apt install nginx -y
   
   # Install PHP and required modules
   sudo apt install php8.1-fpm php8.1-mysql php8.1-curl php8.1-json php8.1-mbstring php8.1-xml -y
   
   # Install Node.js 18+
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install nodejs -y
   
   # Install pnpm
   npm install -g pnpm
   
   # Install Certbot for SSL
   sudo apt install certbot python3-certbot-nginx -y
   ```

3. **Upload Site Files**
   ```bash
   # Create directory
   sudo mkdir -p /var/www/digitalgrandpa.org
   
   # Upload files (via SFTP or rsync)
   # Set permissions
   sudo chown -R www-data:www-data /var/www/digitalgrandpa.org
   sudo chmod -R 755 /var/www/digitalgrandpa.org
   ```

4. **Build React Components**
   ```bash
   cd /var/www/digitalgrandpa.org
   pnpm install
   pnpm build
   ```

5. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name digitalgrandpa.org www.digitalgrandpa.org;
       root /var/www/digitalgrandpa.org;
       index index.html index.php;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
       
       location ~ \.php$ {
           include snippets/fastcgi-php.conf;
           fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
       }
       
       location ~ /\.ht {
           deny all;
       }
   }
   ```

6. **Get SSL Certificate**
   ```bash
   sudo certbot --nginx -d digitalgrandpa.org -d www.digitalgrandpa.org
   ```

7. **Configure Environment Variables**
   - Create `.env` file with Stripe keys
   - Set proper file permissions (600)

8. **Update Cloudflare DNS**
   - A Record: `@` → Your Droplet IP
   - A Record: `www` → Your Droplet IP
   - Set to "Proxied" (orange cloud)

---

### Option 2: Shared Hosting (Current Setup)

**Pros:**
- Managed PHP/MySQL environment
- cPanel for easy management
- Usually includes email
- Lower maintenance

**Cons:**
- Limited control
- May not support Node.js build process
- Performance limitations

**Fix Current Error 1000:**

The error suggests the DNS is pointing to a Cloudflare IP or prohibited address. To fix:

1. **Log into your hosting control panel** (cPanel/Plesk)
2. **Find your actual server IP address** (not a Cloudflare IP)
3. **Log into Cloudflare**
4. **Update DNS A records:**
   - `@` → Your actual hosting IP
   - `www` → Your actual hosting IP
5. **Ensure records are set to "Proxied"** (orange cloud icon)

**Note:** If your host is `/home/greyobqa/` (as seen in PHP files), you may already have shared hosting. Contact your hosting provider to get the correct IP address.

---

### Option 3: Cloudflare Pages + Serverless Functions

**Pros:**
- Free hosting for static content
- Global CDN
- Automatic SSL
- Git integration

**Cons:**
- Requires converting PHP to serverless functions
- More complex migration
- May need to rewrite payment processing

---

## Immediate Action Plan

### Quick Fix (Temporary)

**Update beaconmomentum.com link to point internally:**

Change the "Visit Digital Grandpa" button from:
```html
<a href="https://digitalgrandpa.org">Visit Digital Grandpa</a>
```

To:
```html
<a href="https://beaconmomentum.com/digital-grandpa.html">Visit Digital Grandpa</a>
```

This gives you time to fix DNS without breaking user experience.

---

### Permanent Solution (Recommended)

1. **Determine Current Hosting**
   - Do you have existing shared hosting for digitalgrandpa.org?
   - Or do you want to move to a DigitalOcean droplet?

2. **Get Correct IP Address**
   - If shared hosting: Contact host for server IP
   - If new droplet: Create droplet and note IP

3. **Update Cloudflare DNS**
   - Log into Cloudflare account
   - Navigate to digitalgrandpa.org DNS settings
   - Update A records to correct IP
   - Wait 5-15 minutes for propagation

4. **Upload Site Files** (if moving to new server)
   - Use SFTP/rsync to transfer files
   - Build React components with `pnpm build`
   - Configure web server (Nginx/Apache)
   - Set up SSL certificate

5. **Configure Environment**
   - Set Stripe API keys
   - Configure email settings
   - Test payment processing
   - Test contact forms

---

## DNS Configuration Details

### Cloudflare DNS Records Needed

```
Type    Name    Content              Proxy Status    TTL
A       @       YOUR_SERVER_IP       Proxied         Auto
A       www     YOUR_SERVER_IP       Proxied         Auto
CNAME   *       digitalgrandpa.org   Proxied         Auto (optional)
```

**Important:** 
- Do NOT point A records to Cloudflare IPs (causes Error 1000)
- Use your actual server/droplet IP address
- Enable "Proxied" status for Cloudflare protection

---

## Cost Comparison

| Option | Monthly Cost | Setup Time | Maintenance |
|--------|-------------|------------|-------------|
| DigitalOcean Droplet | $6-12 | 2-4 hours | Medium |
| Shared Hosting (existing) | $5-15 | 30 min (DNS fix) | Low |
| Cloudflare Pages | Free-$5 | 4-8 hours | Low |

---

## Next Steps - Choose Your Path

### Path A: Fix Existing Hosting (Fastest)
1. Contact your current hosting provider
2. Get the correct server IP address
3. Update Cloudflare DNS A records
4. Wait 15 minutes for propagation
5. Test site

### Path B: Move to DigitalOcean Droplet (Best Long-term)
1. Create DigitalOcean droplet ($6-12/month)
2. Install LAMP/LEMP stack
3. Upload and configure site files
4. Build React components
5. Get SSL certificate
6. Update Cloudflare DNS to droplet IP
7. Test thoroughly

### Path C: Temporary Redirect (Immediate)
1. Update beaconmomentum.com link to internal page
2. Fix DNS at your leisure
3. Revert link once DNS is working

---

## Questions to Determine Best Path

1. **Do you currently have shared hosting for digitalgrandpa.org?**
   - Yes → Path A (fix DNS)
   - No → Path B (new droplet)

2. **Do you have access to Cloudflare account for digitalgrandpa.org?**
   - Yes → Can fix DNS immediately
   - No → Need to recover account access

3. **What's your timeline?**
   - Need it working today → Path C (temporary redirect)
   - Can wait 1-2 days → Path A or B

4. **Do you want to consolidate hosting?**
   - Yes → Path B (host both sites on one droplet)
   - No → Path A (keep separate)

Let me know which path you'd like to take and I can help implement it!
