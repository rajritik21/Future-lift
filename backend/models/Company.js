const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  website: {
    type: String
  },
  logo: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  size: {
    type: String,
    enum: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'],
    required: true
  },
  location: {
    type: String,
    required: true
  },
  foundedYear: {
    type: Number
  },
  socialMedia: {
    linkedin: String,
    twitter: String,
    facebook: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('company', CompanySchema); 