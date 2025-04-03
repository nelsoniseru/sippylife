const Joi = require('joi');

const taskValidation = {
  createTaskSchema: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow(''),
    status: Joi.string().valid('To Do', 'In Progress', 'Completed').default('To Do'),
    priority: Joi.string().valid('Low', 'Medium', 'High').default('Low'),
    dueDate: Joi.date().allow(null),
    assignee: Joi.string().allow(null),
    image: Joi.string().allow('')
  }),

  updateTaskSchema: Joi.object({
    title: Joi.string(),
    description: Joi.string().allow(''),
    status: Joi.string().valid('To Do', 'In Progress', 'Completed'),
    priority: Joi.string().valid('Low', 'Medium', 'High'),
    dueDate: Joi.date().allow(null),
    assignee: Joi.string().allow(''),
    image: Joi.string().allow('')
  })
};

module.exports = taskValidation;