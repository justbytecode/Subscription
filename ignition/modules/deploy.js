const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("SubscriptionModule", (m) => {
  // Define parameters for the constructor
  const merchantAddress = "0x69f03ffd4a7E505a17d0c1C7D89451ed896Db064"; // Replace with actual merchant address
  const platformOwnerAddress = "0x421DEE136645Dc3E523089513d68F69fFF777f73"; // Replace with actual platform owner address

  // Deploy the Subscription contract
  const subscription = m.contract("Subscription", [merchantAddress, platformOwnerAddress], {
    // Optional: Specify additional deployment options
    // value: ethers.parseEther("0.1"), // Send ETH with deployment if needed
  });

  // Return the deployed contract instance for reference
  return { subscription };
});