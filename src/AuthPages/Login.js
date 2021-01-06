import "./Login.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UseStateValue } from "../StateProvider/StateContext";

function Login() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = UseStateValue().loading;
  const [l,setL]=useState(false);
  const [, setIsLogged] = UseStateValue().isLogged;

  localStorage.setItem("Payment", false);

  const changeErrorMsgNew = (error) => {
    setErrorMsg(error);
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    console.log("Logging In");
    setLoading(true);
    setL(true);

    axios
      .post(
        "/user/login",
        { email: email, password: pwd },
        { withCredentials: true }
      )
      .then((m) => {
        const msg = m.data.msg;
        if (msg) changeErrorMsgNew(msg);
        else {
          localStorage.setItem("firstLogin", true);
          setIsLogged(true);
          console.log("Logging Success");
        }
      })
      .catch(() => changeErrorMsgNew("Some error oocured. Try again."));
    setLoading(false);
    setL(false);
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/263px-Amazon_logo.svg.png"
          alt="AmazonLogo"
          className="amazonLogoAuth"
        />
      </Link>
      <form className="loginForm" onSubmit={handleSubmitLogin}>
        <div className="loginBoxHeading">Login</div>
        <div className="loginContainer">
          <label htmlFor="email">
            <b>Email or mobile phone number</b>
          </label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="pwd">
            <b>Password</b>
          </label>
          <input
            type="password"
            name="pwd"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            required
          />
          <div className="errorMsgNew"> {errorMsg}</div>
          <button
            type="submit"
            className="loginButton amazonButton"
            disabled={loading ||l}
          >
            Login
          </button>
          <div>
            By continuing, you agree to Amazon's{" "}
            <Link to="# ">Conditions of Use</Link> and{" "}
            <Link to="# ">Privacy Notice.</Link>
          </div>
        </div>
      </form>
      <div className="loginNewUserText">
        <span> New to Amazon?</span>{" "}
      </div>
      <Link to="/create-new-account">
        <button className="amazonWhiteButton" disabled={loading ||l}>
          Create your Amazon Account
        </button>
      </Link>
    </div>
  );
}

export default Login;
