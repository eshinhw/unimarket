import React, { useContext } from "react";
import "../css/Product.css";
import starSolid from "../assets/star-solid.svg";
import starRegular from "../assets/star-regular.svg";
import { Button } from "react-bootstrap";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";

function Product({ title, price, image, rating }) {
  const dispatch = useContext(DispatchContext);

  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: { title, price, rating, image } });
  };

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
        <Button>Details</Button>
      </div>
    </div>
  );
}

export default Product;
