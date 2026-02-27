const express = require('express');
const router = express.Router();
const stripeService = require('../services/stripe_enhanced');
const { sendSubscribeEvent } = require('../services/meta-capi');
const { syncNewMember } = require('../services/ghl');

/**
 * Stripe Webhook Handler
 * Processes Stripe events and updates user memberships
 * 
 * Webhook URL: https://beaconmomentum.com/api/stripe/webhook
 */

// Initialize Stripe
stripeService.initializeStripe();
const stripe = stripeService.getStripeInstance();

/**
 * Stripe webhook endpoint
 * POST /api/stripe/webhook
 * 
 * Important: This endpoint requires raw body for signature verification
 * Configure in server.js BEFORE bodyParser.json() middleware
 */
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    let event;
    
    try {
        // Verify webhook signature
        if (webhookSecret) {
            event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
        } else {
            // For development/testing without signature verification
            event = JSON.parse(req.body.toString());
            console.warn('⚠️ Webhook signature verification disabled');
        }
    } catch (err) {
        console.error('❌ Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    
    console.log(`📨 Stripe webhook received: ${event.type}`);
    
    try {
        // Handle different event types
        switch (event.type) {
            case 'checkout.session.completed':
                await handleCheckoutCompleted(event.data.object);
                break;
            
            case 'invoice.payment_succeeded':
                await handlePaymentSucceeded(event.data.object);
                break;
            
            case 'invoice.payment_failed':
                await handlePaymentFailed(event.data.object);
                break;
            
            case 'customer.subscription.updated':
                await handleSubscriptionUpdated(event.data.object);
                break;
            
            case 'customer.subscription.deleted':
                await handleSubscriptionDeleted(event.data.object);
                break;
            
            default:
                console.log(`ℹ️ Unhandled event type: ${event.type}`);
        }
        
        res.json({ received: true });
    } catch (err) {
        console.error('❌ Webhook handler error:', err);
        res.status(500).json({ error: 'Webhook handler failed' });
    }
});

/**
 * Handle checkout session completed
 */
async function handleCheckoutCompleted(session) {
    console.log('💳 Checkout completed:', session.id);
    
    const customerId = session.customer;
    const subscriptionId = session.subscription;
    
    // Get user from customer ID
    const user = await stripeService.getUserByStripeCustomerId(customerId);
    
    if (!user) {
        console.error('❌ User not found for customer:', customerId);
        return;
    }
    
    // Get subscription details
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const priceId = subscription.items.data[0].price.id;
    const amount = subscription.items.data[0].price.unit_amount / 100;
    
    // Get product info
    const product = stripeService.getProductFromPriceId(priceId);
    
    // Handle payment and assign membership
    await stripeService.handleSuccessfulPayment(
        user.id,
        product.type,
        product.period,
        amount,
        {
            payment_intent_id: session.payment_intent,
            subscription_id: subscriptionId,
            product_name: product.name,
            is_subscription: true,
            metadata: { session_id: session.id }
        }
    );
    
    // Server-side CAPI Subscribe event for attribution accuracy
    try {
        await sendSubscribeEvent({
            eventId: `sub_${session.id}`,
            value: amount,
            currency: 'USD',
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            eventSourceUrl: 'https://beaconmomentum.com/labs',
            subscriptionId: subscriptionId
        });
    } catch (capiErr) {
        console.error('[CAPI] Subscribe event failed (non-fatal):', capiErr.message);
    }

     // Sync new member to GHL CRM
    try {
        await syncNewMember({
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            membershipTier: product.type || 'beacon-momentum',
            planType: product.period || 'monthly',
            stripeCustomerId: customerId,
            stripeSubId: subscriptionId,
        });
    } catch (ghlErr) {
        console.error('[GHL] syncNewMember failed (non-fatal):', ghlErr.message);
    }
    console.log(`✅ Checkout processed for user ${user.email}`);
}
/**
 * Handle successful payment (recurring subscription payment)
 */
