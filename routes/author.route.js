const express = require('express');
const controller = require('../controllers/authors.controller'),
	authToken = require('../middleware/auth-token'),
	multer = require('../utilities/multer'),
	router = express.Router();

router.get('/', controller.all);
router.patch('/update', authToken, controller.update);
router.post(
	'/update-avatar',
	authToken,
	multer.single('avatar'),
	controller.updateAvatar
);
router.post('/change-password', authToken, controller.changePassword);
router.get('/search', controller.search);
router.delete('/delete/:id', authToken, controller.delete);
router.get('/:slug', controller.view);

module.exports = router;
