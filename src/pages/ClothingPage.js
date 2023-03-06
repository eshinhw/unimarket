import { ethers } from "ethers";
import { useEffect, useState } from "react";
// ABIs
import UniMarketABI from "../abis/UniMarket.json";
import CardItem from "../components/CardItem";

// Config
import config from "../config.json";

function ClothingPage() {
  const [provider, setProvider] = useState(null);
  const [unimarket, setUnimarket] = useState(null);
  const [clothing, setClothing] = useState(null);
  const [account, setAccount] = useState(null);
  const [processed, setProcessed] = useState(false);

  const loadBlockchainData = async () => {
    console.log("executing...");
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

    const books = items.filter((item) => item.category === "Books & Magazines");
    const clothing = items.filter((item) => item.category === "Clothing");
    setClothing(clothing);

    setProcessed(true);
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <>
      <div className="cards__section">
        {processed ? (
          <CardItem data={clothing} unimarket={unimarket} provider={provider} account={account} />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default ClothingPage;
