## 💡 Design Pattern Decisions
A summary of design pattern decisions and smart contract best practices taken into account for the GoodNFT smart contract.


### Modularity and inheritance

This contract inherits the [Ownable](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol) contract from OpenZeppelin to first leverage the `onlyOwner` modifier and allow the owner to `transferOwnership` and `renounceOwnership`. It also inherits and applies [ERC721Enumerable](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721Enumerable.sol), [Counters](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Counters.sol) to safe mint the tokens and a mapping from token id to position in the allTokens array.



### Access Restriction

State variables used were `public` which allowed methods and variables to be accessed from the contract. The use of `modifiers` discussed below, which used to provide a layer of security to the public functions.

```Solidity 
function setDonationAddress(address payable _donationAddress) public onlyOwner() {
    donationAddress = _donationAddress;
  }

```
### Require Modifier

The contract uses `require()` modifier,  "should be used to ensure valid conditions, such as inputs, or contract state variables [..], or to validate return values from calls to external contracts" evaluating the parameters passed to it as a boolean and throw an exception if it evaluates to false. 

```Solidity
function _sendDonation () private {
    
    (bool success, ) = payable(donationAddress).call{value:donationValue}("");
    require(success, "Could not send value!");
  }

function mint(address recipient, string memory uri) public payable returns (uint256) {
    uint256 newId = _tokenIds.current();
    uint256 supply = _tokenIds.current();
    supply = totalSupply();
    

    require(msg.value >= donationValue);
    require(newId + 1 <= maxSupply , "Max supply reached!");
    
    _mint(recipient, newId);
    _setTokenURI(newId, uri);
    _tokenIds.increment();
    _sendDonation();
    return newId;
  }

```
