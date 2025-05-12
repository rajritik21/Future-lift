const mongoose = require('mongoose');

const AdminAccessCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  adminRole: {
    type: String,
    enum: ['super_admin', 'team_member'],
    default: 'team_member'
  },
  permissions: {
    manageUsers: { type: Boolean, default: false },
    manageJobs: { type: Boolean, default: true },
    manageInternships: { type: Boolean, default: true },
    manageAdminCodes: { type: Boolean, default: false },
    manageSettings: { type: Boolean, default: false },
    viewAnalytics: { type: Boolean, default: true }
  },
  usageLimit: {
    type: Number,
    default: 1 // Default to single use
  },
  usageCount: {
    type: Number,
    default: 0
  },
  expiresAt: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add method to check if code is valid
AdminAccessCodeSchema.methods.isValid = function() {
  return this.isActive && 
         this.usageCount < this.usageLimit && 
         new Date() < this.expiresAt;
};

module.exports = mongoose.model('adminAccessCode', AdminAccessCodeSchema); 