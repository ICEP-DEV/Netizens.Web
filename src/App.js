
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/auth/login/loginPage';
import LecturerDashboardPage from './pages/lecturer/lecturerDashboard/dashboard';
import ResetPasswordPage from './pages/auth/resettingPages/resetPage';
import VerifyLoginOTPPage from './pages/auth/verifyLoginOtp/verifyLoginOtp';
import VerifyPasswordResetOTPPage from './pages/auth/verifyPasswordResetOtpPage/verifyPasswordResetOtp';
import SetPasswordPage from './pages/auth/setPasswodPages/setPassword';
import ForgotPasswordPage from './pages/auth/forgotPasswordPage/forgotPasswordPage';
import AdminDashboard from './pages/admin/adminDashboard/adminDashboard';

function App() {
  return (
    <>
    <Routes>
      {/* Auth Routes */}
      {/* Login Routes */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/verify/login-otp" element={<VerifyLoginOTPPage />} /> 
      <Route path="/set-password" element={<SetPasswordPage/>} />

      {/* Recover Account Routes */}
      <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
      <Route path="/verify/password-reset-otp" element={<VerifyPasswordResetOTPPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      
      {/* lecturer Routes */}
      <Route path="/dashboard/lecturer" element={<LecturerDashboardPage />} />
      
      {/*Admin Routes */}
      <Route path="/dashboard/admin" element={<AdminDashboard/>} />
      

    </Routes>
    </>
  );
}

export default App;
