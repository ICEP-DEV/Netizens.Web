import React from "react";
import "./sidebar.css";
import Icon from "../../assets/TUTicon1.jpeg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faHouse,faSuitcase,faFile,faUser
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .post(
        "http://localhost:5041/api/Auth/Logout",
        {},
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        toast.success(response.data.message);
        navigate("/");
      })
      .catch((error) => {
        toast.error("Unable to logout");
        console.error(error);
      });
  };

  return (
    <div className="Lectur-sidebar-container">
      <Toaster />
      <div>
        <img className="Lectur-sidebar-logo" alt="TUT icon" src={Icon} />
        <ul className="Lectur-sidebar-links">
          <Link to="/dashboard/lecturer" className="Lectur-sidebar-link">
           <FontAwesomeIcon icon={faHouse} className="Lectur-sidebar-container-links" />
            Dashboard
          </Link>
          <Link to="/weekly-report" className="Lectur-sidebar-link">
          <FontAwesomeIcon icon={faSuitcase} className="Lectur-sidebar-container-links" />
            New Report
          </Link>
          <Link to="/report-history" className="Lectur-sidebar-link">
          <FontAwesomeIcon icon={faFile} className="Lectur-sidebar-container-links" />
            My Report
          </Link>
          <Link to="/view-lecturer-profile" className="Lectur-sidebar-link">
          <FontAwesomeIcon icon={faUser} className="Lectur-sidebar-container-links" />
            My Profile
          </Link>
        </ul>
      </div>
      
      <button className="Lectur-sidebar-logout-btn" onClick={handleLogout}>
      <FontAwesomeIcon icon={faRightFromBracket} className="Lectur-sidebar-container-logout"/>
        LOGOUT
      </button>
    </div>
  );
};

export default Sidebar;