# Beacon Momentum - Hybrid Deployment System Guide

**Last Updated:** October 31, 2025  
**System Status:** ✅ Active and Verified  
**Repository:** https://github.com/beaconmomentum-dev/beacon-momentum-website  
**Live Site:** https://beaconmomentum.com

---

## Overview

The Beacon Momentum website now uses a **hybrid deployment system** that combines the best of both worlds:

**GitHub Version Control** - All code changes tracked with complete history, commit messages, and rollback capability

**Production Droplet** - Live site continues running on your existing DigitalOcean droplet (142.93.113.46) without any DNS changes

**Automated Sync** - Changes pushed to GitHub automatically deploy to the live droplet every 5 minutes

This approach gives you professional version control and automated deployments while keeping your current infrastructure unchanged.

---

## How It Works

### The Workflow

```
1. Make Changes → 2. Push to GitHub → 3. Auto-Sync (every 5 min) → 4. Live on beaconmomentum.com
   (Local/AI)        (Version Control)      (Droplet pulls changes)     (Production site updated)
```

### Behind the Scenes

**On GitHub:**
- Repository: `beaconmomentum-dev/beacon-momentum-website`
- Branch: `main`
- Every commit is tracked with full history

**On Production Droplet (142.93.113.46):**
- Systemd timer runs every 5 minutes
- Checks GitHub for new commits
- If changes detected:
  - Creates automatic backup
  - Pulls latest code
  - Deploys to `/var/www/beaconmomentum`
  - Tests nginx configuration
  - Reloads nginx
  - Logs deployment details

**Result:**
- Changes go live within 5 minutes of pushing to GitHub
- No manual SSH access needed
- Complete deployment logs
- Automatic backups before each deployment

---

## Making Updates

### Method 1: Ask an AI Assistant (Easiest)

Tell me (or any AI assistant with GitHub access) what you want to change:

**Example:**
> "Update the Rise & Reclaim description to mention our new job training program"

I'll:
1. Make the changes to the HTML
2. Commit to GitHub with descriptive message
3. Push to main branch
4. Changes deploy automatically within 5 minutes

### Method 2: GitHub Web Interface (Simple)

For small text changes:

1. Go to https://github.com/beaconmomentum-dev/beacon-momentum-website
2. Navigate to the file (e.g., `index.html`)
3. Click the pencil icon to edit
4. Make your changes
5. Scroll down and click "Commit changes"
6. Add a descriptive commit message
7. Click "Commit changes"
8. Wait 5 minutes - changes deploy automatically!

### Method 3: Local Development (Advanced)

If you're comfortable with Git:

```bash
# Clone the repository
git clone https://github.com/beaconmomentum-dev/beacon-momentum-website.git
cd beacon-momentum-website

# Make your changes
# Edit files using your preferred editor

# Stage and commit
git add .
git commit -m "Describe your changes"

# Push to GitHub
git push origin main

# Wait 5 minutes for automatic deployment
```

### Method 4: Manual Deployment (Emergency)

If you need changes deployed immediately (not waiting 5 minutes):

```bash
# SSH into the droplet
ssh root@142.93.113.46

# Run deployment script manually
/usr/local/bin/deploy-beacon.sh

# Changes deploy in ~3 seconds
```

---

## Deployment System Details

### Automated Deployment Script

**Location:** `/usr/local/bin/deploy-beacon.sh`

**What it does:**
1. Checks GitHub for new commits
2. If no changes: Exits (logs "Already up to date")
3. If changes found:
   - Creates timestamped backup in `/var/www/backups/`
   - Pulls latest code to `/var/www/beacon-repo/`
   - Copies files to `/var/www/beaconmomentum/`
   - Sets proper permissions (www-data:www-data)
   - Tests nginx configuration
   - Reloads nginx if test passes
   - Logs all actions to `/var/log/beacon-deploy.log`
   - Cleans up old backups (keeps last 10)

**Deployment Time:** ~3 seconds (when changes exist)

### Systemd Timer

**Service:** `beacon-deploy.service`  
**Timer:** `beacon-deploy.timer`  
**Frequency:** Every 5 minutes  
**Auto-start:** Enabled (starts on boot)

**Check timer status:**
```bash
ssh root@142.93.113.46
systemctl status beacon-deploy.timer
systemctl list-timers beacon-deploy.timer
```

