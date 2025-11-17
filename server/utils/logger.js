const winston = require('winston');
const path = require('path');

/**
 * Security Logger
 * Logs authentication attempts, errors, and security events
 */

// Create logs directory if it doesn't exist
const fs = require('fs');
const logsDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

// Configure Winston logger
const securityLogger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
    ),
    defaultMeta: { service: 'beacon-auth' },
    transports: [
        // Write all security events to security.log
        new winston.transports.File({ 
            filename: path.join(logsDir, 'security.log'),
            maxsize: 10485760, // 10MB
            maxFiles: 5,
            tailable: true
        }),
        // Write errors to error.log
        new winston.transports.File({ 
            filename: path.join(logsDir, 'error.log'),
            level: 'error',
            maxsize: 10485760, // 10MB
            maxFiles: 5,
            tailable: true
        })
    ]
});

// If not in production, also log to console
if (process.env.NODE_ENV !== 'production') {
    securityLogger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }));
}

// Helper functions for common security events
const logAuthAttempt = (email, success, ip, reason = null) => {
    securityLogger.info({
        event: 'auth_attempt',
        email,
        success,
        ip,
        reason,
        timestamp: new Date().toISOString()
    });
};

const logRegistration = (email, success, ip, reason = null) => {
    securityLogger.info({
        event: 'registration',
        email,
        success,
        ip,
        reason,
        timestamp: new Date().toISOString()
    });
};

const logPasswordChange = (userId, email, ip) => {
    securityLogger.info({
        event: 'password_change',
        userId,
        email,
        ip,
        timestamp: new Date().toISOString()
    });
};

const logSuspiciousActivity = (description, userId, ip, details = {}) => {
    securityLogger.warn({
        event: 'suspicious_activity',
        description,
        userId,
        ip,
        details,
        timestamp: new Date().toISOString()
    });
};

const logSecurityError = (error, context = {}) => {
    securityLogger.error({
        event: 'security_error',
        error: error.message,
        stack: error.stack,
        context,
        timestamp: new Date().toISOString()
    });
};

const logAdminAction = (userId, email, action, details = {}) => {
    securityLogger.info({
        event: 'admin_action',
        userId,
        email,
        action,
        details,
        timestamp: new Date().toISOString()
    });
};

module.exports = {
    securityLogger,
    logAuthAttempt,
    logRegistration,
    logPasswordChange,
    logSuspiciousActivity,
    logSecurityError,
    logAdminAction
};
