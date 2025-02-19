const router = require('express').Router();
const balanceController = require('../controllers/wallet');

router.get('/balance/:address', balanceController.getBalance);

router.post('/transfer', balanceController.transferPost);

module.exports = router;
