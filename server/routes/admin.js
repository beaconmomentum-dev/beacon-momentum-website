const express = require('express');
const router = express.Router();
const db = require('../database/init');
const fs = require('fs').promises;
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

// Middleware to check if user is admin
const requireAdmin = (req, res, next) => {
    if (!req.session || !req.session.userId) {
        return res.status(401).json({ success: false, message: 'Not authenticated' });
    }
    
    // Check if user is admin
    db.get('SELECT is_admin FROM users WHERE id = ?', [req.session.userId], (err, user) => {
        if (err || !user || !user.is_admin) {
            return res.status(403).json({ success: false, message: 'Admin access required' });
        }
        next();
    });
};

// Get system status
router.get('/status', requireAdmin, async (req, res) => {
    try {
        const status = {
            timestamp: new Date().toISOString(),
            server: {},
            database: {},
            users: {},
            backups: {}
        };

        // Server uptime
        try {
            const { stdout: uptime } = await execPromise('uptime -p');
            status.server.uptime = uptime.trim();
        } catch (err) {
            status.server.uptime = 'Unknown';
        }

        // Memory usage
        try {
            const { stdout: memory } = await execPromise('free -m | grep Mem');
            const memParts = memory.trim().split(/\s+/);
            status.server.memory = {
                total: `${memParts[1]}MB`,
                used: `${memParts[2]}MB`,
                free: `${memParts[3]}MB`,
                usage_percent: Math.round((parseInt(memParts[2]) / parseInt(memParts[1])) * 100)
            };
        } catch (err) {
            status.server.memory = { error: 'Unable to fetch memory info' };
        }

        // Disk usage
        try {
            const { stdout: disk } = await execPromise('df -h / | tail -1');
            const diskParts = disk.trim().split(/\s+/);
            status.server.disk = {
                total: diskParts[1],
                used: diskParts[2],
                available: diskParts[3],
                usage_percent: parseInt(diskParts[4])
            };
        } catch (err) {
            status.server.disk = { error: 'Unable to fetch disk info' };
        }

        // Database stats
        await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM users', (err, result) => {
                if (err) {
                    status.database.users = 'Error';
                    return resolve();
                }
                status.database.users = result.count;
                resolve();
            });
        });

        await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM sessions', (err, result) => {
                if (err) {
                    status.database.sessions = 'Error';
                    return resolve();
                }
                status.database.sessions = result.count;
                resolve();
            });
        });

        // Recent user registrations
        await new Promise((resolve, reject) => {
            db.get(`
                SELECT COUNT(*) as count 
                FROM users 
                WHERE created_at >= datetime('now', '-7 days')
            `, (err, result) => {
                if (err) {
                    status.users.recent_registrations = 'Error';
                    return resolve();
                }
                status.users.recent_registrations = result.count;
                resolve();
            });
        });

        // Active users (logged in within 24 hours)
        await new Promise((resolve, reject) => {
            db.get(`
                SELECT COUNT(DISTINCT user_id) as count 
                FROM sessions 
                WHERE expires_at > datetime('now')
            `, (err, result) => {
                if (err) {
                    status.users.active_users = 'Error';
                    return resolve();
                }
                status.users.active_users = result.count;
                resolve();
            });
        });

        // Check latest backup
        try {
            const { stdout: backupList } = await execPromise('ls -t /var/backups/beacon-momentum/beacon_backup_*.db.gz 2>/dev/null | head -1');
            if (backupList.trim()) {
                const { stdout: backupDate } = await execPromise(`stat -c %y "${backupList.trim()}"`);
                status.backups.latest = new Date(backupDate.trim()).toISOString();
                
                const { stdout: backupCount } = await execPromise('ls /var/backups/beacon-momentum/beacon_backup_*.db.gz 2>/dev/null | wc -l');
                status.backups.total = parseInt(backupCount.trim());
            } else {
                status.backups.latest = 'No backups found';
                status.backups.total = 0;
            }
        } catch (err) {
            status.backups.latest = 'Unable to check';
            status.backups.total = 0;
        }

        res.json({ success: true, status });
    } catch (error) {
        console.error('Status error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch system status' });
    }
});

// Get user list (admin only)
router.get('/users', requireAdmin, (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const offset = (page - 1) * limit;

    db.all(`
        SELECT 
            u.id,
            u.email,
            u.first_name,
            u.last_name,
            u.is_verified,
            u.is_admin,
            u.created_at,
            u.last_login,
            s.tier,
            s.status as subscription_status
        FROM users u
        LEFT JOIN subscriptions s ON u.id = s.user_id AND s.status = 'active'
        ORDER BY u.created_at DESC
        LIMIT ? OFFSET ?
    `, [limit, offset], (err, users) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        db.get('SELECT COUNT(*) as total FROM users', (err, count) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Database error' });
            }

            res.json({
                success: true,
                users,
                pagination: {
                    page,
                    limit,
                    total: count.total,
                    pages: Math.ceil(count.total / limit)
                }
            });
        });
    });
});

// Update user (admin only)
router.put('/users/:id', requireAdmin, (req, res) => {
    const { id } = req.params;
    const { is_admin, is_verified } = req.body;

    const updates = [];
    const values = [];

    if (typeof is_admin === 'boolean') {
        updates.push('is_admin = ?');
        values.push(is_admin ? 1 : 0);
    }

    if (typeof is_verified === 'boolean') {
        updates.push('is_verified = ?');
        values.push(is_verified ? 1 : 0);
    }

    if (updates.length === 0) {
        return res.status(400).json({ success: false, message: 'No valid updates provided' });
    }

    values.push(id);

    db.run(
        `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
        values,
        function(err) {
            if (err) {
                return res.status(500).json({ success: false, message: 'Database error' });
            }

            if (this.changes === 0) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            res.json({ success: true, message: 'User updated successfully' });
        }
    );
});

// Delete user (admin only)
router.delete('/users/:id', requireAdmin, (req, res) => {
    const { id } = req.params;

    // Don't allow deleting yourself
    if (parseInt(id) === req.session.userId) {
        return res.status(400).json({ success: false, message: 'Cannot delete your own account' });
    }

    db.run('DELETE FROM users WHERE id = ?', [id], function(err) {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        if (this.changes === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, message: 'User deleted successfully' });
    });
});

// Get analytics data
router.get('/analytics', requireAdmin, (req, res) => {
    const analytics = {};

    // User growth over time
    db.all(`
        SELECT 
            DATE(created_at) as date,
            COUNT(*) as count
        FROM users
        WHERE created_at >= datetime('now', '-30 days')
        GROUP BY DATE(created_at)
        ORDER BY date
    `, (err, growth) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        analytics.user_growth = growth;

        // Subscription distribution
        db.all(`
            SELECT 
                tier,
                COUNT(*) as count
            FROM subscriptions
            WHERE status = 'active'
            GROUP BY tier
        `, (err, subscriptions) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Database error' });
            }

            analytics.subscription_distribution = subscriptions;

            // Module progress
            db.all(`
                SELECT 
                    module_id,
                    COUNT(*) as users_started,
                    SUM(CASE WHEN completed = 1 THEN 1 ELSE 0 END) as users_completed,
                    AVG(progress_percent) as avg_progress
                FROM module_progress
                GROUP BY module_id
            `, (err, progress) => {
                if (err) {
                    return res.status(500).json({ success: false, message: 'Database error' });
                }

                analytics.module_progress = progress;

                res.json({ success: true, analytics });
            });
        });
    });
});

module.exports = router;
