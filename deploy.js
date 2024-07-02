const hre = require('hardhat');

async function main() {
  const Count = await hre.ethers.getContractFactory("Count");
  const count = await Count.deploy();

  await count.deployed();
  // console.log(`A contract is deployed to ${count.address()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
