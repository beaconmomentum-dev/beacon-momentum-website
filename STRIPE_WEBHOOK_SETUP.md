# Stripe Webhook Setup Instructions

## Quick Setup (5 minutes)

### Step 1: Access Stripe Webhooks
1. Go to https://dashboard.stripe.com/webhooks
2. Click "Add endpoint" button

### Step 2: Configure Webhook
**Endpoint URL:**
```
https://beaconmomentum.com/api/payments/webhook
```

**Description:** (optional)
```
BeaconMomentum subscription events
```

**Events to listen to:**
Select these specific events:
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`
- `checkout.session.completed`

### Step 3: Get Webhook Secret
1. After creating the webhook, click on it
2. Click "Reveal" next to "Signing secret"
3. Copy the secret (starts with `whsec_...`)
4. **Send me this secret** so I can update the server

### Step 4: Test Webhook
1. In the webhook details page, click "Send test webhook"
2. Select `checkout.session.completed`
3. Click "Send test webhook"
4. You should see a "200 OK" response

---

## Alternative: Quick Copy-Paste

If you want me to walk you through it, just give me:
1. The webhook signing secret (whsec_...)

And I'll:
- Update the server .env file
- Restart the server
- Test the webhook
- Verify payment flow works

---

## What This Webhook Does

The webhook allows Stripe to notify our server when:
- A customer completes checkout (subscription created)
- A subscription is updated (upgrade/downgrade)
- A subscription is canceled
- A payment succeeds
- A payment fails

This keeps our database in sync with Stripe automatically!
