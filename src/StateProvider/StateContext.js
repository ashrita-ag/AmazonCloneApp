import React, { useContext, createContext, useEffect, useState } from "react";
const axios = require("axios");

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const refreshToken = async () => {
        const response = await axios.get("http://localhost:5000/user/token", {
          withCredentials: true
        });
        // console.log("firstLogin");
        console.log("AccessTOken   " + response.data.accesstoken);

        setToken(response.data.accesstoken);

        setTimeout(() => {
          refreshToken();
        }, 24 * 60 * 60 * 1000); //1 day
      };
      refreshToken();
    }
  }, []);

  useEffect(() => {
    if (token) {
      console.log("inside Token")
      const currUser = async () => {
        try {
          const res = await axios.get("http://localhost:5000/user/info", {
            headers: { Authorization: token },
            withCredentials:true,
          });
          // console.log(token);
          console.log("THis os for token");
          // console.log(res.data);

          setIsLogged(true);
          setCart(res.data.cart);
          setName(res.data.Fname);
          setEmail(res.data.email);
        } catch (err) {
          alert(err.response.data.msg);
        }
      };

      currUser();
    }
  }, [token]);

  const initialState = {
    token: [token, setToken],
    name: [name, setName],
    email: [email, setEmail],
    isLogged: [isLogged, setIsLogged],
    cart: [cart, setCart],
  };

  return (
    <StateContext.Provider value={initialState}>
      {children}
    </StateContext.Provider>
  );
};

export const UseStateValue = () => useContext(StateContext);
