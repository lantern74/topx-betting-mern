const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin.controller');

// Route to handle admin login
router.post('/login', AdminController.login);

// Route to handle sub-admin registration
router.post('/register-subadmin', AdminController.registerSubAdmin);

// Route to handle member registration
router.post('/register-member', AdminController.registerMember);

// Route to get all members (for main admin)
router.get('/members', AdminController.getAllMembers);

// Route to get all sub-admins (for main admin)
router.get('/subadmins', AdminController.getAllSubAdmins);

console.log("Admin routes: GET /admin/members defined");
console.log("Admin routes: GET /admin/subadmins defined");

module.exports = router;
