const Joi = require('joi');

const authValidation = {
  registerSchema: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('user', 'admin').default('user')
  }),

  loginSchema: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  })
};

module.exports = authValidation;