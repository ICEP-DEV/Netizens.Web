import React from "react";
import "./sidebar.css";
import { Link, useNavigate,} from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faHouse,faSuitcase,faFile,faGear
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
      <div className="Lectur-sidebar-links-container">
        
          <div className="Lectur-sidebar-links-and-icon">
          <Link to="/dashboard/lecturer" className="Lectur-sidebar-link">
           <FontAwesomeIcon icon={faHouse} className="Lectur-sidebar-container-links" />
            Dashboard
          </Link>
          </div>
          <div className="Lectur-sidebar-links-and-icon">
          <Link to="/report-history" className="Lectur-sidebar-link">
          <FontAwesomeIcon icon={faFile} className="Lectur-sidebar-container-links" />
            My Reports
          </Link>
          </div>
          <div className="Lectur-sidebar-links-and-icon">
          <Link to="/weekly-report" className="Lectur-sidebar-link">
          <FontAwesomeIcon icon={faSuitcase} className="Lectur-sidebar-container-links" />
            Create Report
          </Link>
          </div>
          
        
      </div>

      <div className="Lectur-sidebar-lower-container" >
      
      <div className="Lectur-sidebar-profile">

        <div className="Lectur-sidebar-links-and-icon">
       <Link to="/view-lecturer-profile" className="Lectur-sidebar-link">
           John Doe <br/>  Lecturer
      </Link>
       </div>
       </div>

       <div className="Lectur-sidebar-links-and-icon">
      <Link to="/view-lecturer-profile" className="Lectur-sidebar-link">
          <FontAwesomeIcon icon={faGear} className="Lectur-sidebar-container-links" />
            settings
      </Link>
      </div>
      <button className="Lectur-sidebar-logout-btn" onClick={handleLogout}>
      <FontAwesomeIcon icon={faRightFromBracket} className="Lectur-sidebar-container-logout"/>
        Sign Out
      </button>

      </div>
    </div>
  );
};

export default Sidebar;