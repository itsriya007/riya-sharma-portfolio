/**
 * Vercel Serverless Function: GET /api/health
 */
module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    status: 'healthy',
    platform: 'Vercel Serverless',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    smtpConfigured: Boolean(process.env.SMTP_PASS)
  });
};
