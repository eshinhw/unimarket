# UniMarket

A decentralized marketplace that uses a set of smart contracts to execute order transactions and allow crypto payments.


<img width="1426" alt="Screenshot 2023-03-02 at 5 54 54 PM" src="https://user-images.githubusercontent.com/41933169/222578556-33a55eb9-9bc8-4f32-b926-0b283b8c5fad.png">

## Technology Stack & Tools

- [Solidity](https://docs.soliditylang.org/en/v0.8.19/): Writing smart contracts & testing
- [Hardhat](https://hardhat.org/): Ethereum development framework
- [Ethers.js](https://docs.ethers.io/v5/): Blockchain interaction in Web App
- [React.js](https://reactjs.org/): Frontend framework
- [React Redux](https://react-redux.js.org): A pattern and library for managing and updating application state

## Requirements For Initial Setup

- Install [NodeJS](https://nodejs.org/en/)

## Setting Up

### 1. Install Dependencies:
`$ npm install`

### 2. Run tests
`$ npx hardhat test`

### 3. Start Hardhat node
`$ npx hardhat node`

### 4. Run deployment script
In a separate terminal execute:
`$ npx hardhat run ./scripts/deploy.js --network localhost`

### 5. Start frontend
`$ npm run start`
