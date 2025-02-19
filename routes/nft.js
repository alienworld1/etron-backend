const router = require('express').Router();

const nftController = require('../controllers/nft');

router.get('/', nftController.nftsGet);
router.get('/:id', nftController.nftGet);

module.exports = router;
