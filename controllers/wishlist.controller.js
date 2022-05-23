const schema = require("../models/wishlist.schema");
const statusCode = require("../utilities/statusCode");
const catchError = require("../utilities/catchError");

exports.all = async (request, response) => {
  const { username } = request.author;

  await schema
    .find({ username })
    .then((results) => {
      response.status(statusCode.success.ok).json(results);
    })
    .catch((error) =>
      catchError(response, statusCode.error.serverError, error.message)
    );
};

exports.create = async (request, response) => {
  const createdItem = new schema({
    ...request.body,
    username: request.author.username,
  });

  await createdItem
    .save()
    .then((results) => {
      response.status(statusCode.success.created).json(results);
    })
    .catch((error) =>
      catchError(response, statusCode.error.conflict, error.message)
    );
};

exports.view = async (request, response) => {
  const { bookId } = request.params;
  const { username } = request.author;

  await schema
    .findOne({ bookId, username })
    .then((results) => {
      response.status(statusCode.success.ok).json(results);
    })
    .catch((error) =>
      catchError(response, statusCode.error.serverError, error.message)
    );
};

exports.delete = async (request, response) => {
  const _id = request.params.id;

  await schema
    .findByIdAndDelete(_id)
    .then((results) => {
      response.status(statusCode.success.ok).json(results);
    })
    .catch((error) => {
      catchError(response, statusCode.error.serverError, error.message);
    });
};
