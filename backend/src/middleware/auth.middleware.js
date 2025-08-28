const jwt = require('jsonwebtoken');
const { ApiError } = require('../utils/apiError');

const authMiddleware = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            throw new ApiError(401, 'No authentication token, access denied');
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Add user info to request
        req.user = decoded;
        
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            next(new ApiError(401, 'Invalid token'));
        } else if (error.name === 'TokenExpiredError') {
            next(new ApiError(401, 'Token has expired'));
        } else {
            next(error);
        }
    }
};

module.exports = authMiddleware;
