const mongoose = require('mongoose');

// Connection string with proper encoding for special characters in password
const connectionString = 'mongodb+srv://futurelift-admin:Hit%40721657@futurelift.yey18rr.mongodb.net/?retryWrites=true&w=majority';

console.log('Testing MongoDB Atlas connection...');

// Connect to MongoDB
mongoose.connect(connectionString)
  .then(() => {
    console.log('✅ MongoDB Atlas connection successful!');
    
    // Create a simple model to test CRUD operations
    const TestSchema = new mongoose.Schema({
      name: String,
      timestamp: { type: Date, default: Date.now }
    });
    
    const Test = mongoose.model('Test', TestSchema);
    
    // Create a test document
    return Test.create({ name: 'Connection Test' })
      .then(doc => {
        console.log('✅ Successfully created test document:', doc);
        return Test.findByIdAndDelete(doc._id);
      })
      .then(() => {
        console.log('✅ Successfully deleted test document');
        console.log('All database operations successful!');
      });
  })
  .catch(err => {
    console.error('❌ MongoDB Atlas connection error:', err);
  })
  .finally(() => {
    // Close the connection
    mongoose.connection.close()
      .then(() => console.log('Connection closed'))
      .catch(err => console.error('Error closing connection:', err));
  }); 