**View deployment logs:**
```bash
ssh root@142.93.113.46
tail -f /var/log/beacon-deploy.log
```

**Manually trigger deployment:**
```bash
ssh root@142.93.113.46
/usr/local/bin/deploy-beacon.sh
```

---

## Backup & Rollback

### Automatic Backups

**Every deployment creates a backup:**
- Location: `/var/www/backups/`
- Format: `beacon_backup_YYYYMMDD_HHMMSS.tar.gz`
- Retention: Last 10 backups kept automatically
- Contents: Complete website files

**View available backups:**
```bash
ssh root@142.93.113.46
ls -lh /var/www/backups/
```

### Rollback Procedures

#### Option 1: Rollback via GitHub (Recommended)

**To previous commit:**
```bash
# Find the commit you want to roll back to
git log --oneline

# Revert to that commit
git revert <commit-hash>
git push origin main

# Wait 5 minutes for automatic deployment
```

**To specific version:**
```bash
# Reset to specific commit
git reset --hard <commit-hash>
git push --force origin main

# Wait 5 minutes for automatic deployment
```

#### Option 2: Rollback via Backup (Emergency)

**If you need immediate rollback:**
```bash
# SSH into droplet
ssh root@142.93.113.46

# List available backups
ls -lh /var/www/backups/

# Restore from backup
cd /var/www/beaconmomentum
tar -xzf /var/www/backups/beacon_backup_YYYYMMDD_HHMMSS.tar.gz

# Reload nginx
systemctl reload nginx

# Site restored immediately
```

---

## Monitoring & Troubleshooting

### Check Deployment Status

**View recent deployments:**
```bash
ssh root@142.93.113.46
tail -50 /var/log/beacon-deploy.log
```

**Watch deployments in real-time:**
```bash
ssh root@142.93.113.46
tail -f /var/log/beacon-deploy.log
```

**Check timer status:**
```bash
ssh root@142.93.113.46
systemctl status beacon-deploy.timer
```

### Common Issues

#### Changes Not Deploying

**Symptoms:** Pushed to GitHub but site not updating after 5+ minutes

**Diagnosis:**
```bash
ssh root@142.93.113.46

# Check if timer is running
systemctl status beacon-deploy.timer

# Check recent logs
tail -20 /var/log/beacon-deploy.log

# Manually trigger deployment
/usr/local/bin/deploy-beacon.sh
```

**Common Causes:**
- Timer not running: `systemctl start beacon-deploy.timer`
- Git repository issue: Check `/var/www/beacon-repo/`
- Permission issues: Check file ownership

#### Deployment Failed

**Symptoms:** Deployment log shows errors

**Diagnosis:**
```bash
ssh root@142.93.113.46

# View full deployment log
cat /var/log/beacon-deploy.log

# Check nginx error log
tail -50 /var/log/nginx/error.log

# Test nginx configuration
nginx -t
```

**Recovery:**
```bash
# Restore from last backup
cd /var/www/beaconmomentum
tar -xzf /var/www/backups/beacon_backup_*.tar.gz
systemctl reload nginx
```

#### Timer Not Running

**Symptoms:** No deployments happening automatically

**Fix:**
```bash
ssh root@142.93.113.46

# Enable and start timer
systemctl enable beacon-deploy.timer
systemctl start beacon-deploy.timer

# Verify it's running
systemctl status beacon-deploy.timer
```

---

## File Structure

### On GitHub

```
beacon-momentum-website/
├── index.html                      # Enhanced homepage
├── labs.html                       # Beacon Labs page
├── digital-grandpa.html           # Digital Grandpa division page
├── rise-reclaim.html              # Rise & Reclaim landing page
├── images/                        # All image assets
│   ├── bob-burr-professional-photo.jpeg
│   ├── digital-grandpa-icon.png
│   ├── rise-reclaim-icon.png
│   ├── beacon-labs-icon.png
│   ├── favicon.png
│   └── [13 brand logo files]
├── README.md                      # Project documentation
├── CHANGELOG.md                   # Version history
├── DEPLOYMENT_GUIDE.md           # GitHub deployment guide
└── .gitignore                    # Git ignore rules
```

### On Production Droplet

