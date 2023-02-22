import { ethers } from "ethers";

const Navigation = ({ account, setAccount }) => {
  const connectHandler = () => {
    console.log("connecting...");
  };
  return (
    <nav className="nav">
      <div className="nav__brand">
        <h1>DAPPSLA</h1>
      </div>

      <ul className="nav__links">
          <li>
            <a href="#Clothing & Jewelry">Model S</a>
          </li>
          <li>
            <a href="#Clothing & Jewelry">Model 3</a>
          </li>
          <li>
            <a href="#Clothing & Jewelry">Model X</a>
          </li>
          <li>
            <a href="#Clothing & Jewelry">Model Y</a>
          </li>
          <li>
            <a href="#Clothing & Jewelry">Cybertruck</a>
          </li>
        </ul>

      {account ? (
        <button type="button" className="nav__connect">
          {account.slice(0, 5) + "..." + account.slice(38, 42)}
        </button>
      ) : (
        <button type="button" className="nav__connect" onClick={connectHandler}>
          Connect to MetaMask
        </button>
      )}
    </nav>
  );
};

export default Navigation;
