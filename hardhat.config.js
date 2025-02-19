require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.28',
  networks: {
    electroneum_testnet: {
      url: process.env.ANKR_API_ENDPOINT,
      accounts: [process.env.WALLET_PRIVATE_KEY],
    },
  },
};
