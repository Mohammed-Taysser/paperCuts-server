const schema = require('../models/order.schema');
const statusCode = require('../utilities/statusCode');
const catchError = require('../utilities/catchError');

exports.all = async (request, response) => {
	'use strict';
	const { username } = request.author;

	await schema
		.find({ username })
		.then((results) => {
			response.status(statusCode.success.ok).json(results);
		})
		.catch((error) => {
			catchError(response, statusCode.error.serverError, error.message);
		});
};

exports.create = async (request, response) => {
	'use strict';
	const createdItem = new schema({
		...request.body,
		username: request.author.username,
	});

	await createdItem
		.save()
		.then((results) => {
			response.status(statusCode.success.created).json(results);
		})
		.catch((error) => {
			catchError(response, statusCode.error.conflict, error.message);
		});
};

exports.view = async (request, response) => {
	'use strict';
	const { orderId } = request.params,
		{ username } = request.author;

	await schema
		.findOne({ orderId, username })
		.then((results) => {
			response.status(statusCode.success.ok).json(results);
		})
		.catch((error) => {
			catchError(response, statusCode.error.serverError, error.message);
		});
};
