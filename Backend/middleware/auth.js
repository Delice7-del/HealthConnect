const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - verify JWT token
const authenticateToken = async (req, res, next) => {
  let token;

  // Check if token exists in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Check if token exists in cookies
  if (!token && req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    console.log('[AUTH DEBUG] No token found in headers or cookies');
    return res.status(401).json({
      status: 'error',
      message: 'Not authorized: No token provided'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('[AUTH DEBUG] Token decoded successfully:', decoded.id);

    // Get user from token
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      console.log('[AUTH DEBUG] User not found for ID:', decoded.id);
      return res.status(401).json({
        status: 'error',
        message: 'User not found'
      });
    }

    /*
    if (!user.isVerified) {
      return res.status(401).json({
        status: 'error',
        message: 'Please verify your email before accessing this route'
      });
    }
    */

    req.user = user;
    next();
  } catch (error) {
    console.log('[AUTH DEBUG] Token verification failed:', error.message);
    return res.status(401).json({
      status: 'error',
      message: `Not authorized: ${error.message}`
    });
  }
};

// Grant access to specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        message: `User role ${req.user.role} is not authorized to access this route`
      });
    }
    next();
  };
};

// Optional authentication - doesn't require token but adds user if available
const optionalAuth = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token && req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      if (user && user.isVerified) {
        req.user = user;
      }
    } catch (error) {
      // Token is invalid, but we don't throw an error
    }
  }

  next();
};

module.exports = {
  authenticateToken,
  authorize,
  optionalAuth
}; 