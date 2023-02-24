import { useEffect, useState } from "react";
import { ethers } from "ethers";

// Components
import Navigation from "./components/Navigation";
import Section from "./components/Section";
import Product from "./components/Product";

// ABIs
import UniMarketABI from "./abis/UniMarket.json";

// Config
import config from "./config.json";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [unimarket, setUnimarket] = useState(null);
  const [cars, setCars] = useState(null);
  const [gadgets, setGadgets] = useState(null);
  const [books, setBooks] = useState(null);
  const [clothing, setClothing] = useState(null);

  const loadBlockchainData = async () => {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);

    // 1. Connect to blockchain
    // MetaMask turns normal browser into blockchain browser
    // Same logic, ethers.js turns normal app into blockchain app
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    const network = await provider.getNetwork();
    console.log(network);
    // providing connection to blockchain inside the app
    // ABI: Abstract Binary Interface
    // Connect to smart contract
    const unimarket = new ethers.Contract(
      config[network.chainId].unimarket.address,
      UniMarketABI,
      provider
    );

    setUnimarket(unimarket);

    // 3. Load products from smart contract

    const items = [];

    for (let i = 0; i < 16; i++) {
      const currItem = await unimarket.items(i + 1);
      items.push(currItem);
    }

    console.log(items);

    const cars = items.filter((item) => item.category === "Car");
    const gadgets = items.filter((item) => item.category === "Personal Gadget");
    const books = items.filter((item) => item.category === "Books & Magazines");
    const clothing = items.filter((item) => item.category === "Clothing");

    setCars(cars);
    setGadgets(gadgets);
    setBooks(books);
    setClothing(clothing);

    
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <div>
      <Navigation />
      {cars && <Section title={"Electric Cars"} cars={cars} />}
      {gadgets && <Section title={"Personal Gadgets"} cars={gadgets} />}
      {books && <Section title={"Books & Magazines"} cars={books} />}
      {clothing && <Section title={"Clothing"} cars={clothing} />}
    </div>
  );
}
