/**
 * Main Backend API Server for Your Project
 */
require('dotenv').config();
const express = require('express');
const config = require('./config');

const app = express();
const PORT = process.env.PORT || 5000;

// Check critical environment variables
const checkEnvironmentVariables = () => {
  const criticalVars = {
    'MONGO_URI': process.env.MONGO_URI,
    'JWT Secret': process.env.JWT_SECRET
    // Add other env vars like Cloudinary if used
  };
  const missingVars = Object.entries(criticalVars)
    .filter(([, value]) => !value)
    .map(([name]) => name);
  if (missingVars.length > 0) {
    console.warn('⚠️  Missing critical environment variables:');
    missingVars.forEach(name => console.warn(`   - ${name}`));
    console.warn('⚠️  Check your .env file and restart the server.');
  } else {
    console.log('✅ All critical environment variables are set.');
  }
};

const startServer = async () => {
  try {
    checkEnvironmentVariables();

    config.middleware(app);
    await config.database.connect();
    config.routes(app);
    config.errorHandlers(app);

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log(`✅ API available at http://localhost:${PORT}/`);
      console.log(`✅ Env: ${process.env.NODE_ENV || 'development'}`);
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

startServer();
module.exports = app; // for testing
