const router = require('express').Router();

const { verifyApiKey, authenticateToken } = require('../middleware/auth');
const balanceController = require('../controllers/wallet');
const authRouter = require('./auth');
const storeRouter = require('./store');
const nftRouter = require('./nft');

router.get('/balance/:address', balanceController.getBalance);
router.post('/transfer', verifyApiKey, balanceController.transferPost);

router.use('/auth', authRouter);
router.use('/store', authenticateToken, storeRouter);
router.use('/nfts', authenticateToken, nftRouter);

module.exports = router;
