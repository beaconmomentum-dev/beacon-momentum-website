// Middleware to check if user has required membership tier

const tierHierarchy = {
    'core': 1,
    'community': 2,
    'founding_member': 3,
    'all_access': 3
};

/**
 * Check if user's tier meets the required tier
 * @param {string} userTier - The user's current membership tier
 * @param {string} requiredTier - The tier required for access
 * @returns {boolean} - True if user has access
 */
function checkTierAccess(userTier, requiredTier) {
    const userLevel = tierHierarchy[userTier] || 0;
    const requiredLevel = tierHierarchy[requiredTier] || 0;
    return userLevel >= requiredLevel;
}

/**
 * Middleware factory to require a specific membership tier
 * @param {string} requiredTier - The minimum tier required
 * @returns {Function} - Express middleware function
 */
function requireTier(requiredTier) {
    return (req, res, next) => {
        // Check if user is authenticated
        if (!req.user) {
            return res.status(401).json({ 
                error: 'Authentication required',
                message: 'You must be logged in to access this content'
            });
        }

        // Get user's membership tier
        const userTier = req.user.membership_tier || 'core';

        // Check if user has required access
        if (checkTierAccess(userTier, requiredTier)) {
            next();
        } else {
            return res.status(403).json({ 
                error: 'Insufficient membership tier',
                message: `This content requires ${requiredTier} membership or higher`,
                userTier: userTier,
                requiredTier: requiredTier
            });
        }
    };
}

/**
 * Middleware to check if user is admin
 */
function requireAdmin(req, res, next) {
    if (!req.user) {
        return res.status(401).json({ 
            error: 'Authentication required',
            message: 'You must be logged in'
        });
    }

    if (req.user.role !== 'admin' && req.user.membership_tier !== 'founding_member') {
        return res.status(403).json({ 
            error: 'Admin access required',
            message: 'You do not have permission to perform this action'
        });
    }

    next();
}

module.exports = {
    requireTier,
    requireAdmin,
    checkTierAccess
};
