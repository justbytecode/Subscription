require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      chainId: 80002,
    },
    amoy: {
      url: process.env.AMOY_RPC_URL,
      accounts: [process.env.AMOY_PRIVATE_KEY],
    },
  },
};