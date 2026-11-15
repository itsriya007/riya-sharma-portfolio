/**
 * Vercel Serverless Function: POST /api/contact
 * Handles contact form submissions directly in Vercel's native serverless environment.
 */

const nodemailer = require('nodemailer');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed. Use POST.' });
  }

  try {
    const { name, email, subject, message, _gotcha } = req.body || {};

    // 1. Honeypot check
    if (_gotcha) {
      return res.status(200).json({
        success: true,
        message: 'Thank you for reaching out! Your message has been sent to Riya. I will get back to you shortly.'
      });
    }

    // 2. Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ success: false, error: 'Please provide a valid name (at least 2 characters).' });
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 2) {
      return res.status(400).json({ success: false, error: 'Please provide a message.' });
    }

    const user = process.env.SMTP_USER || 'riya0077224@gmail.com';
    const pass = process.env.SMTP_PASS;

    // Developer simulation mode if SMTP_PASS not set
    if (!pass || pass.trim() === '') {
      console.log('📬 [VERCEL CONTACT SUBMISSION]:', { name, email, subject, message });
      return res.status(200).json({
        success: true,
        message: 'Message received! (Configure SMTP_PASS in Vercel Environment Variables to receive live emails).'
      });
    }

    // Live Gmail SMTP dispatch
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: user,
        pass: pass
      }
    });

    const cleanSubject = subject && subject.trim() 
      ? `[Portfolio Inquiry] ${subject.trim()} - from ${name}` 
      : `[Portfolio Inquiry] New message from ${name}`;

    const submissionDate = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'long'
    });

    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #FAF6F0; padding: 24px; border-radius: 12px; color: #3B2418;">
        <div style="background: #3B2418; color: #FAF6F0; padding: 20px; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0; font-size: 18px;">New Portfolio Message</h2>
          <p style="margin: 4px 0 0 0; font-size: 12px; color: #D6C7BE;">Received on ${submissionDate} (IST)</p>
        </div>
        <div style="background: #FFFFFF; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #E8DDD2;">
          <p><strong>From:</strong> ${escapeHtml(name)} (<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>)</p>
          ${subject ? `<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>` : ''}
          <div style="margin-top: 16px; padding: 16px; background: #FAF6F0; border-left: 4px solid #7CC4FA; border-radius: 4px; white-space: pre-wrap;">
            ${escapeHtml(message)}
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"${name}" <${user}>`,
      replyTo: `${name} <${email}>`,
      to: 'riya0077224@gmail.com',
      subject: cleanSubject,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: htmlContent
    });

    return res.status(200).json({
      success: true,
      message: 'Thank you for reaching out! Your message has been sent to Riya. I will get back to you shortly.'
    });

  } catch (error) {
    console.error('Vercel contact error:', error);
    return res.status(500).json({
      success: false,
      error: 'Unable to deliver message right now. Please email riya0077224@gmail.com directly.'
    });
  }
};

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
