// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Import OpenZeppelin contracts
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Our NFT contract inherits from ERC721 (the standard NFT contract)
// and ERC721URIStorage (for storing token metadata)
contract EtronNFT is ERC721, ERC721URIStorage, Ownable {
    // Keep track of the current token ID
    uint256 private _nextTokenId;

    // Constructor runs when the contract is deployed
    // We set the name and symbol of our NFT collection
    constructor() ERC721("EtronNFT", "ENFT") Ownable(msg.sender) {}

    // Function to mint (create) new NFTs
    // Only the contract owner can mint new tokens
    function safeMint(address to, string memory uri) public onlyOwner {
        // Get the current token ID
        uint256 tokenId = _nextTokenId++;
        // Mint the token to the specified address
        _safeMint(to, tokenId);
        // Set the token's metadata URI
        _setTokenURI(tokenId, uri);
    }

    // Override required functions
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}