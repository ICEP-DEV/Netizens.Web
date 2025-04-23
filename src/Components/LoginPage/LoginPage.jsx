import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import logo from './TUT-Logo1.jpg'; 


export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // =============================================
    if (email === 'prince@gmail.com' && password === 'Prince@123') {
      onLogin({ name: 'Dr MM Doe', email });
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    
    <div className="login-container">
    
     <div className="login-box">
      <img src={logo} alt="Logo" className="login-logo" />
        <h1 className="login-title">Admin Login</h1>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Log In
          </button>
        </form>

        <div className="forgot-link">
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
      </div>
    </div>
  );
}
