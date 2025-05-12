import React from "react";
import "./sidebar.css";
import Icon from "../assets/TUTicon1.jpeg";
import { Link,useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      localStorage.clear();
      navigate("/");
    }
  };
  return (
    <div className="sidebar-contents">
      <ul>
        <img className="sidebar-logo" alt="TUT icon" src={Icon} />
        <Link className="sidebar-link">Dashboard</Link>
        <Link to="/weekly-report" className="sidebar-link">New Report</Link>
        <Link to="/report-history" className="sidebar-link">My Report </Link>
        <Link to="/report-history" className="sidebar-link">My Profile </Link>
      </ul>
      <button onClick={handleLogout}>LOGOUT</button>
    </div>
  );
};

export default Sidebar;
