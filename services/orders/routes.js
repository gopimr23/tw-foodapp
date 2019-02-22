const router = require('express').Router();
const orderController = require('./controller');

router.post('/place-order', orderController.placeOrder);

router.get('/verify/:orderId', orderController.verifOrder);

module.exports = router;