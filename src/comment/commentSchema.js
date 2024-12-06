const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports.createComment = Joi.object({
  article: Joi.objectId().required(),
  text: Joi.string().required(),
});

module.exports.getComments = Joi.object({
  article: Joi.objectId().required(),
  page: Joi.string(),
  limit: Joi.string()
});
