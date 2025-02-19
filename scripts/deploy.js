const { ethers } = require('hardhat');

async function main() {
  const EtronNFT = await ethers.getContractFactory('EtronNFT');

  const etronNFT = await EtronNFT.deploy();
  await etronNFT.waitForDeployment();

  const address = await etronNFT.getAddress();
  console.log(`EtronNFT deployed to ${address}`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
