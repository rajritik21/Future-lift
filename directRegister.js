const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./backend/models/User');

// Load env variables
dotenv.config();

// MongoDB connection string - Default fallback
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://futurelift-admin:Hit%40721657@futurelift.yey18rr.mongodb.net/?retryWrites=true&w=majority&appName=futurelift';

// Super Admin details
const superAdminDetails = {
  name: 'Ritik Ranjan',
  email: 'rajritik21av@gmail.com',
  password: 'Ritik@123#', // Strong password with uppercase, lowercase, number, and special characters
  dob: new Date('2003-10-03')
};

// Function to directly create a super admin
const createDirectSuperAdmin = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    // Set a shorter timeout for the connection
    await mongoose.connect(MONGO_URI, { 
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000
    });
    console.log('MongoDB Connected...');

    // Check if user with this email already exists
    console.log('Checking if user already exists...');
    const existingUser = await User.findOne({ 
      email: superAdminDetails.email 
    });
    
    if (existingUser) {
      console.log('A user with this email already exists.');
      console.log('Updating to Super Admin privileges...');
      
      // Update to Super Admin
      existingUser.userType = 'admin';
      existingUser.adminRole = 'super_admin';
      existingUser.adminPermissions = {
        manageUsers: true,
        manageJobs: true,
        manageInternships: true,
        manageAdminCodes: true,
        manageSettings: true,
        viewAnalytics: true
      };
      
      // Hash and update password if needed
      const salt = await bcrypt.genSalt(10);
      existingUser.password = await bcrypt.hash(superAdminDetails.password, salt);
      
      await existingUser.save();
      console.log('User updated to Super Admin successfully!');
      console.log('Email:', existingUser.email);
      console.log('Go to /admin/login and use this email with your password to login');
      process.exit(0);
    }

    console.log('Creating new super admin user...');
    
    // Create super admin user
    const superAdmin = new User({
      name: superAdminDetails.name,
      email: superAdminDetails.email,
      password: superAdminDetails.password,
      dob: superAdminDetails.dob,
      userType: 'admin',
      adminRole: 'super_admin',
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
    console.log('Go to /admin/login and use this email with your password to login');
    
    // Exit process
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    console.log('\nAlternative method:');
    console.log('1. Try logging in with default Super Admin:');
    console.log('   Email: admin@example.com');
    console.log('   Password: password123');
    console.log('\n2. If that fails, you need to:');
    console.log('   - Check if MongoDB is running and accessible');
    console.log('   - Verify your MongoDB connection string in .env file');
    process.exit(1);
  }
};

createDirectSuperAdmin(); 