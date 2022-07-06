const express = require('express');
const controller = require('../controllers/books.controller');
const authToken = require('../middleware/auth-token');
const authRole = require('../middleware/auth-roles');
const multer = require('../utilities/multer');

const router = express.Router();

router.get('/', controller.all);
router.get('/top5', controller.top5);
router.get('/latest', controller.latest);
router.get('/related', controller.related);
router.get('/search', controller.search);
router.post('/create', authToken, authRole, controller.create);
router.patch('/update', authToken, authRole, controller.update);
router.post(
	'/update-cover',
	authToken,
	multer.single('image'),
	controller.updateCover
);
router.get('/:slug', controller.view);

module.exports = router;
