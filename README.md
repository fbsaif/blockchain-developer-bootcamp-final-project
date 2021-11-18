# GoodNFT DApp

## About
This is a simple DApp allows users to raise donations or funds through minting NFTs, the user does not need to be aware that the Ether is sent to the donation address, since it is handled transparently by the contract. 
A user can mint an NFT by signing his signature or autograph or even draw anything on the canvas, then click on the mint button to mint the NFT.

The smart contract uses Openzeppelin contracts and libraries such as [ERC721Enumerable](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721Enumerable.sol), [Counters](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Counters.sol) and [Ownable](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol).

The contract is deployed and verified on Ropsten testnet at [0x43D6Ff6FEe89CbfDFF3576eA300DcAAE3899dB03](https://ropsten.etherscan.io/address/0x43D6Ff6FEe89CbfDFF3576eA300DcAAE3899dB03)

### Features
- user can mint an NFT by signing his/her signature or autograph or even draw something on the canvas. 
- A clear button to clear the canvas and restart the process before minting.
- The minted NFT gets uploaded to IPFS server along with the metadata.
- Each NFT minted has 3 properties, ID, name and description.
- Currently the name and description properties are static, this could be upgraded into dynamic names and descriptions.
#

### Interact with the deployed DApp
- GoodNFT DApp requires [Metamask](https://metamask.io/) browser wallet extension to interact with.
- Connect metamask browser wallet to Ropsten Test Network.
- Request and get test etheres for the metamask account from [Ropsten Faucet](https://faucet.ropsten.be/) to make transactions.
- GoodNFT Smart Contract is deployed to Ropsten Testnet - [0x43D6Ff6FEe89CbfDFF3576eA300DcAAE3899dB03](https://ropsten.etherscan.io/address/0x43D6Ff6FEe89CbfDFF3576eA300DcAAE3899dB03#code)
- Access the GoodNFT DApp at [GoodNFT](https://fbsaif.github.io/blockchain-developer-bootcamp-final-project/) and start minting your NFTs.
#

### Run the DApp Locally
#### Install truffle
```
npm install -g truffle
```
#### Install ganache-cli
```
npm i ganache-cli
```
#### Run ganache-cli
```
ganache-cli --port 8545
```
#### Open new terminal window and clone this repository
```
git clone https://github.com/fbsaif/blockchain-developer-bootcamp-final-project.git
```
#### Install dependencies
```
npm install
```
#### Compile smart contract
```
truffle compile
```
#### Deploy smart contract to ganache
```
truffle migrate
```
#### Test smart contract
```
truffle test
```
#### Start DApp
```
npm start
```
- Open metamask browser wallet and connect network to Localhost 8545.
- Import accounts from ganache-cli into the metamask browser wallet to make transactions on the DApp.


#

### Run the DApp Etherum mainnet, testnet or other networks
#### Install truffle
```
npm install -g truffle
```

#### Open new terminal window and clone this repository
```
git clone https://github.com/fbsaif/blockchain-developer-bootcamp-final-project.git
```
#### Install dependencies
```
npm install
```
#### Create a .ENV new file
 - Create a new .env file in the project directory.
 - Copy and paste the contents of .env.example into the new .env file.
 - Add your seed phrase from metamask wallet to the seed phrase section in the .env file
 - Get a project API-KEY from https://infura.io/ and added to your choosen network in the .env file.

#### Truffle Configuration
  - Go to ``truffle-config.js``  
  * Add your chosen network anywhere below ``networks: {`` , use the code below as an example 
  ```
  ropsten: {
     provider: () => new HDWalletProvider(process.env.SEED_PHRASE, process.env.ROPSTEN_RPC_URL),
     network_id: 3,       // Ropsten's id
     gas: 5500000,        // Ropsten has a lower block limit than mainnet
     confirmations: 2,    // # of confs to wait between deployments. (default: 0)
     timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
     skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
     },
  ```
  - Change the RPC_URL name in the second line of the code above to your chosen network name, for example, ``process.env.MAINNET_RPC_URL``
  - Make sure that you added your RPC URL of your chosen network in the .env file.
#### Compile smart contract
```
truffle compile
```
#### Deploy smart contract to a chosen network
```
truffle migrate --network <network_name>
```
#### Test smart contract
```
truffle test
```
#### Start DApp
```
npm start
```
- Open metamask browser wallet and connect network to your chosen network
- Get Eth or test Eth wallet to make transactions on the DApp.
#
## Directory Structure
Key files and folders structures are as below:

```
.
├── build
├── contracts
│   └── GoodNFT.sol
│   └── Migrations.sol
├── migrations
│   └── 1_initial_migration.js
│   └── 2_GoodNFT_migration.js
├── node_modules
├── public
├── src
│   └── assets/bg
│   └── contracts
│   └── redux
│   └── App.js
├── test
│   └── GoodNFT.test.js
├── .gitignore
├── README.md
├── package-lock.json
├── package.json
└── truffle-config.js
```
#
## Screencast

*Pending*
## Ethereum account (for NFT certification)
```
0x7df34834d123124b48459feaadc7472fad025674
```