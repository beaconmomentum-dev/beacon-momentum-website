const express = require('express');
const router = express.Router();
const db = require('../database/init');

// Middleware to check authentication
const requireAuth = (req, res, next) => {
    if (!req.session || !req.session.userId) {
        return res.status(401).json({ success: false, message: 'Not authenticated' });
    }
    next();
};

// Get user's progress across all modules
router.get('/my-progress', requireAuth, (req, res) => {
    const userId = req.session.userId;

    db.all(`
        SELECT 
            module_id,
            progress_percent,
            completed,
            last_accessed,
            time_spent_minutes
        FROM module_progress
        WHERE user_id = ?
        ORDER BY last_accessed DESC
    `, [userId], (err, progress) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        // Calculate overall progress
        let totalProgress = 0;
        let completedModules = 0;
        const totalModules = 5; // Beacon Capital Suite has 5 modules

        progress.forEach(p => {
            totalProgress += p.progress_percent;
            if (p.completed) completedModules++;
        });

        const overallProgress = progress.length > 0 
            ? Math.round(totalProgress / totalModules) 
            : 0;

        res.json({
            success: true,
            progress: {
                overall: overallProgress,
                completed: completedModules,
                total: totalModules,
                modules: progress
            }
        });
    });
});

// Get progress for specific module
router.get('/module/:moduleId', requireAuth, (req, res) => {
    const userId = req.session.userId;
    const { moduleId } = req.params;

    db.get(`
        SELECT 
            module_id,
            progress_percent,
            completed,
            last_accessed,
            time_spent_minutes,
            notes
        FROM module_progress
        WHERE user_id = ? AND module_id = ?
    `, [userId, moduleId], (err, progress) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        if (!progress) {
            return res.json({
                success: true,
                progress: {
                    module_id: moduleId,
                    progress_percent: 0,
                    completed: false,
                    time_spent_minutes: 0
                }
            });
        }

        res.json({ success: true, progress });
    });
});

// Update module progress
router.post('/module/:moduleId', requireAuth, (req, res) => {
    const userId = req.session.userId;
    const { moduleId } = req.params;
    const { progress_percent, completed, time_spent_minutes } = req.body;

    // Validate inputs
    if (progress_percent !== undefined && (progress_percent < 0 || progress_percent > 100)) {
        return res.status(400).json({ success: false, message: 'Invalid progress percentage' });
    }

    db.run(`
        INSERT INTO module_progress (
            user_id, 
            module_id, 
            progress_percent, 
            completed, 
            time_spent_minutes,
            last_accessed
        ) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(user_id, module_id) DO UPDATE SET
            progress_percent = COALESCE(excluded.progress_percent, progress_percent),
            completed = COALESCE(excluded.completed, completed),
            time_spent_minutes = time_spent_minutes + COALESCE(excluded.time_spent_minutes, 0),
            last_accessed = CURRENT_TIMESTAMP
    `, [
        userId, 
        moduleId, 
        progress_percent || 0, 
        completed ? 1 : 0, 
        time_spent_minutes || 0
    ], function(err) {
        if (err) {
            console.error('Progress update error:', err);
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        res.json({ 
            success: true, 
            message: 'Progress updated successfully' 
        });
    });
});

// Mark module as completed
router.post('/module/:moduleId/complete', requireAuth, (req, res) => {
    const userId = req.session.userId;
    const { moduleId } = req.params;

    db.run(`
        INSERT INTO module_progress (
            user_id, 
            module_id, 
            progress_percent, 
            completed,
            last_accessed
        ) VALUES (?, ?, 100, 1, CURRENT_TIMESTAMP)
        ON CONFLICT(user_id, module_id) DO UPDATE SET
            progress_percent = 100,
            completed = 1,
            last_accessed = CURRENT_TIMESTAMP
    `, [userId, moduleId], function(err) {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        res.json({ 
            success: true, 
            message: 'Module marked as completed' 
        });
    });
});

// Save module notes
router.post('/module/:moduleId/notes', requireAuth, (req, res) => {
    const userId = req.session.userId;
    const { moduleId } = req.params;
    const { notes } = req.body;

    if (!notes || notes.trim().length === 0) {
        return res.status(400).json({ success: false, message: 'Notes cannot be empty' });
    }

    db.run(`
        INSERT INTO module_progress (
            user_id, 
            module_id, 
            notes,
            last_accessed
        ) VALUES (?, ?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(user_id, module_id) DO UPDATE SET
            notes = excluded.notes,
            last_accessed = CURRENT_TIMESTAMP
    `, [userId, moduleId, notes], function(err) {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        res.json({ 
            success: true, 
            message: 'Notes saved successfully' 
        });
    });
});

// Get module notes
router.get('/module/:moduleId/notes', requireAuth, (req, res) => {
    const userId = req.session.userId;
    const { moduleId } = req.params;

    db.get(`
        SELECT notes
        FROM module_progress
        WHERE user_id = ? AND module_id = ?
    `, [userId, moduleId], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        res.json({ 
            success: true, 
            notes: result ? result.notes : '' 
        });
    });
});

