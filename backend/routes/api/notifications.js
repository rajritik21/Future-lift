const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { isAuthenticated } = require('../../middleware/auth');
const notificationController = require('../../controllers/notificationController');
const Notification = require('../../models/Notification');
const User = require('../../models/User');

// @route   GET /api/notifications
// @desc    Get all notifications for the current user
// @access  Private
router.get('/', isAuthenticated, notificationController.getNotifications);

// @route   GET /api/notifications/unread-count
// @desc    Get unread notification count
// @access  Private
router.get('/unread-count', isAuthenticated, notificationController.getUnreadCount);

// @route   PATCH /api/notifications/:id/read
// @desc    Mark a notification as read
// @access  Private
router.patch('/:id/read', isAuthenticated, notificationController.markAsRead);

// @route   PATCH /api/notifications/read-all
// @desc    Mark all notifications as read
// @access  Private
router.patch('/read-all', isAuthenticated, notificationController.markAllAsRead);

// @route   DELETE /api/notifications/:id
// @desc    Delete a notification
// @access  Private
router.delete('/:id', isAuthenticated, notificationController.deleteNotification);

// @route   POST /api/notifications
// @desc    Create a notification (for admin or system use)
// @access  Private/Admin
router.post(
  '/',
  [
    isAuthenticated,
    check('userId', 'User ID is required').not().isEmpty(),
    check('title', 'Title is required').not().isEmpty(),
    check('message', 'Message is required').not().isEmpty(),
    check('type', 'Type must be info, success, warning, or error').optional().isIn(['info', 'success', 'warning', 'error'])
  ],
  notificationController.createNotification
);

// @route   GET /api/notifications/debug/:email
// @desc    Debug endpoint to get notifications for a specific user by email
// @access  Public (for testing only - remove in production)
router.get('/debug/:email', async (req, res) => {
  try {
    console.log('Debug endpoint called for email:', req.params.email);
    
    // Find user by email
    const user = await User.findOne({ email: req.params.email });
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: `User not found with email: ${req.params.email}`
      });
    }
    
    console.log('Found user:', user.name, user._id);
    
    // Get notifications for this user
    const notifications = await Notification.find({ user: user._id })
      .sort({ createdAt: -1 })
      .limit(50);
    
    console.log(`Found ${notifications.length} notifications for ${user.name}`);
    
    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType
      },
      notifications
    });
  } catch (err) {
    console.error('Error in debug endpoint:', err.message);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: err.message
    });
  }
});

module.exports = router;