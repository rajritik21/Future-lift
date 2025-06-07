const fs = require('fs');
const path = require('path');

// Path to the .env file
const envPath = path.join(__dirname, '.env');

// Check if .env file exists
if (!fs.existsSync(envPath)) {
  console.error('\x1b[31mError: .env file does not exist.\x1b[0m');
  console.log('Please run node update-env.js first to create the .env file.');
  process.exit(1);
}

// Read the current .env file
let envContent = fs.readFileSync(envPath, 'utf8');

// Check if DEV_MODE variable already exists and update it
if (envContent.includes('DEV_MODE=')) {
  envContent = envContent.replace(/DEV_MODE=.*\n/, `DEV_MODE=true\n`);
} else {
  envContent += `\n# Development Mode (bypasses email verification)\nDEV_MODE=true\n`;
}

// Write the updated content back to the .env file
fs.writeFileSync(envPath, envContent);

console.log('\x1b[32mDevelopment mode enabled!\x1b[0m');
console.log('Email verification will be bypassed when DEV_MODE=true.');
console.log('To disable development mode, edit the .env file and set DEV_MODE=false or remove the line.'); 