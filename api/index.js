/**
 * Vercel Serverless Entrypoint for API routes
 * Handles /api/contact and /api/health serverless invocations on Vercel
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const contactRouter = require('../backend/routes/contact');
const { getTransporter } = require('../backend/services/mailer');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '500kb' }));
app.use(express.urlencoded({ extended: true, limit: '500kb' }));

// Mount API routes
app.use('/api', contactRouter);

// Health check
app.get('/api/health', (req, res) => {
  const transporter = getTransporter();
  res.status(200).json({
    status: 'healthy',
    platform: 'Vercel Serverless',
    timestamp: new Date().toISOString(),
    smtpConfigured: Boolean(transporter)
  });
});

module.exports = app;
