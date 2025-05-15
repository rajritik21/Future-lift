const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { isAuthenticated } = require('../middleware/auth');
const profileController = require('../controllers/profileController');

const Profile = require('../models/Profile');
const User = require('../models/User');

// @route   GET api/profiles
// @desc    Get all profiles
// @access  Public
router.get('/', profileController.getProfiles);

// @route   GET api/profiles/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', isAuthenticated, profileController.getCurrentProfile);

// @route   POST api/profiles
// @desc    Create or update user profile
// @access  Private
router.post(
  '/',
  [
    isAuthenticated,
    [
      check('skills', 'Skills are required').not().isEmpty()
    ]
  ],
  profileController.createOrUpdateProfile
);

// @route   GET api/profiles/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', profileController.getProfileByUserId);

// @route   DELETE api/profiles
// @desc    Delete profile, user & applications
// @access  Private
router.delete('/', isAuthenticated, async (req, res) => {
  try {
    // Todo: Remove user applications from jobs

    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/profiles/experience
// @desc    Add profile experience
// @access  Private
router.put(
  '/experience',
  [
    isAuthenticated,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('from', 'From date is required').not().isEmpty()
    ]
  ],
  profileController.addExperience
);

// @route   DELETE api/profiles/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete('/experience/:exp_id', isAuthenticated, profileController.deleteExperience);

// @route   PUT api/profiles/education
// @desc    Add profile education
// @access  Private
router.put(
  '/education',
  [
    isAuthenticated,
    [
      check('school', 'School is required').not().isEmpty(),
      check('degree', 'Degree is required').not().isEmpty(),
      check('fieldOfStudy', 'Field of study is required').not().isEmpty(),
      check('from', 'From date is required').not().isEmpty()
    ]
  ],
  profileController.addEducation
);

// @route   DELETE api/profiles/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete('/education/:edu_id', isAuthenticated, profileController.deleteEducation);

// @route   PUT api/profiles/account
// @desc    Update user account details
// @access  Private
router.put(
  '/account',
  [
    isAuthenticated,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check('mobile').optional(),
      check('dob').optional()
    ]
  ],
  profileController.updateAccount
);

// @route   PUT api/profiles/avatar
// @desc    Update user avatar
// @access  Private
router.put('/avatar', isAuthenticated, profileController.updateAvatar);

// @route   POST api/profiles/resume
// @desc    Upload or update resume
// @access  Private
router.post('/resume', isAuthenticated, profileController.uploadResume);

// @route   GET api/profiles/resume
// @desc    Get user resume
// @access  Private
router.get('/resume', isAuthenticated, profileController.getResume);

module.exports = router; 