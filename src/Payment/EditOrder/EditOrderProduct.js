// import "./EditOrderProduct.css";
// import React, { useState, useEffect } from "react";
// import { UseStateValue } from "../StateProvider/StateContext.js";
// import axios from "axios";

// function CheckoutProduct(props) {
//   const [count, setCount] = useState(props.count);
//   const [cart, setCart] = UseStateValue().cart;
//   const [token] = UseStateValue().token;
//   const [, setCost] = UseStateValue().cost;

//   const subtotal = cart?.reduce(
//     (amt, item) => amt + parseInt(item.price) * parseInt(item.count),
//     0
//   );

//   useEffect(() => {
//     axios
//       .post(
//         "/delivery/update",
//         { cost: subtotal },
//         { headers: { Authorization: token } }
//       )
//       .then((e) => {
//         setCost(e.data.cost);
//         console.log(e.data.cost);
//       })
//       .catch((e) => console.log(e));
//   }, [subtotal, token]);

//   const decrement = () => {
//     if (count === 1) deleteFromCart();
//     else updateCart(count - 1);
//     setCount(count - 1);
//     console.log(count);
//   };

//   const increment = () => {
//     updateCart(count + 1);
//     setCount(count + 1);
//   };

//   const updateCart = (c) => {
//     const index = cart.findIndex((cartItem) => cartItem._id === props.id);
//     if (index > -1) {
//       console.log(cart[index]);
//     }
//     axios
//       .patch(
//         "/user/cart/update",
//         { count: c, product: props.id },
//         {
//           headers: {
//             Authorization: token,
//           },
//         }
//       )
//       .then((e) => {
//         console.log(e.data);
//         setCart(e.data);
//       });
//   };

//   const deleteFromCart = () => {
//     const index = cart.findIndex((cartItem) => cartItem._id === props.id);
//     if (index > -1) {
//       console.log(cart[index]);

//       axios
//         .patch(
//           "/user/cart/delete",
//           { cart: cart[index] },
//           {
//             headers: {
//               Authorization: token,
//             },
//           }
//         )
//         .then((e) => {
//           console.log(e.data);
//           setCart(e.data);
//         })
//         .catch((e) => console.log(e));
//     }
//   };

//   return (
//     <div className="checkoutProduct">
//       <div className="checkoutProductLeft">
//         <div className="checkoutProductImg">
//           <img src={props.img} alt="checkoutProductImage" />
//         </div>

//         <div className="checkoutProductText">
//           <div className="checkoutProductHeading">{props.heading}</div>
//           <img
//             src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px._CB485936079_.png"
//             alt="amazonFulfilled"
//           />

//           <div className="checkoutProductGift">
//             <input
//               type="checkbox"
//               name="checkoutProductGiftCheckbox"
//               style={{
//                 marginRight: "5px",
//               }}
//               onClick={handleClickGiftBox}
//             />
//             This will be a gift.
//           </div>
//           <button className="countButton" onClick={decrement}>
//             -
//           </button>
//           <span className="count">{props.count}</span>
//           <button className="countButton" onClick={increment}>
//             +
//           </button>

//           {/* <DeleteIcon /> */}

//           <button className="deletebtn amazonButton" onClick={deleteFromCart}>
//             Delete
//           </button>
//         </div>
//       </div>
//       <div className="checkoutProductRight">{props.price}.00</div>
//     </div>
//   );
// }

// export default CheckoutProduct;