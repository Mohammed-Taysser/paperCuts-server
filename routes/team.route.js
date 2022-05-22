const express = require('express');
const controller = require('../controllers/teamController');

const router = express.Router();

router.get('/', controller.all);

module.exports = router;
