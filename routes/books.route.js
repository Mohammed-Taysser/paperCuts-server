const express = require('express');
const controller = require('../controllers/booksController');

const router = express.Router();

router.get('/', controller.all);
router.get('/top5', controller.top5);
router.get('/latest', controller.latest);
router.get('/related', controller.related);
router.get('/search', controller.search);
router.get('/:slug', controller.view);


module.exports = router;
