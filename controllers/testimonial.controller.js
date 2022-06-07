const schema = require('../models/testimonial.schema');
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
