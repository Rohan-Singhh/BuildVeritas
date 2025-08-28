/**
 * Main Backend API Server for BuildVeritas
 */
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const config = require('./src/config');
const { ApiError } = require('./src/utils/apiError');
const { ApiResponse } = require('./src/utils/apiResponse');

const app = express();

// Check critical environment variables
const checkEnvironmentVariables = () => {
    const criticalVars = {
        'MONGODB_URI': process.env.MONGODB_URI,
        'JWT_SECRET': process.env.JWT_SECRET,
        'NODE_ENV': process.env.NODE_ENV,
        'JWT_EXPIRE': process.env.JWT_EXPIRE
    };
    
    const missingVars = Object.entries(criticalVars)
        .filter(([, value]) => !value)
        .map(([name]) => name);
        
    if (missingVars.length > 0) {
        console.warn('⚠️  Missing critical environment variables:');
        missingVars.forEach(name => console.warn(`   - ${name}`));
        console.warn('⚠️  Check your .env file and restart the server.');
        process.exit(1);
    }
    
    console.log('✅ All critical environment variables are set.');
};

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: process.env.RATE_LIMIT || 100, // Limit each IP
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false
});

// Initialize Express middleware
const initializeMiddleware = (app) => {
    app.use(helmet()); // Security headers
    app.use(cors()); // Enable CORS
    app.use(morgan('dev')); // Logging
    app.use(express.json()); // Parse JSON bodies
    app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
    app.use('/api', limiter); // Apply rate limiting to all API routes
};

// Initialize routes
const initializeRoutes = (app) => {
    // API Routes
    app.use('/api/auth', require('./src/routes/auth.routes'));
    
    // Health check
    app.get('/health', (req, res) => {
        res.status(200).json({ 
            status: 'ok',
            environment: process.env.NODE_ENV,
            timestamp: new Date().toISOString()
        });
    });

    // 404 handler
    app.use((req, res, next) => {
        next(new ApiError(404, 'Resource not found'));
    });
};

// Global error handler
const initializeErrorHandling = (app) => {
    app.use((err, req, res, next) => {
        console.error(err);

        if (err instanceof ApiError) {
            return ApiResponse.error(res, err.statusCode, err.message, err.errors);
        }

        // MongoDB duplicate key error
        if (err.code === 11000) {
            return ApiResponse.error(res, 400, 'Duplicate value error', [
                { field: Object.keys(err.keyPattern)[0], message: 'Already exists' }
            ]);
        }

        // Mongoose validation error
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(e => ({
                field: e.path,
                message: e.message
            }));
            return ApiResponse.error(res, 400, 'Validation Error', errors);
        }

        // JWT errors
        if (err.name === 'JsonWebTokenError') {
            return ApiResponse.error(res, 401, 'Invalid token');
        }

        if (err.name === 'TokenExpiredError') {
            return ApiResponse.error(res, 401, 'Token has expired');
        }

        return ApiResponse.error(
            res, 
            500, 
            process.env.NODE_ENV === 'development' 
                ? err.message 
                : 'Internal server error'
        );
    });
};

const startServer = async () => {
    try {
        // Check environment
        checkEnvironmentVariables();

        // Initialize middleware
        initializeMiddleware(app);

        // Connect to database
        await config.database.connect();

        // Initialize routes
        initializeRoutes(app);

        // Initialize error handling
        initializeErrorHandling(app);

        // Start server
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`✅ Server running on port ${PORT}`);
            console.log(`✅ API available at http://localhost:${PORT}/`);
            console.log(`✅ Environment: ${process.env.NODE_ENV || 'development'}`);
        });
    } catch (err) {
        console.error('❌ Failed to start server:', err);
        process.exit(1);
    }
};

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received: closing HTTP server');
    config.database.disconnect()
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('❌ Uncaught Exception:', err);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Promise Rejection:', err);
    process.exit(1);
});

startServer();

module.exports = app; // for testing