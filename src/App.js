
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/auth/loginPage";
import Dashboard from './lecture/LactureDashboard/dashboard';

function App() {
  return (
    <>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
      
    </>
  );
}

export default App;
