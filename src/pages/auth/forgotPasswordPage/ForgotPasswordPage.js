import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './forgotPasswordPage.css';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('Password reset link has been sent to your email (mocked).');
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h1 className="title">Forgot Password</h1>

        {message && <div className="success-message">{message}</div>}

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="email">Enter your email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Send Reset Link
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
