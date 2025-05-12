const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Load env variables
dotenv.config();

// MongoDB connection string
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://futurelift-admin:Hit%40721657@futurelift.yey18rr.mongodb.net/?retryWrites=true&w=majority&appName=futurelift';

// Simple admin credentials
const adminCredentials = {
  name: 'Admin User',
  email: 'admin@example.com',
  password: 'password123', // Simple password that we know works with the default admin
  dob: new Date('1990-01-01')
};

// Function to create a simple admin user
const createSimpleAdmin = async () => {
  const client = new MongoClient(MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 30000
  });
  
  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected successfully!');
    
    const db = client.db();
    const usersCollection = db.collection('users');
    
    // Check if default admin exists
    const existingAdmin = await usersCollection.findOne({ email: adminCredentials.email });
    
    if (existingAdmin) {
      console.log('\nDefault admin user already exists. Resetting password...');
      
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminCredentials.password, salt);
      
      // Update just the password
      const updateResult = await usersCollection.updateOne(
        { email: adminCredentials.email },
        { $set: { password: hashedPassword } }
      );
      
      if (updateResult.modifiedCount > 0) {
        console.log('Password reset successfully!');
      } else {
        console.log('Password was not changed. Might already be correct.');
      }
      
      // Ensure super admin role
      await usersCollection.updateOne(
        { email: adminCredentials.email },
        {
          $set: {
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
          }
        }
      );
    } else {
      console.log('\nDefault admin user not found. Creating one...');
      
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminCredentials.password, salt);
      
      // Create new admin user
      const newAdmin = {
        name: adminCredentials.name,
        email: adminCredentials.email,
        password: hashedPassword,
        dob: adminCredentials.dob,
        userType: 'admin',
        adminRole: 'super_admin',
        adminPermissions: {
          manageUsers: true,
          manageJobs: true,
          manageInternships: true,
          manageAdminCodes: true,
          manageSettings: true,
          viewAnalytics: true
        },
        date: new Date()
      };
      
      const insertResult = await usersCollection.insertOne(newAdmin);
      
      if (insertResult.acknowledged) {
        console.log('Default admin user created successfully!');
      } else {
        console.log('Failed to create default admin user.');
      }
    }
    
    console.log('\n======= DEFAULT ADMIN LOGIN DETAILS =======');
    console.log(`Email: ${adminCredentials.email}`);
    console.log(`Password: ${adminCredentials.password}`);
    console.log('\nUse these credentials to log in at /admin/login');
    
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
    console.log('MongoDB connection closed.');
  }
};

createSimpleAdmin(); 