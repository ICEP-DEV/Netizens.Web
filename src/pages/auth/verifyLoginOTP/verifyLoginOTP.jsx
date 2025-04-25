import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import "./verifyLoginOTP.css";

const VerifyLogInOTPPage = () => {
const [otp, setOtp] = useState("");
const navigate = useNavigate();

const handleVerifyLoginOTP = async () => {
  try {
    const response = await axios.post("http://localhost:5041/api/Auth/VerifyLogInOTP", {
      otp
    });

    if (response.data.status) {
      toast.success(response?.data.message);
      navigate(response?.data?.url); 
    } else {
      toast.error(response?.data?.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message);
  }
};

  return (
    <div className="otp-container">
      <Toaster/>
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
