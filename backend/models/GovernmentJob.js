const mongoose = require('mongoose');

const GovernmentJobSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true
  },
  department: {
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
  salary: {
    type: String,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  experienceRequired: {
    type: String,
    default: 'Fresher'
  },
  vacancies: {
    type: Number,
    required: true
  },
  applicationBeginDate: {
    type: Date,
    required: true
  },
  applicationDeadlineDate: {
    type: Date,
    required: true
  },
  completeFormLastDate: {
    type: Date
  },
  examDate: {
    type: String
  },
  admitCardDate: {
    type: Date
  },
  applicationFee: {
    general: {
      type: String
    },
    sc_st: {
      type: String
    },
    ph: {
      type: String
    },
    women: {
      type: String
    },
    paymentMethods: {
      type: [String]
    }
  },
  ageLimit: {
    asOnDate: {
      type: Date
    },
    minimumAge: {
      type: Number
    },
    maximumAge: {
      type: Number
    },
    relaxationRules: {
      type: String
    }
  },
  categoryVacancy: {
    UR: {
      type: Number,
      default: 0
    },
    OBC: {
      type: Number,
      default: 0
    },
    EWS: {
      type: Number,
      default: 0
    },
    SC: {
      type: Number,
      default: 0
    },
    ST: {
      type: Number,
      default: 0
    }
  },
  stateVacancy: [
    {
      state: {
        type: String
      },
      vacancies: {
        type: Number,
        default: 0
      }
    }
  ],
  applicationInstructions: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  applications: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
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
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('governmentJob', GovernmentJobSchema); 