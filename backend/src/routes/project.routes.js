const express = require('express');
const { body, query } = require('express-validator');
const projectController = require('../controllers/project.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleAuth = require('../middleware/roleAuth.middleware');

const router = express.Router();

// Simplified validation middleware - only essential fields
const createProjectValidation = [
    body('title')
        .trim()
        .isLength({ min: 5, max: 100 })
        .withMessage('Title must be between 5 and 100 characters'),
    body('description')
        .trim()
        .isLength({ min: 20 })
        .withMessage('Description must be at least 20 characters'),
    body('budget')
        .isNumeric()
        .withMessage('Budget must be a number')
        .custom(value => value > 0)
        .withMessage('Budget must be positive'),
    body('location')
        .trim()
        .notEmpty()
        .withMessage('Location is required'),
    body('projectType')
        .isIn(['residential', 'commercial', 'industrial', 'infrastructure'])
        .withMessage('Invalid project type'),
    body('area')
        .isNumeric()
        .withMessage('Area must be a number')
        .custom(value => value > 0)
        .withMessage('Area must be positive'),
    body('startDate')
        .isISO8601()
        .withMessage('Invalid start date format')
        .custom(value => new Date(value) >= new Date())
        .withMessage('Start date cannot be in the past'),
    body('duration')
        .isInt({ min: 1 })
        .withMessage('Duration must be at least 1')
];

const searchValidation = [
    query('page').optional().isInt({ min: 1 }).withMessage('Invalid page number'),
    query('limit').optional().isInt({ min: 1 }).withMessage('Invalid limit'),
    query('status').optional().isIn([
        'DRAFT', 'OPEN', 'IN_REVIEW', 'IN_PROGRESS', 'ON_HOLD', 'COMPLETED', 'CANCELLED'
    ]).withMessage('Invalid status'),
    query('projectType').optional().isIn([
        'residential', 'commercial', 'industrial', 'infrastructure'
    ]).withMessage('Invalid project type')
];

// Routes
router.use(authMiddleware); // All routes require authentication

// Project Creation and Management
router.post(
    '/create-and-publish',
    roleAuth.clientOnly,
    createProjectValidation,
    projectController.createAndPublish
);

router.put(
    '/:projectId',
    roleAuth.clientOnly,
    createProjectValidation,
    projectController.updateProject
);

router.delete(
    '/:projectId',
    roleAuth.clientOnly,
    projectController.deleteProject
);

// Project Retrieval
router.get(
    '/search',
    searchValidation,
    projectController.searchProjects
);

router.get(
    '/:projectId',
    projectController.getProject
);

router.get(
    '/client/projects',
    roleAuth.clientOnly,
    projectController.getClientProjects
);

// Vendor Matching
router.get(
    '/:projectId/vendors',
    roleAuth.clientOnly,
    projectController.getMatchingVendors
);

module.exports = router;
