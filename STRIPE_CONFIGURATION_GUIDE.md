# Stripe Product Configuration Guide

## Overview

This guide will walk you through setting up all Beacon Momentum products in Stripe so that payments automatically assign the correct membership levels.

**Time Required:** 30-45 minutes  
**Prerequisites:** Stripe account with payment processing enabled

---

## Step 1: Access Stripe Dashboard

1. Go to https://dashboard.stripe.com
2. Log in to your Stripe account
3. Make sure you're in **LIVE MODE** (toggle in top right) when ready for production
   - Use **TEST MODE** for initial setup and testing

---

## Step 2: Create Products

Navigate to: **Products** → **Add Product**

Create the following 5 products:

### Product 1: Beacon Capital Suite

**Product Information:**
- Name: `Beacon Capital Suite`
- Description: `Master DeFi, crypto security, and investment strategies. Build true financial sovereignty.`
- Statement Descriptor: `BEACON CAPITAL`
- Unit Label: (leave blank)

**Pricing:**
Create 3 prices for this product:

1. **Monthly Subscription**
   - Price: `$97.00 USD`
   - Billing Period: `Monthly`
   - Price ID: Will be generated (e.g., `price_1ABC...`)
   - Nickname: `Capital Suite Monthly`

2. **Annual Subscription**
   - Price: `$970.00 USD`
   - Billing Period: `Yearly`
   - Price ID: Will be generated
   - Nickname: `Capital Suite Annual`

3. **Lifetime Access**
   - Price: `$1,997.00 USD`
   - Billing Period: `One time`
   - Price ID: Will be generated
   - Nickname: `Capital Suite Lifetime`

**Save Product**

---

### Product 2: Solopreneur Launchpad

**Product Information:**
- Name: `Solopreneur Launchpad`
- Description: `Build your business from scratch. Systems, marketing, and momentum for solo entrepreneurs.`
- Statement Descriptor: `BEACON SOLOPRENEUR`

**Pricing:**

1. **Monthly Subscription**
   - Price: `$67.00 USD`
   - Billing Period: `Monthly`
   - Nickname: `Solopreneur Monthly`

2. **Annual Subscription**
   - Price: `$670.00 USD`
   - Billing Period: `Yearly`
   - Nickname: `Solopreneur Annual`

**Save Product**

---

### Product 3: Rise & Reclaim

**Product Information:**
- Name: `Rise & Reclaim`
- Description: `Rebuild your life after hardship. Financial recovery, mindset reset, and community support.`
- Statement Descriptor: `BEACON RISE RECLAIM`

**Pricing:**

1. **Monthly Subscription**
   - Price: `$47.00 USD`
   - Billing Period: `Monthly`
   - Nickname: `Rise & Reclaim Monthly`

2. **Annual Subscription**
   - Price: `$470.00 USD`
   - Billing Period: `Yearly`
   - Nickname: `Rise & Reclaim Annual`

**Save Product**

---

### Product 4: All Access Pass

**Product Information:**
- Name: `Beacon All Access`
- Description: `Complete access to Capital Suite, Solopreneur Launchpad, and Rise & Reclaim.`
- Statement Descriptor: `BEACON ALL ACCESS`

**Pricing:**

1. **Monthly Subscription**
   - Price: `$197.00 USD`
   - Billing Period: `Monthly`
   - Nickname: `All Access Monthly`

2. **Annual Subscription**
   - Price: `$1,970.00 USD`
   - Billing Period: `Yearly`
   - Nickname: `All Access Annual`

**Save Product**

---

### Product 5: Founding Member (Lifetime)

**Product Information:**
- Name: `Beacon Founding Member`
- Description: `Lifetime access to everything. Lock in Day One pricing forever. Exclusive founding member benefits.`
- Statement Descriptor: `BEACON FOUNDING`

**Pricing:**

1. **Lifetime Access**
   - Price: `$2,997.00 USD`
   - Billing Period: `One time`
   - Nickname: `Founding Member Lifetime`

**Save Product**

---

## Step 3: Collect Price IDs

After creating all products, you need to collect the **Price IDs** for each.

### How to Find Price IDs:

1. Go to **Products** in Stripe Dashboard
2. Click on a product
3. Under "Pricing", you'll see each price with its ID
4. Price IDs look like: `price_1A2B3C4D5E6F7G8H9I0J`

### Create a Spreadsheet:

