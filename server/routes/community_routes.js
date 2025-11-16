const express = require('express');
const router = express.Router();
const Community = require('../models/community');
const { requireAuth } = require('../middleware/auth');
const { requireTier, requireAdmin } = require('../middleware/requireTier');

// Get all community spaces
router.get('/spaces', requireAuth, (req, res) => {
    Community.getAllSpaces((err, spaces) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch spaces', details: err.message });
        }
        res.json({ spaces });
    });
});

// Get space by slug
router.get('/spaces/:slug', requireAuth, (req, res) => {
    Community.getSpaceBySlug(req.params.slug, (err, space) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch space', details: err.message });
        }
        if (!space) {
            return res.status(404).json({ error: 'Space not found' });
        }

        // Check tier access
        const { checkTierAccess } = require('../middleware/requireTier');
        if (!checkTierAccess(req.user.membership_tier || 'core', space.required_tier)) {
            return res.status(403).json({ 
                error: 'Insufficient membership tier',
                requiredTier: space.required_tier
            });
        }

        res.json({ space });
    });
});

// Get posts in a space
router.get('/spaces/:slug/posts', requireAuth, (req, res) => {
    Community.getSpaceBySlug(req.params.slug, (err, space) => {
        if (err || !space) {
            return res.status(404).json({ error: 'Space not found' });
        }

        Community.getPostsBySpaceId(space.id, (err, posts) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to fetch posts', details: err.message });
            }
            res.json({ posts });
        });
    });
});

// Get single post with comments
router.get('/posts/:postId', requireAuth, (req, res) => {
    Community.getPostById(req.params.postId, (err, post) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch post', details: err.message });
        }
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json({ post });
    });
});

// Create a new post
router.post('/spaces/:slug/posts', requireAuth, (req, res) => {
    Community.getSpaceBySlug(req.params.slug, (err, space) => {
        if (err || !space) {
            return res.status(404).json({ error: 'Space not found' });
        }

        const postData = {
            space_id: space.id,
            user_id: req.user.id,
            title: req.body.title,
            content: req.body.content,
            is_pinned: 0
        };

        Community.createPost(postData, (err, postId) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to create post', details: err.message });
            }
            res.status(201).json({ message: 'Post created successfully', postId });
        });
    });
});

// Add comment to a post
router.post('/posts/:postId/comments', requireAuth, (req, res) => {
    const commentData = {
        post_id: req.params.postId,
        user_id: req.user.id,
        content: req.body.content,
        parent_comment_id: req.body.parent_comment_id || null
    };

    Community.createComment(commentData, (err, commentId) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to create comment', details: err.message });
        }
        res.status(201).json({ message: 'Comment added successfully', commentId });
    });
});

// Delete a post (author or admin only)
router.delete('/posts/:postId', requireAuth, (req, res) => {
    Community.getPostById(req.params.postId, (err, post) => {
        if (err || !post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Check if user is author or admin
        if (post.user_id !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'You can only delete your own posts' });
        }

        Community.deletePost(req.params.postId, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to delete post', details: err.message });
            }
            res.json({ message: 'Post deleted successfully' });
        });
    });
});

module.exports = router;
