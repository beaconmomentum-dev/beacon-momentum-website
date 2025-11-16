const express = require('express');
const router = express.Router();
const Progress = require('../models/progress');
const { requireAuth } = require('../middleware/auth');

// Get user's overall progress
router.get('/', requireAuth, (req, res) => {
    Progress.getUserProgress(req.user.id, (err, progress) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch progress', details: err.message });
        }
        res.json({ progress });
    });
});

// Get completed lessons
router.get('/completed', requireAuth, (req, res) => {
    Progress.getCompletedLessons(req.user.id, (err, lessons) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch completed lessons', details: err.message });
        }
        res.json({ completedLessons: lessons });
    });
});

// Mark lesson as complete
router.post('/lessons/:lessonId/complete', requireAuth, (req, res) => {
    Progress.markLessonComplete(req.user.id, req.params.lessonId, (err, progressId) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to mark lesson complete', details: err.message });
        }
        res.status(201).json({ message: 'Lesson marked as complete', progressId });
    });
});

// Check if lesson is completed
router.get('/lessons/:lessonId/status', requireAuth, (req, res) => {
    Progress.isLessonCompleted(req.user.id, req.params.lessonId, (err, isCompleted) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to check lesson status', details: err.message });
        }
        res.json({ lessonId: req.params.lessonId, isCompleted });
    });
});

// Get course completion percentage
router.get('/courses/:courseId', requireAuth, (req, res) => {
    Progress.getCourseCompletionPercentage(req.user.id, req.params.courseId, (err, stats) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch course progress', details: err.message });
        }
        res.json({ courseId: req.params.courseId, ...stats });
    });
});

// Get module progress
router.get('/modules/:moduleId', requireAuth, (req, res) => {
    Progress.getModuleProgress(req.user.id, req.params.moduleId, (err, stats) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch module progress', details: err.message });
        }
        res.json({ moduleId: req.params.moduleId, ...stats });
    });
});

module.exports = router;
