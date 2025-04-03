const express = require('express');
const TaskController = require('../controller/taskController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.post('/', authMiddleware,upload.single('image'), TaskController.createTask);
router.get('/', authMiddleware, TaskController.getUserTasks);
router.get('/all', authMiddleware, TaskController.getAllTasks);
router.put('/:id', authMiddleware,upload.single('image'), TaskController.updateTask);
router.delete('/:id', authMiddleware, TaskController.deleteTask);
router.get('/filter', authMiddleware, TaskController.filterAndSortTasks);

module.exports = router;