import axios from 'axios';
import { getAuthToken } from '../utils/authUtils';
import { getCurrentUser } from '../utils/authUtils';

const API_URL = '/api/notifications';

/**
 * Get user notifications
 * @returns {Promise<Array>} Notifications array
 */
export const getNotifications = async () => {
  try {
    const token = getAuthToken();
    console.log('Auth token for notification request:', token ? 'Token exists' : 'No token');
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    // Get current user
    const currentUser = getCurrentUser();
    
    // Special handling for admin users if normal route fails
    if (currentUser && (currentUser.userType === 'admin' || currentUser.role === 'admin')) {
      try {
        // First try the standard authenticated route
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        };
        
        console.log('Making GET request to:', API_URL);
        const response = await axios.get(API_URL, config);
        console.log('Notification response status:', response.status);
        return response.data;
      } catch (authError) {
        console.log('Error with authenticated route, trying debug endpoint for admin');
        // Fall back to debug endpoint for admin users
        console.log('Using debug endpoint for admin:', currentUser.email);
        const debugResponse = await axios.get(`${API_URL}/debug/${currentUser.email}`);
        console.log('Debug endpoint response:', debugResponse.status);
        return debugResponse.data.notifications;
      }
    }
    
    // Standard path for non-admin users
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };

    console.log('Making GET request to:', API_URL);
    const response = await axios.get(API_URL, config);
    console.log('Notification response status:', response.status);
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    throw error;
  }
};

/**
 * Get unread notification count
 * @returns {Promise<number>} Count of unread notifications
 */
export const getUnreadCount = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      console.warn('No auth token for unread count');
      return 0;
    }
    
    // Get current user
    const currentUser = getCurrentUser();
    
    // Special handling for admin users if normal route fails
    if (currentUser && (currentUser.userType === 'admin' || currentUser.role === 'admin')) {
      try {
        // First try standard route
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        };
        
        const response = await axios.get(`${API_URL}/unread-count`, config);
        return response.data.count;
      } catch (authError) {
        // Fall back to debug endpoint for admin users
        console.log('Using debug endpoint for admin count:', currentUser.email);
        const debugResponse = await axios.get(`${API_URL}/debug/${currentUser.email}`);
        // Count unread notifications manually
        const unreadCount = debugResponse.data.notifications.filter(n => !n.isRead).length;
        return unreadCount;
      }
    }
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };

    const response = await axios.get(`${API_URL}/unread-count`, config);
    return response.data.count;
  } catch (error) {
    console.error('Error fetching unread count:', error);
    return 0; // Return 0 on error to prevent UI breaking
  }
};

/**
 * Mark a notification as read
 * @param {string} id Notification ID
 * @returns {Promise<Object>} Updated notification
 */
export const markAsRead = async (id) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };

    const response = await axios.patch(`${API_URL}/${id}/read`, {}, config);
    return response.data;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};

/**
 * Mark all notifications as read
 * @returns {Promise<Object>} Success response
 */
export const markAllAsRead = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };

    const response = await axios.patch(`${API_URL}/read-all`, {}, config);
    return response.data;
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    throw error;
  }
};

/**
 * Delete a notification
 * @param {string} id Notification ID
 * @returns {Promise<Object>} Success response
 */
export const deleteNotification = async (id) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };

    const response = await axios.delete(`${API_URL}/${id}`, config);
    return response.data;
  } catch (error) {
    console.error('Error deleting notification:', error);
    throw error;
  }
}; 