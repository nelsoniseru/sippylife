module.exports = {
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
        schemas: {
            User: {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    username: { type: 'string' },
                    role: { type: 'string', enum: ['user', 'admin'] },
                },
            },
            Task: {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    title: { type: 'string' },
                    description: { type: 'string' },
                    status: { type: 'string', enum: ['To Do', 'In Progress', 'Completed'] },
                    priority: { type: 'string', enum: ['Low', 'Medium', 'High'] },
                    dueDate: { type: 'string', format: 'date' },
                    imagePath: { type: 'string' },
                    creator: { $ref: '#/components/schemas/User' },
                    assignee: { $ref: '#/components/schemas/User' },
                },
            },
            LeaderboardEntry: {
                type: 'object',
                properties: {
                    username: { type: 'string' },
                    completedCreated: { type: 'integer' },
                    completedAssigned: { type: 'integer' },
                },
            },
        },
    },
};