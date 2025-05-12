const mongoose = require('mongoose');
const dotenv = require('dotenv');
const AdminAccessCode = require('../models/AdminAccessCode');

// Load env variables
dotenv.config({ path: '../.env' });

// MongoDB connection string - Default fallback
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://futurelift-admin:Hit%40721657@futurelift.yey18rr.mongodb.net/?retryWrites=true&w=majority&appName=futurelift';

// Function to create initial admin access codes
const seedAdminCodes = async () => {
  try {
    // Connect to MongoDB
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected...');

    // Check if there are already admin codes
    console.log('Checking if admin codes exist...');
    const codeExists = await AdminAccessCode.findOne();
    
    if (codeExists) {
      console.log('Admin access codes already exist. No seeding needed.');
      process.exit(0);
    }

    console.log('Creating new admin access codes...');
    // Create a mock ObjectId instead of using 'root' string
    const rootAdminId = new mongoose.Types.ObjectId();
    console.log('Root admin ID:', rootAdminId);
    
    // Set expiration date to 1 month from now
    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + 1);
    
    // Create super_admin access code (for team head)
    const superAdminCode = new AdminAccessCode({
      code: 'SUPERADMIN' + Math.floor(1000 + Math.random() * 9000),
      description: 'Team Head Access Code - Full permissions',
      createdBy: rootAdminId,
      expiresAt: expiresAt,
      usageLimit: 1,
      adminRole: 'super_admin',
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
    
    // Create team_member access codes (for team members with limited access)
    const teamMemberCode = new AdminAccessCode({
      code: 'TEAMMEMBER' + Math.floor(1000 + Math.random() * 9000),
      description: 'Team Member Access Code - Limited permissions',
      createdBy: rootAdminId,
      expiresAt: expiresAt,
      usageLimit: 3, // For three team members
      adminRole: 'team_member',
      permissions: {
        manageUsers: false,
        manageJobs: true,
        manageInternships: true,
        manageAdminCodes: false,
        manageSettings: false,
        viewAnalytics: true
      }
    });

    await teamMemberCode.save();
    
    console.log('Admin access codes created:');
    console.log(`\nSuper Admin Code (Team Head): ${superAdminCode.code}`);
    console.log('Permissions: Full access to all features');
    console.log(`Expires: ${superAdminCode.expiresAt}`);
    console.log(`Usage Limit: ${superAdminCode.usageLimit} (for the team head only)`);
    
    console.log(`\nTeam Member Code: ${teamMemberCode.code}`);
    console.log('Permissions: Limited access (can manage jobs & internships, view analytics)');
    console.log(`Expires: ${teamMemberCode.expiresAt}`);
    console.log(`Usage Limit: ${teamMemberCode.usageLimit} (can be used by ${teamMemberCode.usageLimit} team members)`);
    
    console.log('\nUse these codes to register your team members with appropriate access levels.\n');
    
    // Exit process
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
};

seedAdminCodes(); 