const schema = require('../models/cart.schema');
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
	const { bookId } = request.params,
		{ username } = request.author;

	await schema
		.findOne({ bookId, username })
		.then((results) => {
			response.status(statusCode.success.ok).json(results);
		})
		.catch((error) => {
			catchError(response, statusCode.error.serverError, error.message);
		});
};

exports.update = async (request, response) => {
	'use strict';

	await schema
		.findByIdAndUpdate(
			{ _id: request.params.id },
			{ quantity: request.body.quantity },
			{ new: true }
		)
		.then((results) => {
			response.status(statusCode.success.ok).json(results);
		})
		.catch((error) => {
			catchError(response, statusCode.error.serverError, error.message);
		});
};

exports.delete = async (request, response) => {
	'use strict';

	await schema
		.findByIdAndDelete({ _id: request.params.id })
		.then((results) => {
			response.status(statusCode.success.ok).json(results);
		})
		.catch((error) => {
			catchError(response, statusCode.error.serverError, error.message);
		});
};

exports.deleteAll = async (request, response) => {
	'use strict';

	const cart = await schema.find({ username: request.author.username });
	const idArray = cart.map((item) => item._id);

	await schema
		.deleteMany({ _id: { $in: idArray } })
		.then((results) => {
			response.status(statusCode.success.ok).json(results);
		})
		.catch((error) => {
			catchError(response, statusCode.error.serverError, error.message);
		});
};
