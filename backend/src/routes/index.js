/**
 * Route initialization
 */
const mongoose = require('mongoose');

const initializeRoutes = (app) => {
    // API Routes
    app.use('/api/auth', require('./auth.routes'));
    
    // Root route
    app.get('/', (req, res) => {
        res.status(200).json({
            status: 'success',
            message: 'Welcome to BuildVeritas API',
            version: '1.0.0',
            docs: '/api-docs'
        });
    });

    // Health check with detailed status
    app.get('/health', async (req, res) => {
        try {
            // Check MongoDB connection
            const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
            
            res.status(200).json({ 
                status: 'ok',
                environment: process.env.NODE_ENV,
                timestamp: new Date().toISOString(),
                version: process.env.npm_package_version || '1.0.0',
                database: {
                    status: dbStatus,
                    host: process.env.MONGODB_URI?.split('@')[1]?.split('/')[0] || 'unknown'
                },
                memory: {
                    used: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
                    total: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)}MB`
                },
                uptime: `${Math.round(process.uptime())} seconds`
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Health check failed',
                error: error.message
            });
        }
    });
};

module.exports = {
    initializeRoutes
};
