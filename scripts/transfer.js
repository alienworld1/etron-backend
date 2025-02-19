const ethers = require('ethers');

require('dotenv').config({ path: '../.env' });

const provider = new ethers.JsonRpcProvider(process.env.ANKR_API_ENDPOINT);
const wallet = new ethers.Wallet(process.argv[1], provider);

async function transfer(to, amount) {
  const tx = await wallet.sendTransaction({
    to,
    value: ethers.utils.parseEther(amount),
  });

  await tx.wait();

  return tx.hash;
}

transfer(process.argv[2], process.argv[3])
  .then(hash => console.log(`Transaction hash: ${hash}`))
  .catch(error => console.error(error));
