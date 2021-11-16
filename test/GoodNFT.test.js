
const { assert } = require("chai");

const GoodNFT = artifacts.require("./GoodNFT.sol");

require("chai").use(require("chai-as-promised")).should();

contract("GoodNFT", (accounts) => {
  let smartContract;

  before(async () => {
    smartContract = await GoodNFT.deployed();
  });

  describe("deployment", async () => {
    it("deploys successfully", async () => {
      const address = await smartContract.address;
      assert.notEqual(address, "");
      assert.notEqual(address, 0x0);
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });
  });

  describe("name", async () => {
  it("has correct name", async () => {
    const name = await smartContract.name();
    assert.equal(name, "GoodNFT");
   });
  });

  describe("symbol", async () => {
    it("has correct symbol", async () => {
      const name = await smartContract.symbol();
      assert.equal(name, "GNFT");
     });
    });

  describe("minting", async () => {
    it("minted successfully", async () => {
      const uri = "https://example.com";
      await smartContract.mint(accounts[0], uri, {value:500000000000000000});
      const tokenUri = await smartContract.tokenURI(0);
      const balanceOfOwner = await smartContract.balanceOf(accounts[0]);
      assert.equal(tokenUri, uri);
      assert.equal(balanceOfOwner, 1);
    });
  });

  /*describe("send donation", async () => {
    it("sent the donation successfully", async () => {
      //const donationAddress = await smartContract.donationAddress.toString();
      //const _donationValue = await smartContract.donationValue
      //const sendDonation = await smartContract.methods.donationAddress.call(), ;
      //const donationPrice = smartContract.donationValue.web3.utils.toWei("0.5", "ether");
      //const sendDonation = await smartContract._sendDonation("0x31bC5dd6f717F1E5728Cfc124F4E5a26a4f7251E", ({value:500000000000000000}));
      let donationCost = await smartContract.getDonationValue();
      
      let donationAddress = await smartContract.getDonationAddress();
     
      //await donationAddress.call(),{value: donationCost};
      const sendDonation = await smartContract._sendDonation(donationAddress, donationCost, {value:500000000000000000});
      assert.equal(sendDonation, true);
    });
  });*/

  describe('fetches NFT data', async () => {
    it('lists NFTs', async () => {
    const items = await smartContract.getAllTokens()
    expect(await smartContract.tokenURI(0)).not.null;
    expect(await smartContract.tokenURI(0)).not.undefined;
    expect(await smartContract.tokenURI(0)).not.equal("");
      return items;
    })
    
  })
  
});
