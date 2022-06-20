const express = require('express');
const controller = require('../controllers/books.controller');
const authToken = require('../middleware/auth-token');
const authRole = require('../middleware/auth-roles');

const router = express.Router();

router.get('/', controller.all);
router.get('/top5', controller.top5);
router.get('/latest', controller.latest);
router.get('/related', controller.related);
router.get('/search', controller.search);
router.post('/create', authToken, authRole, controller.create);
router.get('/:slug', controller.view);

module.exports = router;
