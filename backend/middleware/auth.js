const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Create JWT token
exports.createToken = (id, email) => {
  const token = jwt.sign(
    { id, email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  return token;
};

// Verify user is authenticated
exports.isAuthenticated = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        isAuthenticated: false,
        message: "Authentication required. Please log in."
      });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          isAuthenticated: false,
          message: "Invalid or expired token. Please log in again."
        });
      }

      // Add user to request object
      req.user = await User.findById(decoded.id);
      
      if (!req.user) {
        return res.status(404).json({
          success: false,
          isAuthenticated: false,
          message: "User not found."
        });
      }
      
      next();
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Authentication error: " + error.message
    });
  }
};

// Authorize specific roles
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role) && !roles.includes(req.user.userType)) {
      return res.status(403).json({
        success: false,
        message: `Role ${req.user.role || req.user.userType} is not allowed to access this resource`
      });
    }
    next();
  };
};

// Authorize admin with specific permissions
exports.authorizeAdmin = (permission) => {
  return (req, res, next) => {
    // Check if user is admin
    if (req.user.userType !== 'admin' && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required."
      });
    }

    // If no specific permission is required or user is super_admin, proceed
    if (!permission || req.user.adminRole === 'super_admin') {
      return next();
    }

    // Check if admin has the required permission
    if (!req.user.adminPermissions || !req.user.adminPermissions[permission]) {
      return res.status(403).json({
        success: false,
        message: `Access denied. You don't have the required permission: ${permission}`
      });
    }

    next();
  };
}; 