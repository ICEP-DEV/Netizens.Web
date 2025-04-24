import React from "react";
import Icon from "../../../assets/TUTicon1.jpeg";
import "./loginPage.css";

export const LoginPage = () => (
  <div className="login-page">
    <div className="branding">
      <img className="logo" alt="TUT icon" src={Icon} />
      <p className="tagline">We empower people.</p>
    </div>

    <div className="login-card">
      <form className="login-form">
        <h1 className="login-heading">Login</h1>
        <input
          className="input email-input"
          type="email"
          placeholder="Email address"
        />
        <input
          className="input password-input"
          type="password"
          placeholder="Password"
        />

        <button type="submit" className="login-button">
          Log in
        </button>

        <button type="button" className="forgot-password">
          forgot password?
        </button>
      </form>
    </div>
  </div>
);

export default LoginPage;
