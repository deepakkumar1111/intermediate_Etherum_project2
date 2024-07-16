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
### Contract
```
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract Count {
    
    uint public count;

    event increased(uint count);
    event decreased(uint count);

    function increaseCount() public {
        count+=1;
        emit increased(count);
    }

    function decreaseCount() public {
        require(count>0,"Count cannot be less than 0");
        count-=1;
        emit decreased(count);
    }
}
```
### Deploy.js File

```
const hre = require('hardhat');

async function main() {
  const Count = await hre.ethers.getContractFactory("Count");
  const count = await Count.deploy();

  await count.deployed();
  // console.log(`A contract is deployed to ${count.address()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

### Index.js File
```
import { useEffect, useState } from 'react'
import { ethers } from 'ethers';
import count_abi from '../artifacts/contracts/Count.sol/Count.json'

function App() {

  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [countContract, setCountContract] = useState(undefined);
  const [count, setCount] = useState(undefined);
  
  // Contract Address of the deployed contract
  const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
  // ABI
  const countABI = count_abi.abi;


  // Checking if user has metamask or other wallet installed
  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }


  // Handles the connection and sets the account to state variable
  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  // / If wallet is found, this function is used to connect to it
  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    

    getCountContract();
  };


  // Creates an instance of the contract
  const getCountContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, countABI, signer);
 
    setCountContract(contract);
  }


  // Gets the count from the contract
  const getCount = async () =>{
    if (countContract) {
      setCount((await countContract.count()).toNumber());
    }
  }

  // Increments the count
  const increaseCount = async () => {
    if (countContract) {
      const tx = await countContract.increaseCount();
      await tx.wait();
      getCount();
    }
  }

  // Decrements the count
  const decreaseCount = async () => {
    if (countContract) {
      try{
        const tx = await countContract.decreaseCount();
        await tx.wait();
        getCount();
      } catch(error){
        alert("Count Cannot Be Less Than 0")
      }
      
    }
  }


  const Home = () =>{
    if(!ethWallet){
      return<h1>Please install METAMASK!</h1>
    }

    if(!account){
      return<button onClick={connectAccount}>Please connect your account!</button>
    }

    if(count == undefined){
      getCount()
    }

    return(
      <div>
        <p>Address: {account[0]}</p>
        <br/>
        <h1>Count: {count}</h1>
        <br/>
        <button onClick={increaseCount}>Increase Count</button>
        <button onClick={decreaseCount}>Decrease Count</button>
      </div>
    )
  }

  useEffect(()=>{
    getWallet();
  },[])


  return (
    <div className='container' style={{height:"90vh", display:"flex", flexDirection:"column", alignItems:"center"}}>
      <h1>Welcome to THE COUNTER!</h1>
      <Home/>
    </div>
  )
}

export default App
```
## Authors

Deepak Kumar
