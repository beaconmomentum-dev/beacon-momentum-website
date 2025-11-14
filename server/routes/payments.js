const express = require('express');
const router = express.Router();
const db = require('../database/init');
const stripeService = require('../services/stripe');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Middleware to check authentication
const requireAuth = (req, res, next) => {
    if (!req.session || !req.session.userId) {
        return res.status(401).json({ success: false, message: 'Not authenticated' });
    }
    next();
};

// Get subscription tiers
router.get('/tiers', (req, res) => {
    res.json({
        success: true,
        tiers: stripeService.SUBSCRIPTION_TIERS
    });
});

// Create checkout session
router.post('/create-checkout-session', requireAuth, async (req, res) => {
    try {
        const { tier } = req.body;
        const userId = req.session.userId;

        // Get user email
        db.get('SELECT email FROM users WHERE id = ?', [userId], async (err, user) => {
            if (err || !user) {
                return res.status(500).json({ success: false, message: 'User not found' });
            }

            const result = await stripeService.createCheckoutSession(userId, tier, user.email);
            
            if (result.success) {
                res.json({
                    success: true,
                    sessionId: result.sessionId,
                    url: result.url
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: result.error
                });
            }
        });
    } catch (error) {
        console.error('Checkout session error:', error);
        res.status(500).json({ success: false, message: 'Failed to create checkout session' });
    }
});

// Create customer portal session
router.post('/create-portal-session', requireAuth, async (req, res) => {
    try {
        const userId = req.session.userId;

        // Get user's Stripe customer ID
        db.get('SELECT stripe_customer_id FROM subscriptions WHERE user_id = ? AND status = "active"', 
            [userId], async (err, subscription) => {
            if (err || !subscription || !subscription.stripe_customer_id) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'No active subscription found' 
                });
            }

            const result = await stripeService.createPortalSession(subscription.stripe_customer_id);
            
            if (result.success) {
                res.json({
                    success: true,
                    url: result.url
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: result.error
                });
            }
        });
    } catch (error) {
        console.error('Portal session error:', error);
        res.status(500).json({ success: false, message: 'Failed to create portal session' });
    }
});

// Get user's subscription status
router.get('/subscription-status', requireAuth, (req, res) => {
    const userId = req.session.userId;

    db.get(`
        SELECT 
            tier,
            status,
            stripe_subscription_id,
            stripe_customer_id,
            current_period_end,
            cancel_at_period_end
        FROM subscriptions
        WHERE user_id = ? AND status IN ('active', 'trialing', 'past_due')
        ORDER BY created_at DESC
        LIMIT 1
    `, [userId], (err, subscription) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        if (!subscription) {
            return res.json({
                success: true,
                subscription: {
                    tier: 'free',
                    status: 'active'
                }
            });
        }

        res.json({
            success: true,
            subscription: {
                tier: subscription.tier,
                status: subscription.status,
                currentPeriodEnd: subscription.current_period_end,
                cancelAtPeriodEnd: subscription.cancel_at_period_end === 1
            }
        });
    });
});

// Webhook endpoint for Stripe events
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    const result = await stripeService.handleWebhookEvent(event);

    if (result.success && result.data) {
        // Update database based on event
        switch (event.type) {
            case 'checkout.session.completed':
                updateSubscriptionInDB(result.data);
                break;
            
            case 'customer.subscription.updated':
                updateSubscriptionStatusInDB(result.data);
                break;
            
            case 'customer.subscription.deleted':
                cancelSubscriptionInDB(result.data);
                break;
        }
    }

    res.json({ received: true });
});

// Helper function to update subscription in database
function updateSubscriptionInDB(data) {
    const { userId, customerId, subscriptionId, tier, status, currentPeriodEnd } = data;

    db.run(`
        INSERT INTO subscriptions (
            user_id, 
            tier, 
            status, 
            stripe_customer_id, 
            stripe_subscription_id, 
            current_period_end
        ) VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(user_id) DO UPDATE SET
            tier = excluded.tier,
            status = excluded.status,
            stripe_customer_id = excluded.stripe_customer_id,
            stripe_subscription_id = excluded.stripe_subscription_id,
            current_period_end = excluded.current_period_end,
            updated_at = CURRENT_TIMESTAMP
    `, [userId, tier, status, customerId, subscriptionId, currentPeriodEnd.toISOString()], (err) => {
        if (err) {
            console.error('Database update error:', err);
        } else {
            console.log(`Subscription created/updated for user ${userId}`);
        }
    });
}

// Helper function to update subscription status
function updateSubscriptionStatusInDB(data) {
    const { subscriptionId, status, currentPeriodEnd } = data;

    db.run(`
        UPDATE subscriptions 
        SET status = ?, current_period_end = ?, updated_at = CURRENT_TIMESTAMP
        WHERE stripe_subscription_id = ?
    `, [status, currentPeriodEnd.toISOString(), subscriptionId], (err) => {
        if (err) {
            console.error('Database update error:', err);
        } else {
            console.log(`Subscription ${subscriptionId} status updated to ${status}`);
        }
    });
}

// Helper function to cancel subscription in database
function cancelSubscriptionInDB(data) {
    const { subscriptionId, canceledAt } = data;

    db.run(`
        UPDATE subscriptions 
        SET status = 'canceled', canceled_at = ?, updated_at = CURRENT_TIMESTAMP
        WHERE stripe_subscription_id = ?
    `, [canceledAt.toISOString(), subscriptionId], (err) => {
        if (err) {
            console.error('Database update error:', err);
        } else {
            console.log(`Subscription ${subscriptionId} canceled`);
        }
    });
}

module.exports = router;
