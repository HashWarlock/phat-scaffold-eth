//import { expect } from "chai";
import { ethers } from "hardhat";
import { LensTreasureHunt } from "../typechain-types";

describe("LensTreasureHunt", function () {
  // We define a fixture to reuse the same setup in every test.

  let phatConsumerContract: LensTreasureHunt;
  before(async () => {
    const [owner] = await ethers.getSigners();
    const phatConsumerContractFactory = await ethers.getContractFactory("LensTreasureHunt");
    phatConsumerContract = (await phatConsumerContractFactory.deploy(owner.address)) as LensTreasureHunt;
    await phatConsumerContract.deployed();
  });

  describe("Deployment", function () {
    it("Should have the right message on deploy", async function () {
      //expect(await phatConsumerContract.greeting()).to.equal("Building Unstoppable Apps!!!");
    });

    it("Should allow setting a new message", async function () {
      // const newGreeting = "Learn Scaffold-ETH 2! :)";
      // await phatConsumerContract.setGreeting(newGreeting);
      // expect(await phatConsumerContract.greeting()).to.equal(newGreeting);
    });
  });
});
