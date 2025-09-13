/**
 * Route initialization
 */

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

    // Health check
    app.get('/health', (req, res) => {
        res.status(200).json({ 
            status: 'ok',
            environment: process.env.NODE_ENV,
            timestamp: new Date().toISOString()
        });
    });
};

module.exports = {
    initializeRoutes
};
