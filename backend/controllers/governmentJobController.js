const GovernmentJob = require('../models/GovernmentJob');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// @route    POST api/government-jobs
// @desc     Create a government job posting
// @access   Private (Admin only)
exports.createGovernmentJob = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user || user.userType !== 'admin') {
      return res.status(403).json({ msg: 'Not authorized to create government job listings' });
    }

    const {
      title,
      department,
      location,
      description,
      salary,
      qualification,
      experienceRequired,
      vacancies,
      applicationBeginDate,
      applicationDeadlineDate,
      completeFormLastDate,
      examDate,
      admitCardDate,
      applicationFee,
      ageLimit,
      categoryVacancy,
      stateVacancy,
      applicationInstructions
    } = req.body;

    // Build government job object
    const governmentJobFields = {
      admin: req.user.id,
      title,
      department,
      location,
      description,
      salary,
      qualification,
      experienceRequired,
      vacancies,
      applicationBeginDate,
      applicationDeadlineDate,
      completeFormLastDate,
      examDate,
      admitCardDate,
      applicationFee,
      ageLimit,
      categoryVacancy,
      stateVacancy,
      applicationInstructions
    };

    const governmentJob = new GovernmentJob(governmentJobFields);
    await governmentJob.save();

    res.json(governmentJob);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route    GET api/government-jobs
// @desc     Get all government jobs
// @access   Public
exports.getAllGovernmentJobs = async (req, res) => {
  try {
    const governmentJobs = await GovernmentJob.find({ isActive: true })
      .sort({ createdAt: -1 })
      .populate('admin', ['name', 'avatar']);
    
    res.json(governmentJobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route    GET api/government-jobs/:id
// @desc     Get government job by ID
// @access   Public
exports.getGovernmentJobById = async (req, res) => {
  try {
    const governmentJob = await GovernmentJob.findById(req.params.id)
      .populate('admin', ['name', 'avatar'])
      .populate('applications.user', ['name', 'avatar']);
    
    if (!governmentJob) {
      return res.status(404).json({ msg: 'Government job not found' });
    }

    res.json(governmentJob);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Government job not found' });
    }
    res.status(500).send('Server Error');
  }
};

// @route    PUT api/government-jobs/:id
// @desc     Update a government job
// @access   Private (Admin only)
exports.updateGovernmentJob = async (req, res) => {
  try {
    const governmentJob = await GovernmentJob.findById(req.params.id);
    
    if (!governmentJob) {
      return res.status(404).json({ msg: 'Government job not found' });
    }

    // Check if user is the job creator or a super admin
    if (governmentJob.admin.toString() !== req.user.id) {
      const user = await User.findById(req.user.id);
      if (!user || user.userType !== 'admin') {
        return res.status(403).json({ msg: 'Not authorized to update this job' });
      }
    }

    // Update fields
    const updatedFields = req.body;
    updatedFields.updatedAt = Date.now();

    const updatedGovernmentJob = await GovernmentJob.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields },
      { new: true }
    );

    res.json(updatedGovernmentJob);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Government job not found' });
    }
    res.status(500).send('Server Error');
  }
};

// @route    DELETE api/government-jobs/:id
// @desc     Delete a government job
// @access   Private (Admin only)
exports.deleteGovernmentJob = async (req, res) => {
  try {
    const governmentJob = await GovernmentJob.findById(req.params.id);
    
    if (!governmentJob) {
      return res.status(404).json({ msg: 'Government job not found' });
    }

    // Check if user is the job creator or a super admin
    if (governmentJob.admin.toString() !== req.user.id) {
      const user = await User.findById(req.user.id);
      if (!user || user.userType !== 'admin') {
        return res.status(403).json({ msg: 'Not authorized to delete this job' });
      }
    }

    await governmentJob.deleteOne();
    res.json({ msg: 'Government job removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Government job not found' });
    }
    res.status(500).send('Server Error');
  }
};

// @route    POST api/government-jobs/:id/apply
// @desc     Apply for a government job
// @access   Private
exports.applyForGovernmentJob = async (req, res) => {
  try {
    const governmentJob = await GovernmentJob.findById(req.params.id);
    
    if (!governmentJob) {
      return res.status(404).json({ msg: 'Government job not found' });
    }

    // Check if job is still active
    if (!governmentJob.isActive) {
      return res.status(400).json({ msg: 'This job is no longer active' });
    }

    // Check if application deadline has passed
    const currentDate = new Date();
    const deadlineDate = new Date(governmentJob.applicationDeadlineDate);
    if (currentDate > deadlineDate) {
      return res.status(400).json({ msg: 'Application deadline has passed' });
    }

    // Check if user has already applied
    if (governmentJob.applications.some(app => app.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'You have already applied for this job' });
    }

    // Add application
    governmentJob.applications.unshift({
      user: req.user.id
    });

    await governmentJob.save();
    res.json(governmentJob.applications);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Government job not found' });
    }
    res.status(500).send('Server Error');
  }
};

// @route    PUT api/government-jobs/:id/status/:app_id
// @desc     Update application status
// @access   Private (Admin only)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ msg: 'Status is required' });
    }

    const governmentJob = await GovernmentJob.findById(req.params.id);
    
    if (!governmentJob) {
      return res.status(404).json({ msg: 'Government job not found' });
    }

    // Check if user is the job creator or a super admin
    if (governmentJob.admin.toString() !== req.user.id) {
      const user = await User.findById(req.user.id);
      if (!user || user.userType !== 'admin') {
        return res.status(403).json({ msg: 'Not authorized to update application status' });
      }
    }

    // Find the application
    const application = governmentJob.applications.find(
      app => app._id.toString() === req.params.app_id
    );

    if (!application) {
      return res.status(404).json({ msg: 'Application not found' });
    }

    // Update status
    application.status = status;
    await governmentJob.save();

    res.json(governmentJob.applications);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Government job or application not found' });
    }
    res.status(500).send('Server Error');
  }
}; 