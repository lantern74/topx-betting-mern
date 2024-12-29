const express = require('express');
const router = express.Router();
const MatchController = require('../controllers/MatchController');

/**
 * @route GET /match-data
 * @desc Get all match data.
 * @access Public
 */
router.get('/match-data', MatchController.getMatchData);

/**
 * @route GET /match-result/:id
 * @desc Get match result by ID.
 * @access Public
 */
router.get('/match-result/:id', MatchController.getMatchResult);

module.exports = router;
