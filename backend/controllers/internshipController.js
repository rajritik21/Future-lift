const Internship = require('../models/Internship');
const User = require('../models/User');
const Company = require('../models/Company');
const { validationResult } = require('express-validator');

// @route    POST api/internships
// @desc     Create an internship
// @access   Private (Employer or Admin)
exports.createInternship = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user || (user.userType !== 'employer' && user.userType !== 'admin')) {
      return res.status(403).json({ msg: 'Not authorized to post internships' });
    }

    // Get company if provided
    let company = null;
    if (req.body.company) {
      company = await Company.findById(req.body.company);
      if (!company) {
        return res.status(404).json({ msg: 'Company not found' });
      }
    }

    const {
      title,
      description,
      location,
      type,
      duration,
      stipend,
      category,
      skills,
      responsibilities,
      requirements,
      perks,
      startDate,
      applicationDeadline,
      openings
    } = req.body;

    // Create internship object
    const internshipFields = {
      postedBy: req.user.id,
      company: company ? company._id : null,
      title,
      description,
      location,
      type,
      duration,
      stipend,
      category,
      skills: Array.isArray(skills) ? skills : skills.split(',').map(skill => skill.trim()),
      responsibilities: Array.isArray(responsibilities) ? responsibilities : responsibilities ? responsibilities.split(',').map(item => item.trim()) : [],
      requirements: Array.isArray(requirements) ? requirements : requirements ? requirements.split(',').map(item => item.trim()) : [],
      perks: Array.isArray(perks) ? perks : perks ? perks.split(',').map(item => item.trim()) : [],
      startDate,
      applicationDeadline,
      openings
    };

    const internship = new Internship(internshipFields);
    await internship.save();

    res.json(internship);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route    GET api/internships
// @desc     Get all internships
// @access   Public
exports.getAllInternships = async (req, res) => {
  try {
    const { category, type, location, skills } = req.query;
    let query = { isActive: true };

    // Add filters if provided
    if (category) query.category = category;
    if (type) query.type = type;
    if (location) query.location = { $regex: location, $options: 'i' };
    if (skills) {
      const skillsArray = skills.split(',').map(skill => skill.trim());
      query.skills = { $in: skillsArray };
    }

    const internships = await Internship.find(query)
      .sort({ createdAt: -1 })
      .populate('company', ['name', 'logo', 'location'])
      .populate('postedBy', ['name', 'avatar']);

    res.json(internships);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route    GET api/internships/:id
// @desc     Get internship by ID
// @access   Public
exports.getInternshipById = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id)
      .populate('company', ['name', 'logo', 'location', 'website', 'description'])
      .populate('postedBy', ['name', 'avatar'])
      .populate('applications.user', ['name', 'avatar']);

    if (!internship) {
      return res.status(404).json({ msg: 'Internship not found' });
    }

    res.json(internship);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Internship not found' });
    }
    res.status(500).send('Server Error');
  }
};

// @route    PUT api/internships/:id
// @desc     Update an internship
// @access   Private (Employer or Admin)
exports.updateInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({ msg: 'Internship not found' });
    }

    // Check user authorization
    if (internship.postedBy.toString() !== req.user.id) {
      const user = await User.findById(req.user.id);
      if (!user || user.userType !== 'admin') {
        return res.status(403).json({ msg: 'Not authorized to update this internship' });
      }
    }

    // Process arrays if they're provided as strings
    if (req.body.skills && !Array.isArray(req.body.skills)) {
      req.body.skills = req.body.skills.split(',').map(skill => skill.trim());
    }
    if (req.body.responsibilities && !Array.isArray(req.body.responsibilities)) {
      req.body.responsibilities = req.body.responsibilities.split(',').map(item => item.trim());
    }
    if (req.body.requirements && !Array.isArray(req.body.requirements)) {
      req.body.requirements = req.body.requirements.split(',').map(item => item.trim());
    }
    if (req.body.perks && !Array.isArray(req.body.perks)) {
      req.body.perks = req.body.perks.split(',').map(item => item.trim());
    }

    // Update fields
    const updateFields = req.body;
    updateFields.updatedAt = Date.now();

    const updatedInternship = await Internship.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );

    res.json(updatedInternship);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Internship not found' });
    }
    res.status(500).send('Server Error');
  }
};

// @route    DELETE api/internships/:id
// @desc     Delete an internship
// @access   Private (Employer or Admin)
exports.deleteInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({ msg: 'Internship not found' });
    }

    // Check user authorization
    if (internship.postedBy.toString() !== req.user.id) {
      const user = await User.findById(req.user.id);
      if (!user || user.userType !== 'admin') {
        return res.status(403).json({ msg: 'Not authorized to delete this internship' });
      }
    }

    await internship.deleteOne();
    res.json({ msg: 'Internship removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Internship not found' });
    }
    res.status(500).send('Server Error');
  }
};

// @route    POST api/internships/:id/apply
// @desc     Apply for an internship
// @access   Private (Job Seeker)
exports.applyForInternship = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user || user.userType !== 'jobseeker') {
      return res.status(403).json({ msg: 'Only job seekers can apply for internships' });
    }

    const internship = await Internship.findById(req.params.id);
    
    if (!internship) {
      return res.status(404).json({ msg: 'Internship not found' });
    }

    // Check if internship is still active
    if (!internship.isActive) {
      return res.status(400).json({ msg: 'This internship is no longer active' });
    }

    // Check if application deadline has passed
    if (internship.applicationDeadline) {
      const currentDate = new Date();
      const deadlineDate = new Date(internship.applicationDeadline);
      if (currentDate > deadlineDate) {
        return res.status(400).json({ msg: 'Application deadline has passed' });
      }
    }

    // Check if already applied
    if (internship.applications.some(app => app.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'You have already applied for this internship' });
    }

    const { resume, coverLetter } = req.body;

    // Add application
    internship.applications.unshift({
      user: req.user.id,
      resume,
      coverLetter
    });

    await internship.save();
    res.json(internship.applications);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Internship not found' });
    }
    res.status(500).send('Server Error');
  }
};

// @route    PUT api/internships/:id/status/:app_id
// @desc     Update application status
// @access   Private (Employer or Admin)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ msg: 'Status is required' });
    }

    const internship = await Internship.findById(req.params.id);
    
    if (!internship) {
      return res.status(404).json({ msg: 'Internship not found' });
    }

    // Check user authorization
    if (internship.postedBy.toString() !== req.user.id) {
      const user = await User.findById(req.user.id);
      if (!user || user.userType !== 'admin') {
        return res.status(403).json({ msg: 'Not authorized to update application status' });
      }
    }

    // Find the application
    const application = internship.applications.find(
      app => app._id.toString() === req.params.app_id
    );

    if (!application) {
      return res.status(404).json({ msg: 'Application not found' });
    }

    // Update status
    application.status = status;
    await internship.save();

    res.json(internship.applications);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Internship or application not found' });
    }
    res.status(500).send('Server Error');
  }
}; 