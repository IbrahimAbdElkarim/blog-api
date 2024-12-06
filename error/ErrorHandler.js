const ERRORS = require('../error/errors');

module.exports = (error, req, res, next) => {
  let { message } = error;
  const key = Object.keys(ERRORS).find(key => ERRORS[key] === parseInt(message));
  const response = {
    status: 400,
    success: false,
    message: '',
    body: {}
  };

  error.message = response.message = req.t(key || message);
  error.status = response.status = parseInt(message) || 400;
  response.success = false;
  console.log(error);
  return res.status(response.status).send(response);
};
