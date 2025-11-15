# GoHighLevel Configuration Guide

## Overview

This guide will help you configure GoHighLevel to automatically sync with Beacon Momentum, creating users and assigning memberships based on form submissions and tags.

**Time Required:** 20-30 minutes  
**Prerequisites:** GoHighLevel account with admin access

---

## Step 1: Configure GHL Webhook

### Access Webhook Settings:

1. Log in to GoHighLevel
2. Go to **Settings** → **Integrations** → **Webhooks**
3. Click **Add Webhook**

### Webhook Configuration:

**Webhook URL:**
```
https://beaconmomentum.com/api/ghl/webhook
```

**Events to Subscribe:**
- ✅ `Form Submission` / `FormSubmit`
- ✅ `Tag Added` / `TagAdded`
- ✅ `Contact Created` / `ContactCreate`
- ✅ `Contact Updated` / `ContactUpdate`

**Method:** `POST`

**Headers:** (Optional - for additional security)
```
X-GHL-Secret: your-secret-key-here
```

**Save Webhook**

---

## Step 2: Tag Naming Convention

The Beacon system uses specific tag names to automatically assign memberships.

### Required Tags:

Create these tags in GHL: **Settings** → **Tags**

| Tag Name | Membership Assigned | Access Level |
|----------|---------------------|--------------|
| `founding-member` | All Access Lifetime | Capital Suite + Solopreneur + Rise & Reclaim |
| `capital-suite` | Capital Suite Monthly | Capital Suite only |
| `solopreneur-launchpad` | Solopreneur Launchpad Monthly | Solopreneur Launchpad only |
| `rise-reclaim` | Rise & Reclaim Monthly | Rise & Reclaim only |
| `all-access` | All Access Monthly | All products |
| `annual-member` | (Upgrades plan type) | Changes billing to annual |
| `lifetime-member` | (Upgrades plan type) | Changes to lifetime access |

### Tag Rules:

- **Case insensitive:** `Founding-Member` = `founding-member`
- **Trimmed:** Extra spaces are removed
- **Hyphens required:** Use hyphens, not underscores or spaces
- **Multiple tags:** User can have multiple tags; highest level wins

### Tag Hierarchy:

```
founding-member (highest)
  ↓
all-access
  ↓
capital-suite / solopreneur-launchpad / rise-reclaim
  ↓
(no tags = guest)
```

---

## Step 3: Create Workflows

### Workflow 1: Form Submission → User Creation

**Purpose:** When someone fills out a form, automatically create their Beacon account.

**Trigger:** Form Submission

**Actions:**

1. **Add Tag** → `lead-captured`
2. **Webhook** → Send to Beacon
   - URL: `https://beaconmomentum.com/api/ghl/webhook`
   - Method: POST
   - Body: (GHL automatically sends contact data)
3. **Wait** → 5 seconds
4. **Send Email** → Welcome email with login instructions

**Form Fields Required:**
- First Name
- Last Name
- Email (required)
- Phone (optional)

---

### Workflow 2: Stripe Payment → Membership Assignment

**Purpose:** After Stripe payment, assign the appropriate membership tag.

**Trigger:** Stripe Payment Received (via Zapier or GHL Stripe integration)

**Actions:**

1. **Condition** → Check product purchased
2. **Add Tag** → Based on product:
   - Capital Suite → `capital-suite`
   - Solopreneur Launchpad → `solopreneur-launchpad`
   - Rise & Reclaim → `rise-reclaim`
   - All Access → `all-access`
   - Founding Member → `founding-member`
3. **Webhook** → Notify Beacon of tag change
4. **Send Email** → Purchase confirmation + access instructions

---

### Workflow 3: Manual Tag Assignment → Membership Update

**Purpose:** When you manually add a membership tag, update Beacon.

**Trigger:** Tag Added

**Filter:** Tag is one of:
- `founding-member`
- `capital-suite`
- `solopreneur-launchpad`
- `rise-reclaim`
- `all-access`
- `annual-member`
- `lifetime-member`

**Actions:**

1. **Webhook** → Send to Beacon
   - URL: `https://beaconmomentum.com/api/ghl/webhook`
   - Method: POST
2. **Send Email** → "Your membership has been activated!"

