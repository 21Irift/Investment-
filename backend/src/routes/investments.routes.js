const express = require('express');
const router = express.Router();
const {
  getPackages,
  invest,
  getInvestmentHistory,
  calculateROI,
} = require('../controllers/investmentController');
const { authMiddleware } = require('../middleware/auth');

// Get Investment Packages
router.get('/packages', getPackages);

// Invest
router.post('/invest', authMiddleware, invest);

// Get Investment History
router.get('/history/:userId', authMiddleware, getInvestmentHistory);

// Calculate ROI
router.post('/calculate-roi', calculateROI);

module.exports = router;
