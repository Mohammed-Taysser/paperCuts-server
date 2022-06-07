const multer = require('multer');
const path = require('path');

// Multer config
module.exports = multer({
	limits: {
		fileSize: 5 * 1024 * 1024,
	},
	storage: multer.diskStorage({}),

	fileFilter: (_request, file, callback) => {
		'use strict';
		const ext = path.extname(file.originalname);

		if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
			callback(new Error('Only .png, .jpg and .jpeg format allowed!'), false);
			return;
		}
		callback(null, true);
	},
});
