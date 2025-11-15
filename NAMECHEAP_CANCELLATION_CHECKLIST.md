# Namecheap Cancellation Checklist

**Purpose:** Safely cancel Namecheap hosting after migrating to DigitalOcean  
**Date Created:** November 12, 2025  
**Estimated Completion:** 2-4 weeks after DigitalOcean migration

---

## ⚠️ IMPORTANT: Do NOT Cancel Until All Checkboxes Are Complete

Cancelling too early can cause:
- Lost data
- Broken links
- Lost email
- Domain issues
- Traffic loss

---

## Phase 1: Pre-Migration Verification (Complete Before Cancelling)

### Data Backup ✅
- [x] Phoenix Collective site fully backed up
- [x] Join Rise & Reclaim site fully backed up
- [x] DigitalGrandpa.org site backed up
- [x] All images and assets extracted
- [x] All PHP backend files saved
- [x] All database exports completed (if any)
- [x] Historical archives created (3 copies)

### Asset Extraction ✅
- [x] Valuable images identified and copied
- [x] Marketing content documented
- [x] Technical components reviewed
- [x] Integration guide created

---

## Phase 2: DigitalOcean Migration (Must Complete First)

### Droplet Setup
- [ ] DigitalOcean droplet created
- [ ] Server software installed (Nginx, PHP, Node.js)
- [ ] All 3 sites deployed successfully
- [ ] SSL certificates installed
- [ ] Backups configured

### Site Functionality
- [ ] Beaconmomentum.com fully functional
- [ ] DigitalGrandpa.org fully functional
- [ ] Rise & Reclaim community fully functional
- [ ] Payment processing tested (Stripe)
- [ ] Contact forms working
- [ ] User registration/login working

### DNS Migration
- [ ] DNS records documented from Namecheap
- [ ] DNS updated to point to DigitalOcean droplet
- [ ] DNS propagation verified (all domains)
- [ ] All sites accessible via new hosting
- [ ] No 404 errors or broken links

---

## Phase 3: Monitoring Period (2 Weeks Minimum)

### Week 1 Monitoring
- [ ] Day 1: All sites loading correctly
- [ ] Day 2: No error reports from users
- [ ] Day 3: Payment processing working
- [ ] Day 4: Email functionality verified
- [ ] Day 5: Analytics showing normal traffic
- [ ] Day 6: No server issues or downtime
- [ ] Day 7: All features tested and working

### Week 2 Monitoring
- [ ] Day 8-14: Continued stable operation
- [ ] No unexpected errors in logs
- [ ] Server resources adequate (CPU, RAM, disk)
- [ ] Backup system running successfully
- [ ] SSL certificates auto-renewing properly

---

## Phase 4: Domain Management

### Domains to Handle

#### phoenixcollective.tech
- [ ] Decision made: Keep or let expire?
- [ ] If keeping: Set up 301 redirect to beaconmomentum.com/labs.html
- [ ] If expiring: Note expiration date: _______________
- [ ] Redirect tested and working (if applicable)

#### joinriseandreclaim.com
- [ ] Decision made: Keep or let expire?
- [ ] If keeping: Set up 301 redirect to riseandreclaim.community
- [ ] If expiring: Note expiration date: _______________
- [ ] Redirect tested and working (if applicable)

#### digitalgrandpa.org
- [ ] DNS transferred to Cloudflare (or other)
- [ ] A records pointing to DigitalOcean droplet
- [ ] Site fully functional on new hosting
- [ ] SSL certificate installed and valid

### Domain Redirect Setup (If Keeping Domains)

**Option A: Cloudflare Page Rules** (Recommended)
1. Transfer domain to Cloudflare (free)
2. Set up Page Rule for 301 redirect
3. Cost: $0/month

**Option B: Minimal Hosting**
1. Keep cheapest hosting plan ($2-5/month)
2. Upload simple redirect HTML
3. Cost: $2-5/month per domain

**Option C: Let Expire**
1. Document expiration dates
2. Set calendar reminders
3. Cost: $0/month

---

## Phase 5: Email Management

### Email Accounts on Namecheap
- [ ] List all email accounts: _______________
- [ ] Forward emails to new addresses
- [ ] Update email signatures with new addresses
- [ ] Notify contacts of new email addresses
- [ ] Export important emails to local backup
- [ ] Test email forwarding working

### Email Migration Options

**Option 1: Use Gmail/Google Workspace**
- Set up custom domain email
- Import old emails
- Cost: Free (Gmail) or $6/user/month (Workspace)

**Option 2: Use Cloudflare Email Routing** (Recommended)
- Free email forwarding
- Forward to any email address
- Cost: $0/month

**Option 3: Self-host on DigitalOcean**
- Install mail server (complex)
- Full control
- Cost: Included in droplet

---

## Phase 6: Final Verification

### Traffic Verification
- [ ] Google Analytics showing normal traffic
- [ ] No drop in visitor numbers
- [ ] No increase in bounce rate
- [ ] Search rankings maintained
- [ ] Referral traffic working

### Technical Verification
- [ ] All pages loading under 3 seconds
- [ ] Mobile responsiveness working
- [ ] Forms submitting successfully
- [ ] Payment processing 100% functional
- [ ] No JavaScript errors in console
- [ ] All images loading correctly

### SEO Verification
- [ ] Google Search Console updated with new hosting
- [ ] Sitemap submitted and indexed
- [ ] No crawl errors reported
- [ ] Meta tags intact
- [ ] Structured data valid

---

## Phase 7: Cancellation Process

### Before Cancelling Hosting

