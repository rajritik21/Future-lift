const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const cloudinary = require('cloudinary').v2;

// Load env variables
dotenv.config();

// MongoDB Atlas connection string - Default fallback
// IMPORTANT: Replace this with your new MongoDB Atlas connection string from the free tier account
// It should look like: mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://futurelift_admin:FutureLift%40hit@futureliftdb.0jhdaqa.mongodb.net/?retryWrites=true&w=majority&appName=FutureLiftDB';
const JWT_SECRET = process.env.JWT_SECRET || 'futureliftjobportalsecret';
const PORT = process.env.PORT || 5003;

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dlpgsnezh',
  api_key: process.env.CLOUDINARY_API_KEY || '912588377895983',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'CoIzL6jZmXbW4_kS3BHeSBqfXyg'
});

// Initialize express app
const app = express();

// Middleware
app.use(express.json({ limit: '50mb' })); // Increased limit for file uploads
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors());

// Define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/companies', require('./routes/companies'));
app.use('/api/profiles', require('./routes/profiles'));
app.use('/api/government-jobs', require('./routes/governmentJobs'));
app.use('/api/internships', require('./routes/internships'));
app.use('/api/admin-access-codes', require('./routes/adminAccessCodes'));
app.use('/api/admin', require('./routes/adminRoutes')); // Added admin routes
app.use('/api/subscriptions', require('./routes/subscriptions')); // Added subscription routes
app.use('/api/notifications', require('./routes/api/notifications')); // Added notifications routes

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html'));
  });
}

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected to Atlas...');
    // Start server
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }); 