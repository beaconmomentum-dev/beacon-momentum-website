const bcrypt = require('bcrypt');
const db = require('../database/init');

class User {
    // Create a new user
    static async create({ email, password, firstName, lastName, isVerified = false }) {
        const passwordHash = await bcrypt.hash(password, 12);
        
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO users (email, password_hash, first_name, last_name, is_verified) VALUES (?, ?, ?, ?, ?)`,
                [email, passwordHash, firstName, lastName, isVerified ? 1 : 0],
                function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(this.lastID);
                    }
                }
            );
        });
    }

    // Find user by email
    static async findByEmail(email) {
        return new Promise((resolve, reject) => {
            db.get(
                'SELECT * FROM users WHERE email = ?',
                [email],
                (err, row) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(row);
                    }
                }
            );
        });
    }

    // Find user by ID
    static async findById(id) {
        return new Promise((resolve, reject) => {
            db.get(
                'SELECT * FROM users WHERE id = ?',
                [id],
                (err, row) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(row);
                    }
                }
            );
        });
    }

    // Verify password
    static async verifyPassword(password, hash) {
        return await bcrypt.compare(password, hash);
    }

    // Update password
    static async updatePassword(userId, newPassword) {
        const passwordHash = await bcrypt.hash(newPassword, 12);
        
        return new Promise((resolve, reject) => {
            db.run(
                'UPDATE users SET password_hash = ? WHERE id = ?',
                [passwordHash, userId],
                function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(this.changes > 0);
                    }
                }
            );
        });
    }

    // Update last login timestamp
    static async updateLastLogin(userId) {
        return new Promise((resolve, reject) => {
            db.run(
                `UPDATE users SET last_login = datetime('now') WHERE id = ?`,
                [userId],
                function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(this.changes > 0);
                    }
                }
            );
        });
    }

    // Update subscription
    static async updateSubscription(userId, tier, status, expiresAt = null) {
        return new Promise((resolve, reject) => {
            db.run(
                `UPDATE users SET subscription_tier = ?, subscription_status = ?, subscription_expires_at = ? WHERE id = ?`,
                [tier, status, expiresAt, userId],
                function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(this.changes > 0);
                    }
                }
            );
        });
    }

    // Update Stripe customer ID
    static async updateStripeCustomerId(userId, stripeCustomerId) {
        return new Promise((resolve, reject) => {
            db.run(
                `UPDATE users SET stripe_customer_id = ? WHERE id = ?`,
                [stripeCustomerId, userId],
                function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(this.changes > 0);
                    }
                }
            );
        });
    }

    // Get all users (for admin)
    static async getAll(limit = 100, offset = 0) {
        return new Promise((resolve, reject) => {
            db.all(
                `SELECT id, email, first_name, last_name, is_active, is_verified, 
                        subscription_tier, subscription_status, created_at, last_login 
                 FROM users 
                 ORDER BY created_at DESC 
                 LIMIT ? OFFSET ?`,
                [limit, offset],
                (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                }
            );
        });
    }

    // Get user count (for admin)
    static async getCount() {
        return new Promise((resolve, reject) => {
            db.get(
                'SELECT COUNT(*) as count FROM users',
                (err, row) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(row.count);
                    }
                }
            );
        });
    }

    // Validation helpers
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static isValidPassword(password) {
        return password && password.length >= 8;
    }
}

module.exports = User;