```
/var/www/
├── beacon-repo/                   # Git repository (auto-updated)
│   ├── .git/
│   ├── index.html
│   ├── labs.html
│   ├── digital-grandpa.html
│   ├── rise-reclaim.html
│   └── images/
├── beaconmomentum/               # Live website files
│   ├── index.html
│   ├── labs.html
│   ├── digital-grandpa.html
│   ├── rise-reclaim.html
│   └── images/
└── backups/                      # Automatic backups
    ├── beacon_backup_20251031_212454.tar.gz
    └── [up to 10 backups]

/usr/local/bin/
└── deploy-beacon.sh              # Deployment script

/etc/systemd/system/
├── beacon-deploy.service         # Systemd service
└── beacon-deploy.timer          # Systemd timer

/var/log/
└── beacon-deploy.log            # Deployment logs
```

---

## Best Practices

### Commit Messages

Write clear, descriptive commit messages that explain **what** and **why**:

**Good Examples:**
- "Add new testimonials section to homepage with 3 client stories"
- "Update Rise & Reclaim joining process to include skills assessment"
- "Fix broken CTA button link in Beacon Labs section"
- "Replace Bob's photo with updated professional headshot"

**Bad Examples:**
- "Update"
- "Fix stuff"
- "Changes"
- "asdf"

### Testing Changes

**For minor changes:**
- Push to GitHub and verify after 5 minutes

**For major changes:**
1. Create a `staging` branch
2. Make changes in staging
3. Test thoroughly
4. Merge to `main` when ready
5. Automatic deployment to production

**For critical changes:**
1. Make changes
2. Push to GitHub
3. SSH into droplet and manually run deployment script
4. Verify immediately
5. Keep SSH session open for quick rollback if needed

### Backup Strategy

**Automatic backups:**
- Created before every deployment
- Last 10 kept automatically
- Stored in `/var/www/backups/`

**Manual backups (before major changes):**
```bash
ssh root@142.93.113.46
cd /var/www/beaconmomentum
tar -czf /var/www/backups/manual_backup_$(date +%Y%m%d_%H%M%S).tar.gz .
```

**GitHub as primary backup:**
- Complete version history
- Can recreate site from any commit
- Clone repository for offline backup

---

## Advantages of Hybrid System

### vs. Manual SSH Deployment

**Before (Manual SSH):**
- ❌ No version control
- ❌ No change history
- ❌ Manual file uploads
- ❌ No automatic backups
- ❌ Difficult rollback
- ❌ No collaboration capability

**After (Hybrid GitHub + Droplet):**
- ✅ Complete version control
- ✅ Full change history with commit messages
- ✅ Automated deployments
- ✅ Automatic backups before each deployment
- ✅ Easy rollback to any version
- ✅ Multiple contributors via GitHub

### vs. Pure App Platform

**App Platform Only:**
- ❌ Requires DNS changes
- ❌ Migration complexity
- ❌ Potential downtime during switch
- ❌ New infrastructure to learn

**Hybrid System:**
- ✅ No DNS changes needed
- ✅ Uses existing droplet
- ✅ Zero downtime
- ✅ Familiar infrastructure
- ✅ All GitHub benefits
- ✅ Automated deployments

---

## Maintenance

### Regular Tasks

**Weekly:**
- Review deployment logs for any errors
- Verify automatic deployments are working

**Monthly:**
- Check backup directory size
- Review and clean up old backups if needed
- Update deployment script if improvements available

**As Needed:**
- Update content via GitHub
- Monitor deployment logs after major changes
- Test rollback procedure periodically

### System Updates

**Updating the deployment script:**
```bash
# Edit script on droplet
ssh root@142.93.113.46
nano /usr/local/bin/deploy-beacon.sh

# Or upload new version
scp deploy-beacon.sh root@142.93.113.46:/usr/local/bin/
ssh root@142.93.113.46 'chmod +x /usr/local/bin/deploy-beacon.sh'
```

**Changing deployment frequency:**
```bash
ssh root@142.93.113.46
nano /etc/systemd/system/beacon-deploy.timer

# Edit OnUnitActiveSec value (e.g., 10min, 1h)
# Then reload systemd
systemctl daemon-reload
systemctl restart beacon-deploy.timer
```

---

## Security Notes

### Access Control

**GitHub Repository:**
- Account: beaconmomentum-dev
- Token-based authentication
- Revocable access tokens

