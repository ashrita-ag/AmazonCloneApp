import React from "react";
import { UseStateValue } from "../StateProvider/StateContext.js";
import axios from "axios";

function AddressComponent(props) {
  const [address, setAddress] = UseStateValue().address;
  const [token] = UseStateValue().token;

  const deleteAddress = () => {
    setAddress(address.filter((a) => a._id !== props.id));
    console.log(address);

    axios
      .post(
        "/address/delete",
        { id: props.id },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((e) => {
        console.log(e.data);
      })
      .catch((e) => console.log(e));
  };
  // };

  return (
    <div className="addressComponent">
      <div className="addressComponentText">
        {" "}
        <div className="addressName">{props.name}</div>
        <div>{props.phone}</div>
        <div>
          {props.house}, {props.area}, {props.landmark}
        </div>
        <div>
          {props.city}, {props.state} {props.pin}
        </div>
        <div>{props.country}</div>
      </div>

      <a href="/payment/confirm_order">
        <button className="amazonButton">Deliver to this Address</button>
      </a>
      <button className="amazonWhiteButton" onClick={deleteAddress}>
        Delete
      </button>
    </div>
  );
}

export default AddressComponent;