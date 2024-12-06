const { wrapResult } = require('../../response/response');
const userService = require('./userService');

module.exports.register = async (req, res, next) => {
  try {
    const responseFromService = await userService.register(req.body);
    wrapResult(res, responseFromService, 201);
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const responseFromService = await userService.login(req.body);
    wrapResult(res, responseFromService);
  } catch (error) {
    next(error);
  }
};
