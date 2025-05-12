const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Define routes
const authRoutes = require('./backend/routes/auth');

// Use routes
app.use('/api/auth', authRoutes);

// Define port - use PORT env variable or default to 5000
// Check alternative port if 5000 is in use
const PORT = process.env.PORT || 5000;

// MongoDB connection configuration
const LOCAL_MONGODB_URI = process.env.LOCAL_MONGODB_URI || 'mongodb://localhost:27017/futurelift';
const ATLAS_MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://futurelift-admin:Hit%40721657@futurelift.yey18rr.mongodb.net/futurelift?retryWrites=true&w=majority';

// Connection options with proper timeout settings
const mongooseOptions = {
  serverSelectionTimeoutMS: 15000, // Increased timeout for server selection
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
  connectTimeoutMS: 15000, // Give up initial connection after 15 seconds
  maxPoolSize: 10, // Maintain up to 10 socket connections
  heartbeatFrequencyMS: 10000, // Check server status every 10 seconds
};

console.log('Attempting to connect to MongoDB...');

// Try local MongoDB first
mongoose.connect(LOCAL_MONGODB_URI, mongooseOptions)
  .then(() => {
    console.log('Connected to local MongoDB successfully!');
  })
  .catch(err => {
    console.error('Local MongoDB connection error:', err);
    console.log('Attempting to connect to MongoDB Atlas...');
    
    // Try Atlas connection as fallback
    mongoose.connect(ATLAS_MONGODB_URI, mongooseOptions)
      .then(() => console.log('MongoDB Atlas connected successfully!'))
      .catch(atlasErr => {
        console.error('Failed to connect to MongoDB Atlas:', atlasErr);
        console.error('Warning: Application will run with limited functionality');
      });
  });

// Add connection error handler
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

// Add disconnection handler
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected, attempting to reconnect...');
});

// Connection timeout handler
mongoose.connection.on('timeout', () => {
  console.error('MongoDB connection timeout occurred');
});

// Define Category Schema
const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  icon: { type: String, default: '' },
  slug: { type: String, required: true, unique: true, trim: true },
  isActive: { type: Boolean, default: true },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

// Create Category model
const Category = mongoose.model('Category', CategorySchema);

// Category routes
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

app.get('/api/categories/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ message: 'Error creating category', error: error.message });
  }
});

app.put('/api/categories/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: 'Error updating category', error: error.message });
  }
});

app.delete('/api/categories/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error: error.message });
  }
});

// Display all routes for debugging
app._router.stack.forEach(function(r){
  if (r.route && r.route.path){
    console.log('Route:', r.route.path);
    Object.keys(r.route.methods).forEach(method => {
      console.log(' - Method:', method.toUpperCase());
    });
  }
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

// Start server with better error handling
const startServer = async () => {
  // Try with the default port first
  try {
    await app.listen(PORT);
    console.log(`Server running on port ${PORT}`);
  } catch (err) {
    if (err.code === 'EADDRINUSE') {
      // If the port is in use, try an alternative port (PORT + 1)
      const altPort = parseInt(PORT) + 1;
      console.log(`Port ${PORT} is in use, trying alternative port ${altPort}...`);
      
      try {
        await app.listen(altPort);
        console.log(`Server running on alternative port ${altPort}`);
      } catch (altErr) {
        console.error(`Failed to start server on alternative port: ${altErr.message}`);
        process.exit(1);
      }
    } else {
      console.error(`Failed to start server: ${err.message}`);
      process.exit(1);
    }
  }
};

startServer(); 