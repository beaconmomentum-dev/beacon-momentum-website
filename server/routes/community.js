const express = require('express');
const router = express.Router();
const db = require('../database/init');
const { validateCreatePost, validateCreateComment, validateSlug } = require('../middleware/validation');

// Middleware to check authentication
const requireAuth = (req, res, next) => {
    if (!req.session || !req.session.userId) {
        return res.status(401).json({ success: false, message: 'Not authenticated' });
    }
    next();
};

// Get forum categories
router.get('/categories', (req, res) => {
    db.all(`
        SELECT 
            c.id,
            c.name,
            c.description,
            c.icon,
            COUNT(DISTINCT t.id) as topic_count,
            COUNT(DISTINCT p.id) as post_count
        FROM forum_categories c
        LEFT JOIN forum_topics t ON c.id = t.category_id
        LEFT JOIN forum_posts p ON t.id = p.topic_id
        GROUP BY c.id
        ORDER BY c.display_order
    `, (err, categories) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        res.json({ success: true, categories });
    });
});

// Get topics in a category
router.get('/categories/:categoryId/topics', (req, res) => {
    const { categoryId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    db.all(`
        SELECT 
            t.id,
            t.title,
            t.is_pinned,
            t.is_locked,
            t.created_at,
            u.first_name || ' ' || u.last_name as author_name,
            u.id as author_id,
            COUNT(DISTINCT p.id) as reply_count,
            MAX(p.created_at) as last_activity
        FROM forum_topics t
        JOIN users u ON t.user_id = u.id
        LEFT JOIN forum_posts p ON t.id = p.topic_id
        WHERE t.category_id = ?
        GROUP BY t.id
        ORDER BY t.is_pinned DESC, last_activity DESC
        LIMIT ? OFFSET ?
    `, [categoryId, limit, offset], (err, topics) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        db.get('SELECT COUNT(*) as total FROM forum_topics WHERE category_id = ?', [categoryId], (err, count) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Database error' });
            }

            res.json({
                success: true,
                topics,
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

// Get topic with posts
router.get('/topics/:topicId', (req, res) => {
    const { topicId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Get topic details
    db.get(`
        SELECT 
            t.id,
            t.title,
            t.content,
            t.is_pinned,
            t.is_locked,
            t.created_at,
            t.category_id,
            u.first_name || ' ' || u.last_name as author_name,
            u.id as author_id,
            c.name as category_name
        FROM forum_topics t
        JOIN users u ON t.user_id = u.id
        JOIN forum_categories c ON t.category_id = c.id
        WHERE t.id = ?
    `, [topicId], (err, topic) => {
        if (err || !topic) {
            return res.status(404).json({ success: false, message: 'Topic not found' });
        }

        // Get posts
        db.all(`
            SELECT 
                p.id,
                p.content,
                p.created_at,
                p.updated_at,
                u.first_name || ' ' || u.last_name as author_name,
                u.id as author_id,
                COUNT(DISTINCT l.id) as like_count
            FROM forum_posts p
            JOIN users u ON p.user_id = u.id
            LEFT JOIN forum_post_likes l ON p.id = l.post_id
            WHERE p.topic_id = ?
            GROUP BY p.id
            ORDER BY p.created_at ASC
            LIMIT ? OFFSET ?
        `, [topicId, limit, offset], (err, posts) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Database error' });
            }

            db.get('SELECT COUNT(*) as total FROM forum_posts WHERE topic_id = ?', [topicId], (err, count) => {
                if (err) {
                    return res.status(500).json({ success: false, message: 'Database error' });
                }

                res.json({
                    success: true,
                    topic,
                    posts,
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
});

// Create new topic
router.post('/topics', requireAuth, (req, res) => {
    const { category_id, title, content } = req.body;
    const userId = req.session.userId;

    if (!category_id || !title || !content) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    if (title.length < 5 || title.length > 200) {
        return res.status(400).json({ success: false, message: 'Title must be between 5 and 200 characters' });
    }

    if (content.length < 10) {
        return res.status(400).json({ success: false, message: 'Content must be at least 10 characters' });
    }

    db.run(`
        INSERT INTO forum_topics (category_id, user_id, title, content)
        VALUES (?, ?, ?, ?)
    `, [category_id, userId, title, content], function(err) {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        res.json({
            success: true,
            message: 'Topic created successfully',
            topic_id: this.lastID
        });
    });
});

// Create new post (reply to topic)
router.post('/topics/:topicId/posts', requireAuth, (req, res) => {
    const { topicId } = req.params;
    const { content } = req.body;
    const userId = req.session.userId;

    if (!content || content.length < 10) {
        return res.status(400).json({ success: false, message: 'Content must be at least 10 characters' });
    }

    // Check if topic exists and is not locked
    db.get('SELECT is_locked FROM forum_topics WHERE id = ?', [topicId], (err, topic) => {
        if (err || !topic) {
            return res.status(404).json({ success: false, message: 'Topic not found' });
        }

        if (topic.is_locked) {
            return res.status(403).json({ success: false, message: 'Topic is locked' });
        }

        db.run(`
            INSERT INTO forum_posts (topic_id, user_id, content)
            VALUES (?, ?, ?)
        `, [topicId, userId, content], function(err) {
            if (err) {
                return res.status(500).json({ success: false, message: 'Database error' });
            }

            res.json({
                success: true,
                message: 'Reply posted successfully',
                post_id: this.lastID
            });
        });
    });
});

// Like a post
router.post('/posts/:postId/like', requireAuth, (req, res) => {
    const { postId } = req.params;
    const userId = req.session.userId;

    db.run(`
        INSERT OR IGNORE INTO forum_post_likes (post_id, user_id)
        VALUES (?, ?)
    `, [postId, userId], function(err) {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        res.json({
            success: true,
            message: 'Post liked'
        });
    });
});

// Unlike a post
router.delete('/posts/:postId/like', requireAuth, (req, res) => {
    const { postId } = req.params;
    const userId = req.session.userId;

    db.run(`
        DELETE FROM forum_post_likes
        WHERE post_id = ? AND user_id = ?
    `, [postId, userId], function(err) {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        res.json({
            success: true,
            message: 'Post unliked'
        });
    });
});

// Edit post
router.put('/posts/:postId', requireAuth, (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.session.userId;

    if (!content || content.length < 10) {
        return res.status(400).json({ success: false, message: 'Content must be at least 10 characters' });
    }

    // Check if user owns the post
    db.get('SELECT user_id FROM forum_posts WHERE id = ?', [postId], (err, post) => {
        if (err || !post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        if (post.user_id !== userId) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        db.run(`
            UPDATE forum_posts
            SET content = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `, [content, postId], function(err) {
            if (err) {
                return res.status(500).json({ success: false, message: 'Database error' });
            }

            res.json({
                success: true,
                message: 'Post updated successfully'
            });
        });
    });
});

// Delete post
router.delete('/posts/:postId', requireAuth, (req, res) => {
    const { postId } = req.params;
    const userId = req.session.userId;

    // Check if user owns the post or is admin
    db.get('SELECT user_id FROM forum_posts WHERE id = ?', [postId], (err, post) => {
        if (err || !post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        db.get('SELECT is_admin FROM users WHERE id = ?', [userId], (err, user) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Database error' });
            }

            if (post.user_id !== userId && !user.is_admin) {
                return res.status(403).json({ success: false, message: 'Not authorized' });
            }

            db.run('DELETE FROM forum_posts WHERE id = ?', [postId], function(err) {
                if (err) {
                    return res.status(500).json({ success: false, message: 'Database error' });
                }

                res.json({
                    success: true,
                    message: 'Post deleted successfully'
                });
            });
        });
    });
});

// Get user's messages
router.get('/messages', requireAuth, (req, res) => {
    const userId = req.session.userId;

    db.all(`
        SELECT 
            m.id,
            m.subject,
            m.content,
            m.is_read,
            m.created_at,
            sender.first_name || ' ' || sender.last_name as sender_name,
            sender.id as sender_id,
            recipient.first_name || ' ' || recipient.last_name as recipient_name,
            recipient.id as recipient_id
        FROM direct_messages m
        JOIN users sender ON m.sender_id = sender.id
        JOIN users recipient ON m.recipient_id = recipient.id
        WHERE m.sender_id = ? OR m.recipient_id = ?
        ORDER BY m.created_at DESC
        LIMIT 50
    `, [userId, userId], (err, messages) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        res.json({ success: true, messages });
    });
});

// Send message
router.post('/messages', requireAuth, (req, res) => {
    const { recipient_id, subject, content } = req.body;
    const senderId = req.session.userId;

    if (!recipient_id || !subject || !content) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    if (subject.length < 3 || subject.length > 100) {
        return res.status(400).json({ success: false, message: 'Subject must be between 3 and 100 characters' });
    }

    if (content.length < 10) {
        return res.status(400).json({ success: false, message: 'Content must be at least 10 characters' });
    }

    // Check if recipient exists
    db.get('SELECT id FROM users WHERE id = ?', [recipient_id], (err, user) => {
        if (err || !user) {
            return res.status(404).json({ success: false, message: 'Recipient not found' });
        }

        db.run(`
            INSERT INTO direct_messages (sender_id, recipient_id, subject, content)
            VALUES (?, ?, ?, ?)
        `, [senderId, recipient_id, subject, content], function(err) {
            if (err) {
                return res.status(500).json({ success: false, message: 'Database error' });
            }

            res.json({
                success: true,
                message: 'Message sent successfully',
                message_id: this.lastID
            });
        });
    });
});

// Mark message as read
router.put('/messages/:messageId/read', requireAuth, (req, res) => {
    const { messageId } = req.params;
    const userId = req.session.userId;

    db.run(`
        UPDATE direct_messages
        SET is_read = 1
        WHERE id = ? AND recipient_id = ?
    `, [messageId, userId], function(err) {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        res.json({
            success: true,
            message: 'Message marked as read'
        });
    });
});

module.exports = router;
