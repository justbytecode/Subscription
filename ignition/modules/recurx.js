const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("RecurXModule", (m) => {
  const recurx = m.contract("RecurX");
  
  return { recurx };
});