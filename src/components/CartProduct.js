import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import starSolid from "../assets/star-solid.svg";
import "../css/CartProduct.css";
import DispatchContext from "../DispatchContext";

function CartProduct({ id, title, category, image, price, rating, inventory }) {
  const dispatch = useContext(DispatchContext);

  const removeFromCart = () => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };
  return (
    <div className="cart__product">
      <div className="product__info">
        <p>{title.slice(0,20)}......{title.slice(title.length - 10)}</p>
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
        <Button onClick={removeFromCart}>Remove</Button>
      </div>
    </div>
  );
}

export default CartProduct;