| Product | Billing | Price | Price ID |
|---------|---------|-------|----------|
| Capital Suite | Monthly | $97 | price_... |
| Capital Suite | Annual | $970 | price_... |
| Capital Suite | Lifetime | $1,997 | price_... |
| Solopreneur Launchpad | Monthly | $67 | price_... |
| Solopreneur Launchpad | Annual | $670 | price_... |
| Rise & Reclaim | Monthly | $47 | price_... |
| Rise & Reclaim | Annual | $470 | price_... |
| All Access | Monthly | $197 | price_... |
| All Access | Annual | $1,970 | price_... |
| Founding Member | Lifetime | $2,997 | price_... |

---

## Step 4: Configure Webhook

The webhook is already deployed, but you need to register it in Stripe.

### Register Webhook:

1. Go to **Developers** → **Webhooks**
2. Click **Add Endpoint**
3. **Endpoint URL:** `https://beaconmomentum.com/api/stripe/webhook`
4. **Description:** `Beacon Membership Automation`
5. **Events to send:**
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
6. Click **Add Endpoint**

### Get Webhook Signing Secret:

1. After creating the webhook, click on it
2. Click **Reveal** under "Signing secret"
3. Copy the secret (starts with `whsec_...`)
4. Save it for the next step

---

## Step 5: Update Environment Variables

You need to add the Stripe keys and price IDs to the server's `.env` file.

### Get Your Stripe API Keys:

1. Go to **Developers** → **API Keys**
2. Copy your **Secret key** (starts with `sk_live_...` for live mode or `sk_test_...` for test mode)

### Update .env File:

Add these lines to `/var/www/beaconmomentum.com/public/server/.env`:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_live_YOUR_SECRET_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE

# Capital Suite Price IDs
STRIPE_PRICE_CAPITAL_SUITE_MONTHLY=price_YOUR_PRICE_ID_HERE
STRIPE_PRICE_CAPITAL_SUITE_ANNUAL=price_YOUR_PRICE_ID_HERE
STRIPE_PRICE_CAPITAL_SUITE_LIFETIME=price_YOUR_PRICE_ID_HERE

# Solopreneur Launchpad Price IDs
STRIPE_PRICE_SOLOPRENEUR_MONTHLY=price_YOUR_PRICE_ID_HERE
STRIPE_PRICE_SOLOPRENEUR_ANNUAL=price_YOUR_PRICE_ID_HERE

# Rise & Reclaim Price IDs
STRIPE_PRICE_RISE_RECLAIM_MONTHLY=price_YOUR_PRICE_ID_HERE
STRIPE_PRICE_RISE_RECLAIM_ANNUAL=price_YOUR_PRICE_ID_HERE

# All Access Price IDs
STRIPE_PRICE_ALL_ACCESS_MONTHLY=price_YOUR_PRICE_ID_HERE
STRIPE_PRICE_ALL_ACCESS_ANNUAL=price_YOUR_PRICE_ID_HERE

# Founding Member Price ID
STRIPE_PRICE_FOUNDING_MEMBER=price_YOUR_PRICE_ID_HERE
```

### Restart Server:

After updating `.env`, restart the server:

```bash
ssh root@143.198.23.240
cd /var/www/beaconmomentum.com/public/server
pm2 restart beacon-auth --update-env
```

---

## Step 6: Create Checkout Links

For each product, create a Stripe Checkout link that you can use in your marketing.

### Option A: Payment Links (Easiest)

1. Go to **Products** → Select a product
2. Click **Create payment link**
3. Select the price
4. **After payment:** `https://beaconmomentum.com/member-dashboard.html`
5. **Collect customer information:** Email, Name
6. Click **Create link**
7. Copy the link (e.g., `https://buy.stripe.com/...`)

Repeat for each product/price combination.

### Option B: Checkout Sessions (More Control)

Create custom checkout pages using Stripe Checkout API. This allows you to:
- Customize the checkout experience
- Add coupon codes
- Include trial periods
- Collect custom fields

Example checkout button code:

```html
<button id="checkout-button">Purchase Capital Suite</button>

<script src="https://js.stripe.com/v3/"></script>
<script>
const stripe = Stripe('pk_live_YOUR_PUBLISHABLE_KEY');

document.getElementById('checkout-button').addEventListener('click', async () => {
    const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            priceId: 'price_YOUR_PRICE_ID',
            successUrl: 'https://beaconmomentum.com/member-dashboard.html',
            cancelUrl: 'https://beaconmomentum.com/pricing.html'
        })
    });
    
    const session = await response.json();
    await stripe.redirectToCheckout({ sessionId: session.id });
});
</script>
```

---

## Step 7: Test the Flow

### Test Mode Testing:

1. Switch Stripe to **TEST MODE**
2. Use test card: `4242 4242 4242 4242`
3. Any future expiry date
4. Any CVC
5. Complete a test purchase
6. Verify webhook is received
7. Check that membership was assigned

