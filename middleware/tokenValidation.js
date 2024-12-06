const ERRORS = require('../error/errors');
const jwtHelper = require('../utils/jwtHelper');
const userService = require('../src/user/userService');

module.exports.validateToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw new Error(ERRORS.TOKEN_MISSING);
    const splitedToken = req.headers.authorization.split('Bearer')[1];
    if (!splitedToken) throw new Error(ERRORS.INVALID_BEARER_AUTHORIZATION);
    const token = splitedToken.trim();
    const decoded = jwtHelper.verify(token);
    req.user = await this.checkUserExist(decoded, req.url);
    return next();
  } catch (error) {
    if (error.message === 'jwt expired') error = new Error(ERRORS.TOKEN_EXPIRED);
    next(error);
  }
};

module.exports.checkUserExist = async ({ id }) => {
  return await userService.userOrError({ _id: id });
};
