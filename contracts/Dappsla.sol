// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/*
- Smart Contract is a backend of the website. 
- Smart Contract is written in Solidity.
- It will be responsible for managing orders, distributing items and processing payments between the parties.
*/

contract Dappsla {
    address public manufacturer;

    struct Car {
        uint256 id;
        string vin;
        string model_name;
        string model_class;
        string image;
        uint256 cost;
        uint256 rating;
        uint256 inventory;
    }

    struct Order {
        uint256 time;
        Car car;
    }
    // dictionary data structure in solidity
    // cars[0] = Car0, cars[1] = Car1
    mapping(uint256 => Car) public cars;
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

    event List(string name, uint256 cost, uint256 stock);
    event Purchase(address buyer, uint256 orderId, uint256 itemId);

    constructor() {
        // msg.sender identifies the address of the person who's calling this
        // calling contract constructor means it's the owner of the smart contract?
        manufacturer = msg.sender;
    }

    // custom modifier which can be applied to a function
    modifier onlyManufacturer() {
        require(msg.sender == manufacturer);
        // do this before the function body --> _ represents the function body
        _;
    }

    // List cars
    function list(
        uint256 _id,
        string memory _model_name,
        string memory _model_class,
        string memory _image,
        uint256 _cost,
        uint256 _rating,
        uint256 _inventory
    ) public onlyManufacturer {
        // if true, keep executing codes below
        // if false, stop executing codes at this point
        // require(msg.sender == owner);

        // create Item struct using the input parameters
        Car memory car = Car(
            _id,
            _model_name,
            _model_class,
            _image,
            _cost,
            _rating,
            _inventory
        );

        // Save new Item to blockchain
        // key-value pair database
        cars[_id] = car;

        // Emit an event
        // What 
        emit List(_model_name, _cost, _inventory);
    }

    function purchase(uint256 _id) public payable {
        // Receive crypto can be completed by adding payable modifier

        // Fetch an item from the item dictionary
        Car memory car = cars[_id];
        // Create an order
        // block.timestamp: epoch time, seconds elapsed since January 1, 1970
        Order memory order = Order(block.timestamp, car);

        // save order to chain
        // same manu
        orderCount[msg.sender]++;
        orders[msg.sender][orderCount[msg.sender]] = order;

        // Subtract stock

        cars[_id].inventory = cars[_id].inventory - 1;
        // Emit event

        emit Purchase(msg.sender, orderCount[msg.sender], car.id);
    }

    function withdraw() public onlyManufacturer {
        (bool success, ) = manufacturer.call{value: address(this).balance}("");
        require(success);
    }
}
  