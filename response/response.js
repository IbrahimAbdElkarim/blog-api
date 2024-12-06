module.exports.wrapResult = (res, data, status) => {
  const response = {
    status: status || 200,
    success: true,
    message:  'Operation Done Successfully',
    body: data
  };
  return res.status(response.status).send(response);
};
