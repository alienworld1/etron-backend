const router = require('express').Router();

const storeController = require('../controllers/store');

router.post('/purchase', storeController.purchasePost);
router.get('/orders', storeController.ordersGet);

module.exports = router;
