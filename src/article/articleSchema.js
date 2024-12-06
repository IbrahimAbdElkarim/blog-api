const Joi = require('joi');

module.exports.createArticle = Joi.object({
  title: Joi.string().max(256).required(),
  body: Joi.string().required()
});

module.exports.updateArticle = Joi.object({
  title: Joi.string().max(256),
  body: Joi.string()
});

module.exports.getArticls = Joi.object({
  page: Joi.string(),
  limit: Joi.string()
});
