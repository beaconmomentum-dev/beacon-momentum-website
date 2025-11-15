const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '../database/beacon.db'));

/**
 * Membership Service
 * Handles role-based access control and membership management
 */

const ROLES = {
    GUEST: 'guest',
    MEMBER: 'member',
    FOUNDING_MEMBER: 'founding_member',
    ADMIN: 'admin'
};

const MEMBERSHIP_LEVELS = {
    FREE: 'free',
    CAPITAL_SUITE: 'capital_suite',
    SOLOPRENEUR_LAUNCHPAD: 'solopreneur_launchpad',
    RISE_RECLAIM: 'rise_reclaim',
    ALL_ACCESS: 'all_access'
};

const PLAN_TYPES = {
    FREE: 'free',
    MONTHLY: 'monthly',
    ANNUAL: 'annual',
    LIFETIME: 'lifetime'
};

const MEMBERSHIP_STATUS = {
    INACTIVE: 'inactive',
    ACTIVE: 'active',
    CANCELLED: 'cancelled',
    EXPIRED: 'expired',
    TRIAL: 'trial'
};

/**
 * Get user's membership details
 */
function getUserMembership(userId) {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT 
                role, 
                membership_level, 
                plan_type, 
                is_member,
                membership_status,
                membership_started_at,
                membership_expires_at,
                stripe_customer_id,
                stripe_subscription_id
            FROM users 
            WHERE id = ?
        `;
        
        db.get(sql, [userId], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
}

/**
 * Update user's membership
 */
function updateMembership(userId, membershipData) {
    return new Promise((resolve, reject) => {
        const {
            role,
            membership_level,
            plan_type,
            is_member,
            membership_status,
            membership_started_at,
            membership_expires_at
        } = membershipData;
        
        const sql = `
            UPDATE users 
            SET 
                role = COALESCE(?, role),
                membership_level = COALESCE(?, membership_level),
                plan_type = COALESCE(?, plan_type),
                is_member = COALESCE(?, is_member),
                membership_status = COALESCE(?, membership_status),
                membership_started_at = COALESCE(?, membership_started_at),
                membership_expires_at = COALESCE(?, membership_expires_at)
            WHERE id = ?
        `;
        
        db.run(sql, [
            role,
            membership_level,
            plan_type,
            is_member,
            membership_status,
            membership_started_at,
            membership_expires_at,
            userId
        ], function(err) {
            if (err) reject(err);
            else resolve({ changes: this.changes });
        });
    });
}

/**
 * Check if user has access to a specific resource
 */
function hasAccess(userMembership, requiredLevel) {
    // Admin has access to everything
    if (userMembership.role === ROLES.ADMIN) {
        return true;
    }
    
    // Check if membership is active
    if (userMembership.membership_status !== MEMBERSHIP_STATUS.ACTIVE) {
        return false;
    }
    
    // Check membership level hierarchy
    const levelHierarchy = {
        [MEMBERSHIP_LEVELS.FREE]: 0,
        [MEMBERSHIP_LEVELS.RISE_RECLAIM]: 1,
        [MEMBERSHIP_LEVELS.CAPITAL_SUITE]: 2,
        [MEMBERSHIP_LEVELS.SOLOPRENEUR_LAUNCHPAD]: 3,
        [MEMBERSHIP_LEVELS.ALL_ACCESS]: 4
    };
    
    const userLevel = levelHierarchy[userMembership.membership_level] || 0;
    const required = levelHierarchy[requiredLevel] || 0;
    
    return userLevel >= required;
}

/**
 * Get access permissions for a user
 */
async function getUserPermissions(userId) {
    const membership = await getUserMembership(userId);
    
    if (!membership) {
        return {
            canAccessCapitalSuite: false,
            canAccessSolopreneurLaunchpad: false,
            canAccessRiseReclaim: false,
            canAccessDigitalGrandpa: false,
            role: ROLES.GUEST,
            membershipLevel: MEMBERSHIP_LEVELS.FREE
        };
    }
    
    return {
        canAccessCapitalSuite: hasAccess(membership, MEMBERSHIP_LEVELS.CAPITAL_SUITE) || 
                                membership.membership_level === MEMBERSHIP_LEVELS.ALL_ACCESS,
        canAccessSolopreneurLaunchpad: hasAccess(membership, MEMBERSHIP_LEVELS.SOLOPRENEUR_LAUNCHPAD) || 
                                        membership.membership_level === MEMBERSHIP_LEVELS.ALL_ACCESS,
        canAccessRiseReclaim: hasAccess(membership, MEMBERSHIP_LEVELS.RISE_RECLAIM) || 
                              membership.membership_level === MEMBERSHIP_LEVELS.ALL_ACCESS,
        canAccessDigitalGrandpa: true, // Free access to everyone
        role: membership.role,
        membershipLevel: membership.membership_level,
        membershipStatus: membership.membership_status,
        isFoundingMember: membership.role === ROLES.FOUNDING_MEMBER
    };
}

/**
 * Assign membership based on product purchase
 */
async function assignMembershipFromProduct(userId, productType, planType = PLAN_TYPES.MONTHLY) {
    const membershipData = {
        is_member: 1,
        membership_status: MEMBERSHIP_STATUS.ACTIVE,
        membership_started_at: new Date().toISOString(),
        plan_type: planType
    };
    
    // Set membership level and role based on product
    switch (productType) {
        case 'capital_suite':
            membershipData.membership_level = MEMBERSHIP_LEVELS.CAPITAL_SUITE;
            membershipData.role = ROLES.MEMBER;
            break;
        case 'solopreneur_launchpad':
            membershipData.membership_level = MEMBERSHIP_LEVELS.SOLOPRENEUR_LAUNCHPAD;
            membershipData.role = ROLES.MEMBER;
            break;
        case 'rise_reclaim':
            membershipData.membership_level = MEMBERSHIP_LEVELS.RISE_RECLAIM;
            membershipData.role = ROLES.MEMBER;
            break;
        case 'all_access':
        case 'founding_member':
            membershipData.membership_level = MEMBERSHIP_LEVELS.ALL_ACCESS;
            membershipData.role = ROLES.FOUNDING_MEMBER;
            break;
        default:
            membershipData.membership_level = MEMBERSHIP_LEVELS.FREE;
            membershipData.role = ROLES.GUEST;
    }
    
    // Set expiration based on plan type
    if (planType === PLAN_TYPES.MONTHLY) {
        const expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + 1);
        membershipData.membership_expires_at = expiresAt.toISOString();
    } else if (planType === PLAN_TYPES.ANNUAL) {
        const expiresAt = new Date();
        expiresAt.setFullYear(expiresAt.getFullYear() + 1);
        membershipData.membership_expires_at = expiresAt.toISOString();
    } else if (planType === PLAN_TYPES.LIFETIME) {
        membershipData.membership_expires_at = null; // No expiration
    }
    
    return updateMembership(userId, membershipData);
}

/**
 * Check and update expired memberships
 */
async function checkExpiredMemberships() {
    return new Promise((resolve, reject) => {
        const sql = `
            UPDATE users 
            SET membership_status = ?
            WHERE membership_expires_at IS NOT NULL 
            AND membership_expires_at < datetime('now')
            AND membership_status = ?
        `;
        
        db.run(sql, [MEMBERSHIP_STATUS.EXPIRED, MEMBERSHIP_STATUS.ACTIVE], function(err) {
            if (err) reject(err);
            else resolve({ expired: this.changes });
        });
    });
}

module.exports = {
    ROLES,
    MEMBERSHIP_LEVELS,
    PLAN_TYPES,
    MEMBERSHIP_STATUS,
    getUserMembership,
    updateMembership,
    hasAccess,
    getUserPermissions,
    assignMembershipFromProduct,
    checkExpiredMemberships
};
