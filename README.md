# UniMarket

A decentralized marketplace that uses a set of smart contracts to execute order transactions and allow crypto payments.

## Technology Stack & Tools

- Solidity: Writing Smart Contracts & Tests
- [Hardhat](https://hardhat.org/): Ethereum Development Framework
- [Ethers.js](https://docs.ethers.io/v5/): Blockchain Interaction in Web App
- [React.js](https://reactjs.org/): Frontend Framework
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