// Get leaderboard (top users by completion)
router.get('/leaderboard', requireAuth, (req, res) => {
    db.all(`
        SELECT 
            u.first_name,
            u.last_name,
            COUNT(CASE WHEN mp.completed = 1 THEN 1 END) as completed_modules,
            SUM(mp.time_spent_minutes) as total_time_minutes,
            AVG(mp.progress_percent) as avg_progress
        FROM users u
        LEFT JOIN module_progress mp ON u.id = mp.user_id
        WHERE u.is_verified = 1
        GROUP BY u.id
        HAVING completed_modules > 0
        ORDER BY completed_modules DESC, total_time_minutes ASC
        LIMIT 10
    `, (err, leaderboard) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        res.json({ 
            success: true, 
            leaderboard 
        });
    });
});

// Get user's achievements
router.get('/achievements', requireAuth, (req, res) => {
    const userId = req.session.userId;

    db.all(`
        SELECT 
            achievement_type,
            achievement_name,
            achievement_description,
            earned_at
        FROM achievements
        WHERE user_id = ?
        ORDER BY earned_at DESC
    `, [userId], (err, achievements) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        res.json({ 
            success: true, 
            achievements 
        });
    });
});

// Award achievement (internal use)
function awardAchievement(userId, type, name, description) {
    db.run(`
        INSERT OR IGNORE INTO achievements (
            user_id,
            achievement_type,
            achievement_name,
            achievement_description
        ) VALUES (?, ?, ?, ?)
    `, [userId, type, name, description], (err) => {
        if (err) {
            console.error('Achievement award error:', err);
        }
    });
}

// Check and award achievements after progress update
function checkAchievements(userId) {
    // Check for "First Module" achievement
    db.get(`
        SELECT COUNT(*) as count
        FROM module_progress
        WHERE user_id = ? AND completed = 1
    `, [userId], (err, result) => {
        if (err) return;

        if (result.count === 1) {
            awardAchievement(
                userId,
                'milestone',
                'First Module Complete',
                'Completed your first module in the Beacon Capital Suite'
            );
        } else if (result.count === 5) {
            awardAchievement(
                userId,
                'milestone',
                'Suite Master',
                'Completed all 5 modules in the Beacon Capital Suite'
            );
        }
    });

    // Check for "Dedicated Learner" achievement (100+ hours)
    db.get(`
        SELECT SUM(time_spent_minutes) as total_minutes
        FROM module_progress
        WHERE user_id = ?
    `, [userId], (err, result) => {
        if (err) return;

        if (result.total_minutes >= 6000) { // 100 hours
            awardAchievement(
                userId,
                'dedication',
                'Dedicated Learner',
                'Spent over 100 hours learning in the Beacon Capital Suite'
            );
        }
    });
}

module.exports = router;
module.exports.checkAchievements = checkAchievements;
