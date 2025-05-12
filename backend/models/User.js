const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  dob: {
    type: Date,
    required: function() {
      return this.userType === 'admin'; // Required only for admin users
    }
  },
  userType: {
    type: String,
    required: true,
    enum: ['jobseeker', 'employer', 'admin'],
    default: 'jobseeker'
  },
  adminRole: {
    type: String,
    enum: ['super_admin', 'team_member'],
    default: 'team_member'
  },
  adminPermissions: {
    manageUsers: { type: Boolean, default: false },
    manageJobs: { type: Boolean, default: false },
    manageInternships: { type: Boolean, default: false },
    manageAdminCodes: { type: Boolean, default: false },
    manageSettings: { type: Boolean, default: false },
    viewAnalytics: { type: Boolean, default: false }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('user', UserSchema); 