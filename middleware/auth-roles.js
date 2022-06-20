const catchError = require('../utilities/catchError');
const statusCode = require('../utilities/statusCode');
const schema = require('../models/author.schema');

const { AUTHORIZATION_ROLE } = process.env;

module.exports = async (request, response, next) => {
	'use strict';

	await schema
		.findOne({ username: request.author.username })
		.then((results) => {
			const { role } = results;
			if (role && AUTHORIZATION_ROLE.includes(role)) {
				next();
			} else {
				catchError(
					response,
					statusCode.error.unauthorized,
					"You Don't Have Permission"
				);
			}
		})
		.catch((error) => {
			catchError(response, statusCode.error.unauthorized, error);
		});
};
