const express = require('express');
const router = express.Router();
const db = require('../database/init');
const { requireAuth } = require('../middleware/auth');
const { checkTierAccess } = require('../middleware/requireTier');

// Get all resources (filtered by user's tier)
router.get('/', requireAuth, (req, res) => {
    const sql = 'SELECT * FROM resources ORDER BY created_at DESC';
    
    db.all(sql, [], (err, resources) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch resources', details: err.message });
        }

        // Filter resources based on user's tier
        const userTier = req.user.membership_tier || 'core';
        const accessibleResources = resources.filter(resource => 
            checkTierAccess(userTier, resource.required_tier)
        );

        res.json({ resources: accessibleResources });
    });
});

// Get single resource by ID
router.get('/:resourceId', requireAuth, (req, res) => {
    const sql = 'SELECT * FROM resources WHERE id = ?';
    
    db.get(sql, [req.params.resourceId], (err, resource) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch resource', details: err.message });
        }
        if (!resource) {
            return res.status(404).json({ error: 'Resource not found' });
        }

        // Check tier access
        const userTier = req.user.membership_tier || 'core';
        if (!checkTierAccess(userTier, resource.required_tier)) {
            return res.status(403).json({ 
                error: 'Insufficient membership tier',
                requiredTier: resource.required_tier
            });
        }

        res.json({ resource });
    });
});

module.exports = router;
