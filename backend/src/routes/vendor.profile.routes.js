const express = require('express');
const { body, query } = require('express-validator');
const vendorProfileController = require('../controllers/vendor.profile.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleAuth = require('../middleware/roleAuth.middleware');

const router = express.Router();

// Validation middleware
const createProfileValidation = [
    body('companyName').trim().notEmpty().withMessage('Company name is required'),
    body('location.address').trim().notEmpty().withMessage('Address is required'),
    body('location.city').trim().notEmpty().withMessage('City is required'),
    body('location.state').trim().notEmpty().withMessage('State is required'),
    body('location.pincode')
        .matches(/^[1-9][0-9]{5}$/)
        .withMessage('Please enter a valid 6-digit pincode'),
    body('contactInfo.email').isEmail().withMessage('Please enter a valid email'),
    body('contactInfo.phone')
        .matches(/^[0-9]{10}$/)
        .withMessage('Please enter a valid 10-digit phone number'),
    body('experience.yearsInBusiness')
        .isInt({ min: 0 })
        .withMessage('Years of experience must be a positive number'),
    body('experience.totalProjects')
        .isInt({ min: 0 })
        .withMessage('Total projects must be a positive number'),
    body('companyLogo').trim().notEmpty().withMessage('Company logo is required'),
    body('companyPhotos').isArray().withMessage('Company photos must be an array'),
    body('services').isArray().withMessage('Services must be an array'),
];

const searchValidation = [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
    query('minExperience').optional().isInt({ min: 0 }).withMessage('Min experience must be a positive number'),
    query('minRating').optional().isFloat({ min: 0, max: 5 }).withMessage('Min rating must be between 0 and 5'),
];

// Routes
router.post(
    '/create',
    authMiddleware,
    roleAuth.vendorOnly,
    createProfileValidation,
    vendorProfileController.createProfile
);

router.put(
    '/update',
    authMiddleware,
    roleAuth.vendorOnly,
    createProfileValidation,
    vendorProfileController.updateProfile
);

// Get own profile
router.get(
    '/profile',
    authMiddleware,
    roleAuth.vendorOnly,
    vendorProfileController.getOwnProfile
);

// Get specific profile by ID
router.get(
    '/profile/:id',
    authMiddleware,
    vendorProfileController.getProfile
);

router.get(
    '/all',
    authMiddleware,
    roleAuth.clientAndConstruction,
    vendorProfileController.getAllVendors
);

router.get(
    '/search',
    authMiddleware,
    roleAuth.clientAndConstruction,
    searchValidation,
    vendorProfileController.searchVendors
);

// Delete profile (hard delete)
router.delete(
    '/delete',
    authMiddleware,
    roleAuth.vendorOnly,
    vendorProfileController.deleteProfile
);

// Deactivate profile (soft delete)
router.put(
    '/deactivate',
    authMiddleware,
    roleAuth.vendorOnly,
    vendorProfileController.softDeleteProfile
);

module.exports = router;