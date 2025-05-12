const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load env variables
dotenv.config();

// Get JWT_SECRET from server config or use default
const JWT_SECRET = process.env.JWT_SECRET || 'futureliftjobportalsecret';

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Set user from payload
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}; 