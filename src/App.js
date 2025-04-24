
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/auth/loginPage";
import DashboardPage from "./pages/lecturer/lecturerDashboard/dashboard";
import ResetPage from "./pages/auth/resetPage";
import OtpPage from "./pages/auth/verifyOtp";

import VerifyOtpPage from "./pages/auth/verifyOtpPage/VerifyOtpPage";

import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage/ForgotPasswordPage";
import SetPassword from "./pages/auth/SetPassword";



function App() {



  return (
    <>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/reset" element={<ResetPage />} />
      <Route path="/verify" element={<OtpPage />} />

      <Route path="/otp" element={<VerifyOtpPage />} />
      <Route path="/forgotpassword" element={<ForgotPasswordPage />} />

      <Route path="/setpassword" element={<SetPassword/>} />
  

    </Routes>

    </>

  );
}

export default App;


