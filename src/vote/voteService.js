const Vote = require('./voteModel');
const { formatMongoData } = require('../../utils/dbHelper');
const mongoose = require('mongoose');

module.exports.createvote = async serviceData => {
  let vote = await Vote.findOne({ user: serviceData.user, article: serviceData.article });
  if (vote) {
    vote.vote = serviceData.vote;
    await existingVote.save();
  } else {
    vote = await new Vote(serviceData).save();
  }
  return formatMongoData(vote);
};

module.exports.getArticleVotes = async articleId => {
  const votes = await Vote.aggregate([
    { $match: { article: new mongoose.Types.ObjectId(articleId) } },
    {
      $group: {
        _id: null,
        upVotes: { $sum: { $cond: [{ $eq: ['$vote', 1] }, 1, 0] } },
        downVotes: { $sum: { $cond: [{ $eq: ['$vote', -1] }, 1, 0] } }
      }
    }
  ]);
  return votes[0] || { upVotes: 0, downVotes: 0 };
};
