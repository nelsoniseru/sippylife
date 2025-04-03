module.exports = {
    '/api/auth/register': {
        post: {
            summary: 'Register a new user',
            tags: ['Authentication'],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                username: { type: 'string' },
                                password: { type: 'string', minLength: 6 },
                                role: { type: 'string', enum: ['user', 'admin'] },
                            },
                            required: ['username', 'password'],
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: 'User registered successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean' },
                                    data: {
                                        type: 'object',
                                        properties: {
                                            user: { $ref: '#/components/schemas/User' },
                                            token: { type: 'string' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                400: { description: 'Validation error' },
                500: { description: 'Server error' },
            },
        },
    },
    '/api/auth/login': {
        post: {
            summary: 'Login a user',
            tags: ['Authentication'],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                username: { type: 'string' },
                                password: { type: 'string' },
                            },
                            required: ['username', 'password'],
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Login successful',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean' },
                                    data: {
                                        type: 'object',
                                        properties: {
                                            token: { type: 'string' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                400: { description: 'Validation error' },
                401: { description: 'Invalid credentials' },
            },
        },
    },
};