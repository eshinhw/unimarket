import React from "react";
import { Button } from "react-bootstrap";
import "../css/Subtotal.css";

function Subtotal({ total }) {
  return (
    <div className="subtotal">
      <div className="subtotal__elements">
        <p>Subtotal: $ {total}</p>
        <div className="gift__check">
          <input type="checkbox" /> This contains a gift.
        </div>
        <Button className="proceed__button">Proceed to Payment</Button>
      </div>
    </div>
  );
}

export default Subtotal;
