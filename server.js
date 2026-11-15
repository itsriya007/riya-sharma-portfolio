/**
 * Riya Sharma Portfolio - Full-Stack Express Server
 * Serves the responsive portfolio frontend and handles backend contact email routing.
 */

const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const contactRouter = require('./backend/routes/contact');
const { getTransporter } = require('./backend/services/mailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Security & Parsing Middleware
app.use(cors());
app.use(express.json({ limit: '500kb' }));
app.use(express.urlencoded({ extended: true, limit: '500kb' }));

// Verbose HTTP Request Logger Middleware
app.use((req, res, next) => {
  const start = Date.now();
  const timeStr = new Date().toLocaleTimeString();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const isApi = req.originalUrl.startsWith('/api');
    const symbol = isApi ? '⚡ [API]' : '📄 [WEB]';
    console.log(`${symbol} ${timeStr} | ${req.method} ${req.originalUrl} -> Status ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Static Asset Serving (Frontend HTML/CSS/JS/PDF/Images)
const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir, {
  maxAge: process.env.NODE_ENV === 'production' ? '1d' : '0',
  etag: true
}));

// API Routes
app.use('/api', contactRouter);

// System Health Check Endpoint
app.get('/api/health', (req, res) => {
  const transporter = getTransporter();
  res.status(200).json({
    status: 'healthy',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    smtpConfigured: Boolean(transporter),
    smtpUser: process.env.SMTP_USER || null,
    recipientEmail: process.env.RECIPIENT_EMAIL || 'riya0077224@gmail.com'
  });
});

// Single Page Application Fallback: Serve index.html for any unhandled GET route
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    const indexPath = path.join(publicDir, 'index.html');
    return res.sendFile(indexPath, (err) => {
      if (err && !res.headersSent) {
        res.status(err.status || 404).end();
      }
    });
  }
  next();
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error occurred.'
  });
});

// Start Server if run directly
let server;
if (require.main === module) {
  server = app.listen(PORT, '0.0.0.0', () => {
    const transporter = getTransporter();
    console.log('=============================================================');
    console.log(`🚀 Riya Sharma Portfolio Server is LIVE!`);
    console.log(`🌐 Local URL: http://localhost:${PORT}`);
    console.log(`📧 Contact API: POST http://localhost:${PORT}/api/contact`);
    console.log(`🩺 Health API:  GET  http://localhost:${PORT}/api/health`);
    console.log(`📄 Resume Asset: http://localhost:${PORT}/assets/Riya_Sharma_Resume_Updated.pdf`);
    console.log('-------------------------------------------------------------');
    if (transporter) {
      console.log('🔑 SMTP Transporter: ACTIVE (Emails will be sent via SMTP)');
    } else {
      console.log('⚙️  SMTP Transporter: LOCAL SIMULATION MODE');
      console.log('   (Add your Gmail App Password to .env to deliver live emails)');
    }
    console.log('=============================================================\n');
  });
}

module.exports = { app, server };
