import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage";

import { BrowserRouter, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import CheckoutPage from "./pages/CheckoutPage";
import CategoryPage from "./pages/CategoryPage";
import StateContext from "./StateContext";
import { useReducer, useEffect, useState } from "react";
import reducer from "./reducer";
import { ethers } from "ethers";
// ABIs
import UniMarketABI from "./abis/UniMarket.json";

// Config
import config from "./config.json";
import DispatchContext from "./DispatchContext";

export default function App() {
  const initialState = {
    cart: [],
  };

  const loadBlockchainData = async () => {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const account = ethers.utils.getAddress(accounts[0]);
    // 1. Connect to blockchain
    // MetaMask turns normal browser into blockchain browser
    // Same logic, ethers.js turns normal app into blockchain app
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const network = await provider.getNetwork();
    // providing connection to blockchain inside the app
    // ABI: Abstract Binary Interface
    // Connect to smart contract
    const unimarket = new ethers.Contract(
      config[network.chainId].unimarket.address,
      UniMarketABI,
      provider
    );

    // 3. Load products from smart contract

    const items = [];

    for (let i = 0; i < 16; i++) {
      let currItem = await unimarket.items(i + 1);
      let currItemCopy = { ...currItem };
      currItemCopy.price = ethers.utils.formatUnits(currItem.cost.toString(), "ether");
      items.push(currItemCopy);
    }
    dispatch({ type: "SET_UP_UNIMARKET", payload: unimarket });
    dispatch({ type: "SET_UP_PROVIDER", payload: provider });
    dispatch({ type: "SET_UP_ACCOUNT", payload: account });
    dispatch({ type: "SET_UP_PRODUCTS", payload: items });
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <DispatchContext.Provider value={dispatch}>
        <StateContext.Provider value={state}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={[<Header />, <HomePage />]} />
              <Route path="/laptops" element={[<Header />, <CategoryPage category="Laptop" />]} />
              <Route
                path="/personal-gadgets"
                element={[<Header />, <CategoryPage category="Personal Gadget" />]}
              />
              <Route
                path="/books-magazines"
                element={[<Header />, <CategoryPage category="Books & Magazines" />]}
              />
              <Route
                path="/clothing"
                element={[<Header />, <CategoryPage category="Clothing" />]}
              />
              <Route path="/checkout" element={[<Header />, <CheckoutPage />]} />
            </Routes>
          </BrowserRouter>
        </StateContext.Provider>
      </DispatchContext.Provider>
    </>
  );
}
