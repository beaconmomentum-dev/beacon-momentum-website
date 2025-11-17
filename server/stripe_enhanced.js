const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const membershipService = require('./membership');

const db = new sqlite3.Database(path.join(__dirname, '../database/beacon.db'));

/**
 * Enhanced Stripe Service
 * Combines payment processing with membership management
 */

let stripe = null;

// Initialize Stripe
function initializeStripe() {
    if (!process.env.STRIPE_SECRET_KEY) {
        console.warn('⚠️ STRIPE_SECRET_KEY not set');
        return false;
    }
    
    try {
        stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
        console.log('✅ Stripe initialized');
        return true;
    } catch (err) {
        console.error('❌ Stripe init failed:', err.message);
        return false;
    }
}

// Product configuration - maps Stripe price IDs to Beacon products
const PRODUCT_CONFIG = {
    // Capital Suite
    capital_suite_monthly: {
        type: 'capital_suite',
        period: 'monthly',
        name: 'Beacon Capital Suite - Monthly',
        price: 97
    },
    capital_suite_annual: {
        type: 'capital_suite',
        period: 'annual',
        name: 'Beacon Capital Suite - Annual',
        price: 970
    },
    capital_suite_lifetime: {
        type: 'capital_suite',
        period: 'lifetime',
        name: 'Beacon Capital Suite - Lifetime',
        price: 1997
    },
    
    // Solopreneur Launchpad
    solopreneur_monthly: {
        type: 'solopreneur_launchpad',
        period: 'monthly',
        name: 'Solopreneur Launchpad - Monthly',
        price: 67
    },
    solopreneur_annual: {
        type: 'solopreneur_launchpad',
        period: 'annual',
        name: 'Solopreneur Launchpad - Annual',
        price: 670
    },
    
    // Rise & Reclaim
    rise_reclaim_monthly: {
        type: 'rise_reclaim',
        period: 'monthly',
        name: 'Rise & Reclaim - Monthly',
        price: 47
    },
    rise_reclaim_annual: {
        type: 'rise_reclaim',
        period: 'annual',
        name: 'Rise & Reclaim - Annual',
        price: 470
    },
    
    // Founding Member / All Access
    founding_member: {
        type: 'founding_member',
        period: 'lifetime',
        name: 'Beacon Founding Member - Lifetime',
        price: 2997
    },
    all_access_monthly: {
        type: 'all_access',
        period: 'monthly',
        name: 'All Access - Monthly',
        price: 197
    },
    all_access_annual: {
        type: 'all_access',
        period: 'annual',
        name: 'All Access - Annual',
        price: 1970
    }
};

/**
 * Get or create Stripe customer
 */
async function getOrCreateCustomer(userId, email, name) {
    return new Promise((resolve, reject) => {
        db.get('SELECT stripe_customer_id FROM users WHERE id = ?', [userId], async (err, row) => {
            if (err) return reject(err);
            
            if (row?.stripe_customer_id) {
                return resolve(row.stripe_customer_id);
            }
            
            try {
                const customer = await stripe.customers.create({
                    email,
                    name,
                    metadata: { user_id: userId.toString() }
                });
                
                db.run(
                    'UPDATE users SET stripe_customer_id = ? WHERE id = ?',
                    [customer.id, userId],
                    (err) => err ? reject(err) : resolve(customer.id)
                );
            } catch (err) {
                reject(err);
            }
        });
    });
}

/**
 * Record purchase in database
 */
function recordPurchase(purchaseData) {
    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO purchase_history (
                user_id, stripe_payment_intent_id, stripe_invoice_id,
                stripe_subscription_id, product_name, product_type,
                amount, currency, payment_status, is_subscription,
                subscription_period, metadata
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        db.run(sql, [
            purchaseData.user_id,
            purchaseData.stripe_payment_intent_id,
            purchaseData.stripe_invoice_id,
            purchaseData.stripe_subscription_id,
            purchaseData.product_name,
            purchaseData.product_type,
            purchaseData.amount,
            purchaseData.currency || 'USD',
            purchaseData.payment_status,
            purchaseData.is_subscription ? 1 : 0,
            purchaseData.subscription_period,
            purchaseData.metadata ? JSON.stringify(purchaseData.metadata) : null
        ], function(err) {
            err ? reject(err) : resolve({ id: this.lastID });
        });
    });
}

