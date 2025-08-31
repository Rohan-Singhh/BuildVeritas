/**
 * Route initialization
 */

const initializeRoutes = (app) => {
    // API Routes
    app.use('/api/auth', require('./auth.routes'));
    
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
