const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Subscription = require('../models/Subscription');

// @route   POST api/subscriptions
// @desc    Subscribe to job alerts
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    // Make skills optional based on source
    check('skills').custom((value, { req }) => {
      // Skills is required for homepage subscriptions, optional for others
      if (req.body.source === 'homepage' && (!value || value.trim() === '')) {
        throw new Error('Skills are required for homepage subscriptions');
      }
      return true;
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, skills = '', source = 'homepage', preferences = {} } = req.body;

    try {
      // First check if this email exists with any source
      const existingSubscription = await Subscription.findOne({ email });
      
      if (existingSubscription) {
        // Email already exists in the system
        return res.status(400).json({ 
          success: false,
          message: 'You are already subscribed with this email'
        });
      }

      // Check if subscription already exists for this specific source
      let subscription = await Subscription.findOne({ email, source });

      if (subscription) {
        // Update existing subscription
        if (skills) {
          subscription.skills = skills;
        }
        subscription.active = true;
        subscription.subscriptionDate = new Date();
        
        if (preferences) {
          subscription.preferences = {
            ...subscription.preferences,
            ...preferences
          };
        }

        await subscription.save();
        
        return res.json({ 
          success: true, 
          message: 'Subscription updated successfully',
          subscription 
        });
      }

      // Create new subscription
      subscription = new Subscription({
        email,
        skills: skills || 'Not specified', // Provide default value if skills is empty
        source,
        subscriptionDate: new Date(),
        preferences
      });

      await subscription.save();

      res.json({ 
        success: true, 
        message: 'Subscribed successfully',
        subscription 
      });
    } catch (err) {
      console.error('Error in subscription:', err.message);
      
      // Handle duplicate key error nicely
      if (err.name === 'MongoError' && err.code === 11000) {
        return res.status(400).json({ 
          success: false,
          message: 'You are already subscribed with this email'
        });
      }
      
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/subscriptions
// @desc    Get all subscriptions (admin only)
// @access  Private/Admin
router.get('/', async (req, res) => {
  try {
    // In a real app, add authentication middleware to protect this route
    const subscriptions = await Subscription.find().sort({ subscriptionDate: -1 });
    res.json(subscriptions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/subscriptions/:email
// @desc    Unsubscribe by email
// @access  Public
router.delete('/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const { source } = req.query;
    
    const filter = { email };
    if (source) {
      filter.source = source;
    }
    
    // Don't actually delete, just mark as inactive
    const result = await Subscription.updateMany(
      filter,
      { $set: { active: false } }
    );

    if (result.nModified === 0) {
      return res.status(404).json({ success: false, message: 'Subscription not found' });
    }

    res.json({ success: true, message: 'Unsubscribed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/subscriptions/check/:email
// @desc    Check if email is already subscribed
// @access  Public
router.get('/check/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const { source } = req.query;
    
    const filter = { email: email.toLowerCase() };
    if (source) {
      filter.source = source;
    }
    
    const subscription = await Subscription.findOne(filter);
    
    if (subscription) {
      return res.json({ 
        subscribed: true, 
        message: 'Email is already subscribed',
        source: subscription.source
      });
    }
    
    res.json({ 
      subscribed: false, 
      message: 'Email is not subscribed' 
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; 