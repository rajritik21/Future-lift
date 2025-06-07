const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const readline = require('readline');
const Notification = require('./backend/models/Notification');
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
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// Sample notifications to create
const sampleNotifications = [
  {
    type: 'info',
    title: 'Welcome to FutureLift!',
    message: 'Thank you for joining our platform. Complete your profile to get started.',
    link: '/dashboard'
  },
  {
    type: 'success',
    title: 'Application Submitted',
    message: 'Your application for Software Engineer at Google has been successfully submitted.',
    link: '/jobs/applications/123'
  },
  {
    type: 'warning',
    title: 'Profile Incomplete',
    message: 'Your profile is only 60% complete. Add more details to increase visibility to employers.',
    link: '/dashboard/profile'
  },
  {
    type: 'error',
    title: 'Account Security',
    message: 'We noticed a login from a new device. Please verify it was you.',
    link: '/account/security'
  },
  {
    type: 'info',
    title: 'Job Recommendations',
    message: 'Based on your profile, we found 5 new jobs that match your skills.',
    link: '/jobs'
  }
];

// Create notifications for a user
async function createTestNotifications(email) {
  try {
    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      console.error('\x1b[31mError: User not found with email:', email, '\x1b[0m');
      rl.close();
      process.exit(1);
    }
    
    console.log('\x1b[36mCreating test notifications for user:', user.name, '(', user.email, ')\x1b[0m');
    
    // Create notifications
    const notifications = [];
    
    for (const notif of sampleNotifications) {
      const notification = new Notification({
        user: user._id,
        type: notif.type,
        title: notif.title,
        message: notif.message,
        link: notif.link,
        isRead: false,
        createdAt: new Date()
      });
      
      await notification.save();
      notifications.push(notification);
      
      // Add a small delay between creations to have different timestamps
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log('\x1b[32mSuccessfully created', notifications.length, 'test notifications!\x1b[0m');
    
    // List created notifications
    console.log('\nCreated notifications:');
    notifications.forEach((notif, index) => {
      console.log(`${index + 1}. [${notif.type.toUpperCase()}] ${notif.title}`);
    });
    
    console.log('\n\x1b[36mNotifications are now available in the user\'s notification page.\x1b[0m');
    
    rl.close();
    process.exit(0);
  } catch (error) {
    console.error('\x1b[31mError creating test notifications:\x1b[0m', error);
    rl.close();
    process.exit(1);
  }
}

// Ask for user email
console.log('\x1b[36m=== Notification Testing Tool ===\x1b[0m');
console.log('This script will create test notifications for a user.\n');

rl.question('Enter the email address of the user: ', (email) => {
  createTestNotifications(email);
}); 