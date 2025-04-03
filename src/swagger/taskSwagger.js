module.exports = {
    '/api/tasks': {
        post: {
            summary: 'Create a new task',
            tags: ['Tasks'],
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'multipart/form-data': {
                        schema: {
                            type: 'object',
                            properties: {
                                title: { type: 'string' },
                                description: { type: 'string' },
                                status: { type: 'string', enum: ['To Do', 'In Progress', 'Completed'] },
                                priority: { type: 'string', enum: ['Low', 'Medium', 'High'] },
                                dueDate: { type: 'string', format: 'date' },
                                assignee: { type: 'string', description: 'User ID to assign the task to (must exist)',   default: '67ee68b381ec7233f1cebbd2' },
                                image: { type: 'string', format: 'binary' },
                            },
                            required: ['title'],
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: 'Task created (notification mocked via console.log if assigned)',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean' },
                                    data: { $ref: '#/components/schemas/Task' },
                                },
                            },
                        },
                    },
                },
                400: { description: 'Validation error or invalid assignee' },
                401: { description: 'Unauthorized' },
            },
        },
        get: {
            summary: 'Get tasks (user-specific or all for admins)',
            tags: ['Tasks'],
            security: [{ bearerAuth: [] }],
            responses: {
                200: {
                    description: 'List of tasks (includes assigned tasks)',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean' },
                                    data: {
                                        type: 'array',
                                        items: { $ref: '#/components/schemas/Task' },
                                    },
                                },
                            },
                        },
                    },
                },
                401: { description: 'Unauthorized' },
            },
        },
    },
    '/api/tasks/{id}': {
        put: {
            summary: 'Update a task',
            tags: ['Tasks'],
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: { type: 'string' },
                },
            ],
            requestBody: {
                content: {
                    'multipart/form-data': {
                        schema: {
                            type: 'object',
                            properties: {
                                title: { type: 'string' },
                                description: { type: 'string' },
                                status: { type: 'string', enum: ['To Do', 'In Progress', 'Completed'] },
                                priority: { type: 'string', enum: ['Low', 'Medium', 'High'] },
                                dueDate: { type: 'string', format: 'date' },
                                assignee: { type: 'string', description: 'User ID to assign the task to (must exist)',   default: '67ee68b381ec7233f1cebbd2' },
                                image: { type: 'string', format: 'binary' },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Task updated (notification mocked if reassigned)',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean' },
                                    data: { $ref: '#/components/schemas/Task' },
                                },
                            },
                        },
                    },
                },
                404: { description: 'Task not found' },
                400: { description: 'Validation error or invalid assignee' },
                401: { description: 'Unauthorized' },
            },
        },
        delete: {
            summary: 'Delete a task',
            tags: ['Tasks'],
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: { type: 'string' },
                },
            ],
            responses: {
                200: { description: 'Task deleted' },
                404: { description: 'Task not found' },
                401: { description: 'Unauthorized' },
            },
        },
    },
    '/api/tasks/filter': {
        get: {
            summary: 'Filter and sort tasks',
            tags: ['Tasks'],
            security: [{ bearerAuth: [] }],
            parameters: [
                { in: 'query', name: 'status', schema: { type: 'string', enum: ['To Do', 'In Progress', 'Completed'] } },
                { in: 'query', name: 'priority', schema: { type: 'string', enum: ['Low', 'Medium', 'High'] } },
                { in: 'query', name: 'dueDate', schema: { type: 'string', format: 'date' } },
                { in: 'query', name: 'sortBy', schema: { type: 'string', enum: ['dueDate', 'priority'] } },
                { in: 'query', name: 'order', schema: { type: 'string', enum: ['asc', 'desc'] } },
            ],
            responses: {
                200: {
                    description: 'Filtered tasks (includes assigned tasks)',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean' },
                                    data: {
                                        type: 'array',
                                        items: { $ref: '#/components/schemas/Task' },
                                    },
                                },
                            },
                        },
                    },
                },
                400: { description: 'Validation error' },
                401: { description: 'Unauthorized' },
            },
        },
    },
};