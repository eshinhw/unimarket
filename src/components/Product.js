import React from "react";
import "../css/Product.css";
import starSolid from "../assets/star-solid.svg";
import starRegular from "../assets/star-regular.svg";
import { Button } from "react-bootstrap";
import { useStateValue } from "../StateProvider";

function Product({ title, price, image, rating }) {
  // { basket }: state of global store
  // dispatch: how we manipulate data layer
  // const [{ basket }, dispatch] = useStateValue();
  const addToCart = () => {
    // dispatch the item into the data layer
    // dispatch({
    //   type: "ADD_TO_BASKET",
    //   item: { title: title, price: price, image: image, rating: rating },
    // });
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
        <Button>Order</Button>
      </div>
    </div>
  );
}

export default Product;
