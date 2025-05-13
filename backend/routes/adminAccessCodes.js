const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { isAuthenticated, authorizeAdmin } = require('../middleware/auth');
const AdminAccessCode = require('../models/AdminAccessCode');
const User = require('../models/User');

// Middleware to check if user has admin code management permission
const checkAdminCodePermission = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ errors: [{ msg: 'User not found' }] });
    }
    
    if (user.userType !== 'admin') {
      return res.status(403).json({ errors: [{ msg: 'Not authorized as admin' }] });
    }
    
    // Super admins have full access
    if (user.adminRole === 'super_admin') {
      return next();
    }
    
    // Check if team member has permission to manage admin codes
    if (user.adminPermissions && user.adminPermissions.manageAdminCodes) {
      return next();
    }
    
    return res.status(403).json({ 
      errors: [{ msg: 'You do not have permission to manage admin access codes' }] 
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// @route   POST api/admin-access-codes
// @desc    Create a new admin access code
// @access  Private (super_admin or admin with manageAdminCodes permission)
router.post(
  '/',
  [
    isAuthenticated,
    checkAdminCodePermission,
    [
      check('code', 'Access code is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('expiresAt', 'Expiration date is required').isISO8601(),
      check('usageLimit', 'Usage limit must be a positive number').optional().isInt({ min: 1 })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if code already exists
      const existingCode = await AdminAccessCode.findOne({ code: req.body.code });
      if (existingCode) {
        return res.status(400).json({ errors: [{ msg: 'Access code already exists' }] });
      }

      // Get user for role-based restrictions
      const user = await User.findById(req.user.id);
      
      // Only super_admin can create super_admin access codes
      if (req.body.adminRole === 'super_admin' && user.adminRole !== 'super_admin') {
        return res.status(403).json({ 
          errors: [{ msg: 'Only super admins can create super admin access codes' }] 
        });
      }

      // Create new access code
      const newAccessCode = new AdminAccessCode({
        code: req.body.code,
        description: req.body.description,
        expiresAt: req.body.expiresAt,
        createdBy: req.user.id,
        usageLimit: req.body.usageLimit || 1,
        adminRole: req.body.adminRole || 'team_member',
        permissions: req.body.permissions || {
          manageUsers: false,
          manageJobs: true,
          manageInternships: true,
          manageAdminCodes: false,
          manageSettings: false,
          viewAnalytics: true
        }
      });

      await newAccessCode.save();
      res.status(201).json(newAccessCode);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/admin-access-codes
// @desc    Get all admin access codes
// @access  Private (super_admin or admin with manageAdminCodes permission)
router.get('/', isAuthenticated, checkAdminCodePermission, async (req, res) => {
  try {
    const accessCodes = await AdminAccessCode.find()
      .sort({ createdAt: -1 })
      .populate('createdBy', 'name email');
      
    res.json(accessCodes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/admin-access-codes/:id
// @desc    Update an admin access code
// @access  Private (super_admin or admin with manageAdminCodes permission)
router.put(
  '/:id',
  [
    isAuthenticated,
    checkAdminCodePermission,
    [
      check('isActive', 'isActive must be a boolean').optional().isBoolean(),
      check('description', 'Description is required').optional(),
      check('expiresAt', 'Expiration date must be a valid date').optional().isISO8601(),
      check('usageLimit', 'Usage limit must be a positive number').optional().isInt({ min: 1 })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Find access code
      const accessCode = await AdminAccessCode.findById(req.params.id);
      if (!accessCode) {
        return res.status(404).json({ errors: [{ msg: 'Access code not found' }] });
      }

      // Get user for role-based restrictions
      const user = await User.findById(req.user.id);
      
      // Only super_admin can modify super_admin access codes
      if (accessCode.adminRole === 'super_admin' && user.adminRole !== 'super_admin') {
        return res.status(403).json({ 
          errors: [{ msg: 'Only super admins can modify super admin access codes' }] 
        });
      }

      // Update fields
      if (req.body.isActive !== undefined) accessCode.isActive = req.body.isActive;
      if (req.body.description) accessCode.description = req.body.description;
      if (req.body.expiresAt) accessCode.expiresAt = req.body.expiresAt;
      if (req.body.usageLimit) accessCode.usageLimit = req.body.usageLimit;
      
      // Only super_admin can update permissions
      if (req.body.permissions && user.adminRole === 'super_admin') {
        accessCode.permissions = {
          ...accessCode.permissions,
          ...req.body.permissions
        };
      }

      await accessCode.save();
      res.json(accessCode);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   DELETE api/admin-access-codes/:id
// @desc    Delete an admin access code
// @access  Private (super_admin only)
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    // Super admin check
    const user = await User.findById(req.user.id);
    if (!user || user.adminRole !== 'super_admin') {
      return res.status(403).json({ 
        errors: [{ msg: 'Only super admins can delete access codes' }] 
      });
    }

    // Find access code
    const accessCode = await AdminAccessCode.findById(req.params.id);
    if (!accessCode) {
      return res.status(404).json({ errors: [{ msg: 'Access code not found' }] });
    }

    await accessCode.remove();
    res.json({ msg: 'Access code deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/admin-access-codes/validate/:code
// @desc    Validate an access code (without incrementing usage)
// @access  Public
router.get('/validate/:code', async (req, res) => {
  try {
    const accessCode = await AdminAccessCode.findOne({ code: req.params.code });
    
    if (!accessCode) {
      return res.status(404).json({ valid: false, msg: 'Invalid access code' });
    }
    
    const isValid = accessCode.isValid();
    res.json({ 
      valid: isValid,
      msg: isValid ? 'Valid access code' : 'Access code is expired or has reached usage limit',
      adminRole: isValid ? accessCode.adminRole : undefined,
      permissions: isValid ? accessCode.permissions : undefined
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router; 