### Verify Membership Assignment:

After test purchase:

```bash
# SSH into server
ssh root@143.198.23.240

# Check user's membership
cd /var/www/beaconmomentum.com/public/server
node -e "
const db = require('./database/db');
db.get('SELECT * FROM users WHERE email = ?', ['test@example.com'], (err, user) => {
    console.log(JSON.stringify(user, null, 2));
});
"
```

Should show:
- `membership_level` updated to correct level
- `membership_status` = "active"
- `stripe_customer_id` populated
- `stripe_subscription_id` populated (for subscriptions)

---

## Step 8: Go Live

Once testing is complete:

1. **Switch to LIVE MODE** in Stripe
2. **Repeat Steps 2-5** in live mode (create products, get price IDs, update .env)
3. **Update webhook** to use live mode endpoint
4. **Test with real card** (small amount)
5. **Verify membership assignment** works in production
6. **Launch!** 🚀

---

## Pricing Strategy Recommendations

### Founding Member Launch (Limited Time)

**Offer:** $2,997 lifetime → **$1,997 early bird** (save $1,000)

**Bonuses:**
- Lifetime access to everything
- Founding member badge
- Exclusive community access
- 1-on-1 strategy call
- Early access to new content

**Urgency:** "Only 100 founding member spots available"

### Standard Pricing

**Capital Suite:**
- Monthly: $97/mo
- Annual: $970/yr (save $194 - 2 months free)
- Lifetime: $1,997 one-time

**Solopreneur Launchpad:**
- Monthly: $67/mo
- Annual: $670/yr (save $134 - 2 months free)

**Rise & Reclaim:**
- Monthly: $47/mo
- Annual: $470/yr (save $94 - 2 months free)

**All Access:**
- Monthly: $197/mo (save $17/mo vs. buying separately)
- Annual: $1,970/yr (save $394 - 2 months free)

### Upsell Strategy

1. **Entry Point:** Rise & Reclaim ($47/mo) - Lowest barrier
2. **Mid-Tier:** Solopreneur Launchpad ($67/mo) - Business builders
3. **Premium:** Capital Suite ($97/mo) - Serious investors
4. **Best Value:** All Access ($197/mo) - Everything included
5. **Ultimate:** Founding Member ($2,997) - Lifetime access, exclusive perks

---

## Coupon Codes

Create promotional codes in Stripe:

### Founding Member Launch:

- Code: `FOUNDING500` - $500 off founding member price
- Code: `FOUNDING1000` - $1,000 off (early bird special)

### Affiliate Codes:

- Code: `PARTNER20` - 20% off first month
- Code: `PARTNER100` - $100 off annual plans

### Create Coupons:

1. Go to **Products** → **Coupons**
2. Click **Create coupon**
3. Set discount amount or percentage
4. Set duration (once, forever, repeating)
5. Set expiration date if needed
6. Save coupon

---

## Customer Portal

Enable the Stripe Customer Portal so members can manage their subscriptions:

1. Go to **Settings** → **Billing** → **Customer portal**
2. Enable portal
3. Configure settings:
   - Allow subscription cancellation: Yes
   - Allow plan changes: Yes
   - Allow payment method updates: Yes
4. Portal URL: `https://billing.stripe.com/p/login/...`
5. Add link to member dashboard

---

## Troubleshooting

### Webhook Not Firing:

1. Check webhook logs in Stripe Dashboard
2. Verify endpoint URL is correct
3. Check server logs: `pm2 logs beacon-auth`
4. Ensure webhook secret is correct in .env

### Membership Not Assigned:

1. Check price ID mapping in stripe_enhanced.js
2. Verify webhook received the event
3. Check purchase_history table for the transaction
4. Verify user's membership_level was updated

### Payment Fails:

1. Check Stripe Dashboard for error message
2. Verify card details
3. Check for insufficient funds
4. Verify Stripe account is fully activated

---

## Next Steps

After Stripe is configured:

1. ✅ **Create checkout pages** on your website
2. ✅ **Add pricing page** with all options
3. ✅ **Set up email sequences** for post-purchase onboarding
4. ✅ **Configure GHL** to sync with Stripe purchases
5. ✅ **Test complete flow** from purchase to content access
6. ✅ **Launch founding member campaign!**

---

## Support

If you need help with Stripe configuration, let me know and I can:
- Create the products for you (if you provide Stripe API access)
- Generate checkout page code
- Set up coupon codes
- Configure the customer portal
- Test the complete payment flow

**The webhook is ready. The system is ready. Just add your Stripe products and launch!** 🚀
