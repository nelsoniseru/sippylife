const Task = require('../models/task');
const User = require('../models/user');

const taskService = {
    async createTask(taskData, userId, file) {
        taskData.createdBy = userId;
        
        if (file) {
          taskData.image = file.path;
        }
        if (taskData.assignee) {
          const assignee = await User.findOne({_id:taskData.assignee});
          if (!assignee) throw new Error('Assignee not found');
        }
    
        const task = await Task.create(taskData);
    
        if (task.assignee) {
          console.log(`[Mock Notification] Task "${task.title}" assigned to user ${task.assignee}`);
        }
    
        return task;
      },

    async getUserTasks(userId) {
        return await Task.find({ $or: [{ creator: userId }, { assignee: userId }] })
            .populate('createdBy', 'username')
            .populate('assignee', 'username');
    },

    async getAllTasks() {
        return await Task.find()
            .populate('createdBy', 'username')
            .populate('assignee', 'username');
    },

 
    async updateTask(taskId, taskData, userId, role, file) {
        const task = await Task.findOne({_id:taskId});
        if (!task || !task.creator || (task.creator.toString() !== userId && role !== 'admin')) {
            throw new Error('Unauthorized or task not found');
        }    
        if (taskData.assignee) {
          const assignee = await User.findById(taskData.assignee);
          if (!assignee) throw new Error('Assignee not found');
        }
     const updatedTaskData = {
          ...taskData,
          image: file ? file.path : task.image
        };

        const updatedTask = await Task.updateOne({_id:taskId}, updatedTaskData, { new: true })
          .populate('createdBy', 'username')
          .populate('assignee', 'username');
        if (updatedTask.assignee && (!task.assignee || task.assignee.toString() !== updatedTask.assignee.toString())) {
          console.log(`[Mock Notification] Task "${updatedTask.title}" reassigned to user ${updatedTask.assignee}`);
        }
    
        return updatedTask;
      },

    async deleteTask(taskId, userId, role) {
        const task = await Task.findById(taskId);
        if (!task || (task.creator.toString() !== userId && role !== 'admin')) {
            throw new Error('Unauthorized or task not found');
        }
        return await Task.findByIdAndDelete(taskId);
    },

    async filterAndSortTasks(query, sort) {
        return await Task.find(query)
            .populate('createdBy', 'username')
            .populate('assignee', 'username')
            .sort(sort);
    },
};

module.exports = taskService;