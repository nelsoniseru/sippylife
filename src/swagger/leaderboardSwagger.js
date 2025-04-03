module.exports = {
    '/api/leaderboard': {
        get: {
            summary: 'Get leaderboard of users by completed tasks',
            tags: ['Leaderboard'],
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    in: 'query',
                    name: 'limit',
                    schema: { type: 'integer', minimum: 1 },
                    description: 'Limit the number of results',
                },
            ],
            responses: {
                200: {
                    description: 'Leaderboard data',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean' },
                                    data: {
                                        type: 'array',
                                        items: { $ref: '#/components/schemas/LeaderboardEntry' },
                                    },
                                },
                            },
                        },
                    },
                },
                401: { description: 'Unauthorized' },
                500: { description: 'Server error' },
            },
        },
    },
};