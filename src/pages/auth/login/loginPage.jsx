import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import Icon from "../../../assets/TUTicon1.jpeg";
import "./loginPage.css";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const validateLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5041/api/Auth/Login",
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.status) {
        localStorage.setItem("loggedInEmail", email); // ✅ Store logged-in email
        toast.success(response.data.message);
        navigate("/verify/login-otp");
      } else {
        toast.error(response.data.message || "Login failed.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="login-container">
      <Toaster />
      <div className="login-box">
        <div className="login-branding">
          <img className="login-logo" alt="TUT icon" src={Icon} />
        </div>
        <h1 className="login-page-title">Login</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            validateLogin();
          }}
          className="login-form"
        >
          <div className="login-form-group">
            <label htmlFor="email">Enter Email: </label>
            <div className="login-form-input-container">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="email-input"
                required
              />
            </div>

            <label htmlFor="password">Password: </label>
            <div className="login-form-input-container">
              <input
                id="password"
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="password-input"
                required
              />
              <button
                type="button"
                className="toggle-visibility"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? (
                  <EyeSlashIcon className="login-icon" />
                ) : (
                  <EyeIcon className="login-icon" />
                )}
              </button>
            </div>
          </div>

          <button type="submit" className="login-submit-btn">
            Login
          </button>
        </form>
        <div className="login-back-link">
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;