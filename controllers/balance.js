const asyncHandler = require('express-async-handler');
const provider = require('../utils/ether-provider');
const ethers = require('ethers');

const getBalance = asyncHandler(async (req, res) => {
  const { address } = req.params;
  const balance = await provider.getBalance(address);
  return res.json({
    balance: ethers.formatEther(balance),
  });
});

module.exports = {
  getBalance,
};
