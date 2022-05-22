const express = require('express');
const controller = require('../controllers/events.controller');

const router = express.Router();

router.get('/', controller.all);
router.get('/:slug', controller.view);

module.exports = router;
