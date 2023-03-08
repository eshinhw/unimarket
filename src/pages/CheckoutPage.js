import React, { useContext } from "react";
import StateContext from "../StateContext";

function CheckoutPage() {
  const state = useContext(StateContext);
  console.log(state)
  return (
    <div className="checkout">
      <div className="checkout__left"></div>
      <div className="checkout__right">Right Section</div>
    </div>
  );
}

export default CheckoutPage;
