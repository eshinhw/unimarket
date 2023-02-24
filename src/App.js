import { useEffect, useState } from "react";
import { ethers } from "ethers";

// Components
import Navigation from "./components/Navigation";
import Section from "./components/Section";
import Product from "./components/Product";

// ABIs
import DappslaABI from "./abis/Dappsla.json";

// Config
import config from "./config.json";
// import Navbar from "./components/BasicExample";
import BasicExample from "./components/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [dappsla, setDappsla] = useState(null);
  const [vehicles, setVehicles] = useState(null);
  const [charging, setCharging] = useState(null);

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
    const dappsla = new ethers.Contract(
      config[network.chainId].dappsla.address,
      DappslaABI,
      provider
    );

    setDappsla(dappsla);
    // 2. Connect to smart contract
    // 3. Load products

    console.log(dappsla);
    const cars = [];
    for (let i = 0; i < 9; i++) {
      const car = await dappsla.cars(i + 1);
      cars.push(car);
    }

    console.log(cars);
    console.log("helo");

    const vehicles = cars.filter((car) => car.model_class === "Sedan" || car.model_class === "SUV");
    console.log(vehicles);
    setVehicles(vehicles);
    // 2. Connect to smart contract
    // 3. Load products
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <Routes>


    </Routes>
    // <div>
    //   <Navigation />
    //   {vehicles && <Section title={"Electric Cars"} cars={vehicles} />}
    // </div>
  );
}

export default App;
