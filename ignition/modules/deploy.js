const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("SubscriptionModule", (m) => {
  // Define parameters for the Subscription contract
  const merchant = "0x69f03ffd4a7E505a17d0c1C7D89451ed896Db064"; // Replace with a test merchant address
  const platformOwner = "0x6d701eCCf5e7869D216F4392B9f31184f021b888"; // Replace with platform owner address
  const price = m.getParameter("price", ethers.parseEther("0.1")); // 0.1 ETH
  const interval = m.getParameter("interval", 2592000); // 30 days (in seconds)

  // Deploy the Subscription contract
  const subscription = m.contract("Subscription", [merchant, platformOwner, price, interval]);

  // Return the deployed contract
  return { subscription };
});