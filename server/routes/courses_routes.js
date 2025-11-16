const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const { requireAuth } = require('../middleware/auth');
const { requireTier } = require('../middleware/requireTier');

// Get all courses
router.get('/', requireAuth, (req, res) => {
    Course.getAllCourses((err, courses) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch courses', details: err.message });
        }
        res.json({ courses });
    });
});

// Get course by slug with modules
router.get('/:slug', requireAuth, (req, res) => {
    Course.getCourseBySlug(req.params.slug, (err, course) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch course', details: err.message });
        }
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Check if user has required tier
        const userTier = req.user.membership_tier || 'core';
        const { checkTierAccess } = require('../middleware/requireTier');
        
        if (!checkTierAccess(userTier, course.required_tier)) {
            return res.status(403).json({ 
                error: 'Insufficient membership tier',
                message: `This course requires ${course.required_tier} membership`,
                requiredTier: course.required_tier
            });
        }

        res.json({ course });
    });
});

// Get lessons for a module
router.get('/modules/:moduleId/lessons', requireAuth, (req, res) => {
    Course.getLessonsByModuleId(req.params.moduleId, (err, lessons) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch lessons', details: err.message });
        }
        res.json({ lessons });
    });
});

// Get single lesson by ID
router.get('/lessons/:lessonId', requireAuth, (req, res) => {
    Course.getLessonById(req.params.lessonId, (err, lesson) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch lesson', details: err.message });
        }
        if (!lesson) {
            return res.status(404).json({ error: 'Lesson not found' });
        }
        res.json({ lesson });
    });
});

module.exports = router;
