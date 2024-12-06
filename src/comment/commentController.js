const { wrapResult } = require('../../response/response');
const commentService = require('./commentService');

module.exports.createComment = async (req, res, next) => {
  try {
    req.body.user = req.user.id;
    const responseFromService = await commentService.createComment(req.body);
    wrapResult(res, responseFromService, 201);
  } catch (error) {
    next(error);
  }
};

module.exports.getComments = async (req, res, next) => {
  try {
    const responseFromService = await commentService.getComments(req.query);
    wrapResult(res, responseFromService);
  } catch (error) {
    next(error);
  }
};


