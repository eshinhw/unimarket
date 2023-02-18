// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/*
- Smart Contract is a backend of the website. 
- Smart Contract is written in Solidity.
- It will be responsible for managing orders, distributing items and processing payments between the parties.
*/

contract Dappazon {
    address public owner;
    string public name;

    struct Item {
        uint256 id;
        string name;
        string category;
        string image;
        uint256 cost;
        uint256 rating;
        uint256 stock;
    }

    struct Order {
        uint256 time;
        Item item;
    }
    // data structure in solidity?
    mapping(uint256 => Item) public items;
    // orderCount[address] = 1
    mapping(address => uint256) public orderCount;
    // orders[address] = {1: order1, 2: order2, ...}
    mapping(address => mapping(uint256 => Order)) public orders;


    // Event is an inheritable member of a contract. An event is emitted, it stores the arguments passed in transaction logs.
    // These logs are stored on blockchain and are accessible
    // using address of the contract till the contract is present on the blockchain.
    // An event generated is not accessible from within contracts, not even the one which have created and emitted them.
    // An event can be declared using event keyword.

    event List(string name, uint256 cost, uint256 stock);

    constructor() {
        // msg.sender identifies the address of the person who's calling this
        owner = msg.sender;
        name = "Eddie";
    }

    // custom modifier which can be applied to a function
    modifier onlyOwner() {
        require(msg.sender == owner);
        // do this before the function body --> _ represents the function body
        _;
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
        // if true, keep executing codes below
        // if false, stop executing codes at this point
        require(msg.sender == owner);

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

        // Emit an event

        emit List(_name, _cost, _stock);
    }

    function buy(uint256 _id) public payable {
        // Receive crypto can be completed by adding payable modifier

        // Fetch an item from the item dictionary
        Item memory item = items[_id];
        // Create an order
        // block.timestamp: epoch time, seconds elapsed since January 1, 1970

        Order memory order = Order(block.timestamp, item)

        // save order to chain

        // Subtract stock
        // Emit event
    }
}
