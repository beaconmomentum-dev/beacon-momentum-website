# Beacon Momentum Authentication System - Deployment Guide

## Overview

This guide covers deploying the Node.js authentication system to your DigitalOcean droplet.

---

## Prerequisites

- DigitalOcean droplet with Ubuntu 22.04
- Domain pointing to droplet IP
- SSH access to droplet
- Node.js 18+ installed
- Nginx installed
- PM2 installed globally (`npm install -g pm2`)

---

## Deployment Steps

### 1. Upload Code to Droplet

```bash
# From your local machine, push to GitHub
cd /path/to/beacon-momentum-website
git add -A
git commit -m "Add authentication system"
git push origin main

# On the droplet, pull latest code
ssh your-droplet
cd /var/www/beaconmomentum
git pull origin main
```

### 2. Install Server Dependencies

```bash
cd /var/www/beaconmomentum/server
npm install --production
```

### 3. Configure Environment Variables

```bash
# Create .env file
cp .env.example .env

# Edit .env and set production values
nano .env
```

**Important:** Change `SESSION_SECRET` to a strong random string:

```bash
# Generate a secure session secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Update `.env`:
```
NODE_ENV=production
PORT=3000
SESSION_SECRET=your-generated-secret-here
SECURE_COOKIES=true
```

### 4. Create Log Directory

```bash
mkdir -p /var/www/beaconmomentum/server/logs
```

### 5. Configure Nginx

```bash
# Copy nginx configuration
sudo cp /var/www/beaconmomentum/server/nginx.conf.example /etc/nginx/sites-available/beaconmomentum.com

# Edit configuration if needed
sudo nano /etc/nginx/sites-available/beaconmomentum.com

# Enable site
sudo ln -s /etc/nginx/sites-available/beaconmomentum.com /etc/nginx/sites-enabled/

# Test nginx configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

### 6. Start Node.js Server with PM2

```bash
cd /var/www/beaconmomentum/server

# Start server
pm2 start ecosystem.config.js

# Save PM2 process list
pm2 save

# Setup PM2 to start on boot
pm2 startup
# Follow the command it outputs
```

### 7. Verify Server is Running

```bash
# Check PM2 status
pm2 status

# Check logs
pm2 logs beacon-auth

# Test API endpoint
curl http://localhost:3000/api/health
```

### 8. Test Authentication Flow

1. Visit `http://your-domain.com/register.html`
2. Create a test account
3. Verify redirect to dashboard
4. Try accessing `/members/beacon-capital-suite/`
5. Verify you can access member content
6. Test logout
7. Verify redirect to login when accessing member pages

### 9. Enable HTTPS (Recommended)

```bash
# Install Certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d beaconmomentum.com -d www.beaconmomentum.com

# Certbot will automatically configure nginx for HTTPS
# Verify auto-renewal
sudo certbot renew --dry-run
```

After HTTPS is enabled:
- Update `.env`: `SECURE_COOKIES=true`
- Restart PM2: `pm2 restart beacon-auth`

### 10. Security Hardening

```bash
# Enable firewall
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw enable

# Restrict access to database
chmod 600 /var/www/beaconmomentum/server/database/*.db

# Set proper file permissions
chown -R www-data:www-data /var/www/beaconmomentum
chmod -R 755 /var/www/beaconmomentum
```

---

## Monitoring & Maintenance

### Check Server Status

```bash
# PM2 status
pm2 status

# View logs
pm2 logs beacon-auth

# Monitor in real-time
pm2 monit
```

### Restart Server

```bash
pm2 restart beacon-auth
```

### Update Code

```bash
cd /var/www/beaconmomentum
git pull origin main
cd server
npm install --production
pm2 restart beacon-auth
```

### Database Backup

```bash
# Backup SQLite database
cp /var/www/beaconmomentum/server/database/beacon.db \
   /var/www/beaconmomentum/server/database/beacon.db.backup-$(date +%Y%m%d)
```

### View Nginx Logs

```bash
sudo tail -f /var/log/nginx/beaconmomentum-access.log
sudo tail -f /var/log/nginx/beaconmomentum-error.log
```

---

## Troubleshooting

### Server Won't Start

```bash
# Check PM2 logs
pm2 logs beacon-auth --lines 100

# Check if port 3000 is in use
sudo netstat -tulpn | grep 3000

# Restart PM2
pm2 restart beacon-auth
```

### Can't Access Member Pages

```bash
# Check nginx configuration
sudo nginx -t

# Check if Node.js server is running
pm2 status

# Check nginx proxy
curl http://localhost:3000/api/health

# Check nginx logs
sudo tail -f /var/log/nginx/beaconmomentum-error.log
```

### Session Issues

```bash
# Check session database
sqlite3 /var/www/beaconmomentum/server/database/sessions.db "SELECT * FROM sessions;"

# Clear all sessions
sqlite3 /var/www/beaconmomentum/server/database/sessions.db "DELETE FROM sessions;"

# Restart server
pm2 restart beacon-auth
```

### Database Locked

```bash
# Stop PM2
pm2 stop beacon-auth

# Wait a few seconds
sleep 5

# Start PM2
pm2 start beacon-auth
```

---

## File Locations

- **Website Root:** `/var/www/beaconmomentum/`
- **Server Code:** `/var/www/beaconmomentum/server/`
- **Database:** `/var/www/beaconmomentum/server/database/beacon.db`
- **Sessions DB:** `/var/www/beaconmomentum/server/database/sessions.db`
- **Server Logs:** `/var/www/beaconmomentum/server/logs/`
- **Nginx Config:** `/etc/nginx/sites-available/beaconmomentum.com`
- **Nginx Logs:** `/var/log/nginx/beaconmomentum-*.log`

---

## Security Checklist

- [ ] HTTPS enabled with valid SSL certificate
- [ ] Strong session secret set in `.env`
- [ ] Firewall configured (UFW)
- [ ] Database files have restricted permissions
- [ ] PM2 configured to restart on boot
- [ ] Regular database backups scheduled
- [ ] Nginx security headers enabled
- [ ] Rate limiting active on auth endpoints
- [ ] Server tokens disabled in nginx

---

## Performance Optimization

### Enable Gzip Compression in Nginx

Add to nginx config:
```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
```

### Database Optimization

```bash
# Vacuum SQLite database periodically
sqlite3 /var/www/beaconmomentum/server/database/beacon.db "VACUUM;"
```

---

## Next Steps

After successful deployment:

1. Create your first member account
2. Test all authentication flows
3. Verify member content is protected
4. Set up automated database backups
5. Configure monitoring/alerts
6. Document admin procedures

---

**Deployment Status:** Ready for Production  
**Last Updated:** November 13, 2025
