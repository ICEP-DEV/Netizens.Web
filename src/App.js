
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/auth/loginPage";
import DashboardPage from "./pages/lecturer/lecturerDashboard/dashboard";
import ResetPage from "./pages/auth/resetPage";
import OtpPage from "./pages/auth/verifyOtp";

function App() {
  return (
    <>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/reset" element={<ResetPage />} />
      <Route path="/verify" element={<OtpPage />} />
    </Routes>

    </>
  );
}

export default App;
