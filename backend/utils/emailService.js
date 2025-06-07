const nodemailer = require('nodemailer');

// Configure nodemailer transporter
const createTransporter = () => {
  // Create a Gmail transporter with App Password
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'futurelifthit@gmail.com',
      pass: process.env.EMAIL_PASS || 'htjs oqyt zzra jitr' // App Password (not regular password)
    }
  });
  
  return transporter;
};

/**
 * Send a password reset email
 * @param {string} to - Recipient email
 * @param {string} name - Recipient name
 * @param {string} token - Reset token
 * @returns {Promise}
 */
exports.sendPasswordResetEmail = async (to, name, token) => {
  try {
    const transporter = createTransporter();
    
    // Generate the reset URL
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const resetUrl = `${baseUrl}/reset-password?token=${token}`;
    
    // Email content
    const mailOptions = {
      from: '"FutureLift Job Portal" <futurelifthit@gmail.com>',
      to,
      subject: 'Password Reset Request',
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <div style="background: linear-gradient(to right, #667eea, #764ba2); padding: 20px; color: white; text-align: center; border-radius: 5px 5px 0 0;">
            <h1 style="margin: 0;">Password Reset</h1>
          </div>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 0 0 5px 5px; border: 1px solid #ddd; border-top: none;">
            <p>Hello ${name},</p>
            <p>We received a request to reset your password. Please click the button below to create a new password:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="background: linear-gradient(to right, #667eea, #764ba2); color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
            </div>
            
            <p>Or copy and paste this link into your browser:</p>
            <p style="background-color: #eeeeee; padding: 10px; border-radius: 4px; word-break: break-all;">
              ${resetUrl}
            </p>
            
            <p>This link will expire in 1 hour.</p>
            
            <p>If you did not request a password reset, please ignore this email or contact our support team if you have concerns.</p>
            
            <p>Best regards,<br>The FutureLift Team</p>
          </div>
          <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
            <p>&copy; 2024 FutureLift Job Portal. All rights reserved.</p>
          </div>
        </div>
      `
    };
    
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${to}`);
    
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
}; 