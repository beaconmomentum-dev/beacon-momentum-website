const { body, param, query, validationResult } = require('express-validator');

/**
 * Validation Middleware
 * Provides input validation for API routes
 */

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            success: false,
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });
    }
    next();
};

// Authentication validation rules
const validateRegister = [
    body('email')
        .isEmail()
        .withMessage('Must be a valid email address')
        .normalizeEmail()
        .isLength({ max: 255 })
        .withMessage('Email must not exceed 255 characters'),
    body('password')
        .isLength({ min: 12 })
        .withMessage('Password must be at least 12 characters long')
        .matches(/[a-z]/)
        .withMessage('Password must contain at least one lowercase letter')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one uppercase letter')
        .matches(/[0-9]/)
        .withMessage('Password must contain at least one number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage('Password must contain at least one special character'),
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Name must be between 2 and 100 characters')
        .matches(/^[a-zA-Z\s'-]+$/)
        .withMessage('Name can only contain letters, spaces, hyphens, and apostrophes'),
    handleValidationErrors
];

const validateLogin = [
    body('email')
        .isEmail()
        .withMessage('Must be a valid email address')
        .normalizeEmail(),
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
    handleValidationErrors
];

// Community validation rules
const validateCreatePost = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 5, max: 200 })
        .withMessage('Title must be between 5 and 200 characters'),
    body('content')
        .trim()
        .notEmpty()
        .withMessage('Content is required')
        .isLength({ min: 10, max: 10000 })
        .withMessage('Content must be between 10 and 10,000 characters'),
    handleValidationErrors
];

const validateCreateComment = [
    body('content')
        .trim()
        .notEmpty()
        .withMessage('Comment content is required')
        .isLength({ min: 1, max: 2000 })
        .withMessage('Comment must be between 1 and 2,000 characters'),
    param('postId')
        .isInt({ min: 1 })
        .withMessage('Invalid post ID'),
    handleValidationErrors
];

// Event validation rules
const validateEventRegistration = [
    param('eventId')
        .isInt({ min: 1 })
        .withMessage('Invalid event ID'),
    handleValidationErrors
];

// Course validation rules
const validateLessonCompletion = [
    param('lessonId')
        .isInt({ min: 1 })
        .withMessage('Invalid lesson ID'),
    handleValidationErrors
];

// Generic ID validation
const validateId = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('Invalid ID'),
    handleValidationErrors
];

const validateSlug = [
    param('slug')
        .trim()
        .notEmpty()
        .withMessage('Slug is required')
        .matches(/^[a-z0-9-]+$/)
        .withMessage('Slug can only contain lowercase letters, numbers, and hyphens'),
    handleValidationErrors
];

module.exports = {
    validateRegister,
    validateLogin,
    validateCreatePost,
    validateCreateComment,
    validateEventRegistration,
    validateLessonCompletion,
    validateId,
    validateSlug,
    handleValidationErrors
};
