const Comment = require('./commentModel');
const { formatMongoData } = require('../../utils/dbHelper');

module.exports.createComment = async serviceData => {
  const comment = await new Comment(serviceData).save();
  return formatMongoData(comment);
};

module.exports.getComments = async ({ page = 1, limit = 20, article }) => {
  const options = { page, limit, sort: { createdAt: -1 }, populate: [{ path: 'user', select: 'name' }] };
  const comments = await Comment.paginate({ article }, options);
  comments.docs = formatMongoData(comments.docs);
  return comments;
};
