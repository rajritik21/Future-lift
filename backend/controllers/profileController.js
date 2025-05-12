const { validationResult } = require('express-validator');
const Profile = require('../models/Profile');
const User = require('../models/User');

// @desc    Get current user's profile
// @route   GET /api/profiles/me
// @access  Private
exports.getCurrentProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'email', 'avatar', 'userType']);

    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Create or update user profile
// @route   POST /api/profiles
// @access  Private
exports.createOrUpdateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    headline,
    location,
    bio,
    skills,
    resume,
    linkedin,
    twitter,
    github,
    website,
    jobTypes,
    preferredLocations,
    expectedSalary,
    willingToRelocate
  } = req.body;

  // Build profile object
  const profileFields = {
    user: req.user.id,
    headline: headline || '',
    location: location || '',
    bio: bio || '',
    skills: Array.isArray(skills) ? skills : skills.split(',').map(skill => skill.trim()),
    resume: resume || ''
  };

  // Build social object
  profileFields.socialMedia = {};
  if (linkedin) profileFields.socialMedia.linkedin = linkedin;
  if (twitter) profileFields.socialMedia.twitter = twitter;
  if (github) profileFields.socialMedia.github = github;
  if (website) profileFields.socialMedia.website = website;

  // Build job preferences
  profileFields.jobPreferences = {};
  if (jobTypes) profileFields.jobPreferences.jobTypes = Array.isArray(jobTypes) ? jobTypes : jobTypes.split(',').map(type => type.trim());
  if (preferredLocations) profileFields.jobPreferences.preferredLocations = Array.isArray(preferredLocations) ? preferredLocations : preferredLocations.split(',').map(loc => loc.trim());
  if (expectedSalary) profileFields.jobPreferences.expectedSalary = expectedSalary;
  if (willingToRelocate !== undefined) profileFields.jobPreferences.willingToRelocate = willingToRelocate;

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      // Update existing profile
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );

      return res.json(profile);
    }

    // Create new profile
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get all profiles
// @route   GET /api/profiles
// @access  Public
exports.getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar', 'userType']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get profile by user ID
// @route   GET /api/profiles/user/:user_id
// @access  Public
exports.getProfileByUserId = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar', 'userType', 'email']);

    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
};

// @desc    Add experience to profile
// @route   PUT /api/profiles/experience
// @access  Private
exports.addExperience = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  } = req.body;

  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }

    profile.experience.unshift(newExp);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete experience from profile
// @route   DELETE /api/profiles/experience/:exp_id
// @access  Private
exports.deleteExperience = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }

    // Get remove index
    const removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id);

    if (removeIndex === -1) {
      return res.status(404).json({ msg: 'Experience not found' });
    }

    // Remove experience
    profile.experience.splice(removeIndex, 1);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Add education to profile
// @route   PUT /api/profiles/education
// @access  Private
exports.addEducation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    school,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description
  } = req.body;

  const newEdu = {
    school,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }

    profile.education.unshift(newEdu);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete education from profile
// @route   DELETE /api/profiles/education/:edu_id
// @access  Private
exports.deleteEducation = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }

    // Get remove index
    const removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.edu_id);

    if (removeIndex === -1) {
      return res.status(404).json({ msg: 'Education not found' });
    }

    // Remove education
    profile.education.splice(removeIndex, 1);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update user account details
// @route   PUT /api/profiles/account
// @access  Private
exports.updateAccount = async (req, res) => {
  const { name, email } = req.body;
  
  // Build user object
  const userFields = {};
  if (name) userFields.name = name;
  if (email) userFields.email = email;
  
  try {
    let user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    // Update user
    user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: userFields },
      { new: true }
    ).select('-password');
    
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}; 