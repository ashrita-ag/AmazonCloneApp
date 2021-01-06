import "./NewAcc.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UseStateValue } from "../StateProvider/StateContext";
import axios from "axios";

function NewAcc() {
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = UseStateValue().loading;
  const [, setIsLogged] = UseStateValue().isLogged;

  const changeErrorMsgNew = (error) => {
    setErrorMsg(error);
  };
  localStorage.setItem("Payment", false);

  const handleSubmitNew = (e) => {
    e.preventDefault();

    setLoading(true);
    console.log("Creating new Account...");
    setErrorMsg("");

    axios
      .post(
        "/user/register",
        {
          name: name,
          email: email,
          password: pwd,
        },
        { withCredentials: true }
      )
      .then((m) => {
        const msg = m.data.msg;
        if (msg) changeErrorMsgNew(msg);
        else {
          localStorage.setItem("firstLogin", true);
          setIsLogged(true);
          console.log("New Account Success");
        }
      })
      .catch(() => changeErrorMsgNew("Some error oocured. Try again."));
    setLoading(false);
  };

  return (
    <div className="newAcc">
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/263px-Amazon_logo.svg.png"
          alt="AmazonLogo"
          className="amazonLogoAuth"
        />
      </Link>
      <form className="newAccForm" onSubmit={handleSubmitNew}>
        <div className="newAccBoxHeading">Create Account</div>

        <div className="newAccContainer">
          <label htmlFor="name">
            <b>Your name</b>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="pwd">
            <b>Password</b>
          </label>
          <input
            type="password"
            name="pwd"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            placeholder="At least 6 characters"
            required
          />

          <div className="errorMsgNew"> {errorMsg}</div>

          <button
            type="submit"
            className="newAccButton amazonButton"
            disabled={loading}
          >
            Create your Amazon Account
          </button>

          <div className={loading ? "hidden" : "newAccText"}>
            Already have an account? <Link to="/login">Sign in &#9656;</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewAcc;
