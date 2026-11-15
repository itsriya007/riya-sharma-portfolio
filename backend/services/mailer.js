/**
 * Nodemailer Mailer Service
 * Handles email transport configuration and sending contact form inquiries
 * to riya0077224@gmail.com
 */

const nodemailer = require('nodemailer');

function getTransporter() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  // Check if real SMTP credentials are provided
  if (!user || !pass || pass === 'your_16_character_app_password_here' || pass.trim() === '') {
    return null;
  }

  // Gmail service shortcut or custom host
  if (process.env.SMTP_SERVICE && process.env.SMTP_SERVICE.toLowerCase() === 'gmail') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: user,
        pass: pass
      }
    });
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT, 10) || 465,
    secure: process.env.SMTP_SECURE === 'true' || process.env.SMTP_PORT === '465',
    auth: {
      user: user,
      pass: pass
    }
  });
}

/**
 * Send contact email to Riya Sharma
 * @param {Object} data - { name, email, subject, message, clientIp, userAgent }
 */
async function sendContactEmail({ name, email, subject, message, clientIp, userAgent }) {
  const recipient = process.env.RECIPIENT_EMAIL || 'riya0077224@gmail.com';
  const cleanSubject = subject && subject.trim() 
    ? `[Portfolio Inquiry] ${subject.trim()} - from ${name}` 
    : `[Portfolio Inquiry] New message from ${name}`;

  const submissionDate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'long'
  });

  // Branded HTML email template matching Brown & Cream editorial aesthetic
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 24px;
            background-color: #FAF6F0;
            color: #3B2418;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #FFFFFF;
            border-radius: 12px;
            border: 1px solid #E8DDD2;
            overflow: hidden;
            box-shadow: 0 4px 16px rgba(59, 36, 24, 0.06);
          }
          .header {
            background-color: #3B2418;
            color: #FAF6F0;
            padding: 24px 30px;
            text-align: left;
          }
          .monogram {
            display: inline-block;
            background-color: #7CC4FA;
            color: #1E1815;
            font-weight: 800;
            font-size: 16px;
            padding: 4px 10px;
            border-radius: 6px;
            margin-bottom: 8px;
          }
          .header h1 {
            margin: 0;
            font-size: 20px;
            font-weight: 700;
            letter-spacing: -0.01em;
          }
          .header p {
            margin: 4px 0 0 0;
            font-size: 13px;
            color: #D6C7BE;
          }
          .content {
            padding: 30px;
          }
          .field-group {
            margin-bottom: 20px;
          }
          .field-label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-weight: 700;
            color: #755849;
            margin-bottom: 4px;
          }
          .field-value {
            font-size: 15px;
            color: #1E1815;
            background-color: #FAF6F0;
            padding: 10px 14px;
            border-radius: 6px;
            border: 1px solid #F0E6DC;
          }
          .message-box {
            font-size: 15px;
            line-height: 1.6;
            color: #1E1815;
            background-color: #FAF6F0;
            padding: 16px;
            border-radius: 8px;
            border-left: 4px solid #7CC4FA;
            white-space: pre-wrap;
          }
          .meta-footer {
            background-color: #F8F3ED;
            padding: 16px 30px;
            border-top: 1px solid #EAE0D5;
            font-size: 12px;
            color: #8C7A70;
            line-height: 1.5;
          }
          .reply-button {
            display: inline-block;
            background-color: #7CC4FA;
            color: #1E1815;
            font-weight: 700;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 6px;
            font-size: 14px;
            margin-top: 15px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="monogram">RS.</span>
            <h1>New Client / Recruiter Inquiry</h1>
            <p>Received via portfolio contact form on ${submissionDate} (IST)</p>
          </div>
          <div class="content">
            <div class="field-group">
              <div class="field-label">Sender Name</div>
              <div class="field-value"><strong>${escapeHtml(name)}</strong></div>
            </div>
            <div class="field-group">
              <div class="field-label">Sender Email</div>
              <div class="field-value">
                <a href="mailto:${escapeHtml(email)}" style="color: #045285; text-decoration: underline;">
                  ${escapeHtml(email)}
                </a>
              </div>
            </div>
            ${subject ? `
            <div class="field-group">
              <div class="field-label">Subject / Opportunity Type</div>
              <div class="field-value">${escapeHtml(subject)}</div>
            </div>` : ''}
            <div class="field-group">
              <div class="field-label">Message Content</div>
              <div class="message-box">${escapeHtml(message)}</div>
            </div>
            <div>
              <a href="mailto:${escapeHtml(email)}?subject=Re: ${encodeURIComponent(cleanSubject)}" class="reply-button">
                Reply Directly to ${escapeHtml(name)}
              </a>
            </div>
          </div>
          <div class="meta-footer">
            <strong>Client Request Metadata:</strong><br />
            IP Address: ${clientIp || 'Unknown'}<br />
            User Agent: ${userAgent || 'Unknown'}
          </div>
        </div>
      </body>
    </html>
  `;

  const textContent = `
=== NEW PORTFOLIO CONTACT FORM SUBMISSION ===
Date: ${submissionDate} (IST)

From: ${name} <${email}>
Subject: ${subject || 'General Inquiry'}

Message:
${message}

---
Client Metadata:
IP: ${clientIp || 'Unknown'}
User-Agent: ${userAgent || 'Unknown'}
  `.trim();

  const transporter = getTransporter();

  // If no SMTP credentials are set yet, run in developer simulation mode
  if (!transporter) {
    console.log('\n=============================================================');
    console.log('📬 [CONTACT FORM SUBMISSION RECEIVED - LOCAL DEV MODE]');
    console.log(`To: ${recipient}`);
    console.log(`From: ${name} <${email}>`);
    console.log(`Subject: ${cleanSubject}`);
    console.log('Message:');
    console.log(message);
    console.log('-------------------------------------------------------------');
    console.log('💡 NOTE: To receive live emails directly in your inbox, set');
    console.log('   SMTP_USER and SMTP_PASS in your .env file with a Gmail App Password.');
    console.log('=============================================================\n');

    return {
      success: true,
      simulated: true,
      message: 'Message received and logged (SMTP credentials not yet configured).'
    };
  }

  // Live SMTP delivery
  const mailOptions = {
    from: `"${name} (Portfolio Inquiry)" <${process.env.SMTP_USER}>`,
    replyTo: `${name} <${email}>`,
    to: recipient,
    subject: cleanSubject,
    text: textContent,
    html: htmlContent
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`✅ Email successfully dispatched to ${recipient}: ${info.messageId}`);

  return {
    success: true,
    messageId: info.messageId
  };
}

function escapeHtml(string) {
  if (!string) return '';
  return String(string)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

module.exports = {
  sendContactEmail,
  getTransporter
};
