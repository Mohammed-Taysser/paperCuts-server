const bcrypt = require('bcryptjs');
const schema = require('../models/author.schema');
const statusCode = require('../utilities/statusCode');
const catchError = require('../utilities/catchError');
const cloudinary = require('../utilities/cloudinary');
const { generateToken } = require('../utilities/jwt');

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
		.find({ username: request.params.slug })
		.then((results) => {
			if (results.length === 1) {
				response.status(statusCode.success.ok).json(results[0]);
			} else {
				catchError(response, statusCode.error.notFound, 'author not found');
			}
		})
		.catch((error) => {
			catchError(response, statusCode.error.notFound, error.message);
		});
};

exports.search = async (request, response) => {
	'use strict';

	await schema
		.findOne(request.query)
		.then((results) => {
			response.status(statusCode.success.ok).json(results);
		})
		.catch((error) => {
			catchError(response, statusCode.error.notFound, error.message);
		});
};

// eslint-disable-next-line max-lines-per-function
exports.update = async (request, response) => {
	'use strict';

	let token = null;

	try {
		const setting = request.body;

		await schema
			.findByIdAndUpdate(request.author._id, setting, { new: true })
			.then(async (results) => {
				token = await generateToken(results);

				response.status(statusCode.success.ok).json({ author: results, token });
			});
	} catch (error) {
		catchError(response, statusCode.error.conflict, error.message);
	}
};

exports.updateAvatar = async (request, response) => {
	'use strict';

	if (request.file) {
		try {
			const cloudinaryResponse = await cloudinary.uploader.upload(
				request.file.path,
				{
					folder: 'paperCuts/authors/avatar',
					eager: [
						{
							width: 500,
							height: 500,

							// crop: 'crop',
						},
					],
				}
			);

			// delete previous avatar
			await cloudinary.uploader.destroy(
				`paperCuts/authors/avatar/${request.body.oldAvatarId}`
			);

			// use `cloudinaryResponse.eager[0].secure_url` instead of `cloudinaryResponse.secure_url` to save avatar with transformation
			await schema
				.findByIdAndUpdate(
					request.author._id,
					{ avatar: cloudinaryResponse.eager[0].secure_url },
					{ new: true }
				)
				.then(async (results) => {
					const token = await generateToken(results);
					response
						.status(statusCode.success.ok)
						.json({ author: results, token });
				});
		} catch (error) {
			catchError(response, statusCode.error.conflict, error.message);
		}
	} else {
		catchError(
			response,
			statusCode.error.conflict,
			'ensure file uploaded correctly'
		);
	}
};

exports.changePassword = async (request, response) => {
	'use strict';

	const { currentPassword, newPassword } = request.body;
	const authorResponse = await schema.findById(request.author._id);

	try {
		await bcrypt
			.compare(currentPassword, authorResponse.password)
			.then(async (isMatch) => {
				if (isMatch) {
					const salt = await bcrypt.genSalt(10);
					const hashedPassword = await bcrypt.hash(newPassword, salt);

					await schema
						.findByIdAndUpdate(
							authorResponse._id,
							{ password: hashedPassword },
							{ new: true }
						)
						.then(async (results) => {
							const token = await generateToken(results);
							response
								.status(statusCode.success.ok)
								.json({ author: results, token });
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
	} catch (error) {
		catchError(response, statusCode.error.conflict, error.message);
	}
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
