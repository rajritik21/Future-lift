const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { isAuthenticated, authorizeAdmin } = require('../middleware/auth');
const governmentJobController = require('../controllers/governmentJobController');

// @route    POST api/government-jobs
// @desc     Create a government job posting
// @access   Private (Admin only)
router.post(
  '/',
  [
    isAuthenticated,
    authorizeAdmin('manageJobs'),
    [
      check('title', 'Title is required').not().isEmpty(),
      check('department', 'Department is required').not().isEmpty(),
      check('location', 'Location is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('salary', 'Salary information is required').not().isEmpty(),
      check('qualification', 'Qualification is required').not().isEmpty(),
      check('vacancies', 'Number of vacancies is required').isNumeric(),
      check('applicationBeginDate', 'Application begin date is required').not().isEmpty(),
      check('applicationDeadlineDate', 'Application deadline date is required').not().isEmpty()
    ]
  ],
  governmentJobController.createGovernmentJob
);

// @route    GET api/government-jobs
// @desc     Get all government jobs
// @access   Public
router.get('/', governmentJobController.getAllGovernmentJobs);

// @route    GET api/government-jobs/:id
// @desc     Get government job by ID
// @access   Public
router.get('/:id', governmentJobController.getGovernmentJobById);

// @route    PUT api/government-jobs/:id
// @desc     Update a government job
// @access   Private (Admin only)
router.put('/:id', isAuthenticated, authorizeAdmin('manageJobs'), governmentJobController.updateGovernmentJob);

// @route    DELETE api/government-jobs/:id
// @desc     Delete a government job
// @access   Private (Admin only)
router.delete('/:id', isAuthenticated, authorizeAdmin('manageJobs'), governmentJobController.deleteGovernmentJob);

// @route    POST api/government-jobs/:id/apply
// @desc     Apply for a government job
// @access   Private
router.post('/:id/apply', isAuthenticated, governmentJobController.applyForGovernmentJob);

// @route    PUT api/government-jobs/:id/status/:app_id
// @desc     Update application status
// @access   Private (Admin only)
router.put('/:id/status/:app_id', isAuthenticated, authorizeAdmin('manageJobs'), governmentJobController.updateApplicationStatus);

module.exports = router; 