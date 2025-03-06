const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Subscription", function () {
  let Subscription, subscription, owner, merchant, subscriber;

  beforeEach(async function () {
    [owner, merchant, subscriber] = await ethers.getSigners();
    Subscription = await ethers.getContractFactory("Subscription");
    subscription = await Subscription.deploy(merchant.address, owner.address, ethers.utils.parseEther("0.1"), 2592000);
    await subscription.deployed();
  });

  it("should deploy with correct initial values", async function () {
    expect(await subscription.merchant()).to.equal(merchant.address);
    expect(await subscription.platformOwner()).to.equal(owner.address);
    expect(await subscription.price()).to.equal(ethers.utils.parseEther("0.1"));
    expect(await subscription.interval()).to.equal(2592000);
  });

  it("should handle subscription and fee correctly", async function () {
    const payment = ethers.utils.parseEther("0.1");
    const platformFee = payment.mul(50).div(10000); // 0.5%
    const merchantAmount = payment.sub(platformFee);

    const ownerBalanceBefore = await ethers.provider.getBalance(owner.address);
    const merchantBalanceBefore = await ethers.provider.getBalance(merchant.address);

    await subscription.connect(subscriber).subscribe("plan123", { value: payment });

    const ownerBalanceAfter = await ethers.provider.getBalance(owner.address);
    const merchantBalanceAfter = await ethers.provider.getBalance(merchant.address);

    expect(ownerBalanceAfter.sub(ownerBalanceBefore)).to.equal(platformFee);
    expect(merchantBalanceAfter.sub(merchantBalanceBefore)).to.be.closeTo(merchantAmount, ethers.utils.parseEther("0.0001")); // Allow small gas variance
    expect(await subscription.subscriberExpiry(subscriber.address)).to.be.above(0);
    expect(await subscription.subscriberPlanId(subscriber.address)).to.equal("plan123");
  });

  it("should refund excess payment", async function () {
    const payment = ethers.utils.parseEther("0.2");
    const subscriberBalanceBefore = await ethers.provider.getBalance(subscriber.address);

    const tx = await subscription.connect(subscriber).subscribe("plan123", { value: payment });
    const receipt = await tx.wait();
    const gasUsed = receipt.gasUsed.mul(receipt.effectiveGasPrice);

    const subscriberBalanceAfter = await ethers.provider.getBalance(subscriber.address);
    const expectedRefund = payment.sub(ethers.utils.parseEther("0.1"));
    expect(subscriberBalanceBefore.sub(subscriberBalanceAfter).sub(gasUsed)).to.be.closeTo(expectedRefund, ethers.utils.parseEther("0.0001"));
  });

  it("should allow owner to withdraw stuck funds", async function () {
    await subscriber.sendTransaction({ to: subscription.address, value: ethers.utils.parseEther("1") });
    const ownerBalanceBefore = await ethers.provider.getBalance(owner.address);
    const tx = await subscription.withdraw();
    const receipt = await tx.wait();
    const gasUsed = receipt.gasUsed.mul(receipt.effectiveGasPrice);

    const ownerBalanceAfter = await ethers.provider.getBalance(owner.address);
    expect(ownerBalanceAfter.sub(ownerBalanceBefore).add(gasUsed)).to.equal(ethers.utils.parseEther("1"));
  });
});