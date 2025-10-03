const express = require('express');
const { body, query } = require('express-validator');
const bidController = require('../controllers/bid.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleAuth = require('../middleware/roleAuth.middleware');

const router = express.Router();

// Simplified bid validation - only essential fields
const createBidValidation = [
    body('proposedCost')
        .isNumeric()
        .withMessage('Proposed cost must be a number')
        .custom(value => value > 0)
        .withMessage('Proposed cost must be positive'),
    body('startDate')
        .isISO8601()
        .withMessage('Invalid start date format')
        .custom(value => new Date(value) >= new Date())
        .withMessage('Start date cannot be in the past'),
    body('duration')
        .isInt({ min: 1 })
        .withMessage('Duration must be at least 1'),
    body('proposal')
        .trim()
        .isLength({ min: 50 })
        .withMessage('Proposal must be at least 50 characters'),
    body('teamSize')
        .isInt({ min: 1 })
        .withMessage('Team size must be at least 1')
];

// Public bid validation (includes vendor contact info)
const createPublicBidValidation = [
    ...createBidValidation,
    body('vendorEmail')
        .isEmail()
        .withMessage('Valid email is required'),
    body('vendorName')
        .trim()
        .isLength({ min: 2 })
        .withMessage('Vendor name must be at least 2 characters'),
    body('vendorPhone')
        .isMobilePhone('en-IN')
        .withMessage('Valid phone number is required')
];

// Negotiation removed for simplicity

// Public bid submission (for vendors without login)
router.post(
    '/public/project/:projectId',
    createPublicBidValidation,
    bidController.submitBidPublic
);

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

// Bid Rejection
router.post(
    '/:bidId/reject/:projectId',
    roleAuth.clientOnly,
    bidController.rejectBid
);

// Bid Retrieval
router.get(
    '/project/:projectId',
    bidController.getProjectBids
);

// Get multiple project bids (batch)
router.post(
    '/projects/batch',
    roleAuth.clientAndConstruction,
    bidController.getMultipleProjectBids
);

router.get(
    '/vendor/bids',
    roleAuth.vendorOnly,
    bidController.getVendorBids
);

// Bid Negotiation - REMOVED for simplicity

// Bid Details
router.get(
    '/:bidId/details',
    roleAuth.clientOnly,
    bidController.getBidDetails
);

// Bid Analysis
router.get(
    '/:bidId/analysis',
    bidController.getBidAnalysis
);

module.exports = router;
