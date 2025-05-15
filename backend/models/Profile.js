const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  headline: {
    type: String
  },
  location: {
    type: String
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldOfStudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      },
      marks: {
        type: String
      },
      totalMarks: {
        type: String
      },
      percentage: {
        type: String
      },
      cgpa: {
        type: String
      },
      maxCgpa: {
        type: String,
        default: "10.0"
      },
      gradingSystem: {
        type: String,
        enum: ['percentage', 'cgpa'],
        default: 'percentage'
      }
    }
  ],
  socialMedia: {
    linkedin: String,
    twitter: String,
    github: String,
    website: String
  },
  resume: {
    public_id: {
      type: String
    },
    url: {
      type: String
    },
    filename: {
      type: String
    },
    uploadDate: {
      type: Date,
      default: Date.now
    }
  },
  jobPreferences: {
    jobTypes: {
      type: [String],
      enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote']
    },
    preferredLocations: [String],
    expectedSalary: String,
    willingToRelocate: {
      type: Boolean,
      default: false
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('profile', ProfileSchema); 