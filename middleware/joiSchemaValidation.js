const validateObjectSchema = (data, schema, callback) => {
  const result = schema.validate(data, { convert: false });
  if (result.error) {
    const errorDetails = result.error.details.map(value => {
      return {
        error: value.message,
        path: value.path
      };
    });
    return errorDetails;
  }

  // If a callback function is provided, invoke it with the mapped values
  if (callback) return callback(result.value);

  // Return null if there are no errors and no callback function provided
  return null;
};

module.exports.validateBody = schema => {
  return (req, res, next) => {
    const error = validateObjectSchema(req.body, schema, mappedData => {
      req.body = mappedData; // Update the request body with the mapped values
    });

    return error ? next(new Error(error[0].error)) : next();
  };
};

module.exports.validateQueryParams = schema => {
  return (req, res, next) => {
    const error = validateObjectSchema(req.query, schema, mappedData => {
      req.query = mappedData; // Update the query parameters with the mapped values
    });

    return error ? next(new Error(error[0].error)) : next();
  };
};
