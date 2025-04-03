const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { 
    type: String, 
    enum: ['To Do', 'In Progress', 'Completed'], 
    default: 'To Do' 
  },
  priority: { 
    type: String, 
    enum: ['Low', 'Medium', 'High'], 
    default: 'Low' 
  },
  dueDate: Date,
  image: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);