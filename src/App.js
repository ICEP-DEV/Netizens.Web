
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/auth/loginPage";
import DashboardPage from "./pages/lecturer/lecturerDashboard/dashboard";

function App() {
  return (
    <>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
      
    </>
  );
}

export default App;
