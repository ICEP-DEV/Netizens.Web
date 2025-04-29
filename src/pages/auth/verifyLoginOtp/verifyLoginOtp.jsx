import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import "./verifyLoginOtp.css";

const VerifyLogInOTPPage = () => {
const [otp, setOtp] = useState("");
const navigate = useNavigate();

const handleVerifyLoginOTP = async () => {
  try {
    const response = await axios.post("http://localhost:5041/api/Auth/VerifyLogInOTP", {
      otp
    }, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
    }
    
  },);

    if (response.data.status) {
      toast.success(response?.data.message);
      navigate(response?.data?.url); 
    } else {
      toast.error(response?.data?.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "An error occurred");
  }
};

  return (
    <div className="otp-container">
          <Toaster />
          <div className="otp-box">
            <h1 className="title">Verify Login OTP</h1>
    
            <form onSubmit={(e) => {
                  e.preventDefault();
                  handleVerifyLoginOTP();
                }} className="form">
              <div className="form-group">
                <label htmlFor="email">Enter OTP sent to your email: </label>
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
    
              <button type="submit" className="submit-btn">
                Verify OTP
              </button>
            </form>
    
            <div className="back-link">
              <Link >Resend OTP</Link>
            </div>
          </div>
        </div>
  );
};

export default VerifyLogInOTPPage;
