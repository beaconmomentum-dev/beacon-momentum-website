const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const { requireAuth } = require('../middleware/auth');
const { requireAdmin } = require('../middleware/requireTier');

// Get all upcoming events
router.get('/', requireAuth, (req, res) => {
    Event.getUpcomingEvents((err, events) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch events', details: err.message });
        }
        res.json({ events });
    });
});

// Get past events
router.get('/past', requireAuth, (req, res) => {
    Event.getPastEvents((err, events) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch past events', details: err.message });
        }
        res.json({ events });
    });
});

// Get single event
router.get('/:eventId', requireAuth, (req, res) => {
    Event.getEventById(req.params.eventId, (err, event) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch event', details: err.message });
        }
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Check if user is registered
        Event.isUserRegistered(req.user.id, req.params.eventId, (err, isRegistered) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to check registration status' });
            }
            event.isRegistered = isRegistered;
            res.json({ event });
        });
    });
});

// Register for an event
router.post('/:eventId/register', requireAuth, (req, res) => {
    Event.getEventById(req.params.eventId, (err, event) => {
        if (err || !event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Check tier access
        const { checkTierAccess } = require('../middleware/requireTier');
        if (!checkTierAccess(req.user.membership_tier || 'core', event.required_tier)) {
            return res.status(403).json({ 
                error: 'Insufficient membership tier',
                requiredTier: event.required_tier
            });
        }

        Event.registerUserForEvent(req.user.id, req.params.eventId, (err, registrationId) => {
            if (err) {
                if (err.message.includes('Already registered')) {
                    return res.status(400).json({ error: 'You are already registered for this event' });
                }
                return res.status(500).json({ error: 'Failed to register', details: err.message });
            }
            res.status(201).json({ message: 'Successfully registered for event', registrationId });
        });
    });
});

// Unregister from an event
router.delete('/:eventId/register', requireAuth, (req, res) => {
    Event.unregisterUserFromEvent(req.user.id, req.params.eventId, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to unregister', details: err.message });
        }
        res.json({ message: 'Successfully unregistered from event' });
    });
});

// Get user's registered events
router.get('/my/registrations', requireAuth, (req, res) => {
    Event.getUserRegistrations(req.user.id, (err, events) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch registrations', details: err.message });
        }
        res.json({ events });
    });
});

// Create new event (admin only)
router.post('/', requireAuth, requireAdmin, (req, res) => {
    const eventData = {
        title: req.body.title,
        description: req.body.description,
        event_datetime: req.body.event_datetime,
        duration_minutes: req.body.duration_minutes,
        meeting_url: req.body.meeting_url,
        required_tier: req.body.required_tier || 'core'
    };

    Event.createEvent(eventData, (err, eventId) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to create event', details: err.message });
        }
        res.status(201).json({ message: 'Event created successfully', eventId });
    });
});

// Update event recording URL (admin only)
router.patch('/:eventId/recording', requireAuth, requireAdmin, (req, res) => {
    Event.updateRecordingUrl(req.params.eventId, req.body.recording_url, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to update recording URL', details: err.message });
        }
        res.json({ message: 'Recording URL updated successfully' });
    });
});

module.exports = router;
