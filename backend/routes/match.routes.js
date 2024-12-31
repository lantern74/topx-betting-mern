const express = require('express');
const router = express.Router();
const MatchController = require('../controllers/match.controller');
const { authenticateAdmin } = require('../middleware/authMiddleware');

/**
 * @route GET /match-data
 * @desc Get all match data.
 * @access Public
 */
router.get('/match-data', authenticateAdmin, MatchController.getMatchData);

/**
 * @route GET /match-result/:id
 * @desc Get match result by ID.
 * @access Public
 */
router.get('/match-result/:id', authenticateAdmin, MatchController.getMatchResult);

module.exports = router;
