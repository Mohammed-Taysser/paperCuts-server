const express = require('express');
const controller = require('../controllers/team.controller');

const router = express.Router();

router.get('/', controller.all);

module.exports = router;
