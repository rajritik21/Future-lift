const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { isAuthenticated } = require('../middleware/auth');
const authController = require('../controllers/authController');

// @route   POST api/auth/register
// @desc    Register a user
// @access  Public
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('userType', 'User type is required').optional().isIn(['jobseeker', 'employer', 'admin'])
  ],
  authController.registerUser
);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  authController.loginUser
);

// @route   GET api/auth
// @desc    Get authenticated user
// @access  Private
router.get('/', isAuthenticated, authController.getCurrentUser);

// @route   POST api/auth/forgot-password
// @desc    Request password reset email
// @access  Public
router.post(
  '/forgot-password',
  [
    check('email', 'Please include a valid email').isEmail()
  ],
  authController.forgotPassword
);

// @route   POST api/auth/reset-password
// @desc    Reset password with token
// @access  Public
router.post(
  '/reset-password',
  [
    check('token', 'Token is required').not().isEmpty(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  authController.resetPassword
);

// @route   POST api/auth/admin/register
// @desc    Register an admin user
// @access  Public
router.post(
  '/admin/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('dob', 'Date of birth is required').not().isEmpty().custom((value) => {
      const dobDate = new Date(value);
      const today = new Date();
      const minAge = 18;
      
      // Calculate age
      let age = today.getFullYear() - dobDate.getFullYear();
      const monthDiff = today.getMonth() - dobDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
        age--;
      }
      
      if (age < minAge) {
        throw new Error(`Admin must be at least ${minAge} years old`);
      }
      
      return true;
    }),
    check('accessCode', 'Admin access code is required').not().isEmpty()
  ],
  authController.registerAdmin
);

// @route   POST api/auth/admin/login
// @desc    Authenticate admin & get token
// @access  Public
router.post(
  '/admin/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  authController.loginAdmin
);

// @route   POST api/auth/admin/register-bypass
// @desc    Register an admin user without access code (temporary)
// @access  Public
router.post(
  '/admin/register-bypass',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('dob', 'Date of birth is required').not().isEmpty().custom((value) => {
      const dobDate = new Date(value);
      const today = new Date();
      const minAge = 18;
      
      // Calculate age
      let age = today.getFullYear() - dobDate.getFullYear();
      const monthDiff = today.getMonth() - dobDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
        age--;
      }
      
      if (age < minAge) {
        throw new Error(`Admin must be at least ${minAge} years old`);
      }
      
      return true;
    })
  ],
  authController.registerAdminBypass
);

// Simple test route to check if API is responding
router.get('/test', (req, res) => {
  res.json({ msg: 'Auth API is working properly' });
});

// Debugging route to check all registered routes
router.get('/routes', (req, res) => {
  const routes = [];
  
  router.stack.forEach(function(r) {
    if (r.route && r.route.path) {
      const methods = Object.keys(r.route.methods)
        .filter(method => r.route.methods[method])
        .map(method => method.toUpperCase());
      
      routes.push({
        path: `/api/auth${r.route.path}`,
        methods: methods
      });
    }
  });
  
  res.json({ routes });
});

module.exports = router; 