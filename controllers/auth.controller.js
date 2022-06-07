const bcrypt = require('bcryptjs');
const schema = require('../models/author.schema');
const statusCode = require('../utilities/statusCode');
const catchError = require('../utilities/catchError');
const loginValidation = require('../validations/login.validate');
const registerValidation = require('../validations/register.validate');
const { generateToken, verifyToken } = require('../utilities/jwt');

// authors
exports.register = async (request, response) => {
	'use strict';
	const { username, email } = request.body;

	const errorAsObject = registerValidation(request.body);

	if (Object.keys(errorAsObject).length === 0) {
		try {
			const isExist = await schema.isExist(username, email);

			if (isExist.exist) {
				catchError(response, statusCode.error.conflict, isExist.error).end();
			} else {
				const createdAuthor = new schema(request.body);

				await createdAuthor
					.save()
					.then(async (results) => {
						const token = await generateToken(results);
						request.header('authorization', token);
						response
							.status(statusCode.success.created)
							.json({ author: results, token });
					})
					.catch((error) => {
						catchError(response, statusCode.error.conflict, error.message);
					});
			}
		} catch (error) {
			catchError(response, statusCode.error.serverError, error.message).end();
		}
	} else {
		catchError(response, statusCode.error.badRequest, errorAsObject);
	}
};

exports.login = async (request, response) => {
	'use strict';
	const { email, password } = request.body;

	const errorAsObject = loginValidation(email, password);

	if (Object.keys(errorAsObject).length === 0) {
		await schema
			.findOne({ email })
			.then(async (results) => {
				if (!results) {
					catchError(response, statusCode.error.badRequest, {
						notExist: `author not exist`,
					}).end();
				}
				await bcrypt
					.compare(password, results.password)
					.then(async (isMatch) => {
						if (isMatch) {
							const token = await generateToken(results);
							request.header('authorization', token);
							response.status(statusCode.success.ok).json({
								author: results,
								token,
							});
						} else {
							catchError(response, statusCode.error.badRequest, {
								password: 'Password Not Correct',
							}).end();
						}
					})
					.catch((error) => {
						catchError(response, statusCode.error.serverError, error.message);
					});
			})
			.catch((error) => {
				catchError(response, statusCode.error.serverError, error.message);
			});
	} else {
		catchError(response, statusCode.error.badRequest, errorAsObject);
	}
};

// token's
exports.refresh = async (request, response) => {
	'use strict';
	const { authorization } = request.headers;
	if (authorization) {
		await verifyToken(authorization, (error, author) => {
			if (error && error.name === 'TokenExpiredError') {
				response.status(403).json(error);
			} else {
				response.status(200).json({
					authorization,
				});
			}
		});
	} else {
		response.json({ message: `no token` }).end();
	}
};
