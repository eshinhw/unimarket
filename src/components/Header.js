import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import marketImg from "../assets/digital-marketing.png";
import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import shoppingBasketImg from "../assets/shopping-cart.png";
import "../css/Header.css";
import StateContext from "../StateContext";

const Header = () => {
  const state = useContext(StateContext);

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Nav.Link href="/" style={{ fontSize: "50px" }}>
            UniMarket <img style={{ width: "42px", height: "42px" }} src={marketImg} />
          </Nav.Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav style={{ marginRight: "15px" }} className="justify-content-center">
            <Nav.Link href="/laptops">LAPTOPS</Nav.Link>
            <Nav.Link href="/personal-gadgets">PERSONAL GADGETS</Nav.Link>
            <Nav.Link href="/books-magazines">BOOKS & MAGAZINES</Nav.Link>
            <Nav.Link href="/clothing">CLOTHING</Nav.Link>
          </Nav>
          <Nav.Link href="/checkout">
            <div className="basket__section">
              <img className="basket__img" src={shoppingBasketImg} alt="" />
              <p className="basket__count">{state.cart.length}</p>
            </div>
          </Nav.Link>

          {/* {account ? (
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
          )} */}
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
