const mongoose = require('mongoose');
const schema = require('../models/services.schema');
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

exports.create = async (request, response) => {
  const { title, info, img } = request.body;
  if (title && info && img) {
    let createdService = new schema(request.body);

    await createdService
      .save()
      .then((results) => {
        response.status(statusCode.success.created).json(results);
      })
      .catch((error) =>
        catchError(response, statusCode.error.conflict, error.message)
      );
  } else {
    catchError(response, statusCode.error.badRequest, 'coordinate are missing');
  }
};

exports.update = async (request, response) => {
  const _id = request.params.id;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    catchError(
      response,
      statusCode.error.notFound,
      `No Corresponding Serving With ${_id}`
    ).end();
  }

  await schema
    .findByIdAndUpdate(_id, request.body, { new: true })
    .then((results) => {
      response.status(statusCode.success.ok).json(results);
    })
    .catch((error) =>
      catchError(response, statusCode.error.serverError, error.message)
    );
};

exports.delete = async (request, response) => {
  const _id = request.params.id;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    catchError(
      response,
      statusCode.error.notFound,
      `No Corresponding Service With ${_id}`
    ).end();
  }

  await schema
    .findByIdAndDelete(_id)
    .then((results) => {
      response.status(statusCode.success.ok).send(results);
    })
    .catch((error) => {
      catchError(response, statusCode.error.serverError, error.message);
    });
};
