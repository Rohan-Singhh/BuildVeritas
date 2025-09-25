/**
 * Central middleware exports
 * All middleware should be exported from here
 */

const express = require('express');
const morgan = require('morgan');
const { cors, helmet, rateLimiter } = require('../config');
const authMiddleware = require('./auth.middleware');
const roleAuth = require('./roleAuth.middleware');
const { initializeErrorHandling } = require('./errorHandler');
const {
    loginLimiter,
    registrationLimiter,
    checkBlockedIP,
    trackFailedLogin,
    passwordStrengthCheck,
    securityHeaders
} = require('./security.middleware');

// Core middleware initialization
const initializeMiddleware = (app) => {
    // Basic middleware
    app.use(helmet);
    app.use(cors);
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/api', rateLimiter);
    
    // Security headers for all routes
    app.use(securityHeaders);
    
    // Initialize error handling last
    initializeErrorHandling(app);
};

module.exports = {
    // Core initialization
    initializeMiddleware,
    
    // Authentication & Authorization
    auth: authMiddleware,
    roleAuth,
    
    // Security middleware
    security: {
        loginLimiter,
        registrationLimiter,
        checkBlockedIP,
        trackFailedLogin,
        passwordStrengthCheck,
        securityHeaders
    },
    
    // Error handling
    initializeErrorHandling
};