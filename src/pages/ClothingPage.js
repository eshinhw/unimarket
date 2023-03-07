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
