import React from "react";
import "./DepartmentHeadDashboardSidebar.css";
import Icon from "../assets/TUTicon1.jpeg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaFileAlt, FaChartBar, FaSignOutAlt }  from "react-icons/fa";


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
      <img className="logo" alt="TUT icon" src={Icon} />
      <div className="university-name">Tshwane University of Technology</div>

      <button className="sidebar-btn" onClick={() => navigate("/dashboard/department-head")}>
        <FaTachometerAlt className="sidebar-icon-left" /> Dashboard
      </button>
      <button className="sidebar-btn" onClick={() => navigate("/dashboard/department-head/reports")}>
        <FaFileAlt className="sidebar-icon-left" /> Reports
      </button>
      <button className="sidebar-btn" onClick={() => navigate("/dashboard/hod/reports")}>
        <FaChartBar className="sidebar-icon-left" /> Report statistics
      </button>

      <button className="logout-btn" onClick={handleLogout}>
        <FaSignOutAlt className="sidebar-icon-left" /> Logout
      </button>
    </div>
  );
};

export default DepartmentHeadDashboardSidebar;




<div className="card">
  <h3><strong>Quick Actions:</strong></h3>
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    <Link to="/dashboard/hod/reports" style={{ textDecoration: 'none', color: 'blue' }}>
      <span role="img" aria-label="book">📘</span> View Reports
    </Link>
    <Link to="/dashboard/hod/reports?filter=pending" style={{ textDecoration: 'none', color: 'orange' }}>
      <span role="img" aria-label="hourglass">⏳</span> Pending approval
    </Link>
  </div>
</div>