async function handlePaymentSucceeded(invoice) {
    console.log('💰 Payment succeeded:', invoice.id);
    
    // Skip if this is the first payment (already handled in checkout.completed)
    if (invoice.billing_reason === 'subscription_create') {
        console.log('ℹ️ Skipping initial subscription payment (handled in checkout)');
        return;
    }
    
    const customerId = invoice.customer;
    const subscriptionId = invoice.subscription;
    const amount = invoice.amount_paid / 100;
    
    // Get user
    const user = await stripeService.getUserByStripeCustomerId(customerId);
    
    if (!user) {
        console.error('❌ User not found for customer:', customerId);
        return;
    }
    
    // Get subscription to determine product
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const priceId = subscription.items.data[0].price.id;
    const product = stripeService.getProductFromPriceId(priceId);
    
    // Record the payment and extend membership
    await stripeService.handleSuccessfulPayment(
        user.id,
        product.type,
        product.period,
        amount,
        {
            payment_intent_id: invoice.payment_intent,
            invoice_id: invoice.id,
            subscription_id: subscriptionId,
            product_name: product.name,
            is_subscription: true,
            metadata: { billing_reason: invoice.billing_reason }
        }
    );
    
    // Server-side CAPI Subscribe event for recurring payment attribution
    try {
        await sendSubscribeEvent({
            eventId: `inv_${invoice.id}`,
            value: amount,
            currency: 'USD',
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            eventSourceUrl: 'https://beaconmomentum.com/labs',
            subscriptionId: subscriptionId
        });
    } catch (capiErr) {
        console.error('[CAPI] Subscribe event failed (non-fatal):', capiErr.message);
    }

    console.log(`✅ Recurring payment processed for user ${user.email}`);
}

/**
 * Handle failed payment
 */
async function handlePaymentFailed(invoice) {
    console.log('❌ Payment failed:', invoice.id);
    
    const customerId = invoice.customer;
    const user = await stripeService.getUserByStripeCustomerId(customerId);
    
    if (!user) {
        console.error('❌ User not found for customer:', customerId);
        return;
    }
    
    // TODO: Send email notification about failed payment
    // TODO: Update membership status to 'payment_failed' after grace period
    
    console.log(`⚠️ Payment failed for user ${user.email}, attempt ${invoice.attempt_count}`);
}

/**
 * Handle subscription updated
 */
async function handleSubscriptionUpdated(subscription) {
    console.log('🔄 Subscription updated:', subscription.id);
    
    const customerId = subscription.customer;
    const user = await stripeService.getUserByStripeCustomerId(customerId);
    
    if (!user) {
        console.error('❌ User not found for customer:', customerId);
        return;
    }
    
    // Check if subscription was cancelled
    if (subscription.cancel_at_period_end) {
        console.log(`⚠️ Subscription will cancel at period end for user ${user.email}`);
        // TODO: Update membership status to 'cancelling'
    }
    
    // Check if subscription status changed
    if (subscription.status === 'past_due') {
        console.log(`⚠️ Subscription past due for user ${user.email}`);
        // TODO: Update membership status
    }
}

/**
 * Handle subscription deleted/cancelled
 */
async function handleSubscriptionDeleted(subscription) {
    console.log('🚫 Subscription deleted:', subscription.id);
    
    const customerId = subscription.customer;
    const user = await stripeService.getUserByStripeCustomerId(customerId);
    
    if (!user) {
        console.error('❌ User not found for customer:', customerId);
        return;
    }
    
    // Update membership status to cancelled
    const membershipService = require('../services/membership');
    await membershipService.updateMembership(user.id, {
        membership_status: membershipService.MEMBERSHIP_STATUS.CANCELLED,
        stripe_subscription_id: null
    });
    
    console.log(`✅ Subscription cancelled for user ${user.email}`);
}

module.exports = router;
