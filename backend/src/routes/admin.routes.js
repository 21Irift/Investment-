const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getAllUsers,
  getPendingDeposits,
  approveDeposit,
  rejectDeposit,
  getPendingWithdrawals,
  approveWithdrawal,
  rejectWithdrawal,
  sendBroadcast,
} = require('../controllers/adminController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Dashboard Statistics
router.get('/dashboard/stats', authMiddleware, adminMiddleware, getDashboardStats);

// Get All Users
router.get('/users', authMiddleware, adminMiddleware, getAllUsers);

// Get Pending Deposits
router.get('/deposits/pending', authMiddleware, adminMiddleware, getPendingDeposits);

// Approve Deposit
router.post('/deposits/:id/approve', authMiddleware, adminMiddleware, approveDeposit);

// Reject Deposit
router.post('/deposits/:id/reject', authMiddleware, adminMiddleware, rejectDeposit);

// Get Pending Withdrawals
router.get('/withdrawals/pending', authMiddleware, adminMiddleware, getPendingWithdrawals);

// Approve Withdrawal
router.post('/withdrawals/:id/approve', authMiddleware, adminMiddleware, approveWithdrawal);

// Reject Withdrawal
router.post('/withdrawals/:id/reject', authMiddleware, adminMiddleware, rejectWithdrawal);

// Send Broadcast
router.post('/broadcast', authMiddleware, adminMiddleware, sendBroadcast);

module.exports = router;
