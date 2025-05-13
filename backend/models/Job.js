const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter job title"],
    trim: true
  },
  description: {
    type: String,
    required: [true, "Please enter job description"]
  },
  companyName: {
    type: String,
    required: [true, "Please enter company name"]
  },
  companyLogo: {
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  location: {
    type: String,
    required: [true, "Please enter job location"]
  },
  salary: {
    min: {
      type: Number
    },
    max: {
      type: Number
    },
    type: {
      type: String,
      enum: ['hourly', 'monthly', 'yearly'],
      default: 'monthly'
    },
    showSalary: {
      type: Boolean,
      default: true
    }
  },
  jobType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship', 'remote'],
    required: [true, "Please select job type"]
  },
  category: {
    type: String,
    required: [true, "Please select job category"]
  },
  requiredSkills: [{
    type: String,
    required: [true, "Please add at least one required skill"]
  }],
  experienceLevel: {
    type: String,
    enum: ['entry', 'intermediate', 'senior', 'executive'],
    required: [true, "Please select experience level"]
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  applications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application'
  }],
  active: {
    type: Boolean,
    default: true
  },
  applicationDeadline: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add text index for search functionality
JobSchema.index({ 
  title: 'text', 
  description: 'text', 
  companyName: 'text',
  location: 'text',
  requiredSkills: 'text'
});

module.exports = mongoose.model('Job', JobSchema); 