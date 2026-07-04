const express = require('express');
const router = express.Router();
const {
  getWallet,
  deposit,
  withdraw,
  transfer,
  addBankAccount,
} = require('../controllers/walletController');
const { authMiddleware } = require('../middleware/auth');

// Get Wallet
router.get('/:id', authMiddleware, getWallet);

// Deposit
router.post('/deposit', authMiddleware, deposit);

// Withdrawal
router.post('/withdraw', authMiddleware, withdraw);

// Transfer
router.post('/transfer', authMiddleware, transfer);

// Add Bank Account
router.post('/bank-account', authMiddleware, addBankAccount);

module.exports = router;
