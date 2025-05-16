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
        }, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
        }
        
      },
      );

      if (response.data.status) {
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
        <h1 className="forgot-password-title">Forgot Password</h1>

        <form onSubmit={handleSubmit} className="forgot-password-form">
          <div className="forgot-password-form-group">
            <label htmlFor="email">Enter your email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="forgot-password-submit-btn">
            Submit
          </button>
        </form>

        <div className="forgot-password-back-link">
          <Link to="/">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
