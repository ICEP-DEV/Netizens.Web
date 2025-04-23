
import { Routes, Route } from "react-router-dom";
import './App.css';
import Login from './login';
import Sidebar from './lecture/LactureDashboard/component/sidebar';
import Dashboard from './lecture/LactureDashboard/dashboard';


function App() {
  return (
    
      <Routes>
      <Route path="/" element={<Login />} />
      
      <Route path="/dashboard" element={<Dashboard />} />
      
      </Routes>
    
  );
}

export default App;
