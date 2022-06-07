const schema = require('../models/category.schema');
const statusCode = require('../utilities/statusCode');
const catchError = require('../utilities/catchError');

exports.all = async (_request, response) => {
	'use strict';
	await schema
		.find()
		.then((results) => {
			response.json(results);
		})
		.catch((error) => {
			catchError(response, statusCode.error.serverError, error.message);
		});
};

exports.view = async (request, response) => {
	'use strict';
	await schema
		.find({ slug: request.params.slug })
		.then((results) => {
			if (results.length === 1) {
				response.status(statusCode.success.ok).json(results[0]);
			} else {
				catchError(response, statusCode.error.notFound, 'category not found');
			}
		})
		.catch((error) => {
			catchError(response, statusCode.error.notFound, error.message);
		});
};
