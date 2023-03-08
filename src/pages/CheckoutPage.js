import React, { useContext, useEffect, useState } from "react";
import CartProduct from "../components/CartProduct";
import Product from "../components/Product";
import StateContext from "../StateContext";
import emptyCartImg from "../assets/empty-cart.png";
import "../css/CheckoutPage.css";
import Subtotal from "../components/Subtotal";

function CheckoutPage() {
  const state = useContext(StateContext);
  const [emptyCart, setEmptyCart] = useState(false);
  const [total, setTotal] = useState(0);

  const checkEmptyCart = () => {
    if (state.cart.length === 0) {
      setEmptyCart(true);
    } else {
      let total = 0;
      for (var i = 0; i < state.cart.length; i++) {
        total = total + Number(state.cart[i].price);
      }
      setTotal(total);
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
            <div className="checkout__title">
              <h2>Shopping Cart</h2>
            </div>
            {state.cart.map((item, idx) => (
              <CartProduct
                className="home__row__item"
                id={item.id}
                title={item.title}
                category={item.category}
                image={item.image}
                price={item.price}
                rating={Number(item.rating)}
                inventory={item.inventory}
                key={idx}
              />
            ))}
          </div>
          <div className="checkout__right">
            <Subtotal total={total}/>
          </div>
        </div>
      ) : (
        <div className="empty__cart">
          <img src={emptyCartImg} alt="" />
          <p>Cart is Empty......</p>
        </div>
      )}
    </>
  );
}

export default CheckoutPage;
