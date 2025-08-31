const express = require('express');
const { body, query, param } = require('express-validator');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Validation middleware
const registerValidation = [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/\d/)
        .withMessage('Password must contain a number'),
    body('firstName').notEmpty().withMessage('First name is required')
        .trim()
        .isLength({ min: 2 })
        .withMessage('First name must be at least 2 characters'),
    body('lastName').notEmpty().withMessage('Last name is required')
        .trim()
        .isLength({ min: 2 })
        .withMessage('Last name must be at least 2 characters'),
    body('role').optional().isIn(['admin', 'client']).withMessage('Invalid role')
];

const loginValidation = [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').notEmpty().withMessage('Password is required')
];

const paginationValidation = [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
];

const userIdValidation = [
    param('userId').notEmpty().withMessage('User ID is required')
        .isMongoId().withMessage('Invalid user ID format')
];

// Routes
router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);
router.get('/profile', authMiddleware, authController.getProfile);
router.get('/users', authMiddleware, paginationValidation, authController.getAllUsers);
router.post('/make-admin', authMiddleware, 
    body('email').isEmail().withMessage('Please enter a valid email'),
    authController.makeUserAdmin
);
router.delete('/users/:userId', authMiddleware, userIdValidation, authController.deleteUser);

module.exports = router;