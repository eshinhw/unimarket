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
    console.log("deployer.address");
    console.log(deployer.address);

    console.log("buyer.address");
    console.log(buyer.address);

    // Deploy contract
    // contract name is Dappazon in Dappazon.sol file
    const Dappazon = await ethers.getContractFactory("Dappazon");
    dappazon = await Dappazon.deploy();
  });

  describe("Deployment", () => {
    it("sets the owner", async () => {
      expect(await dappazon.owner()).to.equal(deployer.address);
    });
    it("has a name", async () => {
      expect(await dappazon.name()).to.equal("Eddie");
    });
  });

  describe("Listing", () => {
    let transaction;

    const ID = 1;
    const NAME = "Shoes";
    const CATEGORY = "Clothing";
    const IMAGE = "IMAGE";
    const COST = tokens(1);
    console.log(COST);
    const RATING = 5;
    const STOCK = 4;

    beforeEach(async () => {
      transaction = await dappazon
        .connect(deployer)
        .list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK);
      // wait transaction to be completed
      await transaction.wait();

      transaction = await dappazon.connect(buyer).buy(ID, { value: COST });

      await transaction.wait();
    });

    it("returns item attributes", async () => {
      const item = await dappazon.items(1);
      expect(item.id).to.equal(ID);
      expect(item.name).to.equal(NAME);
      expect(item.category).to.equal(CATEGORY);
      expect(item.image).to.equal(IMAGE);
      expect(item.cost).to.equal(COST);
      expect(item.rating).to.equal(RATING);
      expect(item.stock).to.equal(STOCK);
    });
    it("emits an event", async () => {
      expect(transaction).to.emit(dappazon, "List");
    });
  });
});
