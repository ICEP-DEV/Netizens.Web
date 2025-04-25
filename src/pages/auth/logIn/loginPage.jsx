import React from "react";
import Icon from "../../../assets/TUTicon1.jpeg";
import "./loginPage.css";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validateLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5041/api/Auth/Login", {
        email,
        password,
      });
  
      if (response.data.message?.includes("OTP sent")) {
        alert(response.data.message);
        console.log(response)
        navigate("/verifylogin");
      } else {
        alert("Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login error: " + (error.response?.data || error.message));
    }
  };

  const forgotPassword =async () =>{
      navigate("/forgotPassword")

  }
  return (

  <div className="login-page">
    <div className="branding">
      <img className="logo" alt="TUT icon" src={Icon} />
      <p className="tagline">We empower people.</p>
    </div>

    <div className="login-card">
     
      <form
       className="login-form"
       onSubmit={(e) => {
       e.preventDefault();
       validateLogin();
     }}
>
        <h1 className="login-heading">Login</h1>
        <input
          className="input email-input"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}

        />
        <input
          className="input password-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>setPassword(e.target.value)}

        />

        <button type="submit" className="login-button">
          Log in
        </button>

        <button type="button" className="forgot-password" 
        onClick={forgotPassword}
        >
          forgot password?

        </button>
      </form>
    </div>
  </div>
);
};
export default LoginPage;
