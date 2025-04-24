
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/logIn/loginPage";
import DashboardPage from "./pages/lecturer/lecturerDashboard/dashboard";
import ResetPage from "./pages/auth/resettingPages/resetPage";
import VerifyLogInOTPPage from "./pages/auth/verifyLogInOTP/verifyLogInOTP";
import VerifyPasswordResetOTPPage from "./pages/auth/verifyPasswordResetOtpPage/verifyPasswordResetOTP";
import SetPassword from "./pages/auth/setPasswodPages/setPassword";

function App() {
  return (
    <>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/reset" element={<ResetPage />} />
      <Route path="/verify/login" element={<VerifyLogInOTPPage />} />
      <Route path="/verify/password/reset" element={<VerifyPasswordResetOTPPage />} />
      <Route path="/setpassword" element={<SetPassword/>} />
    </Routes>
    </>
  );
}

export default App;
