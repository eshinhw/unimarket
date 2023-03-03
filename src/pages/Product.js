import React from "react";
import "../css/Product.css";
import starSolid from "../assets/star-solid.svg";
import starRegular from "../assets/star-regular.svg";

function Product({ title, price, image, rating }) {
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
      <button>Add to Cart</button>
    </div>
  );
}

export default Product;
