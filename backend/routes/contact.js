/**
 * Contact Route Controller
 * Handles POST /api/contact submissions with validation, rate-limiting, and spam protection
 */

const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { sendContactEmail } = require('../services/mailer');

// Rate Limiter: Max 5 contact form submissions per 15 minutes per IP
const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many messages received from this IP address. Please wait 15 minutes before trying again.'
  }
});

// Simple regex for email validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/contact', contactRateLimiter, async (req, res) => {
  try {
    const { name, email, subject, message, _gotcha, website } = req.body;

    // 1. Spam Honeypot Protection: Bots frequently fill hidden fields
    if (_gotcha || website) {
      console.warn('⚠️ Spam bot submission caught via honeypot field. Dropping request silently.');
      // Return 200 to trick bot into believing it succeeded
      return res.status(200).json({
        success: true,
        message: 'Thank you for reaching out! Your message has been sent to Riya. I will get back to you shortly.'
      });
    }

    // 2. Server-side Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid name (at least 2 characters).'
      });
    }

    if (name.trim().length > 100) {
      return res.status(400).json({
        success: false,
        error: 'Name cannot exceed 100 characters.'
      });
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.'
      });
    }

    if (email.trim().length > 150) {
      return res.status(400).json({
        success: false,
        error: 'Email cannot exceed 150 characters.'
      });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a message describing your inquiry.'
      });
    }

    if (message.trim().length > 5000) {
      return res.status(400).json({
        success: false,
        error: 'Message exceeds the 5,000 character limit.'
      });
    }

    // Extract client IP and User Agent for audit logging
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'] || 'Unknown';

    // 3. Dispatch Email via Mailer Service
    const result = await sendContactEmail({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject && typeof subject === 'string' ? subject.trim().slice(0, 200) : '',
      message: message.trim(),
      clientIp,
      userAgent
    });

    const isSimulated = Boolean(result.simulated);

    return res.status(200).json({
      success: true,
      simulated: isSimulated,
      message: isSimulated
        ? 'Message recorded! Note: SMTP_PASS is currently empty in your .env file, so this submission was logged in the server console instead of being delivered to your Gmail inbox. To receive live emails, add your Gmail App Password to .env.'
        : 'Thank you for reaching out! Your message has been sent to Riya. I will get back to you shortly.'
    });

  } catch (error) {
    console.error('❌ Error processing contact form submission:', error);

    // Provide friendly error response
    return res.status(500).json({
      success: false,
      error: 'Unable to deliver message at this time. Please reach out directly to riya0077224@gmail.com or try again later.'
    });
  }
});

module.exports = router;
