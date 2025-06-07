const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const readline = require('readline');
const User = require('./backend/models/User');

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '.env') });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// MongoDB connection string
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://futurelift_admin:FutureLift%40hit@futureliftdb.0jhdaqa.mongodb.net/?retryWrites=true&w=majority&appName=FutureLiftDB';

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('\x1b[36mMongoDB Connected...\x1b[0m'))
  .catch(err => {
    console.error('\x1b[31mMongoDB connection error:\x1b[0m', err.message);
    process.exit(1);
  });

// Function to remove all admin users
async function removeAllAdmins() {
  try {
    console.log('\x1b[36mSearching for admin users...\x1b[0m');
    
    // Find all admin users
    const adminUsers = await User.find({ 
      $or: [
        { userType: 'admin' },
        { role: 'admin' }
      ]
    });
    
    if (adminUsers.length === 0) {
      console.log('\x1b[33mNo admin users found in the database.\x1b[0m');
      rl.close();
      return;
    }
    
    console.log('\x1b[36mFound', adminUsers.length, 'admin user(s):\x1b[0m');
    
    // Display admin users
    adminUsers.forEach((admin, index) => {
      console.log(`${index + 1}. Name: ${admin.name}, Email: ${admin.email}, UserType: ${admin.userType}, Role: ${admin.role}`);
    });
    
    // Ask for confirmation
    rl.question('\n\x1b[31mWARNING: This will remove ALL admin users. Are you sure? (yes/no): \x1b[0m', async (answer) => {
      if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
        // Delete all admin users
        const result = await User.deleteMany({ 
          $or: [
            { userType: 'admin' },
            { role: 'admin' }
          ]
        });
        
        console.log('\x1b[32mSuccessfully removed', result.deletedCount, 'admin user(s)!\x1b[0m');
        console.log('\x1b[36mYou can now register a new admin user.\x1b[0m');
      } else {
        console.log('\x1b[33mOperation cancelled. No admin users were removed.\x1b[0m');
      }
      
      rl.close();
      mongoose.connection.close();
      process.exit(0);
    });
  } catch (error) {
    console.error('\x1b[31mError removing admin users:\x1b[0m', error);
    rl.close();
    mongoose.connection.close();
    process.exit(1);
  }
}

// Start the process
console.log('\x1b[36m=== Admin User Removal Tool ===\x1b[0m');
console.log('This script will remove all admin users from the database.\n');

removeAllAdmins(); 