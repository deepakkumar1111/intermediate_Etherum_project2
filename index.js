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
