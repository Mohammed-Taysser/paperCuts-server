const bcrypt = require('bcryptjs');
const jwtDecode = require('jwt-decode');
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
				if (results) {
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
				} else {
					catchError(response, statusCode.error.badRequest, {
						notExist: `author not exist`,
					});
				}
			})
			.catch((error) => {
				catchError(response, statusCode.error.serverError, error.message);
			});
	} else {
		catchError(response, statusCode.error.badRequest, errorAsObject);
	}
};

// password
// exports.resetPassword = async (request, response) => {
// 	'use strict';

// 	const { email } = request.body;
// 	const { authorization } = request.headers;

// 	const mail = nodemailer.createTransport({
// 		service: 'gmail',
// 		auth: {
// 			user: '', // Your email id
// 			pass: '', // Your password
// 		},
// 	});

// 	const mailOptions = {
// 		from: 'mohamedtaysser983@gmail.com',
// 		to: email,
// 		subject: 'Reset Password Link - paperCuts.com',
// 		html: '<p>You requested for reset password, kindly use this <a href="http://localhost:4000/reset-password >link</a> to reset your password</p>',
// 	};

// 	mail.sendMail(mailOptions, function (error, info) {
// 		if (error) {
// 			catchError(response, statusCode.error.serverError, error.message);
// 		} else {
// 			response.status(statusCode.success.ok).json(info);
// 		}
// 	});
// };

// token's
exports.refresh = async (request, response) => {
	'use strict';
	const { authorization } = request.headers;
	if (authorization) {
		await verifyToken(authorization, async (error) => {
			if (error && error.name === 'TokenExpiredError') {
				const author = await jwtDecode(authorization);
				const token = await generateToken(author);
				response.status(statusCode.success.created).json({ token });
			} else {
				response.status(statusCode.error.badRequest).json({ error });
			}
		});
	} else {
		response
			.status(statusCode.error.badRequest)
			.json({ message: `no token provide!` });
	}
};

// dashboard
exports.adminLogin = async (request, response) => {
	'use strict';
	const { email, password } = request.body;

	const errorAsObject = loginValidation(email, password);

	if (Object.keys(errorAsObject).length === 0) {
		await schema
			.findOne({ email, role: 'admin' })
			.then(async (results) => {
				if (results) {
					await bcrypt
						.compare(password, results.password)
						.then(async (isMatch) => {
							if (isMatch) {
								const token = await generateToken(results);
								request.header('authorization', token);
								response.status(statusCode.success.ok).json({
									admin: results,
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
				} else {
					catchError(response, statusCode.error.badRequest, {
						notExist: `admin not exist`,
					}).end();
				}
			})
			.catch((error) => {
				catchError(response, statusCode.error.serverError, error.message);
			});
	} else {
		catchError(response, statusCode.error.badRequest, errorAsObject);
	}
};
