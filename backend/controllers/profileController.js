const { validationResult } = require('express-validator');
const Profile = require('../models/Profile');
const User = require('../models/User');
const fileUpload = require('../utils/fileUpload');

// @desc    Get current user's profile
// @route   GET /api/profiles/me
// @access  Private
exports.getCurrentProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'email', 'avatar', 'userType', 'resume']);

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
    resumeFile,
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
    skills: Array.isArray(skills) ? skills : skills.split(',').map(skill => skill.trim())
  };

  // Handle resume upload if provided
  if (resumeFile) {
    try {
      // Get user to update resume
      const user = await User.findById(req.user.id);
      
      // Delete old resume if exists
      if (user.resume && user.resume.public_id) {
        await fileUpload.deleteFile(user.resume.public_id);
      }
      
      // Upload new resume
      const uploadResult = await fileUpload.uploadResume(resumeFile);
      
      // Update user's resume field
      user.resume = {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url
      };
      
      await user.save();
    } catch (uploadError) {
      console.error("Resume upload error:", uploadError);
      return res.status(400).json({ errors: [{ msg: 'Error uploading resume' }] });
    }
  }

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
      ).populate('user', ['name', 'email', 'avatar', 'resume']);

      return res.json(profile);
    }

    // Create new profile
    profile = new Profile(profileFields);
    await profile.save();
    
    // Return populated profile
    profile = await Profile.findById(profile._id).populate('user', ['name', 'email', 'avatar', 'resume']);
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
  const { name, email, mobile, dob } = req.body;
  
  // Build user object
  const userFields = {};
  if (name) userFields.name = name;
  if (email) userFields.email = email;
  if (mobile) userFields.mobile = mobile;
  if (dob) userFields.dob = dob;
  
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

// @desc    Update user avatar
// @route   PUT /api/profiles/avatar
// @access  Private
exports.updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    
    if (!avatar) {
      return res.status(400).json({ errors: [{ msg: 'No avatar image provided' }] });
    }
    
    // Get current user
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    // Delete old avatar if it exists and is not the default
    if (user.avatar && user.avatar.public_id && !user.avatar.public_id.includes('default_avatar')) {
      try {
        await fileUpload.deleteFile(user.avatar.public_id);
      } catch (deleteError) {
        console.error("Error deleting old avatar:", deleteError);
        // Continue even if delete fails
      }
    }
    
    // Upload new avatar
    try {
      const uploadResult = await fileUpload.uploadProfileImage(avatar);
      
      // Update user's avatar field
      user.avatar = {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url
      };
      
      await user.save();
      
      res.json({
        success: true,
        avatar: user.avatar
      });
    } catch (uploadError) {
      console.error("Avatar upload error:", uploadError);
      return res.status(400).json({ errors: [{ msg: 'Error uploading avatar' }] });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}; 