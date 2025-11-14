const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Subscription tiers configuration
const SUBSCRIPTION_TIERS = {
    free: {
        name: 'Free',
        price: 0,
        features: [
            'Access to public content',
            'Basic educational resources',
            'Community forum access'
        ],
        stripe_price_id: null
    },
    basic: {
        name: 'Basic',
        price: 29,  // $29/month
        features: [
            'All Free features',
            'Access to Beacon Capital Suite (5 modules)',
            'Progress tracking',
            'Email support',
            'Monthly Q&A sessions'
        ],
        stripe_price_id: process.env.STRIPE_PRICE_BASIC
    },
    premium: {
        name: 'Premium',
        price: 99,  // $99/month
        features: [
            'All Basic features',
            'Priority email support',
            'Weekly live sessions',
            'Private community access',
            'Advanced analytics dashboard',
            'Direct messaging with instructors',
            'Early access to new content'
        ],
        stripe_price_id: process.env.STRIPE_PRICE_PREMIUM
    }
};

// Create Stripe checkout session
async function createCheckoutSession(userId, tier, email) {
    try {
        if (!SUBSCRIPTION_TIERS[tier] || tier === 'free') {
            throw new Error('Invalid subscription tier');
        }

        const priceId = SUBSCRIPTION_TIERS[tier].stripe_price_id;
        if (!priceId) {
            throw new Error('Stripe price ID not configured');
        }

        const session = await stripe.checkout.sessions.create({
            customer_email: email,
            client_reference_id: userId.toString(),
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${process.env.BASE_URL}/subscription-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.BASE_URL}/member-dashboard.html?canceled=true`,
            metadata: {
                user_id: userId.toString(),
                tier: tier
            }
        });

        return { success: true, sessionId: session.id, url: session.url };
    } catch (error) {
        console.error('Stripe checkout error:', error);
        return { success: false, error: error.message };
    }
}

// Create Stripe customer portal session
async function createPortalSession(customerId) {
    try {
        const session = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: `${process.env.BASE_URL}/member-dashboard.html`,
        });

        return { success: true, url: session.url };
    } catch (error) {
        console.error('Stripe portal error:', error);
        return { success: false, error: error.message };
    }
}

// Handle webhook events
async function handleWebhookEvent(event) {
    try {
        switch (event.type) {
            case 'checkout.session.completed':
                return await handleCheckoutCompleted(event.data.object);
            
            case 'customer.subscription.updated':
                return await handleSubscriptionUpdated(event.data.object);
            
            case 'customer.subscription.deleted':
                return await handleSubscriptionCanceled(event.data.object);
            
            case 'invoice.payment_succeeded':
                return await handlePaymentSucceeded(event.data.object);
            
            case 'invoice.payment_failed':
                return await handlePaymentFailed(event.data.object);
            
            default:
                console.log(`Unhandled event type: ${event.type}`);
                return { success: true, message: 'Event not handled' };
        }
    } catch (error) {
        console.error('Webhook handler error:', error);
        return { success: false, error: error.message };
    }
}

// Handle successful checkout
async function handleCheckoutCompleted(session) {
    const userId = session.client_reference_id;
    const subscriptionId = session.subscription;
    const customerId = session.customer;
    const tier = session.metadata.tier;

    // Get subscription details
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    return {
        success: true,
        data: {
            userId,
            customerId,
            subscriptionId,
            tier,
            status: subscription.status,
            currentPeriodEnd: new Date(subscription.current_period_end * 1000)
        }
    };
}

// Handle subscription update
async function handleSubscriptionUpdated(subscription) {
    return {
        success: true,
        data: {
            subscriptionId: subscription.id,
            customerId: subscription.customer,
            status: subscription.status,
            currentPeriodEnd: new Date(subscription.current_period_end * 1000)
        }
    };
}

// Handle subscription cancellation
async function handleSubscriptionCanceled(subscription) {
    return {
        success: true,
        data: {
            subscriptionId: subscription.id,
            customerId: subscription.customer,
            canceledAt: new Date(subscription.canceled_at * 1000)
        }
    };
}

// Handle successful payment
async function handlePaymentSucceeded(invoice) {
    return {
        success: true,
        data: {
            subscriptionId: invoice.subscription,
            customerId: invoice.customer,
            amount: invoice.amount_paid / 100,
            currency: invoice.currency
        }
    };
}

// Handle failed payment
async function handlePaymentFailed(invoice) {
    return {
        success: true,
        data: {
            subscriptionId: invoice.subscription,
            customerId: invoice.customer,
            attemptCount: invoice.attempt_count
        }
    };
}

// Get subscription info
async function getSubscriptionInfo(subscriptionId) {
    try {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        return {
            success: true,
            subscription: {
                id: subscription.id,
                status: subscription.status,
                currentPeriodEnd: new Date(subscription.current_period_end * 1000),
                cancelAtPeriodEnd: subscription.cancel_at_period_end
            }
        };
    } catch (error) {
        console.error('Get subscription error:', error);
        return { success: false, error: error.message };
    }
}

// Cancel subscription
async function cancelSubscription(subscriptionId) {
    try {
        const subscription = await stripe.subscriptions.update(subscriptionId, {
            cancel_at_period_end: true
        });

        return {
            success: true,
            message: 'Subscription will be canceled at period end',
            cancelAt: new Date(subscription.current_period_end * 1000)
        };
    } catch (error) {
        console.error('Cancel subscription error:', error);
        return { success: false, error: error.message };
    }
}

module.exports = {
    SUBSCRIPTION_TIERS,
    createCheckoutSession,
    createPortalSession,
    handleWebhookEvent,
    getSubscriptionInfo,
    cancelSubscription
};
