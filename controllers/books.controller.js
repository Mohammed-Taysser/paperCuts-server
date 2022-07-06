const schema = require('../models/books.schema');
const cloudinary = require('../utilities/cloudinary');
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
		.findOne({ slug: request.params.slug })
		.then((results) => {
			if (results) {
				response.status(statusCode.success.ok).json(results);
			} else {
				catchError(response, statusCode.error.notFound, 'book not found');
			}
		})
		.catch((error) => {
			catchError(response, statusCode.error.notFound, error.message);
		});
};

exports.related = async (_request, response) => {
	'use strict';
	await schema
		.find()
		.then((results) => {
			response
				.status(statusCode.success.ok)
				.json(results.sort(() => 0.5 - Math.random()).slice(0, 4));
		})
		.catch((error) => {
			catchError(response, statusCode.error.notFound, error.message);
		});
};

exports.top5 = async (_request, response) => {
	'use strict';
	await schema
		.find()
		.select('image slug')
		.then((results) => {
			response
				.status(statusCode.success.ok)
				.json(results.sort((a_item, b_item) => a_item.stars - b_item.stars));
		})
		.catch((error) => {
			catchError(response, statusCode.error.notFound, error.message);
		});
};

exports.latest = async (_request, response) => {
	'use strict';
	await schema
		.find()
		.limit(4)
		.then((results) => {
			response.status(statusCode.success.ok).json(results);
		})
		.catch((error) => {
			catchError(response, statusCode.error.serverError, error.message);
		});
};

exports.search = async (request, response) => {
	'use strict';

	const { title, author, startPrice, endPrice, sort, category } = request.query,
		searchQuery = {};

	if (title) {
		searchQuery.title = { $regex: title, $options: 'i' };
	}

	if (author) {
		searchQuery['author.username'] = { $regex: author, $options: 'i' };
	}

	if (category) {
		searchQuery['category.slug'] = category;
	}

	if (startPrice || endPrice) {
		searchQuery.price = {
			$gte: startPrice || 0,
			$lte: endPrice || 1000,
		};
	}

	await schema
		.find(searchQuery)
		.sort(sort ? sort.split(',').join(' ') : '')
		.exec((error, results) => {
			if (error) {
				catchError(response, statusCode.error.notFound, error.message).end();
			}
			response.status(statusCode.success.ok).json(results);
		});
};

exports.create = async (request, response) => {
	'use strict';
	const createdItem = new schema(request.body);

	await createdItem
		.save()
		.then((results) => {
			response.status(statusCode.success.created).json(results);
		})
		.catch((error) => {
			catchError(response, statusCode.error.conflict, error.message);
		});
};

exports.update = async (request, response) => {
	'use strict';

	await schema
		.findByIdAndUpdate(request.body._id, request.body, { new: true })
		.then((results) => {
			response.status(statusCode.success.ok).json(results);
		})
		.catch((error) => {
			catchError(response, statusCode.error.conflict, error.message);
		});
};

exports.updateCover = async (request, response) => {
	'use strict';

	if (request.file) {
		try {
			const cloudinaryResponse = await cloudinary.uploader.upload(
				request.file.path,
				{
					folder: 'paperCuts/books/cover',
					eager: [
						{
							width: 600,
							height: 800,

							// crop: 'crop',
						},
					],
				}
			);

			// delete previous avatar
			await cloudinary.uploader.destroy(
				`paperCuts/books/cover/${request.body.oldCoverId}`
			);

			// use `cloudinaryResponse.eager[0].secure_url` instead of `cloudinaryResponse.secure_url` to save avatar with transformation
			await schema
				.findByIdAndUpdate(
					request.body._id,
					{ image: cloudinaryResponse.eager[0].secure_url },
					{ new: true }
				)
				.then((results) => {
					response.status(statusCode.success.ok).json(results);
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
