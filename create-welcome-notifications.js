const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('./backend/models/User');
const Notification = require('./backend/models/Notification');

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '.env') });

// MongoDB connection string
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://futurelift_admin:FutureLift%40hit@futureliftdb.0jhdaqa.mongodb.net/?retryWrites=true&w=majority&appName=FutureLiftDB';

console.log('Starting notification creation script...');
console.log('Connecting to MongoDB...');

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected Successfully!');
    createWelcomeNotifications();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// Welcome notification templates by user type
const welcomeNotificationTemplates = {
  jobseeker: {
    title: 'Welcome to FutureLift Job Portal!',
    message: 'Thank you for joining our platform. Complete your profile to increase your chances of getting hired.',
    type: 'info',
    link: '/dashboard/profile'
  },
  employer: {
    title: 'Welcome to FutureLift Job Portal!',
    message: 'Thank you for joining our platform. Start posting jobs and internships to find the best talent.',
    type: 'info',
    link: '/dashboard/post-job'
  },
  admin: {
    title: 'Welcome, Administrator!',
    message: 'You have admin access to FutureLift Job Portal. Use the admin dashboard to manage users and content.',
    type: 'info',
    link: '/admin/dashboard'
  }
};

// Profile completion notifications
const profileCompletionNotifications = {
  jobseeker: {
    title: 'Complete Your Profile',
    message: 'Your profile is incomplete. Add your skills, experience, and upload your resume to stand out to employers.',
    type: 'warning',
    link: '/dashboard/profile'
  },
  employer: {
    title: 'Complete Company Profile',
    message: 'Your company profile is incomplete. Add company details and logo to build trust with job seekers.',
    type: 'warning',
    link: '/dashboard/company-profile'
  }
};

// Action suggestions
const actionSuggestionNotifications = {
  jobseeker: {
    title: 'Discover Jobs Matching Your Skills',
    message: 'We have new job opportunities that match your profile. Check them out now!',
    type: 'success',
    link: '/jobs'
  },
  employer: {
    title: 'Post Your First Job',
    message: 'Start attracting qualified candidates by posting your first job opening.',
    type: 'success',
    link: '/dashboard/post-job'
  },
  admin: {
    title: 'Analyze Platform Activity',
    message: 'View platform analytics to monitor user engagement and job posting activity.',
    type: 'success',
    link: '/admin/analytics'
  }
};

// Function to create welcome notifications for all users
async function createWelcomeNotifications() {
  try {
    console.log('Fetching all users...');
    
    // Get all users
    const users = await User.find();
    
    if (!users || users.length === 0) {
      console.log('No users found in the database.');
      mongoose.connection.close();
      process.exit(0);
      return;
    }
    
    console.log(`Found ${users.length} users. Creating welcome notifications...`);
    
    let notificationCount = 0;
    
    // Create notifications for each user
    for (const user of users) {
      try {
        console.log(`Processing user: ${user.name} (${user.email}), Type: ${user.userType || user.role || 'unknown'}`);
        
        // Determine user type (convert to lowercase for consistency)
        let userType = (user.userType || user.role || 'jobseeker').toLowerCase();
        
        // Make sure userType is one of our supported types
        if (!['jobseeker', 'employer', 'admin'].includes(userType)) {
          userType = 'jobseeker'; // Default to jobseeker for unknown types
        }
        
        // Select appropriate templates based on user type
        const welcomeTemplate = welcomeNotificationTemplates[userType];
        const profileTemplate = profileCompletionNotifications[userType] || profileCompletionNotifications.jobseeker;
        const actionTemplate = actionSuggestionNotifications[userType];
        
        // Personalize the welcome message with user's name
        const welcomeMessage = `Hello ${user.name}! ${welcomeTemplate.message}`;
        
        console.log(`Creating welcome notification for ${user.name}...`);
        
        // Create welcome notification
        const welcomeNotification = new Notification({
          user: user._id,
          type: welcomeTemplate.type,
          title: welcomeTemplate.title,
          message: welcomeMessage,
          link: welcomeTemplate.link,
          isRead: false,
          createdAt: new Date()
        });
        
        // Create profile completion notification (5 seconds later)
        const profileNotification = new Notification({
          user: user._id,
          type: profileTemplate.type,
          title: profileTemplate.title,
          message: profileTemplate.message,
          link: profileTemplate.link,
          isRead: false,
          createdAt: new Date(Date.now() + 5000)
        });
        
        // Create action suggestion notification (10 seconds later)
        const actionNotification = new Notification({
          user: user._id,
          type: actionTemplate.type,
          title: actionTemplate.title,
          message: actionTemplate.message,
          link: actionTemplate.link,
          isRead: false,
          createdAt: new Date(Date.now() + 10000)
        });
        
        // Save all notifications
        await welcomeNotification.save();
        await profileNotification.save();
        await actionNotification.save();
        
        notificationCount += 3;
        console.log(`Successfully created 3 notifications for ${user.name}`);
      } catch (userError) {
        console.error(`Error creating notifications for user ${user.name}:`, userError.message);
      }
    }
    
    console.log(`Successfully created ${notificationCount} notifications for ${users.length} users!`);
    
  } catch (error) {
    console.error('Error creating welcome notifications:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
  } finally {
    // Close the connection
    try {
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
    } catch (err) {
      console.error('Error closing MongoDB connection:', err.message);
    }
    process.exit(0);
  }
}

// Start the process
console.log('=== Welcome Notification Generator ===');
console.log('This script will create welcome notifications for all existing users.'); 