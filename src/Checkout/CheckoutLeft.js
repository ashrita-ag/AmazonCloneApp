import "./CheckoutLeft.css";
import React from "react";
import CheckoutProduct from "./CheckoutProduct.js";
import { UseCartValue } from "../StateProvider/CartContext.js";

function CheckoutLeft() {
  const [{ cart }] = UseCartValue();

  return (
    <div className="checkoutLeft">
      <div className="checkoutLeftHeading">
        <div className="checkoutLeftHeading1">Shopping Cart</div>
        <div className="checkoutLeftHeading2">Price </div>
      </div>

      {cart.map((cartItem) => (
        <CheckoutProduct
          img={cartItem.img}
          heading={cartItem.heading}
          price={cartItem.price}
        />
      ))}
    </div>
  );
}

export default CheckoutLeft;
