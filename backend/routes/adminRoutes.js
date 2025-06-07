const express = require('express');
const router = express.Router();
const { 
  getAllUsers, 
  getUserById, 
  updateUserRole, 
  deleteUser,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
  getDashboardStats,
  removeAllAdmins
} = require('../controllers/adminController');
const { isAuthenticated, authorizeAdmin, authorizeRoles } = require('../middleware/auth');

// Dashboard routes
router.route('/dashboard/stats').get(isAuthenticated, authorizeAdmin(), getDashboardStats);

// Special route to remove all admin users (no auth required - use with caution)
router.route('/reset-admins').post(removeAllAdmins);

// User management routes
router.route('/users').get(isAuthenticated, authorizeAdmin('manageUsers'), getAllUsers);
router.route('/users/:id')
  .get(isAuthenticated, authorizeAdmin('manageUsers'), getUserById)
  .put(isAuthenticated, authorizeAdmin('manageUsers'), updateUserRole)
  .delete(isAuthenticated, authorizeAdmin('manageUsers'), deleteUser);

// Job management routes
router.route('/jobs').get(isAuthenticated, authorizeAdmin('manageJobs'), getAllJobs);
router.route('/jobs/:id')
  .get(isAuthenticated, authorizeAdmin('manageJobs'), getJobById)
  .put(isAuthenticated, authorizeAdmin('manageJobs'), updateJob)
  .delete(isAuthenticated, authorizeAdmin('manageJobs'), deleteJob);

// Application management routes
router.route('/applications').get(isAuthenticated, authorizeAdmin('manageJobs'), getAllApplications);
router.route('/applications/:id')
  .get(isAuthenticated, authorizeAdmin('manageJobs'), getApplicationById)
  .put(isAuthenticated, authorizeAdmin('manageJobs'), updateApplicationStatus)
  .delete(isAuthenticated, authorizeAdmin('manageJobs'), deleteApplication);

module.exports = router; 