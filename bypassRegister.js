const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Load env variables
dotenv.config();

// MongoDB connection string
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://futurelift-admin:Hit%40721657@futurelift.yey18rr.mongodb.net/?retryWrites=true&w=majority&appName=futurelift';

// Super Admin details - MODIFY THESE AS NEEDED
const adminDetails = {
  name: 'Ritik Ranjan',
  email: 'rajritik21av@gmail.com',
  password: 'Ritik@123#', // Strong password with uppercase, lowercase, numbers and special chars
  dob: new Date('2003-10-03')
};

// Function to create a super admin user directly in the database
const bypassRegister = async () => {
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
    
    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email: adminDetails.email });
    
    if (existingUser) {
      console.log('\nUser with this email already exists.');
      console.log('Updating to Super Admin privileges...');
      
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminDetails.password, salt);
      
      // Update the user to super admin
      const updateResult = await usersCollection.updateOne(
        { email: adminDetails.email },
        { 
          $set: {
            password: hashedPassword,
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
      
      if (updateResult.modifiedCount > 0) {
        console.log('User successfully updated to Super Admin!');
      } else {
        console.log('User was not modified. May already be a Super Admin.');
      }
      
    } else {
      console.log('\nCreating new Super Admin user...');
      
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminDetails.password, salt);
      
      // Create new user document
      const newUser = {
        name: adminDetails.name,
        email: adminDetails.email,
        password: hashedPassword,
        dob: adminDetails.dob,
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
    }
    
    console.log('\n======= LOGIN DETAILS =======');
    console.log(`Email: ${adminDetails.email}`);
    console.log('Password: (The password you provided)');
    console.log('\nGo to /admin/login and use these credentials to log in.');
    
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
    console.log('MongoDB connection closed.');
  }
};

bypassRegister(); 