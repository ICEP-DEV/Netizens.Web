import React from "react";
import "./DepartmentHeadDashboardSidebar.css";
import Icon from "../assets/TUTicon1.jpeg";
import { useNavigate } from "react-router-dom";

import { FaChartBar, FaFileAlt, FaChartLine, FaSignOutAlt } from 'react-icons/fa';

import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaFileAlt,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";


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
    <div className="navpanel-content">
      <img className="logo" alt="TUT icon" src={Icon} />
      <div className="university-name">Tshwane University of Technology</div>

      <button
        className="navpanel-btn"
        onClick={() => navigate("/dashboard/department-head")}
      >
        <FaTachometerAlt className="navpanel-icon-left" /> Dashboard
      </button>

      <button
        className="navpanel-btn"
        onClick={() => navigate("/dashboard/department-head/reports")}
      >
        <FaFileAlt className="navpanel-icon-left" /> Reports
      </button>

      <button
        className="navpanel-btn"
        onClick={() => navigate("/dashboard/hod/reports")}
      >
        <FaChartBar className="navpanel-icon-left" /> Report statistics
      </button>

      <button className="navpanel-logout-btn" onClick={handleLogout}>
        <FaSignOutAlt className="navpanel-icon-left" /> Logout

      </button>
    </div>
    </div>
  );
};

export default DepartmentHeadDashboardSidebar;