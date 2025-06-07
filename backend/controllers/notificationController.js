const Notification = require('../models/Notification');
const { validationResult } = require('express-validator');

// @desc    Get all notifications for the current user
// @route   GET /api/notifications
// @access  Private
exports.getNotifications = async (req, res) => {
  try {
    console.log('User in request:', req.user);
    console.log('User ID:', req.user._id);
    
    const notifications = await Notification.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);
    
    console.log(`Found ${notifications.length} notifications for user ${req.user._id}`);
    
    res.json(notifications);
  } catch (err) {
    console.error('Error fetching notifications:', err.message);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// @desc    Get unread notification count
// @route   GET /api/notifications/unread-count
// @access  Private
exports.getUnreadCount = async (req, res) => {
  try {
    console.log('Getting unread count for user:', req.user._id);
    
    const count = await Notification.countDocuments({
      user: req.user._id,
      isRead: false
    });
    
    console.log(`Unread notification count: ${count}`);
    
    res.json({ count });
  } catch (err) {
    console.error('Error fetching unread count:', err.message);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// @desc    Mark a notification as read
// @route   PATCH /api/notifications/:id/read
// @access  Private
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ errors: [{ msg: 'Notification not found' }] });
    }

    // Check if this notification belongs to the user
    if (notification.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ errors: [{ msg: 'Not authorized' }] });
    }

    // Update notification
    notification.isRead = true;
    await notification.save();

    res.json({ success: true, notification });
  } catch (err) {
    console.error('Error marking notification as read:', err.message);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// @desc    Mark all notifications as read
// @route   PATCH /api/notifications/read-all
// @access  Private
exports.markAllAsRead = async (req, res) => {
  try {
    const result = await Notification.updateMany(
      { user: req.user._id, isRead: false },
      { isRead: true }
    );
    
    console.log(`Marked ${result.modifiedCount} notifications as read for user ${req.user._id}`);

    res.json({ success: true });
  } catch (err) {
    console.error('Error marking all notifications as read:', err.message);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// @desc    Delete a notification
// @route   DELETE /api/notifications/:id
// @access  Private
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ errors: [{ msg: 'Notification not found' }] });
    }

    // Check if this notification belongs to the user
    if (notification.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ errors: [{ msg: 'Not authorized' }] });
    }

    await Notification.deleteOne({ _id: req.params.id });

    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting notification:', err.message);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// @desc    Create a notification (for admin or system use)
// @route   POST /api/notifications
// @access  Private/Admin
exports.createNotification = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { userId, type, title, message, link } = req.body;

    // Check if request is from admin or system
    if (req.user.userType !== 'admin') {
      return res.status(403).json({ errors: [{ msg: 'Not authorized' }] });
    }

    const notification = new Notification({
      user: userId,
      type: type || 'info',
      title,
      message,
      link: link || '',
      isRead: false
    });

    await notification.save();

    res.status(201).json({ success: true, notification });
  } catch (err) {
    console.error('Error creating notification:', err.message);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
}; 