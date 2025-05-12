const mongoose = require('mongoose');

const InternshipSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'company'
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Remote', 'Onsite', 'Hybrid'],
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  stipend: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  responsibilities: {
    type: [String]
  },
  requirements: {
    type: [String]
  },
  perks: {
    type: [String]
  },
  startDate: {
    type: Date
  },
  applicationDeadline: {
    type: Date
  },
  openings: {
    type: Number,
    default: 1
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
        enum: ['pending', 'reviewed', 'rejected', 'shortlisted', 'selected']
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
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('internship', InternshipSchema); 