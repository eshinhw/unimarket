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
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import { useDispatch } from "react-redux";
import CarouselItems from "./components/CarouselItems";

export const DataContext = createContext();

export default function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [unimarket, setUnimarket] = useState(null);
  const [cars, setCars] = useState(null);
  const [gadgets, setGadgets] = useState(null);
  const [books, setBooks] = useState(null);
  const [clothing, setClothing] = useState(null);
  const [items, setItems] = useState(null);
  const [toggleCar, setToggleCar] = useState(false);
  const [toggleGadget, setToggleGadget] = useState(false);
  const [toggleBook, setToggleBook] = useState(false);
  const [toggleClothing, setToggleClothing] = useState(false);
  const [toggleCarousel, setToggleCarousel] = useState(true);

  const loadBlockchainData = async () => {
    // const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    // const account = ethers.utils.getAddress(accounts[0]);
    // setAccount(account);

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
    setItems(items);

    // dispatch({ type: "BLOCKCHAIN_DATA", payload: items });

    const cars = items.filter((item) => item.category === "Car");
    const gadgets = items.filter((item) => item.category === "Personal Gadget");
    const books = items.filter((item) => item.category === "Books & Magazines");
    const clothing = items.filter((item) => item.category === "Clothing");

    setCars(cars);
    setGadgets(gadgets);
    setBooks(books);
    setClothing(clothing);

    console.log(cars);
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <div>
      {/* <DataContext.Provider value={items}>
        
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route
              path="/cars"
              element={<CategoryPage title={"Automobiles"} data={"hello?"} />}
            ></Route>
            <Route path="/gadgets" element={<CategoryPage />}></Route>
            <Route path="/books-magazines" element={<CategoryPage />}></Route>
            <Route path="/clothing" element={<CategoryPage />}></Route>
          </Routes>
        </BrowserRouter>
      </DataContext.Provider> */}
      <Navigation props={[setToggleCar, setToggleGadget, setToggleBook, setToggleClothing, setToggleCarousel]}/>
      {toggleCarousel && <CarouselItems />}
      {console.log(toggleCar)}
      {toggleCar && <Section title={"Electric Cars"} cars={cars} setToggle={setToggleCar}/>}
      {toggleGadget && <Section title={"Personal Gadgets"} cars={gadgets} setToggle={setToggleGadget}/>}
      {toggleBook && <Section title={"Books & Magazines"} cars={books} setToggle={setToggleBook}/>}
      {toggleClothing && <Section title={"Clothing"} cars={clothing} setToggle={setToggleClothing}/>}
    </div>
  );
}
