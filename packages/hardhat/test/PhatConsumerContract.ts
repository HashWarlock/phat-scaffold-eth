//import { expect } from "chai";
import { ethers } from "hardhat";
import { PhatConsumerContract } from "../typechain-types";

describe("PhatConsumerContract", function () {
  // We define a fixture to reuse the same setup in every test.

  let phatConsumerContract: PhatConsumerContract;
  before(async () => {
    const [owner] = await ethers.getSigners();
    const phatConsumerContractFactory = await ethers.getContractFactory("PhatConsumerContract");
    phatConsumerContract = (await phatConsumerContractFactory.deploy(owner.address)) as PhatConsumerContract;
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
