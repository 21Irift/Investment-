const express = require('express');
const router = express.Router();
const {
  getAllTransactions,
  getTransactionDetails,
  downloadReport,
} = require('../controllers/transactionController');
const { authMiddleware } = require('../middleware/auth');

// Get All Transactions
router.get('/', authMiddleware, getAllTransactions);

// Get Transaction Details
router.get('/:id', authMiddleware, getTransactionDetails);

// Download Transaction Report
router.get('/report/download', authMiddleware, downloadReport);

module.exports = router;
