const Joi = require('joi');

module.exports.register = Joi.object({
  name: Joi.string().max(255).required(),
  email: Joi.string()
    .max(255)
    .email()
    .required()
    .custom(value => {
      return value.toLowerCase();
    }),
  password: Joi.string()
    .min(8)
    .pattern(/[a-z]/, 'lowercase letter')
    .pattern(/[A-Z]/, 'uppercase letter')
    .pattern(/[0-9]/, 'number')
    .pattern(/[!@#$%^&*(),.?":{}|<>]/, 'special character')
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.pattern.name': 'Password must contain at least one {#name}',
      'any.required': 'Password is required'
    })
});

module.exports.login = Joi.object({
  email: Joi.string()
    .max(255)
    .email()
    .required()
    .custom(value => {
      return value.toLowerCase();
    }),
  password: Joi.string()
    .min(8)
    .pattern(/[a-z]/, 'lowercase letter')
    .pattern(/[A-Z]/, 'uppercase letter')
    .pattern(/[0-9]/, 'number')
    .pattern(/[!@#$%^&*(),.?":{}|<>]/, 'special character')
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.pattern.name': 'Password must contain at least one {#name}',
      'any.required': 'Password is required'
    })
});
