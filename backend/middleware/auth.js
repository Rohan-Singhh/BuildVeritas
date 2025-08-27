const jwt = require('jsonwebtoken');

// Basic authentication middleware for JWT-protected routes
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization || '';

  // Expected: Bearer <token>
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};
