const { wrapResult } = require('../../response/response');
const articleService = require('./articleService');

module.exports.createArticle = async (req, res, next) => {
  try {
    req.body.user = req.user.id;
    const responseFromService = await articleService.createArticle(req.body);
    wrapResult(res, responseFromService, 201);
  } catch (error) {
    next(error);
  }
};

module.exports.updateArticle = async (req, res, next) => {
  try {
    const responseFromService = await articleService.updateArticle(req.params.id, req.body, req.user);
    wrapResult(res, responseFromService);
  } catch (error) {
    next(error);
  }
};

module.exports.getArticls = async (req, res, next) => {
  try {
    const responseFromService = await articleService.getArticls(req.query);
    wrapResult(res, responseFromService);
  } catch (error) {
    next(error);
  }
};

module.exports.articleById = async (req, res, next) => {
  try {
    const responseFromService = await articleService.articleById(req.params.id);
    wrapResult(res, responseFromService);
  } catch (error) {
    next(error);
  }
};
