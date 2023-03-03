import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import marketImg from "../assets/digital-marketing.png";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

const Header = () => {
  const [account, setAccount] = useState(null);
  const connectHandler = async () => {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);

    if (account === null) {
      window.alert("Please set up MetaMask on your Chrome.");
    }
  };

  const logoutHandler = () => {};

  useEffect(() => {
    connectHandler();
  }, []);

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Nav.Link href="/" style={{ fontSize: "50px" }}>
            UniMarket <img style={{ width: "42px", height: "42px" }} src={marketImg} />
          </Nav.Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav style={{ marginRight: "15px" }} className="justify-content-center">
            <Nav.Link href="/electric-cars">ELECTRIC CARS</Nav.Link>
            <Nav.Link href="/personal-gadgets">PERSONAL GADGETS</Nav.Link>
            <Nav.Link href="/books-magazines">BOOKS & MAGAZINES</Nav.Link>
            <Nav.Link href="/clothing">CLOTHING</Nav.Link>
          </Nav>
          {account ? (
            <>
              <div>
                <Button onClick={logoutHandler} style={{ marginRight: "15px" }}>
                  Logout
                </Button>
                <Button onClick={connectHandler}>
                  {account.slice(0, 5) + "..." + account.slice(38, 42)}
                </Button>
              </div>
            </>
          ) : (
            <Button onClick={connectHandler}>CONNECT TO METAMASK</Button>
          )}
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
