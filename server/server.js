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
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "https://cdn.tailwindcss.com", "https://cdnjs.cloudflare.com", "'unsafe-inline'"],
            styleSrc: ["'self'", "https://cdn.tailwindcss.com", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com", "'unsafe-inline'"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"],
            frameSrc: ["'none'"],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: []
        }
    },
    strictTransportSecurity: {
        maxAge: 31536000, // 1 year
        includeSubDomains: true,
        preload: true
    },
    frameguard: { action: 'deny' },
    noSniff: true,
    xssFilter: true
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
const membershipRoutes = require('./routes/membership');
const stripeWebhookRoutes = require('./routes/stripe_webhook');
const ghlWebhookRoutes = require('./routes/ghl_webhook');
const coursesRoutes = require('./routes/courses_routes');
const communityRoutes = require('./routes/community_routes');
const eventsRoutes = require('./routes/events_routes');
const progressRoutes = require('./routes/progress_routes');
const resourcesRoutes = require('./routes/resources_routes');
const { requireAuth, attachUser } = require('./middleware/auth');
const { requireMembership, requireRole } = require('./middleware/membership');

// Attach user to all requests
app.use(attachUser);

// API routes
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', registerLimiter);
app.use('/api/auth', authRoutes);
app.use('/api/membership', membershipRoutes);
app.use('/api/stripe', stripeWebhookRoutes);
app.use('/api/ghl', ghlWebhookRoutes);

// Course module routes
app.use('/api/courses', coursesRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/resources', resourcesRoutes);

// Protect content directories - MUST come before general static files

// Capital Suite - Requires capital_suite or all_access membership
app.use('/capital-suite', requireAuth, requireMembership('capital_suite'), (req, res, next) => {
    express.static(path.join(__dirname, '..', 'capital-suite'))(req, res, next);
});

// Solopreneur Launchpad - Requires solopreneur_launchpad or all_access membership
app.use('/solopreneur-launchpad', requireAuth, requireMembership('solopreneur_launchpad'), (req, res, next) => {
    express.static(path.join(__dirname, '..', 'solopreneur-launchpad'))(req, res, next);
});

// Rise & Reclaim - Requires rise_reclaim or all_access membership
app.use('/rise-reclaim', requireAuth, requireMembership('rise_reclaim'), (req, res, next) => {
    express.static(path.join(__dirname, '..', 'rise-reclaim'))(req, res, next);
});

// All Access - Requires all_access membership or founding_member role
app.use('/all-access', requireAuth, requireRole('founding_member'), (req, res, next) => {
    express.static(path.join(__dirname, '..', 'all-access'))(req, res, next);
});

// Legacy /members directory - Requires authentication only
app.use('/members', requireAuth, (req, res, next) => {
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
