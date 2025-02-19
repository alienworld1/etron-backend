const ethers = require('ethers');
require('dotenv').config();

const provider = new ethers.JsonRpcProvider(process.env.ANKR_API_ENDPOINT);
const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);

const NFT_ABI = [
  'function safeMint(address to, string memory uri) external',
  'function ownerOf(uint256 tokenId) external view returns (address)',
  'function transferFrom(address from, address to, uint256) external',
];
const nftContract = new ethers.Contract(
  process.env.NFT_CONTRACT_ADDRESS,
  NFT_ABI,
  wallet,
);

async function waitForPayment(
  buyerAddress,
  sellerAddress,
  amountInETH,
  timeout = 300000,
) {
  const startBlock = await provider.getBlockNumber();
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    const currentBlock = await provider.getBlockNumber();

    for (let i = startBlock; i <= currentBlock; i++) {
      const block = await provider.getBlock(i, true);

      if (block && block.transactions) {
        for (const txHash of block.transactions) {
          const tx = await provider.getTransaction(txHash);

          if (
            tx &&
            tx.from.toLowerCase() === buyerAddress.toLowerCase() &&
            tx.to.toLowerCase() === sellerAddress.toLowerCase() &&
            tx.value.toString() === amountInETH.toString()
          ) {
            console.log(
              `Payment received: ${ethers.formatEther(tx.value)} ETH, hash = ${tx.hash}`,
            );
            return true;
          }
        }
      }
    }
    await new Promise(resolve => setTimeout(resolve, 5000));
  }

  console.log('Payment not received');
  return false;
}

module.exports = {
  provider,
  wallet,
  nftContract,
  waitForPayment,
};
