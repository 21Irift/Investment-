const express = require('express');
const router = express.Router();

// Get Wallet
router.get('/:id', (req, res) => {
  res.json({ message: 'Get wallet endpoint - to be implemented' });
});

// Deposit
router.post('/deposit', (req, res) => {
  res.json({ message: 'Deposit endpoint - to be implemented' });
});

// Withdrawal
router.post('/withdraw', (req, res) => {
  res.json({ message: 'Withdrawal endpoint - to be implemented' });
});

// Transfer
router.post('/transfer', (req, res) => {
  res.json({ message: 'Transfer endpoint - to be implemented' });
});

// Add Bank Account
router.post('/bank-account', (req, res) => {
  res.json({ message: 'Add bank account endpoint - to be implemented' });
});

module.exports = router;
