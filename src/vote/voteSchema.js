const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports.createvote = Joi.object({
  article: Joi.objectId().required(),
  vote: Joi.number().required().valid(1, -1)
});
