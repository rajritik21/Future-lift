/**
 * Get the authentication token from localStorage
 * @returns {string|null} The auth token or null if not found
 */
export const getAuthToken = () => {
  const token = localStorage.getItem('token');
  // Add debug log when token is retrieved
  if (!token) {
    console.warn('No auth token found in localStorage');
  }
  return token;
};

/**
 * Check if user is authenticated by verifying token in localStorage
 * @returns {boolean} True if authenticated, false otherwise
 */
export const isAuthenticated = () => {
  const isAuth = !!getAuthToken();
  console.log('Authentication check result:', isAuth);
  return isAuth;
};

/**
 * Get the current user from localStorage
 * @returns {Object|null} User object or null if not found
 */
export const getCurrentUser = () => {
  const userString = localStorage.getItem('user');
  if (userString) {
    try {
      const user = JSON.parse(userString);
      console.log('Current user:', user ? `${user.name} (${user.userType})` : 'No user');
      return user;
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      return null;
    }
  }
  console.warn('No user found in localStorage');
  return null;
};

/**
 * Get the user's role/type from localStorage
 * @returns {string|null} User type or null if not found
 */
export const getUserType = () => {
  const user = getCurrentUser();
  const userType = user ? user.userType : null;
  console.log('User type:', userType || 'Not found');
  return userType;
};

/**
 * Clear authentication data from localStorage (for logout)
 */
export const clearAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  console.log('Auth data cleared from localStorage');
}; 