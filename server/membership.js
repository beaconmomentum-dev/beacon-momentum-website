const express = require('express');
const router = express.Router();
const membershipService = require('../services/membership');

/**
 * Get current user's permissions
 * GET /api/membership/permissions
 */
router.get('/permissions', async (req, res) => {
    try {
        if (!req.session || !req.session.userId) {
            return res.json({
                success: true,
                permissions: {
                    canAccessCapitalSuite: false,
                    canAccessSolopreneurLaunchpad: false,
                    canAccessRiseReclaim: false,
                    canAccessDigitalGrandpa: true,
                    role: 'guest',
                    membershipLevel: 'free',
                    isAuthenticated: false
                }
            });
        }
        
        const permissions = await membershipService.getUserPermissions(req.session.userId);
        
        res.json({
            success: true,
            permissions: {
                ...permissions,
                isAuthenticated: true
            }
        });
    } catch (err) {
        console.error('Get permissions error:', err);
        res.status(500).json({
            success: false,
            message: 'Error retrieving permissions'
        });
    }
});

/**
 * Get current user's membership details
 * GET /api/membership/details
 */
router.get('/details', async (req, res) => {
    try {
        if (!req.session || !req.session.userId) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
        }
        
        const membership = await membershipService.getUserMembership(req.session.userId);
        
        if (!membership) {
            return res.status(404).json({
                success: false,
                message: 'Membership not found'
            });
        }
        
        res.json({
            success: true,
            membership
        });
    } catch (err) {
        console.error('Get membership details error:', err);
        res.status(500).json({
            success: false,
            message: 'Error retrieving membership details'
        });
    }
});

/**
 * Update user's membership (admin only)
 * POST /api/membership/update
 */
router.post('/update', async (req, res) => {
    try {
        if (!req.session || !req.session.userId) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
        }
        
        // Check if user is admin
        const currentMembership = await membershipService.getUserMembership(req.session.userId);
        if (currentMembership.role !== membershipService.ROLES.ADMIN) {
            return res.status(403).json({
                success: false,
                message: 'Admin access required'
            });
        }
        
        const { userId, membershipData } = req.body;
        
        if (!userId || !membershipData) {
            return res.status(400).json({
                success: false,
                message: 'userId and membershipData required'
            });
        }
        
        await membershipService.updateMembership(userId, membershipData);
        
        res.json({
            success: true,
            message: 'Membership updated successfully'
        });
    } catch (err) {
        console.error('Update membership error:', err);
        res.status(500).json({
            success: false,
            message: 'Error updating membership'
        });
    }
});

/**
 * Check for expired memberships (cron job endpoint)
 * POST /api/membership/check-expired
 */
router.post('/check-expired', async (req, res) => {
    try {
        const result = await membershipService.checkExpiredMemberships();
        
        res.json({
            success: true,
            message: `${result.expired} memberships expired`,
            expired: result.expired
        });
    } catch (err) {
        console.error('Check expired memberships error:', err);
        res.status(500).json({
            success: false,
            message: 'Error checking expired memberships'
        });
    }
});

module.exports = router;
