import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../styles/NotificationsPage.css';
import * as notificationService from '../services/notificationService';

const NotificationsPage = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, unread, read

  // Load notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      setError(null);
      try {
        if (isAuthenticated) {
          console.log('Fetching notifications for user:', currentUser);
          const fetchedNotifications = await notificationService.getNotifications();
          console.log('Notifications response:', fetchedNotifications);
          setNotifications(fetchedNotifications);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        // More detailed error message
        let errorMessage = 'Failed to load notifications. Please try again later.';
        if (err.response) {
          console.log('Error response:', err.response);
          errorMessage = `Error ${err.response.status}: ${err.response.data?.message || errorMessage}`;
        }
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [isAuthenticated, currentUser]);

  // Mark notification as read
  const markAsRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      // Update local state
      setNotifications(notifications.map(notif => 
        notif._id === id ? { ...notif, isRead: true } : notif
      ));
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      // Update local state
      setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
    }
  };

  // Delete notification
  const deleteNotification = async (id) => {
    try {
      await notificationService.deleteNotification(id);
      // Update local state
      setNotifications(notifications.filter(notif => notif._id !== id));
    } catch (err) {
      console.error('Error deleting notification:', err);
    }
  };

  // Filter notifications
  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'read') return notif.isRead;
    if (filter === 'unread') return !notif.isRead;
    return true; // 'all'
  });

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    
    return date.toLocaleDateString();
  };

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'info': return 'fas fa-info-circle text-blue-500';
      case 'success': return 'fas fa-check-circle text-green-500';
      case 'warning': return 'fas fa-exclamation-triangle text-yellow-500';
      case 'error': return 'fas fa-exclamation-circle text-red-500';
      default: return 'fas fa-bell text-gray-500';
    }
  };

  // Handle retry loading notifications
  const handleRetry = () => {
    setError(null);
    setLoading(true);
    notificationService.getNotifications()
      .then(fetchedNotifications => {
        setNotifications(fetchedNotifications);
        setLoading(false);
      })
      .catch(err => {
        console.error('Retry error:', err);
        setError('Failed to load notifications. Please try again later.');
        setLoading(false);
      });
  };

  if (!isAuthenticated) {
    return (
      <div className="notification-container">
        <div className="notification-not-logged-in">
          <i className="fas fa-lock text-4xl mb-4"></i>
          <h2 className="text-xl font-semibold mb-2">Login Required</h2>
          <p className="mb-4">Please login to view your notifications</p>
          <Link to="/login" className="notification-login-btn">
            Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="notification-container">
      <div className="notification-header">
        <h1 className="notification-title">Notifications</h1>
        <div className="notification-actions">
          <div className="notification-filters">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
              onClick={() => setFilter('unread')}
            >
              Unread
            </button>
            <button 
              className={`filter-btn ${filter === 'read' ? 'active' : ''}`}
              onClick={() => setFilter('read')}
            >
              Read
            </button>
          </div>
          <button 
            className="mark-all-btn"
            onClick={markAllAsRead}
            disabled={!notifications.some(n => !n.isRead)}
          >
            Mark All as Read
          </button>
        </div>
      </div>

      {loading ? (
        <div className="notification-loading">
          <div className="spinner"></div>
          <p>Loading notifications...</p>
        </div>
      ) : error ? (
        <div className="notification-error">
          <i className="fas fa-exclamation-circle"></i>
          <p>{error}</p>
          <button 
            className="retry-btn mt-4"
            onClick={handleRetry}
          >
            Retry
          </button>
        </div>
      ) : filteredNotifications.length === 0 ? (
        <div className="notification-empty">
          <i className="fas fa-bell-slash"></i>
          <p>No notifications found</p>
          {filter !== 'all' && (
            <button 
              className="view-all-btn"
              onClick={() => setFilter('all')}
            >
              View All Notifications
            </button>
          )}
        </div>
      ) : (
        <div className="notification-list">
          {filteredNotifications.map((notification) => (
            <div 
              key={notification._id} 
              className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
            >
              <div className="notification-icon">
                <i className={getNotificationIcon(notification.type)}></i>
              </div>
              <div className="notification-content">
                <div className="notification-title-row">
                  <h3 className="notification-item-title">{notification.title}</h3>
                  <span className="notification-time">{formatDate(notification.createdAt)}</span>
                </div>
                <p className="notification-message">{notification.message}</p>
                <div className="notification-actions">
                  {notification.link && (
                    <Link to={notification.link} className="notification-link">
                      View Details
                    </Link>
                  )}
                  {!notification.isRead && (
                    <button 
                      className="mark-read-btn"
                      onClick={() => markAsRead(notification._id)}
                    >
                      Mark as Read
                    </button>
                  )}
                  <button 
                    className="delete-btn"
                    onClick={() => deleteNotification(notification._id)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage; 