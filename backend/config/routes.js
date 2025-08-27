const authRoutes = require('../routes/auth');
// Add additional route imports as you build more modules

module.exports = (app) => {
  app.use('/api/auth', authRoutes);
  // e.g., app.use('/api/projects', projectsRoutes); (future)
};
