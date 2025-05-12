const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env variables
dotenv.config();

// MongoDB connection string - DEFAULT CONNECTION STRING FROM BACKEND SCRIPT
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://futurelift-admin:Hit%40721657@futurelift.yey18rr.mongodb.net/?retryWrites=true&w=majority&appName=futurelift';

// Function to fix the admin registration issue
const fixRegistration = async () => {
  try {
    console.log('Checking MongoDB connection...');
    
    // Set a shorter connection timeout
    const options = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };
    
    // Connect to MongoDB with custom options
    await mongoose.connect(MONGO_URI, options);
    console.log('MongoDB Connected successfully!');
    
    console.log('\nYou can now try to login as the default Super Admin:');
    console.log('Email: admin@example.com');
    console.log('Password: password123');
    console.log('\nIf that doesn\'t work, try these steps:');
    console.log('1. Double-check your MongoDB connection in .env file');
    console.log('2. Ensure MongoDB service is running and accessible');
    console.log('3. Check your network connectivity');
    console.log('4. Try running "node backend/scripts/createSuperAdmin.js" first');
    console.log('5. Then run "node backend/scripts/seedAdminCode.js" to create working access codes');
    
    // Exit process
    process.exit(0);
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    console.log('\nThere seems to be a problem connecting to MongoDB.');
    console.log('Please check your database connection and try again.');
    console.log('\nAlternative solution:');
    console.log('1. Try logging in with the default credentials:');
    console.log('   Email: admin@example.com');
    console.log('   Password: password123');
    console.log('\n2. If you can\'t connect to the database, you may need to:');
    console.log('   - Check if MongoDB is running');
    console.log('   - Verify network connectivity');
    console.log('   - Update your MongoDB connection string in the .env file');
    process.exit(1);
  }
};

fixRegistration(); 