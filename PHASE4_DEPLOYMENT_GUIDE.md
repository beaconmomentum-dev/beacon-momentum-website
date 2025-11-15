# Phase 4 Deployment Guide: Enterprise Features

## Overview

This guide covers deploying all Phase 4 enhancements to your production BeaconMomentum.com server.

---

## What's New in Phase 4

### Phase 4A: Polish & Launch Prep
- ✅ Email verification system
- ✅ Password reset functionality
- ✅ Privacy policy & Terms of Service
- ✅ Automated database backups
- ✅ Health monitoring & alerts

### Phase 4B: Payment Integration
- ✅ Stripe payment processing
- ✅ Three subscription tiers (Free, Basic $29/mo, Premium $99/mo)
- ✅ Customer portal for subscription management
- ✅ Webhook handling for payment events
- ✅ Automated access control

### Phase 4C: Enhanced Features
- ✅ Admin panel for user management
- ✅ Progress tracking & analytics dashboard
- ✅ Achievement system
- ✅ Community forum with categories
- ✅ Direct messaging system
- ✅ Leaderboard functionality

---

## Prerequisites

### Required Environment Variables

Create `/var/www/beaconmomentum/server/.env`:

```bash
# Server Configuration
NODE_ENV=production
PORT=3000

# Session Secret (generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
SESSION_SECRET=your-super-secret-session-key-here

# Email Configuration (for verification & password reset)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password
FROM_EMAIL=noreply@beaconmomentum.com
FROM_NAME=Beacon Momentum

# Stripe Configuration (get from https://dashboard.stripe.com/apikeys)
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Stripe Price IDs (create products in Stripe Dashboard first)
STRIPE_PRICE_BASIC=price_basic_monthly_id
STRIPE_PRICE_PREMIUM=price_premium_monthly_id

# Base URL
BASE_URL=https://beaconmomentum.com
```

### Required Services

1. **Email Service (SMTP)**
   - Gmail with App Password (recommended for testing)
   - SendGrid, Mailgun, or AWS SES (recommended for production)

2. **Stripe Account**
   - Create account at https://stripe.com
   - Set up products and pricing
   - Configure webhook endpoint

---

## Deployment Steps

### Step 1: Backup Current System

```bash
# SSH into your droplet
ssh root@143.198.23.240

# Backup current database
cd /var/www/beaconmomentum/server
cp database/beacon.db database/beacon.db.backup.$(date +%Y%m%d_%H%M%S)

# Backup current server code
cd /var/www/beaconmomentum
tar -czf ../beaconmomentum_backup_$(date +%Y%m%d_%H%M%S).tar.gz .
```

### Step 2: Pull Latest Code

```bash
cd /var/www/beaconmomentum
git pull origin main
```

### Step 3: Install New Dependencies

```bash
cd server
npm install
```

New packages installed:
- `stripe` - Payment processing
- `nodemailer` - Email sending
- `dotenv` - Environment variable management

### Step 4: Initialize Enhanced Database

```bash
cd /var/www/beaconmomentum/server

# Run database initialization (creates new tables)
node database/init_enhanced.js

# Seed forum categories
sqlite3 database/beacon.db < database/seed_forum.sql
```

### Step 5: Configure Environment Variables

```bash
cd /var/www/beaconmomentum/server

# Create .env file
nano .env

# Paste the configuration from Prerequisites section above
# Save and exit (Ctrl+X, Y, Enter)

# Secure the .env file
chmod 600 .env
```

### Step 6: Set Up Email Service

#### Option A: Gmail (Testing/Small Scale)

1. Enable 2-Factor Authentication on your Google account
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Use these credentials in `.env`:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-gmail@gmail.com
   SMTP_PASS=your-16-char-app-password
   ```

#### Option B: SendGrid (Production Recommended)

1. Sign up at https://sendgrid.com
2. Create API key
3. Verify sender identity
4. Use these credentials in `.env`:
   ```
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_USER=apikey
   SMTP_PASS=your-sendgrid-api-key
   ```

### Step 7: Set Up Stripe

#### Create Products

1. Go to https://dashboard.stripe.com/products
2. Create two products:

**Product 1: Beacon Basic**
- Name: Beacon Capital Suite - Basic
- Description: Access to all 5 modules + community features
- Price: $29/month recurring
- Copy the Price ID (starts with `price_`)

**Product 2: Beacon Premium**
- Name: Beacon Capital Suite - Premium
- Description: All Basic features + priority support + exclusive content
- Price: $99/month recurring
- Copy the Price ID

3. Update `.env` with your Price IDs

#### Configure Webhook

1. Go to https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. Endpoint URL: `https://beaconmomentum.com/api/payments/webhook`
4. Events to listen for:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the Webhook Secret (starts with `whsec_`)
6. Add to `.env` as `STRIPE_WEBHOOK_SECRET`

### Step 8: Update Server Configuration

```bash
# Replace old server.js with enhanced version
cd /var/www/beaconmomentum/server
cp server.js server.js.backup
cp server_enhanced.js server.js

# Update PM2 configuration
pm2 delete beacon-auth
pm2 start server.js --name beacon-auth
pm2 save
```

### Step 9: Set Up Automated Backups

```bash
# Make backup script executable
chmod +x /var/www/beaconmomentum/server/scripts/backup-database.sh

# Add to crontab (runs daily at 2 AM)
crontab -e

# Add this line:
0 2 * * * /var/www/beaconmomentum/server/scripts/backup-database.sh

# Test backup script
/var/www/beaconmomentum/server/scripts/backup-database.sh
```

### Step 10: Set Up Health Monitoring

