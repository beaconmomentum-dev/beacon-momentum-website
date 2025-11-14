const crypto = require('crypto');
const db = require('../database/init');

class TokenManager {
    // Generate a secure random token
    generateToken() {
        return crypto.randomBytes(32).toString('hex');
    }

    // Create email verification token
    async createVerificationToken(userId) {
        return new Promise((resolve, reject) => {
            const token = this.generateToken();
            const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

            db.run(
                `INSERT INTO verification_tokens (user_id, token, expires_at) VALUES (?, ?, ?)`,
                [userId, token, expiresAt.toISOString()],
                function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ token, expiresAt });
                    }
                }
            );
        });
    }

    // Verify email verification token
    async verifyEmailToken(token) {
        return new Promise((resolve, reject) => {
            db.get(
                `SELECT vt.*, u.email, u.first_name 
                 FROM verification_tokens vt
                 JOIN users u ON vt.user_id = u.id
                 WHERE vt.token = ? AND vt.used = 0 AND vt.expires_at > datetime('now')`,
                [token],
                (err, row) => {
                    if (err) {
                        reject(err);
                    } else if (!row) {
                        resolve(null);
                    } else {
                        resolve(row);
                    }
                }
            );
        });
    }

    // Mark verification token as used
    async markVerificationTokenUsed(token) {
        return new Promise((resolve, reject) => {
            db.run(
                `UPDATE verification_tokens SET used = 1 WHERE token = ?`,
                [token],
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

    // Mark user as verified
    async markUserVerified(userId) {
        return new Promise((resolve, reject) => {
            db.run(
                `UPDATE users SET is_verified = 1, verified_at = datetime('now') WHERE id = ?`,
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

    // Create password reset token
    async createPasswordResetToken(userId) {
        return new Promise((resolve, reject) => {
            const token = this.generateToken();
            const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

            db.run(
                `INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES (?, ?, ?)`,
                [userId, token, expiresAt.toISOString()],
                function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ token, expiresAt });
                    }
                }
            );
        });
    }

    // Verify password reset token
    async verifyPasswordResetToken(token) {
        return new Promise((resolve, reject) => {
            db.get(
                `SELECT prt.*, u.email, u.first_name 
                 FROM password_reset_tokens prt
                 JOIN users u ON prt.user_id = u.id
                 WHERE prt.token = ? AND prt.used = 0 AND prt.expires_at > datetime('now')`,
                [token],
                (err, row) => {
                    if (err) {
                        reject(err);
                    } else if (!row) {
                        resolve(null);
                    } else {
                        resolve(row);
                    }
                }
            );
        });
    }

    // Mark password reset token as used
    async markPasswordResetTokenUsed(token) {
        return new Promise((resolve, reject) => {
            db.run(
                `UPDATE password_reset_tokens SET used = 1 WHERE token = ?`,
                [token],
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

    // Clean up expired tokens (run periodically)
    async cleanupExpiredTokens() {
        return new Promise((resolve, reject) => {
            db.run(
                `DELETE FROM verification_tokens WHERE expires_at < datetime('now')`,
                (err) => {
                    if (err) {
                        console.error('Error cleaning verification tokens:', err);
                    }
                }
            );

            db.run(
                `DELETE FROM password_reset_tokens WHERE expires_at < datetime('now')`,
                (err) => {
                    if (err) {
                        console.error('Error cleaning reset tokens:', err);
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            );
        });
    }
}

module.exports = new TokenManager();
