const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  changePassword,
  enable2FA,
  disable2FA,
} = require('../controllers/userController');
const { authMiddleware } = require('../middleware/auth');

// Get User Profile
router.get('/profile/:id', authMiddleware, getProfile);

// Update User Profile
router.put('/profile/:id', authMiddleware, updateProfile);

// Change Password
router.post('/change-password', authMiddleware, changePassword);

// Enable 2FA
router.post('/2fa/enable', authMiddleware, enable2FA);

// Disable 2FA
router.post('/2fa/disable', authMiddleware, disable2FA);

module.exports = router;
