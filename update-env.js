const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Path to the .env file
const envPath = path.join(__dirname, '.env');

// Check if .env file exists
if (!fs.existsSync(envPath)) {
  console.log('\x1b[33mWarning: .env file does not exist. Creating a new one.\x1b[0m');
  
  // Create a basic .env file with the MongoDB and other settings
  const basicEnv = `# MongoDB Connection
MONGO_URI=mongodb+srv://futurelift_admin:FutureLift%40hit@futureliftdb.0jhdaqa.mongodb.net/?retryWrites=true&w=majority&appName=FutureLiftDB

# JWT Secret for Authentication
JWT_SECRET=futureliftjobportalsecret

# Server Port
PORT=5003

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=dlpgsnezh
CLOUDINARY_API_KEY=912588377895983
CLOUDINARY_API_SECRET=CoIzL6jZmXbW4_kS3BHeSBqfXyg

# Admin Registration
DEFAULT_ADMIN_ACCESS_CODE=FUTURELIFT2024

`;
  
  fs.writeFileSync(envPath, basicEnv);
  console.log('\x1b[32mCreated a basic .env file.\x1b[0m');
}

console.log('\x1b[36m=== Email Configuration Setup ===\x1b[0m');
console.log('This script will update your .env file with email credentials.');
console.log('You need a Gmail account and an app password.');
console.log('For instructions on creating an app password, check email-setup-instructions.txt\n');

rl.question('Enter your Gmail address: ', (email) => {
  rl.question('Enter your App Password: ', (password) => {
    // Read the current .env file
    let envContent = fs.readFileSync(envPath, 'utf8');
    
    // Check if EMAIL_ variables already exist and update them
    if (envContent.includes('EMAIL_USERNAME=')) {
      envContent = envContent.replace(/EMAIL_USERNAME=.*\n/, `EMAIL_USERNAME=${email}\n`);
    } else {
      envContent += `\n# Email Configuration\nEMAIL_USERNAME=${email}\n`;
    }
    
    if (envContent.includes('EMAIL_PASSWORD=')) {
      envContent = envContent.replace(/EMAIL_PASSWORD=.*\n/, `EMAIL_PASSWORD=${password}\n`);
    } else {
      envContent += `EMAIL_PASSWORD=${password}\n`;
    }
    
    if (envContent.includes('EMAIL_FROM=')) {
      envContent = envContent.replace(/EMAIL_FROM=.*\n/, `EMAIL_FROM=FutureLift Job Portal <${email}>\n`);
    } else {
      envContent += `EMAIL_FROM=FutureLift Job Portal <${email}>\n`;
    }
    
    // Write the updated content back to the .env file
    fs.writeFileSync(envPath, envContent);
    
    console.log('\n\x1b[32mEmail configuration updated successfully!\x1b[0m');
    console.log('Restart your server with "npm run server" for changes to take effect.');
    
    rl.close();
  });
}); 