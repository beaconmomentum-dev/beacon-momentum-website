const db = require('../database/init');

class Community {
    // Get all community spaces
    static getAllSpaces(callback) {
        const sql = 'SELECT * FROM community_spaces ORDER BY created_at DESC';
        db.all(sql, [], callback);
    }

    // Get space by slug
    static getSpaceBySlug(slug, callback) {
        const sql = 'SELECT * FROM community_spaces WHERE slug = ?';
        db.get(sql, [slug], callback);
    }

    // Get posts by space ID with user information
    static getPostsBySpaceId(spaceId, callback) {
        const sql = `
            SELECT p.*, u.name as author_name, u.email as author_email
            FROM community_posts p
            JOIN users u ON p.user_id = u.id
            WHERE p.space_id = ?
            ORDER BY p.is_pinned DESC, p.created_at DESC
        `;
        db.all(sql, [spaceId], callback);
    }

    // Get single post by ID with comments
    static getPostById(postId, callback) {
        const sql = `
            SELECT p.*, u.name as author_name, u.email as author_email
            FROM community_posts p
            JOIN users u ON p.user_id = u.id
            WHERE p.id = ?
        `;
        
        db.get(sql, [postId], (err, post) => {
            if (err) return callback(err);
            if (!post) return callback(null, null);
            
            // Get comments for this post
            this.getCommentsByPostId(postId, (err, comments) => {
                if (err) return callback(err);
                post.comments = comments;
                callback(null, post);
            });
        });
    }

    // Get comments by post ID
    static getCommentsByPostId(postId, callback) {
        const sql = `
            SELECT c.*, u.name as author_name, u.email as author_email
            FROM community_comments c
            JOIN users u ON c.user_id = u.id
            WHERE c.post_id = ?
            ORDER BY c.created_at ASC
        `;
        db.all(sql, [postId], callback);
    }

    // Create a new post
    static createPost(data, callback) {
        const sql = `
            INSERT INTO community_posts (space_id, user_id, title, content, is_pinned)
            VALUES (?, ?, ?, ?, ?)
        `;
        db.run(sql, [
            data.space_id,
            data.user_id,
            data.title,
            data.content,
            data.is_pinned || 0
        ], function(err) {
            callback(err, this ? this.lastID : null);
        });
    }

    // Create a new comment
    static createComment(data, callback) {
        const sql = `
            INSERT INTO community_comments (post_id, user_id, parent_comment_id, content)
            VALUES (?, ?, ?, ?)
        `;
        db.run(sql, [
            data.post_id,
            data.user_id,
            data.parent_comment_id || null,
            data.content
        ], function(err) {
            callback(err, this ? this.lastID : null);
        });
    }

    // Create a new space (admin only)
    static createSpace(data, callback) {
        const sql = `
            INSERT INTO community_spaces (slug, title, description, required_tier)
            VALUES (?, ?, ?, ?)
        `;
        db.run(sql, [data.slug, data.title, data.description, data.required_tier], function(err) {
            callback(err, this ? this.lastID : null);
        });
    }

    // Delete a post (author or admin only)
    static deletePost(postId, callback) {
        const sql = 'DELETE FROM community_posts WHERE id = ?';
        db.run(sql, [postId], callback);
    }

    // Delete a comment (author or admin only)
    static deleteComment(commentId, callback) {
        const sql = 'DELETE FROM community_comments WHERE id = ?';
        db.run(sql, [commentId], callback);
    }
}

module.exports = Community;
