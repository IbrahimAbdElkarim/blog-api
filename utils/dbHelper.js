
// Format Mongo Data (Without __v , _id)
module.exports.formatMongoData = data => {
  if (Array.isArray(data)) return data.map(value => value.toObject());
  return data.toObject();
};


module.exports.checkObjectId = id => {
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error(ERRORS.INVALID_ID);
};