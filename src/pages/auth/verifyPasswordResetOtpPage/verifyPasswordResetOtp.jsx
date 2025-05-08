import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./verifyPasswordResetOtp.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function VerifyPasswordResetOTPPage() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5041/api/Auth/VerifyResetPasswordOtp",
        {
          otp,
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
        navigate("/reset-password");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };
  return (
    <div className="otp-container">
          <Toaster />
          <div className="otp-box">
            <h1 className="title">Verify Reset Password OTP</h1>
    
            <form onSubmit={handleVerify} className="form">
              <div className="form-group">
                <label htmlFor="email">Enter OTP sent to your email: </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
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
}

export default VerifyPasswordResetOTPPage;
