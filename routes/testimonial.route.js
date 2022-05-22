const express = require('express');
const controller = require('../controllers/testimonialController');

const router = express.Router();

router.get('/', controller.all);

module.exports = router;
