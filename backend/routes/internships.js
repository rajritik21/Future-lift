const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { isAuthenticated, authorizeRoles } = require('../middleware/auth');
const internshipController = require('../controllers/internshipController');

// @route    POST api/internships
// @desc     Create an internship
// @access   Private (Employer or Admin)
router.post(
  '/',
  [
    isAuthenticated,
    authorizeRoles('employer', 'admin'),
    [
      check('title', 'Title is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('location', 'Location is required').not().isEmpty(),
      check('type', 'Type is required').not().isEmpty(),
      check('duration', 'Duration is required').not().isEmpty(),
      check('stipend', 'Stipend is required').not().isEmpty(),
      check('category', 'Category is required').not().isEmpty(),
      check('skills', 'Skills are required').not().isEmpty()
    ]
  ],
  internshipController.createInternship
);

// @route    GET api/internships
// @desc     Get all internships
// @access   Public
router.get('/', internshipController.getAllInternships);

// @route    GET api/internships/:id
// @desc     Get internship by ID
// @access   Public
router.get('/:id', internshipController.getInternshipById);

// @route    PUT api/internships/:id
// @desc     Update an internship
// @access   Private (Employer or Admin)
router.put('/:id', isAuthenticated, internshipController.updateInternship);

// @route    DELETE api/internships/:id
// @desc     Delete an internship
// @access   Private (Employer or Admin)
router.delete('/:id', isAuthenticated, internshipController.deleteInternship);

// @route    POST api/internships/:id/apply
// @desc     Apply for an internship
// @access   Private (Job Seeker)
router.post(
  '/:id/apply',
  [
    isAuthenticated,
    [
      check('resume', 'Resume link is required').not().isEmpty()
    ]
  ],
  internshipController.applyForInternship
);

// @route    PUT api/internships/:id/status/:app_id
// @desc     Update application status
// @access   Private (Employer or Admin)
router.put(
  '/:id/status/:app_id',
  [
    isAuthenticated,
    [
      check('status', 'Status is required').not().isEmpty()
    ]
  ],
  internshipController.updateApplicationStatus
);

module.exports = router; 