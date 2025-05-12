const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./backend/models/User');

// Load env variables
dotenv.config();

// MongoDB connection string - Default fallback
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://futurelift-admin:Hit%40721657@futurelift.yey18rr.mongodb.net/?retryWrites=true&w=majority&appName=futurelift';

// New admin credentials
const newCredentials = {
  name: 'Ritik Ranjan',
  email: 'rajritik21av@gmail.com',
  password: 'Rajritik21@', // This should be the password you entered on the form
  dob: new Date('2003-10-03')
};

// Function to update the super admin user
const updateSuperAdmin = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected...');

    // Find the super admin user
    console.log('Finding super admin user...');
    const superAdmin = await User.findOne({ 
      userType: 'admin',
      adminRole: 'super_admin'
    });
    
    if (!superAdmin) {
      console.log('Super admin not found. Please run the createSuperAdmin.js script first.');
      process.exit(1);
    }

    console.log('Found super admin:', superAdmin.email);
    console.log('Updating credentials...');
    
    // Update the admin's credentials
    superAdmin.name = newCredentials.name;
    superAdmin.email = newCredentials.email;
    superAdmin.dob = newCredentials.dob;
    
    // Hash new password
    const salt = await bcrypt.genSalt(10);
    superAdmin.password = await bcrypt.hash(newCredentials.password, salt);

    // Save the updated user
    await superAdmin.save();
    
    console.log('Super admin credentials updated successfully!');
    console.log('New Email:', superAdmin.email);
    console.log('New Name:', superAdmin.name);
    
    // Exit process
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
};

updateSuperAdmin(); 