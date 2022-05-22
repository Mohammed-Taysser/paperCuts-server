const express = require('express');
const controller = require('../controllers/auth.controller');

const router = express.Router();

router.get('/', controller.all);
router.get('/:slug', controller.view);

module.exports = router;
