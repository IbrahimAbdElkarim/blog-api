const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const articleSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
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

articleSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Article', articleSchema);
