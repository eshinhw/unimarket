import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "../css/Subtotal.css";

function Subtotal({ total }) {
  const [isGift, setIsGift] = useState(false);
  // const [totalSum, setTotalSum] = useState(total);

  const handleGiftFee = () => {
    if (isGift) {
      setIsGift(false);
      total = total - 1;
    } else {
      setIsGift(true);
      total = total + 1;
    }
  };
  return (
    <div className="subtotal">
      <div className="subtotal__elements">
        <h3>Subtotal: {total} ETH</h3>
        {/* <div className="gift__check">
          <input type="checkbox" onClick={handleGiftFee} /> <h5>This contains a gift.</h5>
        </div>
        {isGift ? "Gift Fee of 1 ETH Will Be Added at Checkout" : <></>} */}
        <br />
        <Button className="proceed__button">Proceed to Checkout</Button>
      </div>
    </div>
  );
}

export default Subtotal;
