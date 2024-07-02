# COUNT Smart Contract + Frontend

This is a blockchain project made with Solidity + ReactJS(NextJS). This program has a count display and functions to increment and decrement the count.

## Description

This program is a smart contract written in Solidity, a programming language used for developing smart contracts on the Ethereum blockchain. The contract has a public variable count & 2 functions: increaseCount, decreaseCount which are used to increase and decrease the count. I have integrated the smart contract to a frontend built on ReactJS using Ether.js library and Hardhat. We can connect our metamask wallet and start interacting with the functions of the smart contract in a GUI using this app.

## Getting Started

### Executing program

- Inside the project directory, in the terminal type: npm i
- Open two additional terminals in your VS code
- In the second terminal type: ```npx hardhat node```
- In the third terminal, type: ```npx hardhat run --network localhost scripts/deploy.js```
- Back in the first terminal, type ```npm run dev``` to launch the front-end.
  
After this, the project will be running on your localhost. 
Typically at http://localhost:3000/

## Authors

Deepak
