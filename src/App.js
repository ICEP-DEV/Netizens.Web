
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/login/loginPage";
import DashboardPage from "./pages/lecturer/lecturerDashboard/dashboard";
import ResetPage from "./pages/auth/resettingPages/resetPage";
import VerifyLoginOTPPage from "./pages/auth/verifyLoginOTP/verifyLoginOTP";
import VerifyPasswordResetOTPPage from "./pages/auth/verifyPasswordResetOtpPage/verifyPasswordResetOTP";
import SetPassword from "./pages/auth/setPasswodPages/setPassword";
import ForgotPasswordPage from "./pages/auth/forgotPasswordPage/forgotPasswordPage";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/reset" element={<ResetPage />} />
      <Route path="/verifylogin" element={<VerifyLoginOTPPage />} />
      <Route path="/verify/password/reset" element={<VerifyPasswordResetOTPPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
      <Route path="/setpassword" element={<SetPassword/>} />
      <Route path="/dashboard/admin" element={<AdminDashboard/>} />
    </Routes>
    </>

  );
}

export default App;