---

### Workflow 4: Subscription Cancellation → Remove Access

**Purpose:** When subscription is cancelled, remove membership tag.

**Trigger:** Stripe Subscription Cancelled

**Actions:**

1. **Remove Tag** → Remove membership tag
2. **Add Tag** → `cancelled-member`
3. **Webhook** → Notify Beacon
4. **Send Email** → Cancellation confirmation

---

## Step 4: Form Integration

### Lead Capture Form:

Create a form in GHL for lead capture:

**Form Fields:**
- First Name (required)
- Last Name (required)
- Email (required)
- Phone (optional)
- "How did you hear about us?" (dropdown)

**Form Settings:**
- **Submit Action:** Trigger Workflow 1
- **Redirect:** `https://beaconmomentum.com/thank-you.html`
- **Double Opt-In:** Recommended

**Embed Code:**
```html
<iframe src="https://api.leadconnectorhq.com/widget/form/YOUR_FORM_ID" 
        style="width:100%;height:600px;border:none;">
</iframe>
```

---

### Registration Form Integration:

**Option A: Direct Registration**
- Users register directly on beaconmomentum.com
- GHL captures them via webhook when they register
- Add GHL contact ID to Beacon user record

**Option B: GHL Form First**
- Users fill out GHL form
- GHL sends webhook to Beacon
- Beacon creates pre-verified account
- User receives email with temporary password

**Recommended:** Option B for better CRM tracking

---

## Step 5: Email Sequences

### Sequence 1: Welcome Series (New Leads)

**Trigger:** Form submission, no purchase yet

**Emails:**

1. **Day 0:** Welcome + What to Expect
2. **Day 1:** Your Story (hardscrabble upbringing → success)
3. **Day 3:** Capital Suite Overview
4. **Day 5:** Rise & Reclaim Testimonials
5. **Day 7:** Solopreneur Launchpad Benefits
6. **Day 10:** Founding Member Offer
7. **Day 14:** Last Chance (if not purchased)

---

### Sequence 2: Post-Purchase Onboarding

**Trigger:** Membership tag added

**Emails:**

1. **Immediately:** Purchase confirmation + login instructions
2. **Day 1:** Getting Started Guide
3. **Day 3:** First Module Walkthrough
4. **Day 7:** Check-in + Support Resources
5. **Day 14:** Advanced Features
6. **Day 30:** Feedback Request + Testimonial Ask

---

### Sequence 3: Founding Member VIP

**Trigger:** `founding-member` tag added

**Emails:**

1. **Immediately:** Welcome to the Founding Circle
2. **Day 1:** Exclusive Benefits Overview
3. **Day 3:** 1-on-1 Call Scheduling Link
4. **Day 7:** Founding Member Community Invite
5. **Day 14:** Early Access to New Content
6. **Monthly:** Founding Member Newsletter

---

## Step 6: Zapier Integration (Optional)

If you want to connect Stripe → GHL → Beacon:

### Zap 1: Stripe Payment → GHL Tag

**Trigger:** New Payment in Stripe

**Actions:**
1. Find Contact in GHL (by email)
2. Add Tag to Contact (based on product)
3. Send Webhook to Beacon

---

### Zap 2: GHL Form → Beacon User

**Trigger:** New Form Submission in GHL

**Actions:**
1. Create User in Beacon (via API)
2. Send Welcome Email
3. Add to Email Sequence

---

## Step 7: Testing

### Test Form Submission:

1. Fill out GHL form with test email
2. Check GHL contact was created
3. Check Beacon user was created
4. Verify email was sent
5. Verify user can log in

### Test Tag Assignment:

1. Manually add `founding-member` tag to test contact
2. Check Beacon webhook logs
3. Verify membership was assigned
4. Check `/api/membership/permissions` shows correct access
5. Verify user can access protected content

### Test Stripe Integration:

1. Make test purchase in Stripe
2. Verify GHL contact received tag
3. Verify Beacon membership was assigned
4. Check purchase_history table
5. Verify user can access content

---

## Step 8: Custom Fields

Add these custom fields to GHL contacts for better tracking:

### Beacon Integration Fields:

