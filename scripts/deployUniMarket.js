// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hre = require("hardhat");
const { data } = require("../src/testData.json");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

async function main() {
  const [deployer] = await ethers.getSigners();
  const UniMarket = await hre.ethers.getContractFactory("UniMarket");
  const UniMarketDeployed = await UniMarket.deploy();
  await UniMarketDeployed.deployed()

  console.log(`Deployed UniMarket Contract at: , ${UniMarketDeployed.address}`)

  // List cars (Deploy cars onto the blockchain)
  for (let i = 0; i < data.length; i++) {
    const transaction = await UniMarketDeployed.connect(deployer).list(
      data[i].id,
      data[i].name,
      data[i].category, 
      data[i].image,
      // convert to tokens
      tokens(data[i].price),
      data[i].rating,
      data[i].inventory
    )
    await transaction.wait()

    console.log(`Listed item ${data[i].id}: ${data[i].name}`)
  }

  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
