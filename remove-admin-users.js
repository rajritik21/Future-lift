const mongoose = require('mongoose');

// MongoDB connection string - use the one from your .env file
const MONGO_URI = 'mongodb+srv://futurelift_admin:FutureLift%40hit@futureliftdb.0jhdaqa.mongodb.net/?retryWrites=true&w=majority&appName=FutureLiftDB';

console.log('Starting admin removal process...');

// Connect to MongoDB and remove admin users
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    
    // Get the User model
    const User = mongoose.model('User', new mongoose.Schema({
      name: String,
      email: String,
      userType: String,
      role: String
    }));
    
    // Find admin users
    return User.find({ 
      $or: [
        { userType: 'admin' },
        { role: 'admin' }
      ]
    });
  })
  .then(admins => {
    console.log(`Found ${admins.length} admin users`);
    
    // Log each admin
    admins.forEach(admin => {
      console.log(`- ${admin.name} (${admin.email})`);
    });
    
    if (admins.length === 0) {
      console.log('No admin users to remove');
      return { deletedCount: 0 };
    }
    
    // Get the User model again
    const User = mongoose.model('User');
    
    // Delete admin users
    return User.deleteMany({ 
      $or: [
        { userType: 'admin' },
        { role: 'admin' }
      ]
    });
  })
  .then(result => {
    console.log(`Successfully removed ${result.deletedCount} admin users`);
    console.log('You can now register a new admin user');
  })
  .catch(err => {
    console.error('Error:', err.message);
  })
  .finally(() => {
    // Close the connection
    mongoose.connection.close();
    console.log('MongoDB connection closed');
  }); 