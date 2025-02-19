const ethers = require('ethers');

require('dotenv').config({ path: '../.env' });

console.log(process.argv);

const provider = new ethers.JsonRpcProvider(process.env.ANKR_API_ENDPOINT);
const wallet = new ethers.Wallet(process.argv[2], provider);

async function transfer(to, amount) {
  const tx = await wallet.sendTransaction({
    to,
    value: ethers.parseEther(amount),
  });

  await tx.wait();

  return tx.hash;
}

transfer(process.argv[3], process.argv[4])
  .then(hash => console.log(`Transaction hash: ${hash}`))
  .catch(error => console.error(error));
