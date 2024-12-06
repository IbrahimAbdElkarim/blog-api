const User = require('./userModel');
const ERRORS = require('../../error/errors');
const bcrypt = require('bcrypt');
const jwtHelper = require('../../utils/jwtHelper');
const { formatMongoData } = require('../../utils/dbHelper');

/**
 * User register
 * @param {*} serviceData
 * @returns {Promise<*>}
 */
module.exports.register = async serviceData => {
  await errorIfUserWithExistEmail(serviceData.email);

  serviceData.password = await bcrypt.hash(serviceData.password, 12);
  const user = await new User(serviceData).save();
  return formatMongoData(user);
};

/**
 * User login
 * @param {*} param0 | email, password
 * @throws {Error} | if user not found
 * @throws {Error} | if password is invalid
 * @returns
 */
module.exports.login = async ({ email, password }) => {
  const user = await this.userOrError({ email });
  if (!user) throw new Error(ERRORS.USER_NOT_FOUND);

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error(ERRORS.INVALID_PASSWORD);

  const token = jwtHelper.sign({ id: user.id });
  return { token, user:formatMongoData(user) };
};

const errorIfUserWithExistEmail = async (email, id) => {
  const userWithEmail = await User.findOne({ email, ...(id && { _id: { $ne: id } }) });
  if (userWithEmail) throw new Error(ERRORS.EMAIL_ALREADY_EXISTS);
};

module.exports.userOrError = async (filter, populateModels = []) => {
  const user = await User.findOne(filter).populate(populateModels);
  if (!user) throw new Error(ERRORS.USER_NOT_FOUND);
  return user;
};
