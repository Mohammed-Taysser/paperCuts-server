const schema = require('../models/team.schema');
const statusCode = require('../utilities/statusCode');
const catchError = require('../utilities/catchError');

exports.all = async (_, response) => {
  await schema
    .find()
    .then((results) => {
      response.json(results);
    })
    .catch((error) =>
      catchError(response, statusCode.error.serverError, error.message)
    );
};
