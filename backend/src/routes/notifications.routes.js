const express = require('express');
const router = express.Router();
const {
  getNotifications,
  markAsRead,
  clearAllNotifications,
} = require('../controllers/notificationController');
const { authMiddleware } = require('../middleware/auth');

// Get Notifications
router.get('/:userId', authMiddleware, getNotifications);

// Mark as Read
router.put('/:notificationId/read', authMiddleware, markAsRead);

// Clear All
router.delete('/:userId', authMiddleware, clearAllNotifications);

module.exports = router;
