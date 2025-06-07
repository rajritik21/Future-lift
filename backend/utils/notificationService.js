const Notification = require('../models/Notification');

/**
 * Notification Service - Utility functions for creating notifications
 */
const notificationService = {
  /**
   * Create a new notification
   * @param {Object} notification - Notification data
   * @param {string} notification.userId - User ID to receive notification
   * @param {string} notification.type - Notification type (info, success, warning, error)
   * @param {string} notification.title - Notification title
   * @param {string} notification.message - Notification message
   * @param {string} notification.link - Optional link for the notification
   * @returns {Promise<Object>} - Created notification
   */
  async createNotification({ userId, type, title, message, link = '' }) {
    try {
      const notification = new Notification({
        user: userId,
        type: type || 'info',
        title,
        message,
        link,
        isRead: false
      });

      await notification.save();
      return notification;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  },

  /**
   * Send a welcome notification to a new user
   * @param {string} userId - User ID
   * @param {string} userName - User's name
   * @returns {Promise<Object>} - Created notification
   */
  async sendWelcomeNotification(userId, userName) {
    return this.createNotification({
      userId,
      type: 'info',
      title: 'Welcome to FutureLift!',
      message: `Hello ${userName}, welcome to FutureLift Job Portal. Complete your profile to get started.`,
      link: '/dashboard'
    });
  },

  /**
   * Send a job application confirmation notification
   * @param {string} userId - User ID
   * @param {string} jobTitle - Job title
   * @param {string} companyName - Company name
   * @param {string} applicationId - Application ID
   * @returns {Promise<Object>} - Created notification
   */
  async sendApplicationConfirmation(userId, jobTitle, companyName, applicationId) {
    return this.createNotification({
      userId,
      type: 'success',
      title: 'Application Submitted',
      message: `Your application for ${jobTitle} at ${companyName} has been successfully submitted.`,
      link: `/jobs/applications/${applicationId}`
    });
  },

  /**
   * Send a notification about application status change
   * @param {string} userId - User ID
   * @param {string} jobTitle - Job title
   * @param {string} companyName - Company name
   * @param {string} status - New application status
   * @param {string} applicationId - Application ID
   * @returns {Promise<Object>} - Created notification
   */
  async sendApplicationStatusUpdate(userId, jobTitle, companyName, status, applicationId) {
    let type = 'info';
    let message = '';

    switch (status.toLowerCase()) {
      case 'shortlisted':
        type = 'success';
        message = `Congratulations! Your application for ${jobTitle} at ${companyName} has been shortlisted.`;
        break;
      case 'rejected':
        type = 'warning';
        message = `We regret to inform you that your application for ${jobTitle} at ${companyName} was not selected.`;
        break;
      case 'interview':
        type = 'success';
        message = `Great news! You've been selected for an interview for ${jobTitle} at ${companyName}.`;
        break;
      case 'offered':
        type = 'success';
        message = `Congratulations! You've received a job offer for ${jobTitle} at ${companyName}.`;
        break;
      default:
        message = `Your application status for ${jobTitle} at ${companyName} has been updated to ${status}.`;
    }

    return this.createNotification({
      userId,
      type,
      title: 'Application Status Updated',
      message,
      link: `/jobs/applications/${applicationId}`
    });
  },

  /**
   * Send job recommendations
   * @param {string} userId - User ID
   * @param {number} count - Number of recommendations
   * @returns {Promise<Object>} - Created notification
   */
  async sendJobRecommendations(userId, count) {
    return this.createNotification({
      userId,
      type: 'info',
      title: 'Job Recommendations',
      message: `We found ${count} new jobs that match your profile. Check them out!`,
      link: '/jobs'
    });
  },

  /**
   * Send profile completion reminder
   * @param {string} userId - User ID
   * @param {number} percentage - Profile completion percentage
   * @returns {Promise<Object>} - Created notification
   */
  async sendProfileCompletionReminder(userId, percentage) {
    return this.createNotification({
      userId,
      type: 'warning',
      title: 'Profile Incomplete',
      message: `Your profile is only ${percentage}% complete. Complete your profile to increase visibility to employers.`,
      link: '/dashboard/profile'
    });
  },

  /**
   * Send a system notification to a user
   * @param {string} userId - User ID
   * @param {string} title - Notification title
   * @param {string} message - Notification message
   * @param {string} type - Notification type
   * @param {string} link - Optional link
   * @returns {Promise<Object>} - Created notification
   */
  async sendSystemNotification(userId, title, message, type = 'info', link = '') {
    return this.createNotification({
      userId,
      type,
      title,
      message,
      link
    });
  }
};

module.exports = notificationService; 