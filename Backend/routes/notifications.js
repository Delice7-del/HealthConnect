const express = require('express');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');
const { sendSMS } = require('../utils/sms');

const router = express.Router();

// Subscribe to SMS notifications
router.post('/subscribe', async (req, res) => {
  try {
    const { phone, notifications } = req.body;

    // Validate phone number
    if (!phone || !/^\+?[\d\s-()]+$/.test(phone)) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide a valid phone number'
      });
    }

    // Store subscription (in a real app, you'd save this to database)
    // For now, we'll just send a confirmation SMS
    
    try {
      await sendSMS({
        phone,
        message: 'Thank you for subscribing to HealthConnect SMS notifications! You will receive health updates and reminders.'
      });

      res.status(200).json({
        status: 'success',
        message: 'Successfully subscribed to SMS notifications'
      });
    } catch (smsError) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to send confirmation SMS. Please try again.'
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server error while subscribing to notifications'
    });
  }
});

// Update user notification preferences
router.put('/preferences', authenticateToken, async (req, res) => {
  try {
    const { email, sms, push, healthConditions } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Update preferences
    if (email !== undefined) user.preferences.notifications.email = email;
    if (sms !== undefined) user.preferences.notifications.sms = sms;
    if (push !== undefined) user.preferences.notifications.push = push;
    if (healthConditions) user.preferences.healthConditions = healthConditions;

    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Notification preferences updated successfully',
      data: {
        preferences: user.preferences
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server error while updating preferences'
    });
  }
});

// Get user notification preferences
router.get('/preferences', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        preferences: user.preferences
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching preferences'
    });
  }
});

module.exports = router; 