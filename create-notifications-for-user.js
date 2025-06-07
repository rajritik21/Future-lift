const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const readline = require('readline');

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '.env') });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// MongoDB connection string
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://futurelift_admin:FutureLift%40hit@futureliftdb.0jhdaqa.mongodb.net/?retryWrites=true&w=majority&appName=FutureLiftDB';

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 15000,
  socketTimeoutMS: 45000,
})
.then(() => {
  console.log('MongoDB Connected...');
  askForUserEmail();
})
.catch(err => {
  console.error('MongoDB connection error:', err.message);
  process.exit(1);
});

// Welcome notification templates by user type
const notificationTemplates = {
  jobseeker: [
    {
      title: 'Welcome to FutureLift Job Portal!',
      message: '{name}, thank you for joining our platform. Complete your profile to increase your chances of getting hired.',
      type: 'info',
      link: '/dashboard/profile'
    },
    {
      title: 'Complete Your Profile',
      message: 'Your profile is incomplete. Add your skills, experience, and upload your resume to stand out to employers.',
      type: 'warning',
      link: '/dashboard/profile'
    },
    {
      title: 'Discover Jobs Matching Your Skills',
      message: 'We have new job opportunities that match your profile. Check them out now!',
      type: 'success',
      link: '/jobs'
    }
  ],
  employer: [
    {
      title: 'Welcome to FutureLift Job Portal!',
      message: '{name}, thank you for joining our platform. Start posting jobs and internships to find the best talent.',
      type: 'info',
      link: '/dashboard/post-job'
    },
    {
      title: 'Complete Company Profile',
      message: 'Your company profile is incomplete. Add company details and logo to build trust with job seekers.',
      type: 'warning',
      link: '/dashboard/company-profile'
    },
    {
      title: 'Post Your First Job',
      message: 'Start attracting qualified candidates by posting your first job opening.',
      type: 'success',
      link: '/dashboard/post-job'
    }
  ],
  admin: [
    {
      title: 'Welcome, Administrator!',
      message: '{name}, you have admin access to FutureLift Job Portal. Use the admin dashboard to manage users and content.',
      type: 'info',
      link: '/admin/dashboard'
    },
    {
      title: 'Review New Registrations',
      message: 'There are new users who have joined the platform. Review their accounts.',
      type: 'warning',
      link: '/admin/users'
    },
    {
      title: 'Analyze Platform Activity',
      message: 'View platform analytics to monitor user engagement and job posting activity.',
      type: 'success',
      link: '/admin/analytics'
    }
  ]
};

// Ask for user email
function askForUserEmail() {
  rl.question('Enter the email address of the user: ', (email) => {
    createNotificationsForUser(email);
  });
}

// Function to create notifications for a specific user
async function createNotificationsForUser(email) {
  try {
    // Define the models (to avoid potential circular dependency issues)
    const User = mongoose.model('User', new mongoose.Schema({
      name: String,
      email: String,
      userType: String,
      role: String
    }));
    
    const NotificationSchema = new mongoose.Schema({
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      type: {
        type: String,
        enum: ['info', 'success', 'warning', 'error'],
        default: 'info'
      },
      title: {
        type: String,
        required: true
      },
      message: {
        type: String,
        required: true
      },
      isRead: {
        type: Boolean,
        default: false
      },
      link: {
        type: String,
        default: ''
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    });
    
    const Notification = mongoose.model('Notification', NotificationSchema);
    
    console.log(`Searching for user with email: ${email}...`);
    
    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      console.error(`User not found with email: ${email}`);
      rl.close();
      mongoose.connection.close();
      return;
    }
    
    console.log(`Found user: ${user.name} (${user.email}), Type: ${user.userType || user.role || 'unknown'}`);
    
    // Determine user type
    let userType = (user.userType || user.role || 'jobseeker').toLowerCase();
    
    // Make sure userType is one of our supported types
    if (!['jobseeker', 'employer', 'admin'].includes(userType)) {
      userType = 'jobseeker'; // Default to jobseeker for unknown types
    }
    
    console.log(`Creating notifications for ${user.name} as ${userType}...`);
    
    // Get notification templates for user type
    const templates = notificationTemplates[userType];
    
    // Create notifications with spacing in time
    for (let i = 0; i < templates.length; i++) {
      const template = templates[i];
      
      // Personalize message if it contains {name}
      const message = template.message.replace('{name}', user.name);
      
      // Create notification with timestamp spaced apart
      const notification = new Notification({
        user: user._id,
        type: template.type,
        title: template.title,
        message: message,
        link: template.link,
        isRead: false,
        createdAt: new Date(Date.now() + (i * 5000)) // Space notifications 5 seconds apart
      });
      
      // Save notification
      await notification.save();
      console.log(`Created notification: ${template.title}`);
    }
    
    console.log(`Successfully created ${templates.length} notifications for ${user.name}!`);
    console.log('These notifications will now be visible in the user\'s notification panel.');
    
    rl.close();
    mongoose.connection.close();
    console.log('MongoDB connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    rl.close();
    mongoose.connection.close();
    process.exit(1);
  }
}

// Start the process
console.log('=== Notification Creator ===');
console.log('This script will create demo notifications for a specific user.');
console.log('The notifications will include welcome messages and action suggestions.'); 