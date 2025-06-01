const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    index: true
  },
  skills: {
    type: String,
    required: false,
    trim: true,
    default: 'Not specified'
  },
  subscriptionDate: {
    type: Date,
    default: Date.now
  },
  source: {
    type: String,
    enum: ['homepage', 'footer', 'webinars', 'other'],
    default: 'other'
  },
  active: {
    type: Boolean,
    default: true
  },
  preferences: {
    jobAlerts: {
      type: Boolean,
      default: true
    },
    newsletters: {
      type: Boolean,
      default: false
    },
    events: {
      type: Boolean,
      default: false
    }
  }
});

// Create a unique compound index on email and source
// This allows the same email to subscribe from different sources
SubscriptionSchema.index({ email: 1, source: 1 }, { unique: true });

module.exports = mongoose.model('Subscription', SubscriptionSchema); 