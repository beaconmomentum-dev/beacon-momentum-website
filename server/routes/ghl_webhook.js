const express = require('express');
const router = express.Router();
const ghlService = require('../services/gohighlevel');

/**
 * GoHighLevel Webhook Handler
 * Processes GHL events and syncs with Beacon database
 * 
 * Webhook URL: https://beaconmomentum.com/api/ghl/webhook
 */

/**
 * Main GHL webhook endpoint
 * POST /api/ghl/webhook
 */
router.post('/webhook', express.json(), async (req, res) => {
    try {
        const webhookData = req.body;
        const eventType = webhookData.type || webhookData.event_type;
        
        console.log(`📨 GHL webhook received: ${eventType}`);
        console.log('Webhook data:', JSON.stringify(webhookData, null, 2));
        
        let result;
        
        // Handle different event types
        switch (eventType) {
            case 'form_submission':
            case 'FormSubmit':
                result = await ghlService.handleFormSubmission(webhookData);
                break;
            
            case 'tag_added':
            case 'TagAdded':
                result = await ghlService.handleTagAdded(webhookData);
                break;
            
            case 'contact_updated':
            case 'ContactUpdate':
                result = await ghlService.handleContactUpdated(webhookData);
                break;
            
            case 'contact_created':
            case 'ContactCreate':
                result = await ghlService.handleContactUpdated(webhookData);
                break;
            
            default:
                console.log(`ℹ️ Unhandled GHL event type: ${eventType}`);
                return res.json({
                    success: true,
                    message: 'Event type not handled'
                });
        }
        
        res.json({
            success: true,
            ...result
        });
    } catch (err) {
        console.error('❌ GHL webhook error:', err);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

/**
 * Test endpoint for GHL integration
 * POST /api/ghl/test
 */
router.post('/test', express.json(), async (req, res) => {
    try {
        const { email, tags } = req.body;
        
        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email required'
            });
        }
        
        // Simulate GHL webhook
        const testData = {
            type: 'contact_updated',
            contact: {
                id: 'test_' + Date.now(),
                email: email,
                firstName: 'Test',
                lastName: 'User',
                tags: tags || []
            }
        };
        
        const result = await ghlService.handleContactUpdated(testData);
        
        res.json({
            success: true,
            message: 'Test webhook processed',
            ...result
        });
    } catch (err) {
        console.error('❌ GHL test error:', err);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

/**
 * Get tag mapping configuration
 * GET /api/ghl/tag-mapping
 */
router.get('/tag-mapping', (req, res) => {
    res.json({
        success: true,
        tagMapping: ghlService.TAG_MEMBERSHIP_MAP
    });
});

module.exports = router;
