// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/*
- Smart Contract is a backend of the website. 
- Smart Contract is written in Solidity.
- It will be responsible for managing orders, distributing items and processing payments between the parties.
*/

contract Dappazon {
    address public owner;

    struct Item {
        uint256 id;
        string name;
        string category;
        string image;
        uint256 cost;
        uint256 rating;
        uint256 stock;
    }
    // data structure in solidity?
    mapping(uint256 => Item) public items;

    constructor() {
        owner = msg.sender;
    }

    // List products
    function list(
        uint256 _id,
        string memory _name,
        string memory _category,
        string memory _image,
        uint256 _cost,
        uint256 _rating,
        uint256 _stock
    ) public {

        // create Item struct using the input parameters
        Item memory item = Item(
            _id,
            _name,
            _category,
            _image,
            _cost,
            _rating,
            _stock
        ); 

        // Save new Item to blockchain
        // key-value pair database
        items[_id] = item;
    }
}
