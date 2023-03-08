// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/*
- Smart Contract is a backend of the website. 
- Smart Contract is written in Solidity.
- It will be responsible for managing orders, distributing items and processing payments between the parties.
*/

contract UniMarket {
    address public seller;

    struct Item {
        uint256 id;
        string title;
        string category;
        string image;
        uint256 price;
        uint256 rating;
        uint256 inventory;
    }

    struct Order {
        uint256 time;
        Item car;
    }
    // dictionary data structure in solidity
    // cars[0] = Car0, cars[1] = Car1
    mapping(uint256 => Item) public items;
    // orderCount[address] = 1
    // what's the address? address of the buyer? address of car?
    mapping(address => uint256) public orderCount;
    // uint256 orderCount;
    // orders[model_type] = {1: {order1}, 2: {order2}, ...}
    mapping(address => mapping(uint256 => Order)) public orders;

    // Event is an inheritable member of a contract. An event is emitted, it stores the arguments passed in transaction logs.
    // These logs are stored on blockchain and are accessible
    // using address of the contract till the contract is present on the blockchain.
    // An event generated is not accessible from within contracts, not even the one which have created and emitted them.
    // An event can be declared using event keyword.

    event List(string title, uint256 price, uint256 inventory);
    event Purchase(address buyer, uint256 orderId, uint256 itemId);

    constructor() {
        // msg.sender identifies the address of the person who's calling this
        // calling contract constructor means it's the owner of the smart contract?
        seller = msg.sender;
    }

    // custom modifier which can be applied to a function
    modifier onlySeller() {
        require(msg.sender == seller);
        // do this before the function body --> _ represents the function body
        _;
    }

    // List cars
    function list(
        uint256 _id,
        string memory _title,
        string memory _category,
        string memory _image,
        uint256 _price,
        uint256 _rating,
        uint256 _inventory
    ) public onlySeller {
        // if true, keep executing codes below
        // if false, stop executing codes at this point
        // require(msg.sender == owner);

        // create Item struct using the input parameters
        Item memory currItem = Item(
            _id,
            _title,
            _category,
            _image,
            _price,
            _rating,
            _inventory
        );

        // Save new Item to blockchain
        // key-value pair database
        items[_id] = currItem;

        // Emit an event
        // What 
        emit List(_title, _price, _inventory);
    }

    function purchase(uint256 _id) public payable {
        // Receive crypto can be completed by adding payable modifier

        // Fetch an item from the item dictionary
        Item memory currItem = items[_id];
        // Create an order
        // block.timestamp: epoch time, seconds elapsed since January 1, 1970
        Order memory order = Order(block.timestamp, currItem);

        // save order to chain
        // same manu
        orderCount[msg.sender]++;
        orders[msg.sender][orderCount[msg.sender]] = order;

        // Subtract stock

        items[_id].inventory = items[_id].inventory - 1;
        // Emit event

        emit Purchase(msg.sender, orderCount[msg.sender], currItem.id);
    }

    function withdraw() public onlySeller {
        (bool success, ) = seller.call{value: address(this).balance}("");
        require(success);
    }
}
  