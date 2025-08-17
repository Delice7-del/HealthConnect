const express = require('express');
const { sendEmail } = require('../utils/email');

const router = express.Router();

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide name, email, and message'
      });
    }

    // Validate email format
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide a valid email address'
      });
    }

    // Send email to admin
    try {
      await sendEmail({
        email: process.env.EMAIL_USER,
        subject: `New Contact Form Submission from ${name}`,
        message: `
          Name: ${name}
          Email: ${email}
          Message: ${message}
          
          This message was sent from the HealthConnect contact form.
        `
      });

      // Send confirmation email to user
      await sendEmail({
        email: email,
        subject: 'Thank you for contacting HealthConnect',
        message: `
          Dear ${name},
          
          Thank you for reaching out to HealthConnect. We have received your message and will get back to you as soon as possible.
          
          Your message:
          ${message}
          
          Best regards,
          The HealthConnect Team
        `
      });

      res.status(200).json({
        status: 'success',
        message: 'Thank you for your message. We will get back to you soon!'
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      res.status(500).json({
        status: 'error',
        message: 'Failed to send email. Please try again later.'
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server error while processing contact form'
    });
  }
});

module.exports = router; 