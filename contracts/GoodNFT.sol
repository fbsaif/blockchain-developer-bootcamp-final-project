// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/// @title Make a donation by minting NFTs
/// @author Fakhri Bin Saif
/// @notice You can use this contract for only making donations to a specific address, the owner does not gain any profit from this contract, it is made solely for making donations 
/// @dev this contract allows the user to send donations to a donation address, it is handled transparently by the contract. all function calls are currently implemented without side effects
/// @custom:experimental This is an experimental contract.

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GoodNFT is ERC721Enumerable, Ownable {
  using Counters for Counters.Counter;
  using Strings for uint256;
  Counters.Counter _tokenIds;
  
  uint256 public donationValue = 0.01 ether;
  uint256 public maxSupply = 50;
  address  donationAddress = payable (0x0e42FA16095e22dc53D1fa84Bab4484541d91A2E);
  mapping(uint256 => string) _tokenURIs;

  struct RenderToken {
    uint256 id;
    string uri;
  }
  ///@dev Initializes the contract`name` and a `symbol`.
  constructor() ERC721("GoodNFT", "GNFT") {}

  function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
    _tokenURIs[tokenId] = _tokenURI;
  }

   /// @param tokenId The ID of each NFT minted and pass it to tokenURI
   /// @return The updated tokneURI
  function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override
    returns (string memory)
  {
    require(_exists(tokenId));
    string memory _tokenURI = _tokenURIs[tokenId];
    return _tokenURI;
  }

  /// @notice Returns the id and uri from RenderToken struct
  /// @dev Returns all the tokens id and uri that exist 
  /// @return all the rendered tokens
  function getAllTokens() public view returns (RenderToken[] memory) {
    uint256 lastestId = _tokenIds.current();
    uint256 counter = 0;
    RenderToken[] memory res = new RenderToken[](lastestId);
    for (uint256 i = 0; i < lastestId; i++) {
      if (_exists(counter)) {
        string memory uri = tokenURI(counter);
        res[counter] = RenderToken(counter, uri);
      }
      counter++;
    }
    return res;
  }

  /// @dev this function is triggered in the mint function below
  /// @notice requires a successful ETH transfer to the donation address
  function _sendDonation () private {
    
    (bool success, ) = payable(donationAddress).call{value:donationValue}("");
    require(success, "Could not send value!");
  }
  /// @dev Safely mints `tokenId` and transfers it to `recipient` using openzeppelin library
  /// @notice requires msg.value equals or more than the donation value, and the last ID minted is less than the maximum supply
  /// @param recipient The caller of mint function
  /// @param uri The ID of each NFT minted and pass it to tokenURI
  /// @return Token ID
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
  
  ///@dev Returns the current donation value
  function getDonationValue () public view returns (uint256) {
    return donationValue;
  }
  ///@dev Returns the current donation address
  function getDonationAddress() public view returns (address) {
    return donationAddress;
  }

  ///@dev Use this function can change the donation address
  function setDonationAddress(address payable _donationAddress) public onlyOwner() {
    donationAddress = _donationAddress;
  }
}