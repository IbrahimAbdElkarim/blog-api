const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const votSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Article'
    },
    vote: {
      type: Number, 
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

votSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Vot', votSchema);
