<<<<<<< Updated upstream

import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/auth/loginPage";
import DashboardPage from "./pages/lecturer/lecturerDashboard/dashboard";
import ResetPage from "./pages/auth/resetPage";
import OtpPage from "./pages/auth/verifyOtp";
=======
import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ForgotPasswordPage from './Components/ForgotPasswordPage/ForgotPasswordPage.jsx';
import LoginPage from './Components/LoginPage/LoginPage.jsx';
import VerifyOtpPage from './Components/VerifyOtpPage/VerifyOtpPage.jsx';
>>>>>>> Stashed changes

function App() {

  const handleLogin = (user) => {
    console.log('User logged in:', user);
     };
  return (
<<<<<<< Updated upstream
    <>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/reset" element={<ResetPage />} />
      <Route path="/verify" element={<OtpPage />} />
    </Routes>

    </>
=======
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
      </Routes>
    </Router>
>>>>>>> Stashed changes
  );
}

export default App;


