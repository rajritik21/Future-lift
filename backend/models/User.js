const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"]
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please enter a valid email address"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Password should be at least 6 characters"]
  },
  mobile: {
    type: String,
    required: false
  },
  avatar: {
    public_id: {
      type: String,
      required: false
    },
    url: {
      type: String,
      required: false
    },
  },
  dob: {
    type: Date,
    required: false
  },
  userType: {
    type: String,
    required: true,
    enum: ['jobseeker', 'employer', 'admin'],
    default: 'jobseeker'
  },
  isEmailVerified: {
    type: Boolean,
    default: true
  },
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
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
  role: {
    type: String,
    enum: ["job-seeker", "employer", "admin"],
    default: "job-seeker"
  },
  skills: [
    {
      type: String
    }
  ],
  resume: {
    public_id: {
      type: String,
      required: false
    },
    url: {
      type: String,
      required: false
    },
  },
  savedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job'
    }
  ],
  appliedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema); 