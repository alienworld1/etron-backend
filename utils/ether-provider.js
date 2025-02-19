const ethers = require('ethers');
require('dotenv').config();

const provider = new ethers.JsonRpcProvider(process.env.ANKR_API_ENDPOINT);

module.exports = provider;
