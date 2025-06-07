const crypto = require('crypto');

/**
 * Generate a random token for email verification or password reset
 * @returns {Object} Object containing token and hashed token
 */
exports.generateToken = () => {
  // Generate a random token
  const token = crypto.randomBytes(32).toString('hex');
  
  // Hash the token (to store in DB)
  const hashedToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
  
  return {
    token,           // Send this to the user via email
    hashedToken      // Store this in the database
  };
};

/**
 * Hash a token received from user for comparison with stored hash
 * @param {string} token - The token to hash
 * @returns {string} The hashed token
 */
exports.hashToken = (token) => {
  return crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
}; 