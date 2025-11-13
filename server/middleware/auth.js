// Middleware to check if user is authenticated
function requireAuth(req, res, next) {
    if (req.session && req.session.userId) {
        // User is authenticated
        next();
    } else {
        // User is not authenticated
        if (req.path.startsWith('/api/')) {
            // API request - return JSON error
            res.status(401).json({ 
                success: false, 
                message: 'Authentication required' 
            });
        } else {
            // Page request - redirect to login
            const redirectUrl = encodeURIComponent(req.originalUrl);
            res.redirect(`/login.html?redirect=${redirectUrl}`);
        }
    }
}

// Middleware to check if user is already authenticated
function redirectIfAuth(req, res, next) {
    if (req.session && req.session.userId) {
        // User is already logged in, redirect to dashboard
        res.redirect('/member-dashboard.html');
    } else {
        next();
    }
}

// Middleware to attach user info to request
async function attachUser(req, res, next) {
    if (req.session && req.session.userId) {
        try {
            const User = require('../models/user');
            const user = await User.findById(req.session.userId);
            req.user = user;
        } catch (err) {
            console.error('Error attaching user:', err);
        }
    }
    next();
}

module.exports = {
    requireAuth,
    redirectIfAuth,
    attachUser
};
