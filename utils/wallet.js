const { ethers } = require('ethers');
const provider = require('./ether-provider');
require('dotenv').config();

const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);

module.exports = wallet;
