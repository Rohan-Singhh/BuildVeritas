const express = require('express');
const router = express.Router();
const budgetEstimateController = require('../controllers/budget.estimate.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { body } = require('express-validator');

// Validation middleware
const validateEstimateRequest = [
    body('project_name').notEmpty().trim().withMessage('Project name is required'),
    body('project_type').notEmpty().isIn([
        'residential',
        'commercial',
        'industrial',
        'landscaping',
        'renovation',
        'interior'
    ]).withMessage('Invalid project type'),
    body('location.city').notEmpty().trim().withMessage('City is required'),
    body('location.state').notEmpty().trim().withMessage('State is required'),
    body('general.area_sqm').isNumeric().withMessage('Area must be a number'),
    body('general.timeline_months').isNumeric().withMessage('Timeline must be a number'),
    body('general.budget_range.min').isNumeric().withMessage('Minimum budget must be a number'),
    body('general.budget_range.max').isNumeric().withMessage('Maximum budget must be a number'),
    body('general.current_role').isIn(['client', 'contractor', 'architect', 'consultant'])
        .withMessage('Invalid role'),
    body('quality_option').isIn(['basic', 'standard', 'premium', 'luxury'])
        .withMessage('Invalid quality option'),
    body('cost_breakdown_preferences').isArray().withMessage('Cost breakdown preferences must be an array')
];

// All routes require authentication
router.use(authMiddleware);

// Create new estimate
router.post('/',
    validateEstimateRequest,
    budgetEstimateController.createEstimate
);

// Get specific estimate
router.get('/:id',
    budgetEstimateController.getEstimate
);

// Get all estimates for user
router.get('/',
    budgetEstimateController.getUserEstimates
);

module.exports = router;
