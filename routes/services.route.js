const express = require('express');
const controller = require('../controllers/services.controller');

const router = express.Router();

router.get('/', controller.all);
router.post('/create', controller.create);
router.put('/update/:id', controller.update);
router.delete('/delete/:id', controller.delete);

module.exports = router;
