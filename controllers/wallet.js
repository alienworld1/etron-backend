const asyncHandler = require('express-async-handler');
const ethers = require('ethers');
const { body, validationResult } = require('express-validator');

const provider = require('../utils/ether-provider');
const wallet = require('../utils/wallet');

const getBalance = asyncHandler(async (req, res) => {
  const { address } = req.params;
  const balance = await provider.getBalance(address);
  return res.json({
    balance: ethers.formatEther(balance),
  });
});

const transferPost = [
  body('to')
    .isString()
    .isLength({ min: 42, max: 42 })
    .withMessage('Invalid recipient address'),
  body('amount').isNumeric().withMessage('Invalid amount'),
  asyncHandler(async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: errors.array(),
          success: false,
        });
      }

      const { to, amount } = req.body;
      const tx = await wallet.sendTransaction({
        to,
        value: ethers.parseEther(amount),
      });

      await tx.wait();

      return res.json({
        success: true,
        message: 'Transaction successful',
        transactionHash: tx.hash,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Internal server error',
        success: false,
      });
    }
  }),
];

module.exports = {
  getBalance,
  transferPost,
};
