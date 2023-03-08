import React, { useContext, useEffect, useState } from "react";
import CartProduct from "../components/CartProduct";
import Product from "../components/Product";
import StateContext from "../StateContext";
import emptyCartImg from "../assets/empty-cart.png";
import "../css/CheckoutPage.css"

function CheckoutPage() {
  const state = useContext(StateContext);
  const [emptyCart, setEmptyCart] = useState(false);
  console.log(state);
  const checkEmptyCart = () => {
    if (state.cart.length === 0) {
      setEmptyCart(true);
    }
  };

  useEffect(() => {
    checkEmptyCart();
  }, [state]);

  return (
    <>
      {!emptyCart ? (
        <div className="checkout">
          <div className="checkout__left">
            {state.cart.map((item, idx) => (
              <CartProduct
                className="home__row__item"
                id={item.id}
                title={item.name}
                category={item.category}
                image={item.image}
                price={item.price}
                rating={Number(item.rating)}
                inventory={item.inventory}
                key={idx}
              />
            ))}
          </div>
          <div className="checkout__right"></div>
        </div>
      ) : (
        <div className="empty__cart">
          <img
            src={emptyCartImg}
            alt=""
          />
          <p>Cart is Empty......</p>
        </div>
      )}
    </>
  );
}

export default CheckoutPage;