- `beacon_user_id` - Beacon database user ID
- `beacon_membership_level` - Current membership level
- `beacon_membership_status` - Active/Inactive/Cancelled
- `beacon_membership_expires` - Expiration date
- `beacon_total_revenue` - Total spent
- `beacon_last_login` - Last login date

### Update Custom Fields via Webhook:

When Beacon receives a webhook, it can send data back to GHL to update these fields.

---

## Step 9: Reporting

### GHL Reports to Create:

1. **Membership Dashboard**
   - Total members by level
   - Active vs. cancelled
   - Monthly recurring revenue
   - Lifetime value

2. **Conversion Funnel**
   - Form submissions
   - Email opens
   - Sales page visits
   - Purchases
   - Conversion rate

3. **Tag Performance**
   - Which tags drive most revenue
   - Tag assignment timeline
   - Tag removal reasons

---

## Step 10: Automation Rules

### Rule 1: Inactive Member Re-engagement

**Trigger:** No login in 30 days + active membership

**Actions:**
1. Add tag `inactive-member`
2. Send re-engagement email
3. Offer bonus content
4. If still no login after 7 days → personal outreach

---

### Rule 2: Upgrade Prompts

**Trigger:** Has `rise-reclaim` tag, visited Capital Suite page 3+ times

**Actions:**
1. Add tag `upgrade-candidate`
2. Send upgrade offer email
3. Offer discount code
4. Schedule sales call

---

### Rule 3: Affiliate Recruitment

**Trigger:** Has `founding-member` tag + engaged (opened 80%+ emails)

**Actions:**
1. Add tag `affiliate-candidate`
2. Send affiliate program invitation
3. Provide affiliate kit
4. Set up affiliate tracking

---

## Webhook Payload Examples

### Form Submission:

```json
{
  "type": "form_submission",
  "contact": {
    "id": "ghl_contact_id_123",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1234567890",
    "tags": ["lead-captured"]
  },
  "form": {
    "id": "form_id_456",
    "name": "Lead Capture Form"
  }
}
```

### Tag Added:

```json
{
  "type": "tag_added",
  "contact": {
    "id": "ghl_contact_id_123",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "tags": ["founding-member", "lead-captured"]
  },
  "tag": {
    "name": "founding-member",
    "addedAt": "2025-11-15T02:00:00Z"
  }
}
```

---

## Troubleshooting

### Webhook Not Firing:

1. Check GHL webhook logs: Settings → Integrations → Webhooks → View Logs
2. Verify URL is correct: `https://beaconmomentum.com/api/ghl/webhook`
3. Check Beacon server logs: `pm2 logs beacon-auth`
4. Test webhook manually: Use `/api/ghl/test` endpoint

### Membership Not Assigned:

1. Verify tag name matches exactly (case-insensitive, but spelling must match)
2. Check Beacon webhook logs for errors
3. Verify user exists in Beacon database
4. Check membership_level field in users table

### Duplicate Users:

1. GHL and Beacon both create users → use email as unique key
2. Beacon checks if user exists before creating
3. If duplicate, Beacon updates existing user instead

---

## Best Practices

### Tag Management:

- ✅ Use consistent naming (lowercase, hyphens)
- ✅ Document all tags in a spreadsheet
- ✅ Regularly audit tags for accuracy
- ✅ Remove old/unused tags

### Workflow Organization:

- ✅ Name workflows clearly: "Stripe Payment → Membership Tag"
- ✅ Add notes explaining each step
- ✅ Test workflows before activating
- ✅ Monitor workflow performance weekly

### Data Hygiene:

- ✅ Merge duplicate contacts
- ✅ Update invalid emails
- ✅ Remove unsubscribed contacts from sequences
- ✅ Archive cancelled members after 90 days

---

## Next Steps

After GHL is configured:

1. ✅ **Test form submission flow**
2. ✅ **Test tag assignment flow**
3. ✅ **Set up email sequences**
4. ✅ **Create reporting dashboards**
5. ✅ **Train team on tag usage**
6. ✅ **Launch!**

---

## Support

If you need help with GHL configuration, I can:
- Create the workflows for you
- Set up the email sequences
- Configure the webhooks
- Test the complete flow
- Train your team

**The webhook is ready. The tag mapping is configured. Just set up GHL and you're live!** 🚀
