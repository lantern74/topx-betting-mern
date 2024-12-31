const express = require('express');
const router = express.Router();
const MemberController = require('../controllers/member.controller');

// Route to handle member login
router.post('/login', MemberController.login);

// Route to handle member logout
router.post('/logout', MemberController.logout);

module.exports = router;
