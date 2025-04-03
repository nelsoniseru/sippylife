const TaskService = require('../services/taskService');
const { createTaskSchema, updateTaskSchema } = require('../validation/taskValidation');

class TaskController {
  static async createTask(req, res) {
    try {
      const { error } = createTaskSchema.validate(req.body);

      if (error) return res.status(400).json({ success: false, message: error.details[0].message });

      const task = await TaskService.createTask(req.body, req.user.id,req.file);
      res.status(201).json({ success: true, data: task });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async getUserTasks(req, res) {
    try {
      const tasks = await TaskService.getUserTasks(req.user.id);
      res.json({ success: true, data: tasks });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async getAllTasks(req, res) {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ 
          success: false, 
          message: 'Unauthorized: Admin access required' 
        });
      }
      const tasks = await TaskService.getAllTasks();
      res.json({ success: true, data: tasks });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async updateTask(req, res) {
    try {
      const { error } = updateTaskSchema.validate(req.body);
      if (error) return res.status(400).json({ success: false, message: error.details[0].message });
      const task = await TaskService.updateTask(
        req.params.id, 
        req.body, 
        req.user.id, 
        req.user.role,
        req.file 
      );
      res.json({ success: true, data: task });  
    } catch (error) {
        console.log(error)
      res.status(error.message.includes('Unauthorized') ? 403 : 400)
        .json({ success: false, message: error.message });
    }
  }

  static async deleteTask(req, res) {
    try {
      await TaskService.deleteTask(req.params.id, req.user.id, req.user.role);
      res.json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
      res.status(error.message.includes('Unauthorized') ? 403 : 400)
        .json({ success: false, message: error.message });
    }
  }

  static async filterAndSortTasks(req, res) {
    try {
      const { status, priority, dueDate } = req.query;
      const query = {};
      if (status) query.status = status;
      if (priority) query.priority = priority;
      if (dueDate) query.dueDate = { $lte: new Date(dueDate) };

      const sort = {};
      if (req.query.sortBy) {
        sort[req.query.sortBy] = req.query.order === 'desc' ? -1 : 1;
      }

      const tasks = await TaskService.filterAndSortTasks(query, sort);
      res.json({ success: true, data: tasks });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = TaskController;