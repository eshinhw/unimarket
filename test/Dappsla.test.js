const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

// Global constants for listing a car...
const ID = 1;
const NAME = "Model S";
const CLASS = "Sedan";
const IMAGE = "https://ipfs.io/ipfs/QmTYEboq8raiBs7GTUg2yLXB3PMz6HuBNgNfSZBx5Msztg/shoes.jpg";
const COST = tokens(1);
const RATING = 4;
const INVENTORY = 5;

// Writing tests is extremely important for Smart Contract development!!

describe("Dappsla Tests", () => {
  let dappsla;
  let deployer, buyer;

  beforeEach(async () => {
    // Set up fake accounts
    // ehthers.getSigners() returns a set of fake accounts created by ethers
    [deployer, buyer] = await ethers.getSigners();
    // console.log(await ethers.getSigners());
    // console.log(deployer, buyer)
    // console.log("deployer.address");
    // console.log(deployer.address);

    // console.log("buyer.address");
    // console.log(buyer.address);

    // Deploy contract
    // contract name is Dappsla in Dappsla.sol file
    const Dappsla = await ethers.getContractFactory("Dappsla");
    dappsla = await Dappsla.deploy();
  });

  describe("Contract Deployment", () => {
    it("sets the manufacturer", async () => {
      expect(await dappsla.manufacturer()).to.equal(deployer.address);
    });
  });

  describe("Listing", () => {
    let transaction;

    beforeEach(async () => {
      // List a item
      transaction = await dappsla
        .connect(deployer) // connect?
        .list(ID, NAME, CLASS, IMAGE, COST, RATING, INVENTORY);
      await transaction.wait();
    });

    it("returns car information", async () => {
      const car = await dappsla.cars(ID);

      expect(car.id).to.equal(ID);
      expect(car.name).to.equal(NAME);
      expect(car.category).to.equal(CATEGORY);
      expect(car.image).to.equal(IMAGE);
      expect(car.cost).to.equal(COST);
      expect(car.rating).to.equal(RATING);
      expect(car.stock).to.equal(STOCK);
    });

    it("emits List event", () => {
      expect(transaction).to.emit(dappsla, "List");
    });
  });

  describe("Purchasing", () => {
    let transaction;

    beforeEach(async () => {
      // List a car for testing
      transaction = await dappsla
        .connect(deployer)
        .list(ID, NAME, CLASS, IMAGE, COST, RATING, INVENTORY);
      await transaction.wait();

      // Purchase a car
      transaction = await dappsla.connect(buyer).buy(ID, { value: COST });
      await transaction.wait();
    });

    it("updates buyer's order count", async () => {
      const result = await dappsla.orderCount(buyer.address);
      expect(result).to.equal(1);
    });

    it("adds the order", async () => {
      const order = await dappsla.orders(buyer.address, 1);

      expect(order.time).to.be.greaterThan(0);
      expect(order.car.model_name).to.equal(NAME);
    });

    it("updates the contract balance", async () => {
      const result = await ethers.provider.getBalance(dappsla.address);
      expect(result).to.equal(COST);
    });

    it("emits Buy event", () => {
      expect(transaction).to.emit(dappsla, "Buy");
    });
  });

  describe("Withdrawing", () => {
    let balanceBefore;

    beforeEach(async () => {
      // List a item
      let transaction = await dappsla
        .connect(deployer)
        .list(ID, NAME, CLASS, IMAGE, COST, RATING, INVENTORY);
      await transaction.wait();

      // Buy a item
      transaction = await dappsla.connect(buyer).buy(ID, { value: COST });
      await transaction.wait();

      // Get Deployer balance before
      balanceBefore = await ethers.provider.getBalance(deployer.address);

      // Withdraw
      transaction = await dappsla.connect(deployer).withdraw();
      await transaction.wait();
    });

    it("updates the manufacturer balance", async () => {
      const balanceAfter = await ethers.provider.getBalance(deployer.address);
      expect(balanceAfter).to.be.greaterThan(balanceBefore);
    });

    it("updates the contract balance", async () => {
      const result = await ethers.provider.getBalance(dappazon.address);
      expect(result).to.equal(0);
    });
  });
});