/**
 * Get user by Stripe customer ID
 */
function getUserByStripeCustomerId(customerId) {
    return new Promise((resolve, reject) => {
        db.get(
            'SELECT id, email, first_name, last_name FROM users WHERE stripe_customer_id = ?',
            [customerId],
            (err, row) => err ? reject(err) : resolve(row)
        );
    });
}

/**
 * Update user subscription ID
 */
function updateUserSubscription(userId, subscriptionId) {
    return new Promise((resolve, reject) => {
        db.run(
            'UPDATE users SET stripe_subscription_id = ? WHERE id = ?',
            [subscriptionId, userId],
            function(err) {
                err ? reject(err) : resolve({ changes: this.changes });
            }
        );
    });
}

/**
 * Update user revenue
 */
function updateUserRevenue(userId, amount) {
    return new Promise((resolve, reject) => {
        db.run(
            `UPDATE users 
             SET total_revenue = COALESCE(total_revenue, 0) + ?,
                 last_payment_date = datetime('now')
             WHERE id = ?`,
            [amount, userId],
            function(err) {
                err ? reject(err) : resolve({ changes: this.changes });
            }
        );
    });
}

/**
 * Get product info from Stripe price ID
 */
function getProductFromPriceId(priceId) {
    // Map environment variable price IDs to product config
    const priceEnvMap = {
        [process.env.STRIPE_PRICE_CAPITAL_SUITE_MONTHLY]: 'capital_suite_monthly',
        [process.env.STRIPE_PRICE_CAPITAL_SUITE_ANNUAL]: 'capital_suite_annual',
        [process.env.STRIPE_PRICE_CAPITAL_SUITE_LIFETIME]: 'capital_suite_lifetime',
        [process.env.STRIPE_PRICE_SOLOPRENEUR_MONTHLY]: 'solopreneur_monthly',
        [process.env.STRIPE_PRICE_SOLOPRENEUR_ANNUAL]: 'solopreneur_annual',
        [process.env.STRIPE_PRICE_RISE_RECLAIM_MONTHLY]: 'rise_reclaim_monthly',
        [process.env.STRIPE_PRICE_RISE_RECLAIM_ANNUAL]: 'rise_reclaim_annual',
        [process.env.STRIPE_PRICE_FOUNDING_MEMBER]: 'founding_member',
        [process.env.STRIPE_PRICE_ALL_ACCESS_MONTHLY]: 'all_access_monthly',
        [process.env.STRIPE_PRICE_ALL_ACCESS_ANNUAL]: 'all_access_annual'
    };
    
    const productKey = priceEnvMap[priceId];
    return PRODUCT_CONFIG[productKey] || {
        type: 'unknown',
        period: 'unknown',
        name: 'Unknown Product',
        price: 0
    };
}

/**
 * Handle successful payment and assign membership
 */
async function handleSuccessfulPayment(userId, productType, planType, amount, paymentData) {
    try {
        // Record purchase
        await recordPurchase({
            user_id: userId,
            stripe_payment_intent_id: paymentData.payment_intent_id,
            stripe_invoice_id: paymentData.invoice_id,
            stripe_subscription_id: paymentData.subscription_id,
            product_name: paymentData.product_name,
            product_type: productType,
            amount: amount,
            currency: 'USD',
            payment_status: 'succeeded',
            is_subscription: paymentData.is_subscription,
            subscription_period: planType,
            metadata: paymentData.metadata
        });
        
        // Update revenue
        await updateUserRevenue(userId, amount);
        
        // Update subscription ID if applicable
        if (paymentData.subscription_id) {
            await updateUserSubscription(userId, paymentData.subscription_id);
        }
        
        // Assign membership
        await membershipService.assignMembershipFromProduct(userId, productType, planType);
        
        console.log(`✅ Membership assigned: User ${userId} → ${productType} (${planType})`);
        
        return { success: true };
    } catch (err) {
        console.error('❌ Handle payment error:', err);
        throw err;
    }
}

module.exports = {
    initializeStripe,
    getOrCreateCustomer,
    recordPurchase,
    getUserByStripeCustomerId,
    updateUserSubscription,
    updateUserRevenue,
    getProductFromPriceId,
    handleSuccessfulPayment,
    PRODUCT_CONFIG,
    getStripeInstance: () => stripe
};
