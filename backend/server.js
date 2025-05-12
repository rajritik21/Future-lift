const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load env variables
dotenv.config();

// MongoDB Atlas connection string - Default fallback
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://futurelift-admin:Hit%40721657@futurelift.yey18rr.mongodb.net/?retryWrites=true&w=majority&appName=futurelift';
const JWT_SECRET = process.env.JWT_SECRET || 'futureliftjobportalsecret';
const PORT = process.env.PORT || 5000;

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/companies', require('./routes/companies'));
app.use('/api/profiles', require('./routes/profiles'));
app.use('/api/government-jobs', require('./routes/governmentJobs'));
app.use('/api/internships', require('./routes/internships'));
app.use('/api/admin-access-codes', require('./routes/adminAccessCodes'));

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