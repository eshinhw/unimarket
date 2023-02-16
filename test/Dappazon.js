const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

// Writing tests is extremely important for Smart Contract development!!

describe("Dappazon Testing", () => {
  let dappazon;
  let deployer, buyer;

  beforeEach(async () => {
    // Set up fake accounts
    // ehthers.getSigners() returns a set of fake accounts created by ethers
    [deployer, buyer] = await ethers.getSigners();
    // console.log(await ethers.getSigners());
    // console.log(deployer, buyer)
    console.log(deployer.address)

    // Deploy contract
    const Dappazon = await ethers.getContractFactory("Dappazon");
    dappazon = await Dappazon.deploy();
  });
  describe("Deployment", () => {
    it("sets the owner", async () => {
      expect(await dappazon.owner()).to.equal(deployer.address);
    });
    it("has a name", async () => {
      expect(await dappazon.name()).to.equal("Dappazon");
    });
  });

  describe("Listing", () => {
    it("returns item attributes", async () => {
      expect(await dappazon.owner()).to.equal(deployer.address);
    });
  });
});
