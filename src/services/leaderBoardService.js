const User = require('../models/user');

class LeaderboardService {
        static async getLeaderboard(limit = 10) {
          return await User.aggregate([
            {
              $match: {
                role: 'user'
              }
            },
            {
              $lookup: {
                from: 'tasks', 
                let: { userId: '$_id' },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $or: [
                          { $eq: ['$createdBy', '$$userId'] },
                          { $eq: ['$assignee', '$$userId'] },
                        ]
                      }
                    }
                  },
                  {
                    $group: {
                      _id: null,
                      totalTasks: { $sum: 1 },
                      completedTasks: {
                        $sum: {
                          $cond: [{ $eq: ['$status', 'Completed'] }, 1, 0]
                        }
                      }
                    }
                  }
                ],
                as: 'taskStats'
              }
            },
            {
              $addFields: {
                totalTasks: {
                  $ifNull: [{ $arrayElemAt: ['$taskStats.totalTasks', 0] }, 0]
                },
                completedTasks: {
                  $ifNull: [{ $arrayElemAt: ['$taskStats.completedTasks', 0] }, 0]
                },
                completionRatio: {
                  $cond: [
                    { $eq: [{ $arrayElemAt: ['$taskStats.totalTasks', 0] }, 0] },
                    0,
                    { $divide: [{ $arrayElemAt: ['$taskStats.completedTasks', 0] }, { $arrayElemAt: ['$taskStats.totalTasks', 0] }] }
                  ]
                }
              }
            },
            { $sort: { completionRatio: -1, completedTasks: -1 } },
            { $limit: limit },
            { $project: { username: 1, completedTasks: 1, totalTasks: 1, completionRatio: 1 } }
          ]);
        }
    }
  

module.exports = LeaderboardService;