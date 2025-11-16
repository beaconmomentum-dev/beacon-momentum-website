const express = require('express');
const router = express.Router();
const User = require('../models/user');
const emailService = require('../services/email');
const tokenManager = require('../utils/tokens');

// Register new user with email verification
router.post('/register', async (req, res) => {
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

        // Check if user already exists
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'Email already registered'
            });
        }

        // Create user (unverified)
        const user = await User.create(email, password, firstName, lastName);
        const userId = user.id;

        // Generate verification token
        const { token } = await tokenManager.createVerificationToken(userId);

        // Send verification email
        const emailResult = await emailService.sendVerificationEmail(email, token, firstName || 'Member');

        if (!emailResult.success) {
            console.error('Failed to send verification email:', emailResult.error);
            // Still return success for user creation, but log the email error
        }

        res.json({
            success: true,
            message: 'Registration successful! Please check your email to verify your account.',
            requiresVerification: true,
            user: {
                id: userId,
                email,
                firstName,
                lastName
            }
        });

    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({
            success: false,
            message: 'Registration failed. Please try again.'
        });
    }
});

// Verify email
router.get('/verify-email', async (req, res) => {
    try {
        const { token } = req.query;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'Verification token is required'
            });
        }

        // Verify token
        const tokenData = await tokenManager.verifyEmailToken(token);

        if (!tokenData) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired verification token'
            });
        }

        // Mark user as verified
        await tokenManager.markUserVerified(tokenData.user_id);
        await tokenManager.markVerificationTokenUsed(token);

        // Send welcome email
        await emailService.sendWelcomeEmail(tokenData.email, tokenData.first_name || 'Member');

        res.json({
            success: true,
            message: 'Email verified successfully! You can now log in.',
            email: tokenData.email
        });

    } catch (err) {
        console.error('Email verification error:', err);
        res.status(500).json({
            success: false,
            message: 'Verification failed. Please try again.'
        });
    }
});

// Resend verification email
router.post('/resend-verification', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        // Find user
        const user = await User.findByEmail(email);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (user.is_verified) {
            return res.status(400).json({
                success: false,
                message: 'Email is already verified'
            });
        }

        // Generate new verification token
        const { token } = await tokenManager.createVerificationToken(user.id);

        // Send verification email
        await emailService.sendVerificationEmail(email, token, user.first_name || 'Member');

        res.json({
            success: true,
            message: 'Verification email sent! Please check your inbox.'
        });

    } catch (err) {
        console.error('Resend verification error:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to resend verification email. Please try again.'
        });
    }
});

// Login user (with verification check)
router.post('/login', async (req, res) => {
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
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Verify password
        const isValid = await User.verifyPassword(password, user.password_hash);
        
        if (!isValid) {
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

        // Check if email is verified
        if (!user.is_verified) {
            return res.status(403).json({
                success: false,
                message: 'Please verify your email before logging in.',
                requiresVerification: true
            });
        }

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
                lastName: user.last_name,
                subscriptionTier: user.subscription_tier
            }
        });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({
            success: false,
            message: 'Login failed. Please try again.'
        });
    }
});

// Request password reset
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        // Find user
        const user = await User.findByEmail(email);

        // Always return success to prevent email enumeration
        if (!user) {
            return res.json({
                success: true,
                message: 'If that email exists, a password reset link has been sent.'
            });
        }

        // Generate reset token
        const { token } = await tokenManager.createPasswordResetToken(user.id);

        // Send reset email
        await emailService.sendPasswordResetEmail(email, token, user.first_name || 'Member');

        res.json({
            success: true,
            message: 'If that email exists, a password reset link has been sent.'
        });

    } catch (err) {
        console.error('Forgot password error:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to process request. Please try again.'
        });
    }
});

// Reset password
router.post('/reset-password', async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Token and new password are required'
            });
        }

        if (!User.isValidPassword(newPassword)) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 8 characters'
            });
        }

        // Verify token
        const tokenData = await tokenManager.verifyPasswordResetToken(token);

        if (!tokenData) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired reset token'
            });
        }

        // Update password
        await User.updatePassword(tokenData.user_id, newPassword);
        await tokenManager.markPasswordResetTokenUsed(token);

        res.json({
            success: true,
            message: 'Password reset successfully! You can now log in with your new password.'
        });

    } catch (err) {
        console.error('Reset password error:', err);
        res.status(500).json({
            success: false,
            message: 'Password reset failed. Please try again.'
        });
    }
});

// Logout user
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Logout failed'
            });
        }
        res.json({
            success: true,
            message: 'Logged out successfully'
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
