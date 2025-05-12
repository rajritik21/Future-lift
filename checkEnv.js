const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load any existing environment variables
dotenv.config();

// Function to check and setup .env file
const checkAndSetupEnv = () => {
  try {
    const envPath = path.join(process.cwd(), '.env');
    
    console.log('Checking for .env file at:', envPath);
    
    // Check if .env file exists
    const envExists = fs.existsSync(envPath);
    
    if (envExists) {
      console.log('.env file exists. Current configuration:');
      
      // Read the current .env file
      const envContent = fs.readFileSync(envPath, 'utf8');
      console.log('\n------- CURRENT ENV CONFIGURATION -------');
      console.log(envContent);
      
      // Check for MONGO_URI
      if (!envContent.includes('MONGO_URI=')) {
        console.log('\nMONGO_URI is missing in .env file. Adding default connection.');
        const updatedContent = envContent + 
          '\n# MongoDB Connection\n' +
          'MONGO_URI=mongodb+srv://futurelift-admin:Hit%40721657@futurelift.yey18rr.mongodb.net/?retryWrites=true&w=majority&appName=futurelift\n';
        
        fs.writeFileSync(envPath, updatedContent);
        console.log('Added MONGO_URI to .env file.');
      } else {
        console.log('\nMONGO_URI already exists in .env file.');
      }
    } else {
      console.log('.env file does not exist. Creating a new one with default settings.');
      
      // Create a new .env file with default values
      const defaultEnv = 
        '# MongoDB Connection\n' +
        'MONGO_URI=mongodb+srv://futurelift-admin:Hit%40721657@futurelift.yey18rr.mongodb.net/?retryWrites=true&w=majority&appName=futurelift\n\n' +
        '# JWT Secret for authentication\n' +
        'JWT_SECRET=futureliftjobportalsecret\n\n' +
        '# Server configuration\n' +
        'PORT=5000\n' +
        'NODE_ENV=development\n';
      
      fs.writeFileSync(envPath, defaultEnv);
      console.log('Created new .env file with default settings.');
    }
    
    // Check and create the backend .env file if it doesn't exist
    const backendEnvPath = path.join(process.cwd(), 'backend', '.env');
    
    if (!fs.existsSync(backendEnvPath)) {
      console.log('\nBackend .env file does not exist. Creating a copy in the backend directory.');
      
      // Make sure the backend directory exists
      if (!fs.existsSync(path.join(process.cwd(), 'backend'))) {
        console.log('Backend directory not found. Skipping backend .env creation.');
      } else {
        // Read the current .env file (which should now exist)
        const envContent = fs.readFileSync(envPath, 'utf8');
        fs.writeFileSync(backendEnvPath, envContent);
        console.log('Created .env file in backend directory.');
      }
    } else {
      console.log('\nBackend .env file already exists.');
    }
    
    console.log('\nEnvironment setup completed successfully!');
    console.log('\nYou can now try to register with the access code: TESTADMIN2024');
    
  } catch (err) {
    console.error('Error setting up environment:', err);
  }
};

// Run the function
checkAndSetupEnv(); 