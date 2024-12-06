const { wrapResult } = require('../../response/response');
const voteService = require('./voteService');

module.exports.createvote = async (req, res, next) => {
  try {
    req.body.user = req.user.id;
    const responseFromService = await voteService.createvote(req.body);
    wrapResult(res, responseFromService, 201);
  } catch (error) {
    next(error);
  }
};


module.exports.getArticleVotes = async (req, res, next) => {
  try {
    const responseFromService = await voteService.getArticleVotes(req.params.articleId);
    wrapResult(res, responseFromService);
  } catch (error) {
    next(error);
  }
};