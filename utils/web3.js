const ethers = require('ethers');
require('dotenv').config();

const provider = new ethers.JsonRpcProvider(process.env.ANKR_API_ENDPOINT);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const NFT_ABI = [
  'function mint(address to) external',
  'function ownerOf(uint256 tokenId) external view returns (address)',
  'function transferFrom(address from, address to, uint256) external',
];
const nftContract = new ethers.Contract(
  process.env.NFT_CONTRACT_ADDRESS,
  NFT_ABI,
  wallet,
);

module.exports = {
  provider,
  wallet,
  nftContract,
};
