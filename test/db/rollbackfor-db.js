const User = require('../../src/user/userModel');

module.exports.rollbackDb = async () => {
  await User.deleteMany({});
};
