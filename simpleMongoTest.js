console.log('Script starting...');
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
});

const { MongoClient } = require('mongodb');
console.log('MongoDB package loaded');

// Connection URL with properly encoded password (@ becomes %40)
const url = 'mongodb+srv://futurelift_admin:FutureLift%40hit@futureliftdb.0jhdaqa.mongodb.net/?retryWrites=true&w=majority&appName=FutureLiftDB';
console.log('Using connection URL:', url.replace(/\/\/.*:.*@/, '//[USERNAME:PASSWORD]@'));

// Test function
async function main() {
  console.log('Starting MongoDB connection test...');
  
  // Create a new MongoDB client
  const client = new MongoClient(url, {
    connectTimeoutMS: 30000,
    socketTimeoutMS: 45000,
    serverSelectionTimeoutMS: 60000
  });

  try {
    console.log('Attempting to connect to the database...');
    
    // Connect to the MongoDB server
    await client.connect();
    console.log('✅ Successfully connected to MongoDB!');
    
    // Get the list of database names
    const databasesList = await client.db().admin().listDatabases();
    console.log('Databases:');
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    
    // Try to insert a test document
    const testDB = client.db('test');
    const testCollection = testDB.collection('connection_test');
    
    console.log('Inserting test document...');
    const result = await testCollection.insertOne({
      test: 'Connection test',
      date: new Date()
    });
    
    console.log('✅ Test document inserted:', result);
    
    // Delete the test document
    console.log('Deleting test document...');
    await testCollection.deleteOne({ _id: result.insertedId });
    console.log('✅ Test document deleted');
    
    console.log('Database connection test completed successfully!');
  } catch (err) {
    console.error('❌ MongoDB connection error:');
    console.error('Error name:', err.name);
    console.error('Error message:', err.message);
    
    if (err.name === 'MongoServerSelectionError') {
      console.error('\nThis error often happens when:');
      console.error('1. The connection string is incorrect');
      console.error('2. Network access isn\'t configured correctly in MongoDB Atlas');
      console.error('3. The username or password is incorrect');
      console.error('\nPlease check these settings in your MongoDB Atlas dashboard.');
    }
  } finally {
    // Close the connection
    await client.close();
    console.log('Connection closed');
  }
}

// Run the test
main().catch(console.error); 