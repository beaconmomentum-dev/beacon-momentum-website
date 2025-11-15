const express = require('express');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Initialize database
require('./database/init');

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
    max: 5, // 5 requests per window
    message: 'Too many attempts, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
});

const registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 100, // Temporarily increased for testing
    message: 'Too many registration attempts, please try again later',
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
        secure: 'auto', // Auto-detect HTTPS (works with Cloudflare proxy)
        httpOnly: true, // Prevent XSS
        sameSite: 'lax', // CSRF protection (lax works better with Cloudflare proxy)
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Import routes
const authRoutes = require('./routes/auth');
const { requireAuth, attachUser } = require('./middleware/auth');

// Attach user to all requests
app.use(attachUser);

// API routes
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', registerLimiter);
app.use('/api/auth', authRoutes);

// Protect /members directory - MUST come before general static files
app.use('/members', requireAuth, (req, res, next) => {
    // Serve static files from members directory
    express.static(path.join(__dirname, '..', 'members'))(req, res, next);
});

// Serve auth pages
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'login.html'));
});

app.get('/register.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'register.html'));
});

app.get('/member-dashboard.html', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'member-dashboard.html'));
});

// Serve static files from parent directory (public files)
app.use(express.static(path.join(__dirname, '..')));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Beacon Momentum Auth Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
