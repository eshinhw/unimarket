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
  const navigate = useNavigate();

  const directToCheckoutPage = () => {
    console.log("to checkout");
    navigate("/checkout", { state: state });
  };

  return (
    <div className="header">
      <Link className="header__title" to={"/"}>
        <p>UniMarket</p>
        <img src={marketImg} style={{ width: "42px", height: "42px" }} />
      </Link>
      <div className="header__links">
        <Link to={"/laptops"}>LAPTOPS</Link>
        <Link to={"/personal-gadgets"}>PERSONAL GADGETS</Link>
        <Link to={"/books-magazines"}>BOOKS & MAGAZINES</Link>
        <Link to={"/clothing"}>CLOTHING</Link>
      </div>
      <div className="header__checkout">
        <Link to={"/checkout"}>
          <div className="basket__container">
            <img className="basket__img" src={shoppingBasketImg} alt="" />
            <p className="basket__count">{state.cart.length}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
