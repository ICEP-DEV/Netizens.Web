import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./forgotPasswordPage.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5041/api/Auth/RecoverAccount",
        {
          email,
        }
      );

      if (response.data.message?.includes("Forgot Password OTP sent")) {
        toast.success(response.data.message);
        console.log(response);
        navigate("/verify/password-reset-otp");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="forgot-password-container">
      <Toaster />
      <div className="forgot-password-box">
        <h1 className="title">Forgot Password</h1>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="email">Enter your email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>

        <div className="back-link">
          <Link to="/">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
