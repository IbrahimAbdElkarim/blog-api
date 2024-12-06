const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Article',
    },
    text: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    toObject: {
      transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

commentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Comment', commentSchema);
