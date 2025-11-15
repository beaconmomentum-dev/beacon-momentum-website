-- Migration: Create purchase_history table
-- Date: 2025-11-14
-- Purpose: Track all Stripe payments and purchases

CREATE TABLE IF NOT EXISTS purchase_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    stripe_payment_intent_id TEXT UNIQUE,
    stripe_invoice_id TEXT,
    stripe_subscription_id TEXT,
    
    -- Product information
    product_name TEXT NOT NULL,
    product_type TEXT,
    -- Types: 'capital_suite', 'solopreneur_launchpad', 'rise_reclaim', 'digital_grandpa'
    
    -- Payment details
    amount DECIMAL(10, 2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    payment_status TEXT NOT NULL,
    -- Status: 'pending', 'succeeded', 'failed', 'refunded', 'cancelled'
    
    -- Subscription details
    is_subscription BOOLEAN DEFAULT 0,
    subscription_period TEXT,
    -- Period: 'monthly', 'annual', 'lifetime'
    
    -- Timestamps
    purchased_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    refunded_at DATETIME,
    
    -- Metadata
    metadata TEXT,
    -- Store as JSON string for additional data
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_purchase_user_id ON purchase_history(user_id);
CREATE INDEX IF NOT EXISTS idx_purchase_stripe_payment ON purchase_history(stripe_payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_purchase_status ON purchase_history(payment_status);
CREATE INDEX IF NOT EXISTS idx_purchase_date ON purchase_history(purchased_at);
