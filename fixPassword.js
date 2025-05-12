const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Load env variables
dotenv.config();

// MongoDB connection string
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://futurelift-admin:Hit%40721657@futurelift.yey18rr.mongodb.net/?retryWrites=true&w=majority&appName=futurelift';

// The exact credentials being used in the login form
const loginDetails = {
  email: 'rajritik21av@gmail.com',
  password: 'Ritik@123#'  // IMPORTANT: This must match exactly what you're typing in the login form
  // If you're using a different password in the form, update it here
};

// Function to fix the super admin password
const fixPassword = async () => {
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
    
    // Find the user
    const user = await usersCollection.findOne({ email: loginDetails.email });
    
    if (!user) {
      console.log(`\nUser with email ${loginDetails.email} not found in database.`);
      console.log('Creating a new Super Admin user...');
      
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(loginDetails.password, salt);
      
      // Create new user document
      const newUser = {
        name: 'Ritik Ranjan',
        email: loginDetails.email,
        password: hashedPassword,
        dob: new Date('2003-10-03'),
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
      
      // Insert the user
      const insertResult = await usersCollection.insertOne(newUser);
      
      if (insertResult.acknowledged) {
        console.log('Super Admin user created successfully!');
      } else {
        console.log('Failed to create user.');
      }
    } else {
      console.log('\nUser found. Resetting password...');
      
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(loginDetails.password, salt);
      
      // Update just the password field
      const updateResult = await usersCollection.updateOne(
        { email: loginDetails.email },
        { $set: { password: hashedPassword } }
      );
      
      if (updateResult.modifiedCount > 0) {
        console.log('Password updated successfully!');
      } else {
        console.log('Password unchanged. May already be set correctly.');
      }
      
      // Also ensure the user has super admin role and permissions
      const roleUpdateResult = await usersCollection.updateOne(
        { email: loginDetails.email },
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
      
      if (roleUpdateResult.modifiedCount > 0) {
        console.log('Super Admin role and permissions updated!');
      }
    }
    
    console.log('\n======= LOGIN DETAILS =======');
    console.log(`Email: ${loginDetails.email}`);
    console.log(`Password: ${loginDetails.password}`);
    console.log('\nGo to /admin/login and use these EXACT credentials to log in.');
    
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
    console.log('MongoDB connection closed.');
  }
};

fixPassword(); 