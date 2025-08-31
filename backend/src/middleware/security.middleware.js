const rateLimit = require('express-rate-limit');
const { ApiError } = require('../utils/apiError');

// Track failed login attempts
const loginAttempts = new Map();
const IP_BLOCK_DURATION = 1 * 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_FAILED_ATTEMPTS = 5;

// Rate limiters
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // 10 attempts per window per IP
    message: 'Too many login attempts, please try again later',
    standardHeaders: true,
    legacyHeaders: false
});

// More reasonable registration limits
const registrationLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 50, // 50 registrations per hour per IP
    message: 'Too many registration attempts from this IP, please try again later',
    skipFailedRequests: true, // Only count successful registrations
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => {
        // Use both IP and email domain to prevent mass registrations from same domain
        const ip = req.ip;
        const emailDomain = req.body.email ? req.body.email.split('@')[1] : '';
        return `${ip}-${emailDomain}`;
    }
});

// Separate limit for business/enterprise registrations
const businessRegistrationLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 200, // 200 registrations per hour per IP
    message: 'Too many registration attempts, please contact support for bulk registration',
    skipFailedRequests: true,
    standardHeaders: true,
    legacyHeaders: false
});

const adminActionLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 admin actions per window
    message: 'Too many admin actions, please try again later',
    standardHeaders: true,
    legacyHeaders: false
});

// Track and block suspicious IPs
const trackFailedLogin = (ip, success = false) => {
    if (!loginAttempts.has(ip)) {
        loginAttempts.set(ip, { count: 0, blockedUntil: null });
    }

    const attempt = loginAttempts.get(ip);

    if (success) {
        // Reset on successful login
        loginAttempts.delete(ip);
        return;
    }

    attempt.count++;
    if (attempt.count >= MAX_FAILED_ATTEMPTS) {
        attempt.blockedUntil = Date.now() + IP_BLOCK_DURATION;
    }

    loginAttempts.set(ip, attempt);
};

// Middleware to check for blocked IPs
const checkBlockedIP = (req, res, next) => {
    const ip = req.ip;
    const attempt = loginAttempts.get(ip);

    if (attempt && attempt.blockedUntil && attempt.blockedUntil > Date.now()) {
        const remainingTime = Math.ceil((attempt.blockedUntil - Date.now()) / 1000 / 60);
        throw new ApiError(429, `IP blocked due to too many failed attempts. Try again in ${remainingTime} minutes`);
    }

    next();
};

// Intelligent rate limiting based on user behavior
const intelligentRateLimit = (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    
    // Initialize or get IP stats
    if (!global.ipStats) global.ipStats = new Map();
    if (!global.ipStats.has(ip)) {
        global.ipStats.set(ip, {
            requestCount: 0,
            firstSeen: now,
            successfulRequests: 0,
            lastRequest: now
        });
    }

    const stats = global.ipStats.get(ip);
    const timeSinceFirst = now - stats.firstSeen;
    const timeSinceLast = now - stats.lastRequest;

    // Update stats
    stats.requestCount++;
    stats.lastRequest = now;
    global.ipStats.set(ip, stats);

    // Calculate trust score (0-100)
    const trustScore = calculateTrustScore(stats, timeSinceFirst);

    // Adjust rate limits based on trust score
    if (trustScore < 30) {
        // Suspicious behavior - strict limits
        if (stats.requestCount > 30) {
            throw new ApiError(429, 'Rate limit exceeded. Please try again later.');
        }
    } else if (trustScore < 70) {
        // Normal behavior - standard limits
        if (stats.requestCount > 100) {
            throw new ApiError(429, 'Rate limit exceeded. Please try again later.');
        }
    }
    // Trusted users (score >= 70) get higher limits

    next();
};

// Calculate trust score based on user behavior
const calculateTrustScore = (stats, timeSinceFirst) => {
    let score = 50; // Base score

    // Time factor: longer history = more trust
    if (timeSinceFirst > 24 * 60 * 60 * 1000) score += 20; // 24 hours
    else if (timeSinceFirst > 1 * 60 * 60 * 1000) score += 10; // 1 hour

    // Success rate factor
    const successRate = stats.successfulRequests / stats.requestCount;
    if (successRate > 0.95) score += 20;
    else if (successRate > 0.8) score += 10;

    // Request pattern factor
    if (stats.requestCount < 100) score += 10;

    return Math.min(100, Math.max(0, score));
};

// Password strength validator
const validatePasswordStrength = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const errors = [];
    if (password.length < minLength) errors.push('Password must be at least 8 characters long');
    if (!hasUpperCase) errors.push('Password must contain at least one uppercase letter');
    if (!hasLowerCase) errors.push('Password must contain at least one lowercase letter');
    if (!hasNumbers) errors.push('Password must contain at least one number');
    if (!hasSpecialChar) errors.push('Password must contain at least one special character');

    return errors;
};

// Middleware to validate password strength
const passwordStrengthCheck = (req, res, next) => {
    const { password } = req.body;
    const errors = validatePasswordStrength(password);

    if (errors.length > 0) {
        throw new ApiError(400, 'Password is too weak', errors);
    }

    next();
};

// Security headers middleware
const securityHeaders = (req, res, next) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    res.setHeader('Content-Security-Policy', "default-src 'self'");
    
    next();
};

module.exports = {
    loginLimiter,
    registrationLimiter,
    businessRegistrationLimiter,
    adminActionLimiter,
    checkBlockedIP,
    trackFailedLogin,
    passwordStrengthCheck,
    securityHeaders,
    intelligentRateLimit
};