**Production Droplet:**
- SSH key authentication
- Root access required for deployment script
- Deployment logs for audit trail

### Deployment Safety

**Automatic safeguards:**
- Nginx configuration tested before reload
- Automatic rollback if nginx test fails
- Backups created before every deployment
- Deployment logs for troubleshooting

**Manual safeguards:**
- Review changes before pushing to GitHub
- Test major changes in staging branch
- Keep SSH access available for emergency rollback

---

## Future Enhancements

### Potential Improvements

**Webhook-Based Deployment:**
- Replace timer with GitHub webhook
- Instant deployment on push (no 5-minute wait)
- Requires webhook endpoint on droplet

**Staging Environment:**
- Separate staging URL for testing
- Deploy `staging` branch to test site
- Merge to `main` for production

**Deployment Notifications:**
- Email notifications on deployment success/failure
- Slack integration for team notifications
- SMS alerts for critical failures

**Automated Testing:**
- Run tests before deployment
- Prevent broken code from going live
- Automated link checking

**Multi-Server Deployment:**
- Deploy to multiple droplets simultaneously
- Load balancing across servers
- Zero-downtime deployments

---

## Support & Contact

### For Website Updates
- **AI Assistant:** Ask Manus or similar AI to make changes via GitHub
- **Direct Edit:** Use GitHub web interface for simple changes
- **Manual Deployment:** SSH into droplet for immediate deployment

### For System Issues
- **Deployment Logs:** `/var/log/beacon-deploy.log`
- **Nginx Logs:** `/var/log/nginx/error.log`
- **System Logs:** `journalctl -u beacon-deploy.service`

### Emergency Procedures

**If site is down:**
1. Check nginx status: `systemctl status nginx`
2. Check deployment logs: `tail -50 /var/log/beacon-deploy.log`
3. Restore from backup if needed
4. Contact DigitalOcean support if infrastructure issue

**If deployment broken:**
1. Stop timer: `systemctl stop beacon-deploy.timer`
2. Restore from backup
3. Fix issue in GitHub
4. Test deployment manually
5. Restart timer: `systemctl start beacon-deploy.timer`

---

## Quick Reference

### Common Commands

**Check deployment status:**
```bash
ssh root@142.93.113.46 'tail -20 /var/log/beacon-deploy.log'
```

**Manual deployment:**
```bash
ssh root@142.93.113.46 '/usr/local/bin/deploy-beacon.sh'
```

**View backups:**
```bash
ssh root@142.93.113.46 'ls -lh /var/www/backups/'
```

**Check timer:**
```bash
ssh root@142.93.113.46 'systemctl status beacon-deploy.timer'
```

**Rollback to backup:**
```bash
ssh root@142.93.113.46
cd /var/www/beaconmomentum
tar -xzf /var/www/backups/beacon_backup_YYYYMMDD_HHMMSS.tar.gz
systemctl reload nginx
```

### Key Files & Locations

| Item | Location |
|------|----------|
| Deployment Script | `/usr/local/bin/deploy-beacon.sh` |
| Deployment Logs | `/var/log/beacon-deploy.log` |
| Git Repository | `/var/www/beacon-repo/` |
| Live Website | `/var/www/beaconmomentum/` |
| Backups | `/var/www/backups/` |
| Systemd Service | `/etc/systemd/system/beacon-deploy.service` |
| Systemd Timer | `/etc/systemd/system/beacon-deploy.timer` |

---

## Conclusion

The hybrid GitHub + droplet deployment system provides the best of both worlds:

✅ **Professional version control** via GitHub  
✅ **Automated deployments** every 5 minutes  
✅ **No DNS changes** or migration complexity  
✅ **Automatic backups** before each deployment  
✅ **Easy rollback** to any previous version  
✅ **AI assistant integration** for safe updates  
✅ **Complete audit trail** via deployment logs  
✅ **Zero downtime** during deployments  

The Beacon Momentum website is now positioned for sustainable growth with professional deployment infrastructure while maintaining the stability and familiarity of your existing droplet hosting.

---

**System Status:** ✅ Active and Verified  
**Last Deployment:** October 31, 2025, 21:24:57 UTC  
**Commit:** 408b558 - "Test hybrid deployment: Verify GitHub to droplet sync"

**Lighting the Way Forward** - now with hybrid GitHub deployments! 🔥

