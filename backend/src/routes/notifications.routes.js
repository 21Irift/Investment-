const express = require('express');
const router = express.Router();

// Get Notifications
router.get('/:userId', (req, res) => {
  res.json({ message: 'Get notifications endpoint - to be implemented' });
});

// Mark as Read
router.put('/:notificationId/read', (req, res) => {
  res.json({ message: 'Mark as read endpoint - to be implemented' });
});

// Clear All
router.delete('/:userId', (req, res) => {
  res.json({ message: 'Clear notifications endpoint - to be implemented' });
});

module.exports = router;
