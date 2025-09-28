const express = require('express');
const { body, query } = require('express-validator');
const bidController = require('../controllers/bid.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleAuth = require('../middleware/roleAuth.middleware');

const router = express.Router();

// Validation middleware
const createBidValidation = [
    body('proposedCost.total')
        .isNumeric()
        .withMessage('Total cost must be a number')
        .custom(value => value > 0)
        .withMessage('Total cost must be positive'),
    body('timeline.proposedStartDate')
        .isISO8601()
        .withMessage('Invalid start date format')
        .custom(value => new Date(value) >= new Date())
        .withMessage('Start date cannot be in the past'),
    body('timeline.estimatedDuration.value')
        .isInt({ min: 1 })
        .withMessage('Duration must be at least 1'),
    body('timeline.milestones')
        .isArray()
        .withMessage('Milestones must be an array')
        .custom(milestones => {
            const totalPercentage = milestones.reduce(
                (sum, m) => sum + (m.paymentPercentage || 0), 0
            );
            return totalPercentage === 100;
        })
        .withMessage('Milestone payment percentages must total 100%'),
    body('proposal.summary')
        .trim()
        .isLength({ min: 100 })
        .withMessage('Proposal summary must be at least 100 characters'),
    body('proposal.approach')
        .trim()
        .notEmpty()
        .withMessage('Project approach is required'),
    body('team.composition')
        .isArray({ min: 1 })
        .withMessage('At least one team member is required'),
    body('team.composition.*.role')
        .isIn(['project_manager', 'architect', 'engineer', 'supervisor', 'labor', 'specialist'])
        .withMessage('Invalid team member role'),
    body('team.composition.*.count')
        .isInt({ min: 1 })
        .withMessage('Team member count must be at least 1')
];

const negotiationValidation = [
    body('type')
        .isIn(['cost', 'timeline', 'scope', 'other'])
        .withMessage('Invalid negotiation type'),
    body('proposedValue')
        .notEmpty()
        .withMessage('Proposed value is required'),
    body('message')
        .trim()
        .notEmpty()
        .withMessage('Negotiation message is required')
];

// Routes
router.use(authMiddleware); // All routes require authentication

// Bid Submission and Management
router.post(
    '/project/:projectId',
    roleAuth.vendorOnly,
    createBidValidation,
    bidController.submitBid
);

router.put(
    '/:bidId',
    roleAuth.vendorOnly,
    createBidValidation,
    bidController.updateBid
);

// Bid Selection
router.post(
    '/:bidId/select/:projectId',
    roleAuth.clientOnly,
    bidController.selectBid
);

// Bid Retrieval
router.get(
    '/project/:projectId',
    bidController.getProjectBids
);

router.get(
    '/vendor/bids',
    roleAuth.vendorOnly,
    bidController.getVendorBids
);

// Bid Negotiation
router.post(
    '/:bidId/negotiate',
    negotiationValidation,
    bidController.negotiateBid
);

// Bid Analysis
router.get(
    '/:bidId/analysis',
    bidController.getBidAnalysis
);

module.exports = router;
