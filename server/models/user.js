const bcrypt = require('bcrypt');
const db = require('../database/init');

const SALT_ROUNDS = 12;

class User {
    // Create new user
    static async create(email, password, firstName, lastName) {
        return new Promise((resolve, reject) => {
            // Hash password
            bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
                if (err) {
                    return reject(err);
                }

                // Insert user
                const sql = `
                    INSERT INTO users (email, password_hash, first_name, last_name)
                    VALUES (?, ?, ?, ?)
                `;
                
                db.run(sql, [email, hash, firstName, lastName], function(err) {
                    if (err) {
                        if (err.message.includes('UNIQUE constraint failed')) {
                            return reject(new Error('Email already registered'));
                        }
                        return reject(err);
                    }
                    
                    resolve({
                        id: this.lastID,
                        email,
                        firstName,
                        lastName
                    });
                });
            });
        });
    }

    // Find user by email
    static async findByEmail(email) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM users WHERE email = ?';
            
            db.get(sql, [email], (err, row) => {
                if (err) {
                    return reject(err);
                }
                resolve(row);
            });
        });
    }

    // Find user by ID
    static async findById(id) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT id, email, first_name, last_name, created_at, last_login FROM users WHERE id = ?';
            
            db.get(sql, [id], (err, row) => {
                if (err) {
                    return reject(err);
                }
                resolve(row);
            });
        });
    }

    // Verify password
    static async verifyPassword(plainPassword, hash) {
        return bcrypt.compare(plainPassword, hash);
    }

    // Update last login
    static async updateLastLogin(userId) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?';
            
            db.run(sql, [userId], (err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }

    // Validate email format
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validate password strength
    static isValidPassword(password) {
        // Minimum 8 characters
        return password && password.length >= 8;
    }
}

module.exports = User;
