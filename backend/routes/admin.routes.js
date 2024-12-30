const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin.controller');
const { authenticateAdmin, authorize } = require('../middleware/authMiddleware');

// Route to handle admin login
router.post('/login', AdminController.login);

// Route to handle sub-admin registration (only main admin can access)
router.post('/register-subadmin', authenticateAdmin, authorize(['main']), AdminController.registerSubAdmin);


// Route to get all sub-admins (for main admin)
router.get('/subadmins', authenticateAdmin, authorize(['main']), AdminController.getAllSubAdmins);

// Route to update a sub-admin (for main admin)
router.put('/subadmins/:id', authenticateAdmin, authorize(['main']), AdminController.updateSubAdmin);

// Route to delete a sub-admin (for main admin)
router.delete('/subadmins/:id', authenticateAdmin, authorize(['main']), AdminController.deleteSubAdmin);

// Route to handle member registration (both main and sub admins can access)
router.post('/register-member', authenticateAdmin, authorize(['main', 'sub']), AdminController.registerMember);

// Route to get all members (for main admin)
router.get('/members', authenticateAdmin, authorize(['main', 'sub']), AdminController.getAllMembers);

module.exports = router;
