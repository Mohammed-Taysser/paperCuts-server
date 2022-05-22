const schema = require('../models/booksSchema');
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
    .findOne({ slug })
    .then((results) => {
      if (results) {
        response.status(statusCode.success.ok).json(results);
      } else {
        catchError(response, statusCode.error.notFound, 'book not found');
      }
    })
    .catch((error) =>
      catchError(response, statusCode.error.notFound, error.message)
    );
};

exports.related = async (_, response) => {
  await schema
    .find()
    .then((results) => {
      response
        .status(statusCode.success.ok)
        .json(results.sort(() => 0.5 - Math.random()).slice(0, 4));
    })
    .catch((error) =>
      catchError(response, statusCode.error.notFound, error.message)
    );
};

exports.top5 = async (_, response) => {
  await schema
    .find()
    .select('image slug')
    .then((results) => {
      response
        .status(statusCode.success.ok)
        .json(results.sort((a, b) => a.stars - b.stars));
    })
    .catch((error) =>
      catchError(response, statusCode.error.notFound, error.message)
    );
};

exports.latest = async (_, response) => {
  await schema
    .find()
    .limit(4)
    .then((results) => {
      response.status(statusCode.success.ok).json(results);
    })
    .catch((error) =>
      catchError(response, statusCode.error.serverError, error.message)
    );
};

exports.search = async (request, response) => {
  let { title, author, startPrice, endPrice, sort, category } = request.query,
    searchQuery = {};

  if (title) {
    searchQuery.title = { $regex: title, $options: 'i' };
  }

  if (author) {
    searchQuery['author.username'] = { $regex: author, $options: 'i' };
  }

  if (category) {
    searchQuery['category.slug'] = category;
  }

  if (startPrice || endPrice) {
    searchQuery.price = {
      $gte: startPrice || 0,
      $lte: endPrice || 1000,
    };
  }

  await schema
    .find(searchQuery)
    .sort(sort ? sort.split(',').join(' ') : '')
    .exec((error, results) => {
      if (error) {
        catchError(response, statusCode.error.notFound, error.message).end();
      }
      response.status(statusCode.success.ok).json(results);
    });
};
