const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { isAuthenticated } = require('../middleware/auth');

const Company = require('../models/Company');
const User = require('../models/User');
const Job = require('../models/Job');

// @route   GET api/companies
// @desc    Get all companies
// @access  Public
router.get('/', (req, res) => {
  res.json({ msg: 'Get all companies endpoint' });
});

// @route   POST api/companies
// @desc    Create a company
// @access  Private
router.post('/', (req, res) => {
  res.json({ msg: 'Create company endpoint' });
});

// @route   POST api/companies
// @desc    Create or update a company
// @access  Private (employers only)
router.post(
  '/',
  [
    isAuthenticated,
    [
      check('name', 'Company name is required').not().isEmpty(),
      check('industry', 'Industry is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('size', 'Company size is required').not().isEmpty(),
      check('location', 'Location is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if user is an employer
    const user = await User.findById(req.user.id).select('-password');
    if (user.userType !== 'employer') {
      return res.status(401).json({ msg: 'Not authorized to create a company' });
    }

    const {
      name,
      website,
      logo,
      description,
      industry,
      size,
      location,
      foundedYear,
      linkedin,
      twitter,
      facebook
    } = req.body;

    // Build company object
    const companyFields = {
      user: req.user.id,
      name,
      website,
      logo,
      description,
      industry,
      size,
      location,
      foundedYear
    };

    // Build social object
    companyFields.socialMedia = {};
    if (linkedin) companyFields.socialMedia.linkedin = linkedin;
    if (twitter) companyFields.socialMedia.twitter = twitter;
    if (facebook) companyFields.socialMedia.facebook = facebook;

    try {
      let company = await Company.findOne({ user: req.user.id });

      if (company) {
        // Update
        company = await Company.findOneAndUpdate(
          { user: req.user.id },
          { $set: companyFields },
          { new: true }
        );

        return res.json(company);
      }

      // Create
      company = new Company(companyFields);
      await company.save();
      res.json(company);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/companies/:id
// @desc    Get company by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const company = await Company.findById(req.params.id).populate('user', ['name', 'email']);

    if (!company) {
      return res.status(404).json({ msg: 'Company not found' });
    }

    res.json(company);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Company not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   GET api/companies/user/:user_id
// @desc    Get company by user ID
// @access  Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const company = await Company.findOne({ user: req.params.user_id }).populate('user', ['name', 'email']);

    if (!company) {
      return res.status(404).json({ msg: 'Company not found for this user' });
    }

    res.json(company);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Company not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/companies
// @desc    Delete company, jobs & user
// @access  Private
router.delete('/', isAuthenticated, async (req, res) => {
  try {
    // Remove company's jobs
    await Job.deleteMany({ user: req.user.id });
    
    // Remove company
    await Company.findOneAndRemove({ user: req.user.id });
    
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'Company and account deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/companies/jobs/:company_id
// @desc    Get all jobs by company ID
// @access  Public
router.get('/jobs/:company_id', async (req, res) => {
  try {
    const company = await Company.findById(req.params.company_id);
    
    if (!company) {
      return res.status(404).json({ msg: 'Company not found' });
    }
    
    const jobs = await Job.find({ company: req.params.company_id, isActive: true })
      .sort({ date: -1 })
      .populate('company', ['name', 'logo', 'location']);
      
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Company not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router; 