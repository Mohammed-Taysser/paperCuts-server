const express = require('express');
const controller = require('../controllers/cart.controller');
const authToken = require('../middleware/auth-token'),
  router = express.Router();

router.get('/', authToken, controller.all);
router.get('/view/:bookId', authToken, controller.view);
router.post('/create', authToken, controller.create);
router.patch('/update/:id', authToken, controller.update);
router.delete('/delete/:id', authToken, controller.delete);

module.exports = router;
