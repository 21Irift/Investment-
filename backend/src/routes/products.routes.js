const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductDetails,
  searchProducts,
  addReview,
} = require('../controllers/productController');
const { authMiddleware } = require('../middleware/auth');

// Get All Products
router.get('/', getAllProducts);

// Get Product Details
router.get('/:id', getProductDetails);

// Search Products
router.get('/search', searchProducts);

// Add Product Review
router.post('/:id/reviews', authMiddleware, addReview);

module.exports = router;
