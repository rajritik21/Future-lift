const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  coverLetter: {
    type: String,
    required: [true, "Cover letter is required"]
  },
  status: {
    type: String,
    enum: ['pending', 'under-review', 'shortlisted', 'rejected', 'accepted'],
    default: 'pending'
  },
  additionalDocuments: [
    {
      public_id: {
        type: String
      },
      url: {
        type: String
      },
      name: {
        type: String
      }
    }
  ],
  notes: {
    type: String
  },
  appliedAt: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

// Update the lastUpdated field whenever the application status changes
ApplicationSchema.pre('save', function(next) {
  if (this.isModified('status')) {
    this.lastUpdated = Date.now();
  }
  next();
});

module.exports = mongoose.model('Application', ApplicationSchema); 