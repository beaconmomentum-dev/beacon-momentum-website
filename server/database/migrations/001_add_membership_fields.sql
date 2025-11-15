-- Migration: Add membership, role, and payment tracking fields to users table
-- Date: 2025-11-14
-- Purpose: Support role-based access, Stripe payments, and GHL integration

-- Add membership and role fields
ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'guest';
-- Roles: 'guest', 'member', 'founding_member', 'admin'

ALTER TABLE users ADD COLUMN membership_level TEXT DEFAULT 'free';
-- Levels: 'free', 'capital_suite', 'solopreneur_launchpad', 'rise_reclaim', 'all_access'

ALTER TABLE users ADD COLUMN plan_type TEXT DEFAULT 'free';
-- Plan types: 'free', 'monthly', 'annual', 'lifetime'

ALTER TABLE users ADD COLUMN is_member BOOLEAN DEFAULT 0;
-- Quick check if user has any paid membership

ALTER TABLE users ADD COLUMN membership_status TEXT DEFAULT 'inactive';
-- Status: 'inactive', 'active', 'cancelled', 'expired', 'trial'

ALTER TABLE users ADD COLUMN membership_started_at DATETIME;
ALTER TABLE users ADD COLUMN membership_expires_at DATETIME;

-- Stripe integration fields
ALTER TABLE users ADD COLUMN stripe_customer_id TEXT UNIQUE;
ALTER TABLE users ADD COLUMN stripe_subscription_id TEXT;
ALTER TABLE users ADD COLUMN stripe_payment_method_id TEXT;

-- GoHighLevel integration fields
ALTER TABLE users ADD COLUMN ghl_contact_id TEXT UNIQUE;
ALTER TABLE users ADD COLUMN ghl_tags TEXT;
-- Store as JSON string: '["founding-member", "capital-suite"]'

-- Tracking fields
ALTER TABLE users ADD COLUMN last_payment_date DATETIME;
ALTER TABLE users ADD COLUMN total_revenue DECIMAL(10, 2) DEFAULT 0.00;
ALTER TABLE users ADD COLUMN referral_code TEXT UNIQUE;
ALTER TABLE users ADD COLUMN referred_by TEXT;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_membership_level ON users(membership_level);
CREATE INDEX IF NOT EXISTS idx_users_stripe_customer ON users(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_users_ghl_contact ON users(ghl_contact_id);
CREATE INDEX IF NOT EXISTS idx_users_membership_status ON users(membership_status);
