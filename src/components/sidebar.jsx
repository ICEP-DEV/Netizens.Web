import React from "react";
import "./sidebar.css";
import Icon from "../assets/TUTicon1.jpeg";
import { useNavigate } from "react-router-dom";

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
    <div className="sidebar-content">
      <ul>
        <img className="logo" alt="TUT icon" src={Icon} />
        <li>Dashboard</li>
        <li>New Report</li>
        <li>My Report </li>
      </ul>
      <button onClick={handleLogout}>LOGOUT</button>
    </div>
  );
};

export default Sidebar;
