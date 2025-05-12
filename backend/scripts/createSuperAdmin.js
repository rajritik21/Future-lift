const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/User');

// Load env variables
dotenv.config({ path: '../.env' });

// MongoDB connection string - Default fallback
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://futurelift-admin:Hit%40721657@futurelift.yey18rr.mongodb.net/?retryWrites=true&w=majority&appName=futurelift';

// Function to create super admin user
const createSuperAdmin = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected...');

    // Check if super admin already exists
    console.log('Checking if super admin exists...');
    const adminExists = await User.findOne({ 
      userType: 'admin',
      adminRole: 'super_admin'
    });
    
    if (adminExists) {
      console.log('Super admin already exists.');
      process.exit(0);
    }

    console.log('Creating new super admin user...');
    
    // Create super admin user
    const superAdmin = new User({
      name: 'Super Admin',
      email: 'admin@example.com',  // Change to your desired email
      password: 'password123',     // This will be hashed
      userType: 'admin',
      adminRole: 'super_admin',
      dob: new Date('1990-01-01'), // Change to a valid date
      adminPermissions: {
        manageUsers: true,
        manageJobs: true,
        manageInternships: true,
        manageAdminCodes: true,
        manageSettings: true,
        viewAnalytics: true
      }
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    superAdmin.password = await bcrypt.hash(superAdmin.password, salt);

    // Save user
    await superAdmin.save();
    
    console.log('Super admin user created successfully!');
    console.log('Email:', superAdmin.email);
    console.log('Password: password123');
    console.log('Remember to change this password after first login!');
    
    // Exit process
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
};

createSuperAdmin(); 