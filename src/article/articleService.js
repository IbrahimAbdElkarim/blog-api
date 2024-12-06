const Article = require('./articleModel');
const ERRORS = require('../../error/errors');
const { formatMongoData } = require('../../utils/dbHelper');

module.exports.createArticle = async serviceData => {
  const article = await new Article(serviceData).save();
  return formatMongoData(article);
};

module.exports.articleOrError = async (filter, populateModels = []) => {
  const article = await Article.findOne(filter).populate(populateModels);
  if (!article) throw new Error(ERRORS.ARTICLE_NOT_FOUND);
  return article;
};

module.exports.updateArticle = async (articleId, updatedData, user) => {
  const article = await this.articleOrError({ _id: articleId });

  if (article.user.toString() != user.id.toString()) throw new Error(ERRORS.INVALID_PERMISSION);
  article.set(updatedData);
  await article.save();
  return formatMongoData(article);
};

module.exports.getArticls = async ({ page = 1, limit = 20 }) => {
  const options = { page, limit, sort: { createdAt: -1 }, populate: [{ path: 'user', select: 'name' }] };
  const articles = await Article.paginate({}, options);
  articles.docs = formatMongoData(articles.docs);
  return articles;
};

module.exports.articleById = async articleId => {
  const article = await this.articleOrError({ _id: articleId });
  return formatMongoData(article);
};
