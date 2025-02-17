const router = require('express').Router();
const balanceController = require('../controllers/balance');

router.get('/balance/:address', balanceController.getBalance);

module.exports = router;
