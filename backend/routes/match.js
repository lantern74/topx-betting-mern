const express = require('express');
const router = express.Router();
const { getMatchData, getMatchResult } = require('../controllers/matchController');

router.get('/match-data', getMatchData);
router.get('/match-result/:id', getMatchResult);

module.exports = router;
