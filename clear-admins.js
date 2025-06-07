const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '.env') });

// MongoDB connection string
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://futurelift_admin:FutureLift%40hit@futureliftdb.0jhdaqa.mongodb.net/?retryWrites=true&w=majority&appName=FutureLiftDB';

// Define the User schema directly to avoid potential issues with imports
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  userType: String,
  role: String
});

const User = mongoose.model('User', UserSchema);

// Function to remove all admin users
async function removeAllAdmins() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected Successfully!');
    
    console.log('Searching for admin users...');
    
    // Find all admin users
    const adminUsers = await User.find({ 
      $or: [
        { userType: 'admin' },
        { role: 'admin' }
      ]
    });
    
    if (adminUsers.length === 0) {
      console.log('No admin users found in the database.');
      return;
    }
    
    console.log(`Found ${adminUsers.length} admin user(s):`);
    
    // Display admin users
    adminUsers.forEach((admin, index) => {
      console.log(`${index + 1}. Name: ${admin.name}, Email: ${admin.email}, UserType: ${admin.userType}, Role: ${admin.role}`);
    });
    
    // Delete all admin users without asking for confirmation
    console.log('Removing all admin users...');
    const result = await User.deleteMany({ 
      $or: [
        { userType: 'admin' },
        { role: 'admin' }
      ]
    });
    
    console.log(`Successfully removed ${result.deletedCount} admin user(s)!`);
    console.log('You can now register a new admin user.');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    // Close the connection in all cases
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log('MongoDB connection closed.');
    }
    process.exit(0);
  }
}

// Start the process
console.log('=== Admin User Removal Tool ===');
console.log('This script will remove all admin users from the database.');
console.log('WARNING: This action cannot be undone!');

// Execute without requiring input
removeAllAdmins(); 