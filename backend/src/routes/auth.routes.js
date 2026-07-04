const express = require('express');
const router = express.Router();
const { register, login, logout, refreshToken } = require('../controllers/authController');

// Register
router.post('/register', register);

// Login
router.post('/login', login);

// Logout
router.post('/logout', logout);

// Refresh Token
router.post('/refresh-token', refreshToken);

module.exports = router;
