const mongoose = require('mongoose');
const dotenv = require('dotenv');
const AdminAccessCode = require('./backend/models/AdminAccessCode');

// Load env variables
dotenv.config();

// MongoDB connection string - Default fallback
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://futurelift-admin:Hit%40721657@futurelift.yey18rr.mongodb.net/?retryWrites=true&w=majority&appName=futurelift';

// Function to create a new access code
const createCode = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected...');
    
    // Create a dummy ID for the creator
    const rootAdminId = new mongoose.Types.ObjectId();
    console.log('Root admin ID:', rootAdminId);
    
    // Set expiration date to 3 months from now
    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + 3);
    
    // Create super_admin access code
    const superAdminCode = new AdminAccessCode({
      code: 'SUPERADMIN2024',
      description: 'Emergency Super Admin Code with Full Access',
      createdBy: rootAdminId,
      expiresAt: expiresAt,
      usageLimit: 1,
      adminRole: 'super_admin',
      isActive: true,
      permissions: {
        manageUsers: true,
        manageJobs: true,
        manageInternships: true,
        manageAdminCodes: true,
        manageSettings: true,
        viewAnalytics: true
      }
    });

    await superAdminCode.save();
    
    console.log('Admin access code created:');
    console.log(`\nSuper Admin Code: ${superAdminCode.code}`);
    console.log('Permissions: Full access to all features');
    console.log(`Expires: ${superAdminCode.expiresAt}`);
    console.log(`Usage Limit: ${superAdminCode.usageLimit} (for the team head only)`);
    console.log(`Is Valid: ${superAdminCode.isValid()}`);
    
    // Exit process
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
};

createCode(); 