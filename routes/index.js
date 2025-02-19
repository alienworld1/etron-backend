const router = require('express').Router();

const { verifyApiKey } = require('../middleware/auth');
const balanceController = require('../controllers/wallet');
const authRouter = require('./auth');

router.get('/balance/:address', balanceController.getBalance);
router.post('/transfer', verifyApiKey, balanceController.transferPost);

router.use('/auth', authRouter);

module.exports = router;
