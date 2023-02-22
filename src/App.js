import { useEffect, useState } from "react";
import { ethers } from "ethers";

// Components
import Navigation from "./components/Navigation";
import Section from "./components/Section";
import Product from "./components/Product";

// ABIs
import Dappsla from "./abis/Dappazon.json";

// Config
import config from "./config.json";
// import Navbar from "./components/BasicExample";
import BasicExample from "./components/Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);

  const loadBlockchainData = async () => {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);

    // 1. Connect to blockchain
    // MetaMask turns normal browser into blockchain browser
    // Same logic, ethers.js turns normal app into blockchain app
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    console.log("hello?")
    const network = await provider.getNetwork()
    console.log(network)
    // providing connection to blockchain inside the app
    // 2. Connect to smart contract
    // 3. Load products
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <div>
      <Navigation />
      <h2>Welcome to Dappsla!</h2>
      <p>{account}</p>
    </div>
  );
}

export default App;
