import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./verifyPasswordResetOTP.css";
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
        }
      );

      if (response.data.status) {
        toast.success(response.data.message);
        console.log(response);
        navigate("/reset");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  return (

    <div className="otp-container">
      <Toaster/>
      <div className="otp-box">
        <h1 className="title">Enter OTP</h1>

        <form onSubmit={handleVerify} className="form">
          <div className="form-group">
            <label>Enter OTP sent to your email</label>
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
      </div>
    </div>
  );
}

export default VerifyPasswordResetOTPPage;
