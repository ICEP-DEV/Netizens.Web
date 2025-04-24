import React, { useState } from "react";
import "./verifyLogInOTP.css";

const VerifyLogInOTPPage = () => {
  // const [otp, setOtp] = useState("");

  // const handleVerify = (e) => {
  //   e.preventDefault();
  //   alert(`OTP entered: ${otp}`);
  // };

  return (
    <div className="otp-container">
      <div className="otp-card">
        {/* <p>Enter OTP</p>
        <form onSubmit={handleVerify}>
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
        </form> */}
        verify login

      </div>
    </div>
  );
};

export default VerifyLogInOTPPage;
