
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/auth/loginPage";
import DashboardPage from "./pages/lecturer/lecturerDashboard/dashboard";
import ResetPage from "./pages/auth/resetPage";



function App() {
  return (
    <>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/reset" element={<ResetPage />} />

    </Routes>
    </>
  );
}

export default App;
