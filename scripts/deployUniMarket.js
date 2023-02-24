// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hre = require("hardhat");
const { testData } = require("../src/testData.json");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

async function main() {
  const [deployer] = await ethers.getSigners();
  const UniMarket = await hre.ethers.getContractFactory("UniMarket");
  const UniMarketDeployed = await Dappsla.deploy();
  await UniMarketDeployed.deployed()

  console.log(`Deployed UniMarket Contract at: , ${UniMarketDeployed.address}`)

  // List cars (Deploy cars onto the blockchain)
  for (let i = 0; i < testData.length; i++) {
    const transaction = await UniMarketDeployed.connect(deployer).list(
      testData[i].id,
      testData[i].name,
      testData[i].category, 
      testData[i].image,
      // convert to tokens
      tokens(testData[i].price),
      testData[i].rating,
      testData[i].inventorytestData
    )
    await transaction.wait()

    console.log(`Listed item ${testData[i].id}: ${testData[i].name}`)
  }

  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
