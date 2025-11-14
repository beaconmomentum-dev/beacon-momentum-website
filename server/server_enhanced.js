const express = require('express');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Initialize enhanced database
require('./database/init_enhanced');

const app = express();
const PORT = process.env.PORT || 3000;

// Trust nginx proxy
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
    contentSecurityPolicy: false // Disable for now, can configure later
}));

// Rate limiting
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    message: 'Too many attempts, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
});

const registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 100,
    message: 'Too many registration attempts, please try again later',
});

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: 'Too many API requests, please slow down',
});

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
    store: new SQLiteStore({
        db: 'sessions.db',
        dir: path.join(__dirname, 'database')
    }),
    secret: process.env.SESSION_SECRET || 'beacon-momentum-secret-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Import routes
const authRoutes = require('./routes/auth_enhanced');
const adminRoutes = require('./routes/admin');
const progressRoutes = require('./routes/progress');
const communityRoutes = require('./routes/community');
const paymentsRoutes = require('./routes/payments');
const { requireAuth, attachUser, requireAdmin } = require('./middleware/auth');

// Attach user to all requests
app.use(attachUser);

// API routes with rate limiting
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', registerLimiter);
app.use('/api/auth', authRoutes);
app.use('/api/admin', requireAdmin, adminRoutes);
app.use('/api/progress', apiLimiter, progressRoutes);
app.use('/api/community', apiLimiter, communityRoutes);
app.use('/api/payments', apiLimiter, paymentsRoutes);

// Protect /members directory - MUST come before general static files
app.use('/members', requireAuth, (req, res, next) => {
    express.static(path.join(__dirname, '..', 'members'))(req, res, next);
});

// Serve auth pages
const authPages = [
    'login.html',
    'register.html',
    'verify-email.html',
    'resend-verification.html',
    'forgot-password.html',
    'reset-password.html'
];

authPages.forEach(page => {
    app.get(`/${page}`, (req, res) => {
        res.sendFile(path.join(__dirname, '..', page));
    });
});

// Serve protected member pages
const memberPages = [
    'member-dashboard.html',
    'my-progress.html',
    'community.html',
    'messages.html',
    'pricing.html'
];

memberPages.forEach(page => {
    app.get(`/${page}`, requireAuth, (req, res) => {
        res.sendFile(path.join(__dirname, '..', page));
    });
});

// Serve admin pages
app.get('/admin-dashboard.html', requireAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'admin-dashboard.html'));
});

// Serve public pages
const publicPages = [
    'privacy-policy.html',
    'terms-of-service.html'
];

publicPages.forEach(page => {
    app.get(`/${page}`, (req, res) => {
        res.sendFile(path.join(__dirname, '..', page));
    });
});

// Serve static files from parent directory (public files)
app.use(express.static(path.join(__dirname, '..')));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        version: '2.0.0',
        features: [
            'authentication',
            'email-verification',
            'password-reset',
            'payments',
            'progress-tracking',
            'community-forum',
            'direct-messaging',
            'admin-panel'
        ]
    });
});

// System status endpoint (for monitoring)
app.get('/api/system/status', requireAdmin, (req, res) => {
    const os = require('os');
    res.json({
        success: true,
        system: {
            uptime: process.uptime(),
            memory: {
                total: os.totalmem(),
                free: os.freemem(),
                used: os.totalmem() - os.freemem()
            },
            cpu: os.cpus(),
            platform: os.platform(),
            nodeVersion: process.version
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

// Start server
const server = app.listen(PORT, () => {
    console.log('='.repeat(60));
    console.log('🚀 Beacon Momentum Platform Server');
    console.log('='.repeat(60));
    console.log(`Port: ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Time: ${new Date().toISOString()}`);
    console.log('='.repeat(60));
    console.log('Features Enabled:');
    console.log('  ✓ Authentication & Authorization');
    console.log('  ✓ Email Verification');
    console.log('  ✓ Password Reset');
    console.log('  ✓ Stripe Payments');
    console.log('  ✓ Progress Tracking');
    console.log('  ✓ Community Forum');
    console.log('  ✓ Direct Messaging');
    console.log('  ✓ Admin Panel');
    console.log('  ✓ Analytics Dashboard');
    console.log('='.repeat(60));
});

module.exports = app;
