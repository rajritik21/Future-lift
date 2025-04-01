const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'company'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  jobType: {
    type: String,
    required: true,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote']
  },
  category: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  salary: {
    type: String
  },
  skills: {
    type: [String],
    required: true
  },
  applications: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
      resume: {
        type: String
      },
      coverLetter: {
        type: String
      },
      status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'reviewed', 'rejected', 'shortlisted', 'hired']
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  isActive: {
    type: Boolean,
    default: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('job', JobSchema); 