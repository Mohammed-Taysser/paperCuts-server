const express = require('express');
const controller = require('../controllers/coupon.controller');
const authToken = require('../middleware/auth-token'),
	router = express.Router();

router.get('/', authToken, controller.all);
router.get('/view/:label', authToken, controller.view);

module.exports = router;
