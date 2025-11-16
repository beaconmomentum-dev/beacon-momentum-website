const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { validateRegister, validateLogin } = require('../middleware/validation');
const { logAuthAttempt, logRegistration, logSecurityError } = require('../utils/logger');

// Register new user
router.post('/register', validateRegister, async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        if (!User.isValidEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        if (!User.isValidPassword(password)) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 8 characters'
            });
        }

        // Create user
        const user = await User.create(email, password, firstName, lastName);

        // Log successful registration
        logRegistration(email, true, req.ip);

        // Create session
        req.session.userId = user.id;
        req.session.email = user.email;

        res.json({
            success: true,
            message: 'Registration successful',
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        });

    } catch (err) {
        console.error('Registration error:', err);
        
        if (err.message === 'Email already registered') {
            return res.status(409).json({
                success: false,
                message: 'Email already registered'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Registration failed. Please try again.'
        });
    }
});

// Login
router.post('/login', validateLogin, async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // Find user
        const user = await User.findByEmail(email);
        
        if (!user) {
            logAuthAttempt(email, false, req.ip, 'User not found');
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Verify password
        const isValid = await User.verifyPassword(password, user.password_hash);
        
        if (!isValid) {
            logAuthAttempt(email, false, req.ip, 'Invalid password');
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Check if account is active
        if (!user.is_active) {
            return res.status(403).json({
                success: false,
                message: 'Account is inactive. Please contact support.'
            });
        }

        // Log successful login
        logAuthAttempt(email, true, req.ip);

        // Update last login
        await User.updateLastLogin(user.id);

        // Create session
        req.session.userId = user.id;
        req.session.email = user.email;

        res.json({
            success: true,
            message: 'Login successful',
            user: {
                id: user.id,
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name
            }
        });

    } catch (err) {
        console.error('Registration error:', err);
        logRegistration(req.body.email, false, req.ip, err.message);
        logSecurityError(err, { route: '/register', email: req.body.email });
        res.status(500).json({
            success: false,
            message: err.message || 'Registration failed'
        });
    }
});

// Logout user
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
            return res.status(500).json({
                success: false,
                message: 'Logout failed'
            });
        }

        res.clearCookie('connect.sid');
        res.json({
            success: true,
            message: 'Logout successful'
        });
    });
});

// Check authentication status
router.get('/status', (req, res) => {
    if (req.session && req.session.userId) {
        res.json({
            authenticated: true,
            userId: req.session.userId,
            email: req.session.email
        });
    } else {
        res.json({
            authenticated: false
        });
    }
});

module.exports = router;
