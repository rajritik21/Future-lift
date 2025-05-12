const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');

// Load env variables
dotenv.config();

// MongoDB connection string - Default fallback
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://futurelift-admin:Hit%40721657@futurelift.yey18rr.mongodb.net/?retryWrites=true&w=majority&appName=futurelift';

// Function to create a test admin access code
const createTestCode = async () => {
  const client = new MongoClient(MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 30000
  });
  
  try {
    console.log('Attempting to connect to MongoDB directly...');
    await client.connect();
    console.log('Connected to MongoDB successfully!');
    
    const db = client.db(); // Get the default database
    const collection = db.collection('adminaccesscodes');
    
    // Create a mock admin ID
    const adminId = new ObjectId();
    
    // Set expiration date to 6 months from now
    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + 6);
    
    // Create the test code document
    const testCode = {
      code: 'TESTADMIN2024',
      description: 'Test Admin Access Code',
      createdBy: adminId,
      isActive: true,
      adminRole: 'super_admin',
      permissions: {
        manageUsers: true,
        manageJobs: true,
        manageInternships: true,
        manageAdminCodes: true,
        manageSettings: true,
        viewAnalytics: true
      },
      usageLimit: 5,
      usageCount: 0,
      expiresAt: expiresAt,
      createdAt: new Date()
    };
    
    // Insert the document
    const result = await collection.insertOne(testCode);
    
    if (result.acknowledged) {
      console.log('Test access code created successfully!');
      console.log('\nAccess Code: TESTADMIN2024');
      console.log('Admin Role: Super Admin (full access)');
      console.log(`Expires: ${expiresAt}`);
      console.log('Usage Limit: 5 (can be used 5 times)');
      
      console.log('\nUse this code in the registration form to create your Super Admin account.');
    } else {
      console.log('Failed to create access code.');
    }
  } catch (err) {
    console.error('Error:', err);
    console.log('\nIf the issue persists:');
    console.log('1. Check MongoDB connection in your .env file');
    console.log('2. Make sure MongoDB service is running');
    console.log('3. Verify network connectivity');
    console.log('4. You may need to ask your administrator for help');
  } finally {
    await client.close();
    console.log('MongoDB connection closed.');
  }
};

createTestCode(); 