import React from "react";
import "./DepartmentHeadDashboardSidebar.css";

import Icon from "../assets/TUTicon1.jpeg";
import { useNavigate } from "react-router-dom";

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
    <div className="sidebar-content">
      <ul>
        <img className="logo" alt="TUT icon" src={Icon} />
        <li>Dashboard</li>
        <li>Report</li>
        <li>Report Statistics</li>
      </ul>
      <button onClick={handleLogout}>LOGOUT</button>
    </div>
  );
};

export default DepartmentHeadDashboardSidebar;
