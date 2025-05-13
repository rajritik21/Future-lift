const mongoose = require('mongoose');

// Connection string with proper encoding for special characters in password
const connectionString = 'mongodb+srv://futurelift_admin:FutureLift%40hit@futureliftdb.0jhdaqa.mongodb.net/?retryWrites=true&w=majority&appName=FutureLiftDB';

console.log('Starting MongoDB connection test...');
console.log('Using connection string:', connectionString.replace(/\/\/.*:.*@/, '//[USERNAME:PASSWORD]@'));

// Set mongoose options
const options = {
  serverSelectionTimeoutMS: 15000, // Increase timeout for finding a server
  connectTimeoutMS: 30000,        // Increase connection timeout
  socketTimeoutMS: 45000,         // Increase socket timeout
  family: 4                       // Use IPv4, skip trying IPv6
};

// Connect to MongoDB
console.log('Attempting to connect to MongoDB...');
mongoose.connect(connectionString, options)
  .then(() => {
    console.log('✅ MongoDB Atlas connection successful!');
    
    // Create a simple model to test CRUD operations
    const TestSchema = new mongoose.Schema({
      name: String,
      timestamp: { type: Date, default: Date.now }
    });
    
    const Test = mongoose.model('Test', TestSchema);
    
    console.log('Attempting to create a test document...');
    // Create a test document
    return Test.create({ name: 'Connection Test' })
      .then(doc => {
        console.log('✅ Successfully created test document:', doc);
        console.log('Attempting to delete the test document...');
        return Test.findByIdAndDelete(doc._id);
      })
      .then(() => {
        console.log('✅ Successfully deleted test document');
        console.log('All database operations successful!');
      });
  })
  .catch(err => {
    console.error('❌ MongoDB Atlas connection error:');
    console.error('Error name:', err.name);
    console.error('Error message:', err.message);
    console.error('Error details:', err);
    
    if (err.name === 'MongoServerSelectionError') {
      console.error('\nThis error often happens when:');
      console.error('1. The connection string is incorrect');
      console.error('2. Network access isn\'t configured correctly in MongoDB Atlas');
      console.error('3. The username or password is incorrect');
      console.error('\nPlease check these settings in your MongoDB Atlas dashboard.');
    }
  })
  .finally(() => {
    console.log('Test completed, closing connection if open...');
    // Close the connection
    if (mongoose.connection.readyState !== 0) {
      mongoose.connection.close()
        .then(() => console.log('Connection closed successfully'))
        .catch(err => console.error('Error closing connection:', err));
    } else {
      console.log('No active connection to close');
    }
    
    console.log('MongoDB connection test finished');
  }); 