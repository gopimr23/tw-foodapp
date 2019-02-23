const router = require('express').Router();
const orderController = require('./controller');

router.post('/place-order', orderController.checkoutOrder);

router.get('/verify/:orderId', orderController.verifyOrder);

module.exports = router;