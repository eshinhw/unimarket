import React, { useContext, useEffect, useState } from "react";
import "../css/Product.css";
import starSolid from "../assets/star-solid.svg";
import starRegular from "../assets/star-regular.svg";
import { Button, Container, Modal } from "react-bootstrap";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";
import ProductDetails from "./ProductDetails";
import { Link, useNavigate } from "react-router-dom";

function Product({ id, title, category, image, price, rating, inventory }) {
  const dispatch = useContext(DispatchContext);
  const [showDetails, setShowDetails] = useState(false);

  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { id, title, category, image, price, rating, inventory },
    });
  };

  useEffect(() => {}, [showDetails]);

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <strong>{price}</strong>
          <small> ETH</small>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <img key={i} src={starSolid} alt="" />
            ))}
        </div>
      </div>
      <img src={image} />
      <div className="product__buttons">
        <Button onClick={addToCart}>Add to Cart</Button>
        <Link to={`/${category.toLowerCase()}/${id}`}>
          <Button>Details</Button>
        </Link>
      </div>
    </div>
  );
}

export default Product;