1. **Final Backup** (Even though you have backups)
   - [ ] Download complete site backup from Namecheap
   - [ ] Save to 3 locations (local, cloud, external drive)
   - [ ] Verify backup integrity

2. **Document Everything**
   - [ ] Screenshot Namecheap control panel settings
   - [ ] Save DNS records (even if already migrated)
   - [ ] Export email account settings
   - [ ] Save FTP/SSH credentials (for records)
   - [ ] Document any custom configurations

3. **Notify Stakeholders**
   - [ ] Inform team of hosting change
   - [ ] Update internal documentation
   - [ ] Update emergency contact procedures

### Cancellation Steps

#### Step 1: Cancel Hosting Plan (Not Domains Yet)
1. Log into Namecheap account
2. Go to "Hosting List"
3. Find your hosting plan
4. Click "Manage"
5. Look for "Cancel Hosting" or "Turn Off Auto-Renewal"
6. Follow cancellation process
7. **Note:** Keep domains active if you're redirecting

#### Step 2: Handle Domains
- [ ] phoenixcollective.tech: 
  - Action: ☐ Transfer to Cloudflare  ☐ Let expire  ☐ Keep at Namecheap
  - Date: _______________
- [ ] joinriseandreclaim.com:
  - Action: ☐ Transfer to Cloudflare  ☐ Let expire  ☐ Keep at Namecheap
  - Date: _______________
- [ ] digitalgrandpa.org:
  - Action: ☐ Transfer to Cloudflare  ☐ Let expire  ☐ Keep at Namecheap
  - Date: _______________

#### Step 3: Cancel Email (If Not Needed)
- [ ] All emails forwarded or migrated
- [ ] No critical emails expected
- [ ] Cancel email hosting

---

## Phase 8: Post-Cancellation Monitoring

### Week 1 After Cancellation
- [ ] Verify all sites still accessible
- [ ] Check for any broken links
- [ ] Monitor error logs
- [ ] Verify email forwarding (if applicable)
- [ ] Check domain redirects (if applicable)

### Month 1 After Cancellation
- [ ] No issues reported
- [ ] Traffic levels normal
- [ ] All functionality working
- [ ] Backups running successfully
- [ ] Cost savings realized

---

## Cost Analysis

### Current Namecheap Costs (Estimated)
- Shared hosting: $15-20/month
- Domain renewals: $12-15/year each × 3 = $36-45/year
- Email hosting: $0-10/month
- **Total: $180-360/year**

### After Migration to DigitalOcean
- Droplet: $12/month = $144/year
- Domains (if keeping): $30-45/year (Cloudflare cheaper)
- Email: $0 (Cloudflare routing) or $72/year (Google Workspace)
- **Total: $144-261/year**

### Annual Savings: $36-216/year

---

## Emergency Rollback Plan

If something goes catastrophically wrong:

### Immediate Actions
1. Log back into Namecheap
2. Revert DNS to old IP addresses
3. Wait 15-30 minutes for propagation
4. Sites should be back online

### Prevention
- **Don't cancel hosting for 2 weeks** after DNS migration
- Keep Namecheap account active during transition
- Have old IP addresses documented
- Maintain old backups

---

## Timeline Recommendation

| Week | Actions |
|------|---------|
| Week 0 | Complete DigitalOcean migration |
| Week 1-2 | Monitor new hosting, verify everything works |
| Week 3 | Set up domain redirects (if keeping domains) |
| Week 4 | Cancel Namecheap hosting (keep domains if redirecting) |
| Week 5-8 | Monitor post-cancellation |
| Month 3 | Let domains expire or transfer to cheaper registrar |

---

## Contact Information

### Namecheap Support
- Website: https://www.namecheap.com/support/
- Live Chat: Available 24/7
- Phone: Check website for current number

### Before Contacting Support
Have ready:
- Account username
- Domain names
- Hosting plan details
- Specific questions

---

## Final Checklist Before Cancellation

**I confirm that:**
- [ ] All sites have been migrated and tested
- [ ] DNS has been updated and propagated
- [ ] All sites have been monitored for 2+ weeks
- [ ] All data has been backed up in 3 locations
- [ ] Email has been migrated or forwarded
- [ ] Domain strategy decided (keep/redirect/expire)
- [ ] Team has been notified
- [ ] Emergency rollback plan documented
- [ ] I understand cancellation is permanent
- [ ] I have read this entire checklist

**Signature:** _______________ **Date:** _______________

---

## Archive Locations

### Historical Site Archives
1. **DigitalOcean Droplet:** `/var/www/archives/`
2. **Local Backup:** Document path: _______________
3. **Cloud Storage:** Document location: _______________

### Files Archived
- `phoenix-collective-complete.tar.gz` (30 MB)
- `join-rise-reclaim-complete.tar.gz` (21 MB)
- `extracted-assets-for-integration.tar.gz` (13 MB)

---

## Notes Section

Use this space to document any issues, decisions, or important information:

```
Date: _______________
Note: 





Date: _______________
Note: 





Date: _______________
Note: 




```

---

## Success Criteria

You can safely cancel when ALL of these are true:

✅ All sites functional on DigitalOcean for 2+ weeks  
✅ No errors or issues reported  
✅ DNS fully migrated and stable  
✅ All data backed up in multiple locations  
✅ Email migrated or forwarded  
✅ Domain strategy implemented  
✅ Team notified and documentation updated  
✅ Cost savings realized  
✅ No regrets or second thoughts  

---

**Remember:** There's no rush. Better to wait an extra week than to cancel too early and cause problems. The Namecheap hosting costs are minimal compared to the risk of data loss or downtime.

**When in doubt, wait another week.**
