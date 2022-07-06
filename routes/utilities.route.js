const express = require('express');
const controller = require('../controllers/utilities.controller'),
	router = express.Router();

router.get('/languages', controller.languages);

module.exports = router;
