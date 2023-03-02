import { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";

// Components
import Navigation from "./components/Navigation";
import Section from "./components/Section";

// ABIs
import UniMarketABI from "./abis/UniMarket.json";

// Config
import config from "./config.json";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage";

export const DataContext = createContext();

export default function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [unimarket, setUnimarket] = useState(null);
  const [cars, setCars] = useState(null);
  const [gadgets, setGadgets] = useState(null);
  const [books, setBooks] = useState(null);
  const [clothing, setClothing] = useState(null);
  // const [items, setItems] = useState(null);
  const [toggleCar, setToggleCar] = useState(false);
  const [toggleGadget, setToggleGadget] = useState(false);
  const [toggleBook, setToggleBook] = useState(false);
  const [toggleClothing, setToggleClothing] = useState(false);
  const [toggleCarousel, setToggleCarousel] = useState(true);

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
    // console.log(network);
    // console.log("provider: ", provider);
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
      let currItem = await unimarket.items(i + 1);
      let currItemCopy = { ...currItem };
      currItemCopy.cost = ethers.utils.formatUnits(currItem.cost.toString(), "ether");
      items.push(currItemCopy);
    }

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
      <Navigation
        props={[
          setToggleCar,
          setToggleGadget,
          setToggleBook,
          setToggleClothing,
          setToggleCarousel,
          account,
        ]}
      />
      <HomePage />
      {/* <div style={{backgroundColor: "green", fontSize: "25px", marginTop:"10px", textAlign: "center", paddingLeft: "80px"}}>Welcome to UniMarket!</div> */}
      {/* {toggleCarousel && <CarouselItems />} */}
      {toggleCar && (
        <Section
          title={"Electric Cars"}
          cars={cars}
          setToggle={setToggleCar}
          unimarket={unimarket}
          provider={provider}
          account={account}
        />
      )}
      {toggleGadget && (
        <Section
          title={"Personal Gadgets"}
          cars={gadgets}
          setToggle={setToggleGadget}
          unimarket={unimarket}
          provider={provider}
          account={account}
        />
      )}
      {toggleBook && (
        <Section
          title={"Books & Magazines"}
          cars={books}
          setToggle={setToggleBook}
          unimarket={unimarket}
          provider={provider}
          account={account}
        />
      )}
      {toggleClothing && (
        <Section
          title={"Clothing"}
          cars={clothing}
          setToggle={setToggleClothing}
          unimarket={unimarket}
          provider={provider}
          account={account}
        />
      )}
    </div>
  );
}
