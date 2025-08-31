const express = require('express');
const { body } = require('express-validator');
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
        .withMessage('Last name must be at least 2 characters')
];

const loginValidation = [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').notEmpty().withMessage('Password is required')
];

// Routes
router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);
router.get('/profile', authMiddleware, authController.getProfile);

module.exports = router;
