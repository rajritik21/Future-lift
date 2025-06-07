const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const AdminAccessCode = require('../models/AdminAccessCode');
const mongoose = require('mongoose');
const fileUpload = require('../utils/fileUpload');
const emailService = require('../utils/emailService');
const tokenGenerator = require('../utils/tokenGenerator');
const notificationService = require('../utils/notificationService');

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

  const { name, email, password, userType, avatar, dob, mobile } = req.body;

  try {
    console.log('Registration attempt for:', email);
    console.log('Data received:', { 
      name, 
      email, 
      dob: dob || 'Not provided',
      userType: userType || 'jobseeker',
      mobile: mobile || 'Not provided'
    });
    
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      console.log('Registration failed: User already exists');
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

    // Handle date of birth formatting
    let formattedDob = null;
    if (dob) {
      try {
        // Ensure proper date format
        formattedDob = new Date(dob);
        if (isNaN(formattedDob.getTime())) {
          console.error("Invalid date format received:", dob);
          return res.status(400).json({ 
            errors: [{ msg: 'Invalid date format for date of birth' }] 
          });
        }
      } catch (dateError) {
        console.error("Date parsing error:", dateError);
        return res.status(400).json({ 
          errors: [{ msg: 'Invalid date format for date of birth' }] 
        });
      }
    }

    // Create new user - no email verification required
    user = new User({
      name,
      email,
      password,
      mobile: mobile || undefined,
      userType: userType || 'jobseeker', // Default to jobseeker if not specified
      dob: formattedDob,
      avatar: avatarData,
      isEmailVerified: true // Always set to true - no verification needed
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user
    await user.save();
    console.log('User successfully registered:', user.id);

    // Create welcome notification
    try {
      await notificationService.sendWelcomeNotification(user.id, user.name);
      console.log('Welcome notification created for user:', user.id);
    } catch (notificationError) {
      console.error('Failed to create welcome notification:', notificationError);
      // Continue with registration even if notification creation fails
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
        if (err) {
          console.error('JWT signing error:', err);
          throw err;
        }
        
        console.log('Registration complete, returning success response');
        res.json({ 
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            userType: user.userType,
            avatar: user.avatar.url,
            isEmailVerified: true
          },
          message: 'Registration successful! You can now login to your account.'
        });
      }
    );
  } catch (err) {
    console.error('Server error during registration:', err.message);
    if (err.name === 'ValidationError') {
      // Mongoose validation error
      const validationErrors = Object.values(err.errors).map(error => ({
        field: error.path,
        msg: error.message
      }));
      return res.status(400).json({ errors: validationErrors });
    }
    res.status(500).json({ 
      errors: [{ msg: 'Server error during registration' }],
      details: err.message
    });
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
            userType: user.userType,
            isEmailVerified: true
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

// @desc    Verify email address
// @route   GET /api/auth/verify-email/:token
// @access  Public
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    
    // Hash the token from the URL
    const hashedToken = tokenGenerator.hashToken(token);
    
    // Find user with this token that hasn't expired
    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ 
        errors: [{ msg: 'Invalid or expired verification token. Please request a new one.' }] 
      });
    }
    
    // Mark email as verified and remove token
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    
    await user.save();
    
    return res.status(200).json({ 
      success: true, 
      message: 'Email verified successfully! You can now login to your account.' 
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Resend verification email
// @route   POST /api/auth/resend-verification
// @access  Public
exports.resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ errors: [{ msg: 'Email is required' }] });
    }
    
    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'User not found' }] });
    }
    
    if (user.isEmailVerified) {
      return res.status(400).json({ errors: [{ msg: 'Email is already verified' }] });
    }
    
    // Generate new verification token
    const { token, hashedToken } = tokenGenerator.generateToken();
    
    // Set token expiration (24 hours from now)
    const tokenExpiration = new Date();
    tokenExpiration.setHours(tokenExpiration.getHours() + 24);
    
    // Update user with new token
    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpires = tokenExpiration;
    
    await user.save();
    
    // Send verification email
    await emailService.sendVerificationEmail(
      user.email,
      user.name,
      token
    );
    
    return res.status(200).json({ 
      success: true, 
      message: 'Verification email has been sent. Please check your inbox.' 
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Forgot Password - Send reset email
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      // For security reasons, still return success even if email doesn't exist
      return res.status(200).json({ 
        success: true, 
        message: 'If your email is registered, you will receive a password reset link shortly.' 
      });
    }
    
    // Generate reset token
    const { token, hashedToken } = tokenGenerator.generateToken();
    
    // Set token expiration (1 hour from now)
    const tokenExpiration = new Date();
    tokenExpiration.setHours(tokenExpiration.getHours() + 1);
    
    // Save token to user
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = tokenExpiration;
    
    await user.save();
    
    // Send password reset email
    await emailService.sendPasswordResetEmail(
      user.email,
      user.name,
      token
    );
    
    return res.status(200).json({ 
      success: true, 
      message: 'If your email is registered, you will receive a password reset link shortly.' 
    });
  } catch (err) {
    console.error('Forgot password error:', err.message);
    res.status(500).json({ 
      errors: [{ msg: 'Server error during password reset request' }],
      details: err.message
    });
  }
};

// @desc    Reset Password with token
// @route   POST /api/auth/reset-password
// @access  Public
exports.resetPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { token, password } = req.body;

  try {
    // Hash the token from the URL
    const hashedToken = tokenGenerator.hashToken(token);
    
    // Find user with this token that hasn't expired
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ 
        errors: [{ msg: 'Invalid or expired reset token. Please request a new one.' }] 
      });
    }
    
    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    
    // Clear reset token fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    
    await user.save();
    
    return res.status(200).json({ 
      success: true, 
      message: 'Password has been reset successfully. You can now log in with your new password.' 
    });
  } catch (err) {
    console.error('Reset password error:', err.message);
    res.status(500).json({ 
      errors: [{ msg: 'Server error during password reset' }],
      details: err.message
    });
  }
}; 