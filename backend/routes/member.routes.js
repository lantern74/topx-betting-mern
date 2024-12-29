const express = require('express');
const router = express.Router();
const MemberController = require('../controllers/member.controller');

// Route to handle member login
router.post('/login', MemberController.login);

module.exports = router;
