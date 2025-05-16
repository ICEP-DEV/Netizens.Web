import React from "react";
import "./DepartmentHeadDashboardSidebar.css";

import Icon from "../assets/TUTicon1.jpeg";
import { useNavigate } from "react-router-dom";
import { FaChartBar, FaFileAlt, FaChartLine, FaSignOutAlt } from 'react-icons/fa';



const DepartmentHeadDashboardSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      localStorage.clear();
      navigate("/");
    }
  };

  return (
    <div className="DepartmentHeadDashboardSideBar-content">
      <img className="logo1" alt="TUT icon" src={Icon} />
      <ul>
        <li>
          <span role="img" aria-label="dashboard">📊</span> Dashboard
        </li>
        <li>
          <span role="img" aria-label="report">📝</span> Report
        </li>
        <li>
          <span role="img" aria-label="stats">📈</span> Report Statistics
        </li>
      </ul>
      <button onClick={handleLogout}>
        <span role="img" aria-label="logout">🚪</span> LOGOUT
      </button>
    </div>
  );
};

export default DepartmentHeadDashboardSidebar;
