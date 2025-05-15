const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const AdminAccessCode = require('../models/AdminAccessCode');
const mongoose = require('mongoose');
const fileUpload = require('../utils/fileUpload');

// Get JWT_SECRET from server config
const JWT_SECRET = process.env.JWT_SECRET || 'futureliftjobportalsecret';

// @desc    Register a user
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, userType, avatar } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    // Set default avatar - will be updated later in profile section
    let avatarData = {
      public_id: 'default_avatar_id',
      url: 'https://res.cloudinary.com/dlpgsnezh/image/upload/v1715680055/default_avatar_mrjnch.png'
    };

    if (avatar) {
      try {
        const uploadResult = await fileUpload.uploadProfileImage(avatar);
        avatarData = {
          public_id: uploadResult.public_id,
          url: uploadResult.secure_url
        };
      } catch (uploadError) {
        console.error("Avatar upload error:", uploadError);
        // Continue with default avatar
      }
    }

    // Create new user
    user = new User({
      name,
      email,
      password,
      userType: userType || 'jobseeker', // Default to jobseeker if not specified
      avatar: avatarData
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user
    await user.save();

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
        userType: user.userType
      }
    };

    // Sign JWT token
    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        res.json({ 
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            userType: user.userType,
            avatar: user.avatar.url
          }
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
        userType: user.userType
      }
    };

    // Sign JWT token
    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        res.json({ 
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            userType: user.userType
          }
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Get current user
// @route   GET /api/auth
// @access  Private
exports.getCurrentUser = async (req, res) => {
  try {
    // Get user data except password, include all registration fields
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Register an admin
// @route   POST /api/auth/admin/register
// @access  Public
exports.registerAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, dob, accessCode, avatar } = req.body;

  try {
    // Validate admin access code using the new model
    const adminAccessCode = await AdminAccessCode.findOne({ code: accessCode });
    
    if (!adminAccessCode) {
      return res.status(400).json({ errors: [{ msg: 'Invalid admin access code' }] });
    }
    
    // Check if the code is valid (active, not expired, and not over usage limit)
    if (!adminAccessCode.isValid()) {
      return res.status(400).json({ 
        errors: [{ msg: 'This access code has expired or reached its usage limit' }] 
      });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    // Set default avatar for admin
    let avatarData = {
      public_id: 'default_admin_avatar_id',
      url: 'https://res.cloudinary.com/dlpgsnezh/image/upload/v1715680055/default_avatar_mrjnch.png'
    };

    if (avatar) {
      try {
        const uploadResult = await fileUpload.uploadProfileImage(avatar);
        avatarData = {
          public_id: uploadResult.public_id,
          url: uploadResult.secure_url
        };
      } catch (uploadError) {
        console.error("Avatar upload error:", uploadError);
        // Continue with default avatar
      }
    }

    // Create new admin user with permissions from access code
    user = new User({
      name,
      email,
      password,
      dob,
      userType: 'admin',
      adminRole: adminAccessCode.adminRole,
      adminPermissions: {
        manageUsers: adminAccessCode.permissions.manageUsers,
        manageJobs: adminAccessCode.permissions.manageJobs,
        manageInternships: adminAccessCode.permissions.manageInternships,
        manageAdminCodes: adminAccessCode.permissions.manageAdminCodes,
        manageSettings: adminAccessCode.permissions.manageSettings,
        viewAnalytics: adminAccessCode.permissions.viewAnalytics
      },
      avatar: avatarData
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user
    await user.save();
    
    // Increment the usage count of the access code
    adminAccessCode.usageCount += 1;
    await adminAccessCode.save();

    res.status(201).json({ msg: 'Admin registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Login admin
// @route   POST /api/auth/admin/login
// @access  Public
exports.loginAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error('Login validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  console.log('Admin login attempt for email:', email);

  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      console.error('Database connection not established');
      return res.status(503).json({ 
        errors: [{ msg: 'Database connection not established. Please try again later.' }],
        errorType: 'connection'
      });
    }
    
    // Find user with timeout handling
    const user = await User.findOne({ email }).maxTimeMS(8000);
    
    console.log('User found?', !!user);
    
    if (!user) {
      console.log('Invalid credentials - user not found');
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    // Check if user is admin
    console.log('User type:', user.userType);
    if (user.userType !== 'admin') {
      console.log('Not authorized as admin');
      return res.status(403).json({ errors: [{ msg: 'Not authorized as admin' }] });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match?', isMatch);
    
    if (!isMatch) {
      console.log('Invalid credentials - password mismatch');
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
        userType: user.userType,
        adminRole: user.adminRole
      }
    };

    // Sign JWT token
    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: '7d' },
      (err, token) => {
        if (err) {
          console.error('JWT signing error:', err);
          return res.status(500).json({ 
            errors: [{ msg: 'Error generating authentication token' }],
            errorDetail: err.message
          });
        }
        
        console.log('Login successful, token generated');
        res.json({ 
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            userType: user.userType,
            adminRole: user.adminRole,
            adminPermissions: user.adminPermissions
          }
        });
      }
    );
  } catch (err) {
    console.error('Server error during admin login:', err);
    
    // Handle specific timeout error
    if (err.name === 'MongooseError' && err.message.includes('timed out')) {
      return res.status(503).json({
        errors: [{ msg: 'Database operation timed out. Please try again later.' }],
        errorType: 'timeout'
      });
    }
    
    res.status(500).json({ 
      errors: [{ msg: 'Server error during login' }],
      errorDetail: err.message
    });
  }
};

// @desc    Register an admin without access code (temporary)
// @route   POST /api/auth/admin/register-bypass
// @access  Public
exports.registerAdminBypass = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error('Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, dob, avatar } = req.body;
  console.log('Received admin registration request:', { name, email, dob });

  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      console.error('Database connection not established');
      return res.status(503).json({ 
        errors: [{ msg: 'Database connection not established. Please try again later.' }],
        errorType: 'connection'
      });
    }

    // Check if user already exists with timeout handling
    const existingUser = await User.findOne({ email }).maxTimeMS(8000);

    if (existingUser) {
      console.log('User already exists with email:', email);
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    // Set default avatar for admin
    let avatarData = {
      public_id: 'default_admin_avatar_id',
      url: 'https://res.cloudinary.com/dlpgsnezh/image/upload/v1715680055/default_avatar_mrjnch.png'
    };

    if (avatar) {
      try {
        const uploadResult = await fileUpload.uploadProfileImage(avatar);
        avatarData = {
          public_id: uploadResult.public_id,
          url: uploadResult.secure_url
        };
      } catch (uploadError) {
        console.error("Avatar upload error:", uploadError);
        // Continue with default avatar
      }
    }

    // Create new admin user with default permissions
    const user = new User({
      name,
      email,
      password,
      dob: new Date(dob), // Ensure proper date format
      userType: 'admin',
      adminRole: 'team_member', // Match the enum value in the User model
      adminPermissions: {
        manageUsers: true,
        manageJobs: true,
        manageInternships: true, 
        manageAdminCodes: true,
        manageSettings: true,
        viewAnalytics: true
      },
      avatar: avatarData
    });

    console.log('Created new admin user object:', user);

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user with timeout handling
    await user.save({ maxTimeMS: 10000 });
    console.log('Admin user saved successfully with ID:', user.id);

    res.status(201).json({ 
      msg: 'Admin registered successfully',
      userId: user.id
    });
  } catch (err) {
    console.error('Server error during admin registration:', err);
    
    // Handle specific timeout error
    if (err.name === 'MongooseError' && err.message.includes('timed out')) {
      return res.status(503).json({
        errors: [{ msg: 'Database operation timed out. Please try again later.' }],
        errorType: 'timeout'
      });
    }
    
    // Send more detailed error information
    if (err.name === 'ValidationError') {
      // Mongoose validation error
      const validationErrors = Object.values(err.errors).map(error => ({
        field: error.path,
        msg: error.message
      }));
      console.error('Mongoose validation errors:', validationErrors);
      return res.status(400).json({ 
        errors: validationErrors,
        errorType: 'validation'
      });
    }
    
    // Check for duplicate key error (typically email)
    if (err.code === 11000) {
      console.error('Duplicate key error:', err);
      return res.status(400).json({ 
        errors: [{ msg: 'Email already exists' }],
        errorType: 'duplicate'
      });
    }
    
    res.status(500).json({ 
      errors: [{ msg: 'Server error during registration' }],
      errorDetail: err.message
    });
  }
}; 