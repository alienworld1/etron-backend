const ethers = require('ethers');
require('dotenv').config();

const provider = new ethers.InfuraProvider(
  process.env.NETWORK,
  process.env.INFURA_PROJECT_ID,
);

module.exports = provider;
