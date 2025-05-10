const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RecurX", function () {
  let RecurX, recurx, owner, addr1, addr2;
  
  beforeEach(async function () {
    RecurX = await ethers.getContractFactory("RecurX");
    [owner, addr1, addr2] = await ethers.getSigners();
    recurx = await RecurX.deploy();
    await recurx.deployed();
  });
  
  it("Should initialize with correct owner", async function () {
    expect(await recurx.owner()).to.equal(owner.address);
  });
  
  it("Should send MATIC payment with platform fee", async function () {
    const amount = ethers.utils.parseEther("1");
    const initialOwnerBalance = await ethers.provider.getBalance(owner.address);
    
    await expect(
      recurx.connect(addr1).sendPayment(
        addr2.address,
        amount,
        "MATIC",
        { value: amount }
      )
    )
      .to.emit(recurx, "PaymentSent")
      .withArgs(
        ethers.utils.keccak256(
          ethers.utils.defaultAbiCoder.encode(
            ["address", "address", "uint256", "string", "uint256"],
            [addr1.address, addr2.address, amount, "MATIC", await ethers.provider.getBlock("latest").then(b => b.timestamp)]
          )
        ),
        addr1.address,
        addr2.address,
        amount,
        "MATIC",
        amount.mul(50).div(10000)
      );
    
    const tx = await recurx.transactions(await ethers.utils.keccak256(
      ethers.utils.defaultAbiCoder.encode(
        ["address", "address", "uint256", "string", "uint256"],
        [addr1.address, addr2.address, amount, "MATIC", await ethers.provider.getBlock("latest").then(b => b.timestamp)]
      )
    ));
    
    expect(tx.completed).to.be.true;
  });
  
  it("Should allow owner to update token support", async function () {
    await expect(recurx.updateTokenSupport("USDT", addr1.address, true))
      .to.emit(recurx, "TokenSupportUpdated")
      .withArgs("USDT", addr1.address, true);
    
    expect(await recurx.supportedTokens(addr1.address)).to.be.true;
    expect(await recurx.tokenAddresses("USDT")).to.equal(addr1.address);
  });
});