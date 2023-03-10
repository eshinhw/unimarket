import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import "../css/Subtotal.css";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";

function Subtotal({ total }) {
  const [isGift, setIsGift] = useState(false);
  // const [totalSum, setTotalSum] = useState(total);
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const handlePayment = () => {
    state.cart.map(async (item) => {
      const signer = await state.provider.getSigner();
      console.log("signer: ", signer);
      let transaction = state.unimarket
        .connect(signer)
        .purchase(item.id, { value: Number(item.price) });
      await transaction.wait();
    });

    dispatch({ type: "CLEAR_CART" });
  };
  return (
    <div className="subtotal">
      <div className="subtotal__elements">
        <h3>Subtotal: {total} ETH</h3>
        <br />
        <Button className="proceed__button" onClick={handlePayment}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}

export default Subtotal;
