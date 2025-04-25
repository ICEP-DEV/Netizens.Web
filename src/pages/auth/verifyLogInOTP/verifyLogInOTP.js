import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./verifyLogInOTP.css";

const VerifyLogInOTPPage = () => {
const [otp, setOtp] = useState("");
const navigate = useNavigate();

const handleVerifyLoginOTP = async () => {
  try {
    const response = await axios.post("http://localhost:5041/api/Auth/VerifyLogInOTP", {
      otp
    });

    if (response.data.success) {
      alert("Login successful!");
      navigate(response?.data?.url); 
    } else {
      alert(response?.data?.message || "Invalid OTP.");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Login error: " + (error.response?.data?.message || error.message));
  }
};


  return (
    <div className="otp-container">
      <div className="otp-card">
        <p>Enter OTP</p>
        <form onSubmit={(e) => {
       e.preventDefault();
       handleVerifyLoginOTP();
     }}>
            <div className="otp-field">
              <label htmlFor="otp" className="otp-label">OTP:</label>
              <input
                id="otp"
                type="text"
                maxLength="6"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="otp-input"
                required
              />
            </div>
            <button type="submit" className="otp-button">Verify</button>
        </form>
      </div>
    </div>
  );
};

export default VerifyLogInOTPPage;
