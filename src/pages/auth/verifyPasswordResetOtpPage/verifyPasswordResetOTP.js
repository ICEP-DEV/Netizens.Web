import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './verifyPasswordResetOTP.css';

function VerifyPasswordResetOTPPage() {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const email = localStorage.getItem('emailForOtp');
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('OTP verified!');
        setTimeout(() => navigate('/reset-password'), 2000);
      } else {
        setMessage(data.error || 'Invalid OTP');
      }
    } catch (err) {
      console.error(err);
      setMessage('Server error');
    }
  };
  return (
    <div className="otp-container">
      <div className="otp-box">
        <h1 className="title">Enter OTP</h1>

        {message && <div className="success-message">{message}</div>}

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
          <button type="submit" className="submit-btn">Verify OTP</button>
        </form>
      </div>
    </div>
  );
}

export default VerifyPasswordResetOTPPage;
