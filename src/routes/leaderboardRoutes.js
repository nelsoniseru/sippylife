const express = require('express');
const leaderboardController = require('../controller/leaderboardController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
    await leaderboardController.getLeaderboard(req, res);
});

module.exports = router;