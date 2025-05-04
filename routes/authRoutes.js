const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Show forms
router.get('/register', authController.showRegister);
router.get('/login', authController.showLogin);

// Handle forms
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/logout', authController.logoutUser);

module.exports = router;
