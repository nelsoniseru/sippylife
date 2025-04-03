const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); 
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const authSwagger = require('./swagger/authSwagger');
const taskSwagger = require('./swagger/taskSwagger');
const leaderboardSwagger = require('./swagger/leaderboardSwagger');
const components = require('./swagger/component');
const multer = require('multer');
const path = require('path');


const app = express();
app.use(express.json());

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  const upload = multer({ storage });

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/task-management', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Swagger configuration
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Task Management System API',
            version: '1.0.0',
            description: 'API for managing tasks, users, and leaderboards',
        },
        servers: [
            { url: `http://localhost:${process.env.PORT || 3000}` },
        ],
        ...components,
    },
    apis: [], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
const swaggerDocs = {
    ...swaggerSpec,
    paths: {
        ...authSwagger,
        ...taskSwagger,
        ...leaderboardSwagger,
    },
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));