```bash
# Make health check script executable
chmod +x /var/www/beaconmomentum/server/scripts/health-check.sh

# Add to crontab (runs every 5 minutes)
crontab -e

# Add this line:
*/5 * * * * /var/www/beaconmomentum/server/scripts/health-check.sh
```

### Step 11: Verify Deployment

```bash
# Check PM2 status
pm2 status

# Check logs
pm2 logs beacon-auth --lines 50

# Test health endpoint
curl http://localhost:3000/api/health

# Should return:
# {"status":"ok","timestamp":"...","version":"2.0.0","features":[...]}
```

### Step 12: Test Features

#### Test Email Verification

1. Register a new account at https://beaconmomentum.com/register.html
2. Check email for verification link
3. Click link to verify account
4. Login should now work

#### Test Password Reset

1. Go to https://beaconmomentum.com/forgot-password.html
2. Enter your email
3. Check email for reset link
4. Click link and set new password
5. Login with new password

#### Test Stripe Payments

1. Go to https://beaconmomentum.com/pricing.html
2. Click "Subscribe" on Basic plan
3. Use Stripe test card: `4242 4242 4242 4242`
4. Complete checkout
5. Verify subscription in Stripe Dashboard
6. Check user's subscription status in admin panel

#### Test Community Features

1. Login to member dashboard
2. Go to Community Forum
3. Create a test topic
4. Reply to topic
5. Test direct messaging

#### Test Admin Panel

1. Make your user an admin:
   ```bash
   sqlite3 /var/www/beaconmomentum/server/database/beacon.db
   UPDATE users SET is_admin = 1 WHERE email = 'your-email@example.com';
   .exit
   ```
2. Go to https://beaconmomentum.com/admin-dashboard.html
3. Verify you can see user statistics
4. Test user management features

---

## Troubleshooting

### Email Not Sending

**Check SMTP credentials:**
```bash
cd /var/www/beaconmomentum/server
node -e "
const nodemailer = require('nodemailer');
require('dotenv').config();
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});
transporter.verify((error, success) => {
  if (error) console.log('SMTP Error:', error);
  else console.log('SMTP OK');
});
"
```

### Stripe Webhook Not Working

**Check webhook secret:**
```bash
# View PM2 logs for webhook errors
pm2 logs beacon-auth | grep webhook

# Test webhook locally
curl -X POST http://localhost:3000/api/payments/webhook \
  -H "Content-Type: application/json" \
  -d '{"type":"test"}'
```

### Database Errors

**Check database permissions:**
```bash
ls -la /var/www/beaconmomentum/server/database/
chmod 644 /var/www/beaconmomentum/server/database/*.db
```

**Verify tables exist:**
```bash
sqlite3 /var/www/beaconmomentum/server/database/beacon.db ".tables"
```

Should show:
```
achievements            forum_topics          
direct_messages         module_progress       
forum_categories        sessions              
forum_post_likes        subscriptions         
forum_posts             users                 
password_reset_tokens   verification_tokens
```

### PM2 Not Starting

**Check Node.js version:**
```bash
node --version  # Should be v20.x or higher
```

**Check for port conflicts:**
```bash
netstat -tulpn | grep 3000
```

**Restart PM2:**
```bash
pm2 delete beacon-auth
pm2 start /var/www/beaconmomentum/server/server.js --name beacon-auth
pm2 save
```

---

## Maintenance

### Daily Tasks

- Check PM2 logs: `pm2 logs beacon-auth --lines 100`
- Monitor disk space: `df -h`
- Check backup status: `ls -lh /var/www/beaconmomentum/server/backups/`

### Weekly Tasks

- Review user registrations in admin panel
- Check Stripe dashboard for payment issues
- Review forum activity and moderate if needed
- Test email delivery

### Monthly Tasks

- Update Node.js packages: `cd /var/www/beaconmomentum/server && npm update`
- Review and rotate old backups
- Analyze user engagement metrics
- Review and update content

---

## Rollback Procedure

If something goes wrong:

```bash
# Stop current server
pm2 stop beacon-auth

# Restore backup
cd /var/www
tar -xzf beaconmomentum_backup_YYYYMMDD_HHMMSS.tar.gz -C beaconmomentum/

# Restore database
cd /var/www/beaconmomentum/server/database
cp beacon.db.backup.YYYYMMDD_HHMMSS beacon.db

# Restart server
pm2 restart beacon-auth
```

---

## Security Checklist

- [ ] `.env` file has 600 permissions
- [ ] SESSION_SECRET is strong and unique
- [ ] Stripe keys are production keys (not test keys)
- [ ] SMTP credentials are secure
- [ ] Database backups are working
- [ ] Health monitoring is active
- [ ] Firewall allows only ports 22, 80, 443
- [ ] SSL certificate is valid
- [ ] Admin accounts have strong passwords
- [ ] Rate limiting is enabled

---

## Support

If you encounter issues:

1. Check PM2 logs: `pm2 logs beacon-auth`
2. Check nginx logs: `tail -f /var/log/nginx/error.log`
3. Check system logs: `journalctl -u pm2-root -n 100`
4. Review this guide's Troubleshooting section

---

## Next Steps

After successful deployment:

1. **Content Creation**
   - Add more forum categories
   - Create welcome topics
   - Populate FAQ

2. **Marketing**
   - Announce new features to members
   - Create pricing page copy
   - Set up email campaigns

3. **Monitoring**
   - Set up uptime monitoring (UptimeRobot, Pingdom)
   - Configure error alerting
   - Set up analytics (Google Analytics, Plausible)

4. **Optimization**
   - Monitor performance
   - Optimize database queries
   - Add caching if needed

---

**Deployment Complete!** 🎉

Your BeaconMomentum.com platform now has enterprise-grade features ready for scaling.
