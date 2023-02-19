import { ethers } from "ethers";

const Navigation = ({ account, setAccount }) => {

  const connectHandler = () => {
    console.log("connecting...")
  }
  return (
    <nav>
      <div className="nav__brand">
        <h1>Dappazon</h1>
      </div>

      <input type="text" className="nav__search" />

      {account ? (
        <button type="button" className="nav__connect">
          {account.slice(0, 5) + "..." + account.slice(38, 42)}
        </button>
      ) : (
        <button type="button" className="nav__connect" onClick={connectHandler}>
          Connect
        </button>
      )}

      <ul className="nav__links">
        <li>
          <a href="#Clothing & Jewelry">Clothing & Jewelry</a>
        </li>
        <li></li>
        <li></li>
      </ul>
    </nav>
  );
};

export default Navigation;
