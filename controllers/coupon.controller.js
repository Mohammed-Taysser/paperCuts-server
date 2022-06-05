const schema = require('../models/coupon.schema');
const statusCode = require('../utilities/statusCode');
const catchError = require('../utilities/catchError');

exports.all = async (_request, response) => {
	'use strict';

	await schema
		.find()
		.then((results) => {
			response.status(statusCode.success.ok).json(results);
		})
		.catch((error) => {
			catchError(response, statusCode.error.serverError, error.message);
		});
};

exports.view = async (request, response) => {
	'use strict';

	await schema
		.findOne({ label: request.params.label })
		.then((results) => {
			response.status(statusCode.success.ok).json(results);
		})
		.catch((error) => {
			catchError(response, statusCode.error.serverError, error.message);
		});
};
