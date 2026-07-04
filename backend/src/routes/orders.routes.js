const express = require('express');
const router = express.Router();
const {
  getUserOrders,
  createOrder,
  getOrderDetails,
  generateReceipt,
} = require('../controllers/orderController');
const { authMiddleware } = require('../middleware/auth');

// Get User Orders
router.get('/:userId', authMiddleware, getUserOrders);

// Create Order
router.post('/', authMiddleware, createOrder);

// Get Order Details
router.get('/details/:orderId', authMiddleware, getOrderDetails);

// Generate Receipt
router.get('/:orderId/receipt', authMiddleware, generateReceipt);

module.exports = router;
