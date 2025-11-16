const membershipService = require('../services/membership');

/**
 * Middleware to check if user has required membership level
 */
function requireMembership(requiredLevel) {
    return async (req, res, next) => {
        try {
            if (!req.session || !req.session.userId) {
                return res.status(401).json({
                    success: false,
                    message: 'Authentication required',
                    redirectTo: '/login.html'
                });
            }
            
            const membership = await membershipService.getUserMembership(req.session.userId);
            
            if (!membership) {
                return res.status(403).json({
                    success: false,
                    message: 'Membership information not found'
                });
            }
            
            if (!membershipService.hasAccess(membership, requiredLevel)) {
                return res.status(403).json({
                    success: false,
                    message: 'Insufficient membership level',
                    required: requiredLevel,
                    current: membership.membership_level,
                    upgradeUrl: '/upgrade.html'
                });
            }
            
            // Attach membership to request for use in route handlers
            req.membership = membership;
            next();
        } catch (err) {
            console.error('Membership check error:', err);
            res.status(500).json({
                success: false,
                message: 'Error checking membership'
            });
        }
    };
}

/**
 * Middleware to check if user has a specific role
 */
function requireRole(requiredRole) {
    return async (req, res, next) => {
        try {
            if (!req.session || !req.session.userId) {
                return res.status(401).json({
                    success: false,
                    message: 'Authentication required'
                });
            }
            
            const membership = await membershipService.getUserMembership(req.session.userId);
            
            if (!membership || membership.role !== requiredRole) {
                return res.status(403).json({
                    success: false,
                    message: 'Insufficient permissions',
                    required: requiredRole,
                    current: membership?.role || 'guest'
                });
            }
            
            req.membership = membership;
            next();
        } catch (err) {
            console.error('Role check error:', err);
            res.status(500).json({
                success: false,
                message: 'Error checking role'
            });
        }
    };
}

/**
 * Middleware to attach user permissions to request
 */
async function attachPermissions(req, res, next) {
    try {
        if (req.session && req.session.userId) {
            req.permissions = await membershipService.getUserPermissions(req.session.userId);
        } else {
            // Guest permissions
            req.permissions = {
                canAccessCapitalSuite: false,
                canAccessSolopreneurLaunchpad: false,
                canAccessRiseReclaim: false,
                canAccessDigitalGrandpa: true,
                role: membershipService.ROLES.GUEST,
                membershipLevel: membershipService.MEMBERSHIP_LEVELS.FREE
            };
        }
        next();
    } catch (err) {
        console.error('Attach permissions error:', err);
        next(); // Continue even if permissions fail
    }
}

module.exports = {
    requireMembership,
    requireRole,
    attachPermissions
};
