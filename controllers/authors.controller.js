const schema = require('../models/author.schema');
const statusCode = require('../utilities/statusCode');
const catchError = require('../utilities/catchError');

exports.all = async (_, response) => {
  await schema
    .find()
    .then((results) => {
      response.status(statusCode.success.ok).json(results);
    })
    .catch((error) =>
      catchError(response, statusCode.error.serverError, error.message)
    );
};

exports.view = async (request, response) => {
  const slug = request.params.slug;
  await schema
    .find({ username: slug })
    .then((results) => {
      if (results.length === 1) {
        response.status(statusCode.success.ok).json(results[0]);
      } else {
        catchError(response, statusCode.error.notFound, 'author not found');
      }
    })
    .catch((error) =>
      catchError(response, statusCode.error.notFound, error.message)
    );
};
