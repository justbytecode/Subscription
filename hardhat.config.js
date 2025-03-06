require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      chainId: 11155111,
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/oqEOSkZ6l7JzL_JyPKD6j7iOoBSPIcKE",
      accounts: [process.env.SEPOLIA_PRIVATE_KEY],
    },
  },
};
