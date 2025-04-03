const LeaderboardService = require('../services/leaderBoardService');

class LeaderboardController {
  static async getLeaderboard(req, res) {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const leaderboard = await LeaderboardService.getLeaderboard(limit);
      res.json({ success: true, data: leaderboard });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
}
module.exports = LeaderboardController;