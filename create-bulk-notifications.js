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
  askUserType();
})
.catch(err => {
  console.error('MongoDB connection error:', err.message);
  process.exit(1);
});

// Define schemas to avoid circular dependency issues
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  userType: String,
  role: String
});

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

// Register models
let User, Notification;
try {
  User = mongoose.model('User');
  Notification = mongoose.model('Notification');
} catch (e) {
  User = mongoose.model('User', UserSchema);
  Notification = mongoose.model('Notification', NotificationSchema);
}

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

// Ask for user type
function askUserType() {
  console.log('\nSelect user type to create notifications for:');
  console.log('1. Job Seekers');
  console.log('2. Employers');
  console.log('3. Administrators');
  console.log('4. All Users');
  console.log('5. Specific User (by email)');
  
  rl.question('\nEnter your choice (1-5): ', (choice) => {
    switch(choice) {
      case '1':
        createNotificationsForUserType('jobseeker');
        break;
      case '2':
        createNotificationsForUserType('employer');
        break;
      case '3':
        createNotificationsForUserType('admin');
        break;
      case '4':
        createNotificationsForAllUsers();
        break;
      case '5':
        rl.question('\nEnter user email: ', (email) => {
          createNotificationsForSpecificUser(email);
        });
        break;
      default:
        console.log('Invalid choice. Please try again.');
        askUserType();
    }
  });
}

// Create notifications for all users of a specific type
async function createNotificationsForUserType(userType) {
  try {
    console.log(`\nSearching for users with type: ${userType}...`);
    
    // Query to find users of the given type
    const query = { $or: [{ userType }, { role: userType }] };
    
    // Find users
    const users = await User.find(query);
    
    if (!users || users.length === 0) {
      console.log(`No users found with type: ${userType}`);
      rl.close();
      mongoose.connection.close();
      return;
    }
    
    console.log(`Found ${users.length} ${userType} users. Creating notifications...`);
    
    // Create notifications for each user
    let notificationCount = 0;
    
    for (const user of users) {
      try {
        // Get templates for this user type
        const templates = notificationTemplates[userType];
        
        // Create notifications for this user
        for (let i = 0; i < templates.length; i++) {
          const template = templates[i];
          
          // Personalize message
          const message = template.message.replace('{name}', user.name);
          
          // Create notification
          const notification = new Notification({
            user: user._id,
            type: template.type,
            title: template.title,
            message: message,
            link: template.link,
            isRead: false,
            createdAt: new Date(Date.now() + (i * 1000)) // Space 1 second apart
          });
          
          await notification.save();
          notificationCount++;
        }
        
        console.log(`Created notifications for ${user.name} (${user.email})`);
      } catch (userError) {
        console.error(`Error creating notifications for ${user.name}:`, userError.message);
      }
    }
    
    console.log(`\nSuccessfully created ${notificationCount} notifications for ${users.length} ${userType} users!`);
    rl.close();
    mongoose.connection.close();
    
  } catch (error) {
    console.error('Error:', error.message);
    rl.close();
    mongoose.connection.close();
  }
}

// Create notifications for all users
async function createNotificationsForAllUsers() {
  try {
    console.log('\nSearching for all users...');
    
    // Find all users
    const users = await User.find();
    
    if (!users || users.length === 0) {
      console.log('No users found in the database.');
      rl.close();
      mongoose.connection.close();
      return;
    }
    
    console.log(`Found ${users.length} users. Creating notifications...`);
    
    // Create notifications for each user
    let notificationCount = 0;
    
    for (const user of users) {
      try {
        // Determine user type
        let userType = (user.userType || user.role || 'jobseeker').toLowerCase();
        
        // Make sure userType is one of our supported types
        if (!['jobseeker', 'employer', 'admin'].includes(userType)) {
          userType = 'jobseeker'; // Default to jobseeker for unknown types
        }
        
        // Get templates for this user type
        const templates = notificationTemplates[userType];
        
        // Create notifications for this user
        for (let i = 0; i < templates.length; i++) {
          const template = templates[i];
          
          // Personalize message
          const message = template.message.replace('{name}', user.name);
          
          // Create notification
          const notification = new Notification({
            user: user._id,
            type: template.type,
            title: template.title,
            message: message,
            link: template.link,
            isRead: false,
            createdAt: new Date(Date.now() + (i * 1000)) // Space 1 second apart
          });
          
          await notification.save();
          notificationCount++;
        }
        
        console.log(`Created notifications for ${user.name} (${user.email}) as ${userType}`);
      } catch (userError) {
        console.error(`Error creating notifications for ${user.name}:`, userError.message);
      }
    }
    
    console.log(`\nSuccessfully created ${notificationCount} notifications for ${users.length} users!`);
    rl.close();
    mongoose.connection.close();
    
  } catch (error) {
    console.error('Error:', error.message);
    rl.close();
    mongoose.connection.close();
  }
}

// Create notifications for a specific user by email
async function createNotificationsForSpecificUser(email) {
  try {
    console.log(`\nSearching for user with email: ${email}...`);
    
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
    
    console.log(`\nSuccessfully created ${templates.length} notifications for ${user.name}!`);
    console.log('These notifications will now be visible in the user\'s notification panel.');
    
    rl.close();
    mongoose.connection.close();
    
  } catch (error) {
    console.error('Error:', error.message);
    rl.close();
    mongoose.connection.close();
  }
}

// Start the process
console.log('=== Bulk Notification Creator ===');
console.log('This script will create demo notifications for users based on their type.');
console.log('The notifications will include welcome messages, profile completion reminders, and action suggestions.'); 