const GoodNFT = artifacts.require("GoodNFT");

module.exports = function (deployer) {
  deployer.deploy(GoodNFT);
};
