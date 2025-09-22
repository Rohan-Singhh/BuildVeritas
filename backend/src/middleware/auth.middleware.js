const jwt = require('jsonwebtoken');
const { ApiError } = require('../utils/apiError');

// Cache decoded tokens to reduce JWT verification overhead
const tokenCache = new Map();
const TOKEN_CACHE_MAX_SIZE = 1000;
const TOKEN_CACHE_EXPIRY = 15 * 60 * 1000; // 15 minutes

// Clean expired tokens from cache
setInterval(() => {
    const now = Date.now();
    for (const [key, value] of tokenCache.entries()) {
        if (now > value.expiresAt) {
            tokenCache.delete(key);
        }
    }
}, 5 * 60 * 1000); // Clean every 5 minutes

const authMiddleware = async (req, res, next) => {
    // Set request timeout
    req.setTimeout(30000); // 30 seconds timeout
    try {
        // Check if JWT_SECRET is configured
        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET is not configured');
            throw new ApiError(500, 'Authentication service configuration error');
        }

        // Get token from header
        let token = req.header('Authorization');
        
        // Check if Authorization header exists
        if (!token) {
            throw new ApiError(401, 'No authentication token provided');
        }

        // Check if it follows Bearer scheme
        if (!token.startsWith('Bearer ')) {
            throw new ApiError(401, 'Invalid token format. Use Bearer scheme');
        }

        // Extract token
        token = token.replace('Bearer ', '').trim();
        
        if (!token) {
            throw new ApiError(401, 'No token found in Bearer scheme');
        }

        try {
            // Check token cache first
            let decoded = tokenCache.get(token);
            
            if (decoded) {
                // Check if cached token is still valid
                if (Date.now() <= decoded.expiresAt) {
                    req.user = decoded.payload;
                    return next();
                } else {
                    // Remove expired token from cache
                    tokenCache.delete(token);
                }
            }

            // Verify token if not in cache
            decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Validate decoded token structure
            if (!decoded.id || !decoded.role) {
                throw new ApiError(401, 'Invalid token structure');
            }

            // Cache the decoded token
            if (tokenCache.size >= TOKEN_CACHE_MAX_SIZE) {
                // Remove oldest entry if cache is full
                const oldestKey = tokenCache.keys().next().value;
                tokenCache.delete(oldestKey);
            }

            tokenCache.set(token, {
                payload: decoded,
                expiresAt: Date.now() + TOKEN_CACHE_EXPIRY
            });

            // Add user info to request
            req.user = decoded;
            
            next();
        } catch (jwtError) {
            if (jwtError.name === 'JsonWebTokenError') {
                throw new ApiError(401, 'Invalid token');
            } else if (jwtError.name === 'TokenExpiredError') {
                throw new ApiError(401, 'Token has expired');
            }
            throw jwtError;
        }
    } catch (error) {
        // Log error for debugging but don't expose internal details
        console.error('Auth middleware error:', {
            name: error.name,
            message: error.message,
            path: req.path
        });
        
        next(error);
    }
};

module.exports = authMiddleware;
