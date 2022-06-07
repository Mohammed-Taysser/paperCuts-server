const catchError = require('../utilities/catchError');
const statusCode = require('../utilities/statusCode');
const { verifyToken } = require('../utilities/jwt');

module.exports = async (request, response, next) => {
	'use strict';
	const { authorization } = request.headers;
	if (authorization) {
		await verifyToken(authorization, (error, author) => {
			if (error) {
				catchError(
					response,
					statusCode.error.forbidden,
					`you aren't authorize, token is invalid`,
				);
			} else {
				request.author = author;
				next();
			}
		});
	} else {
		catchError(response, statusCode.error.unauthorized, 'no token provide');
	}
};
