// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hre = require("hardhat");
const { cars } = require("../src/cars.json");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

async function main() {
  const [deployer] = await ethers.getSigners();
  const Dappsla = await hre.ethers.getContractFactory("Dappsla");
  const dappsla = await Dappsla.deploy();
  await dappsla.deployed()

  console.log(`Deployed Dappsla Contract at: , ${dappsla.address}`)
  console.log(cars)
  console.log(cars[0].id)
  // List cars (Deploy cars onto the blockchain)

  for (let i = 0; i < cars.length; i++) {
    const transaction = await dappsla.connect(deployer).list(
      cars[i].id,
      cars[i].name,
      cars[i].class, 
      cars[i].image,
      // convert to tokens
      tokens(cars[i].price),
      cars[i].rating,
      cars[i].inventory
    )
    await transaction.wait()

    console.log(`Listed car ${cars[i].id}: ${cars[i].name}`)
  }

  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
