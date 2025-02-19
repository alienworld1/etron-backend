const ethers = require('ethers');

require('dotenv').config({ path: '../.env' });

const provider = new ethers.JsonRpcProvider(process.env.ANKR_API_ENDPOINT);

const wallet = ethers.Wallet.createRandom(provider);

console.log(`Address: ${wallet.address}`);
console.log(`Private key: ${wallet.privateKey}`);
console.log(`Mnemonic: ${wallet.mnemonic.phrase}`);
