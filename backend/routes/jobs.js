const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Job = require('../models/Job');
const User = require('../models/User');
const Company = require('../models/Company');

// @route   POST api/jobs
// @desc    Create a job
// @access  Private (employers only)
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('location', 'Location is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('jobType', 'Job type is required').not().isEmpty(),
      check('category', 'Category is required').not().isEmpty(),
      check('experience', 'Experience is required').not().isEmpty(),
      check('skills', 'Skills are required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if user is an employer
      const user = await User.findById(req.user.id).select('-password');
      if (user.userType !== 'employer') {
        return res.status(401).json({ msg: 'Not authorized to post jobs' });
      }

      // Get employer's company
      const company = await Company.findOne({ user: req.user.id });
      if (!company) {
        return res.status(400).json({ msg: 'Please create a company profile first' });
      }

      // Create new job
      const newJob = new Job({
        user: req.user.id,
        company: company.id,
        title: req.body.title,
        location: req.body.location,
        description: req.body.description,
        jobType: req.body.jobType,
        category: req.body.category,
        experience: req.body.experience,
        salary: req.body.salary,
        skills: req.body.skills.split(',').map(skill => skill.trim())
      });

      const job = await newJob.save();
      res.json(job);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/jobs
// @desc    Get all jobs
// @access  Public
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find({ isActive: true })
      .sort({ date: -1 })
      .populate('company', ['name', 'logo'])
      .populate('user', ['name']);
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/jobs/:id
// @desc    Get job by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('company', ['name', 'logo', 'description', 'location', 'industry'])
      .populate('user', ['name']);

    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    res.json(job);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Job not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   PUT api/jobs/:id
// @desc    Update a job
// @access  Private (job owner only)
router.put('/:id', auth, async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    // Check user
    if (job.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Build job object
    const jobFields = {};
    if (req.body.title) jobFields.title = req.body.title;
    if (req.body.location) jobFields.location = req.body.location;
    if (req.body.description) jobFields.description = req.body.description;
    if (req.body.jobType) jobFields.jobType = req.body.jobType;
    if (req.body.category) jobFields.category = req.body.category;
    if (req.body.experience) jobFields.experience = req.body.experience;
    if (req.body.salary) jobFields.salary = req.body.salary;
    if (req.body.isActive !== undefined) jobFields.isActive = req.body.isActive;
    if (req.body.skills) {
      jobFields.skills = req.body.skills.split(',').map(skill => skill.trim());
    }

    // Update job
    job = await Job.findByIdAndUpdate(
      req.params.id,
      { $set: jobFields },
      { new: true }
    );

    res.json(job);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Job not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/jobs/:id
// @desc    Delete a job
// @access  Private (job owner only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    // Check user
    if (job.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await job.remove();
    res.json({ msg: 'Job removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Job not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   POST api/jobs/apply/:id
// @desc    Apply for a job
// @access  Private (job seekers only)
router.post('/apply/:id', auth, async (req, res) => {
  try {
    // Check if user is a jobseeker
    const user = await User.findById(req.user.id).select('-password');
    if (user.userType !== 'jobseeker') {
      return res.status(401).json({ msg: 'Only job seekers can apply for jobs' });
    }

    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    // Check if user already applied
    if (job.applications.some(app => app.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'You have already applied for this job' });
    }

    // Create application
    const newApplication = {
      user: req.user.id,
      resume: req.body.resume,
      coverLetter: req.body.coverLetter
    };

    // Add application to job
    job.applications.unshift(newApplication);
    await job.save();
    res.json(job.applications);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Job not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   GET api/jobs/employer/myjobs
// @desc    Get all jobs by employer
// @access  Private (employers only)
router.get('/employer/myjobs', auth, async (req, res) => {
  try {
    // Check if user is an employer
    const user = await User.findById(req.user.id).select('-password');
    if (user.userType !== 'employer') {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const jobs = await Job.find({ user: req.user.id })
      .sort({ date: -1 })
      .populate('company', ['name', 'logo']);
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/jobs/applications/:job_id
// @desc    Get all applications for a job
// @access  Private (job owner only)
router.get('/applications/:job_id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.job_id);

    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    // Check user
    if (job.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Populate application users
    await Job.populate(job, {
      path: 'applications.user',
      select: 'name email avatar'
    });

    res.json(job.applications);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Job not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   PUT api/jobs/applications/:job_id/:app_id
// @desc    Update application status
// @access  Private (job owner only)
router.put('/applications/:job_id/:app_id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.job_id);

    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    // Check user
    if (job.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Get application
    const application = job.applications.find(
      app => app.id === req.params.app_id
    );

    if (!application) {
      return res.status(404).json({ msg: 'Application not found' });
    }

    // Update status
    application.status = req.body.status;
    await job.save();
    res.json(job.applications);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Job or application not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router; 