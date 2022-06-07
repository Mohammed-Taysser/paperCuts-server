const express = require('express');
const controller = require('../controllers/order.controller');
const authToken = require('../middleware/auth-token'),
	router = express.Router();

router.get('/', authToken, controller.all);
router.get('/view/:orderId', authToken, controller.view);
router.post('/create', authToken, controller.create);

module.exports = router;
