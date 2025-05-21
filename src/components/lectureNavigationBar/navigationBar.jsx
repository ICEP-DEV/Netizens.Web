import React from "react";
import "./navigationBar.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,faMessage,faBell
  
} from "@fortawesome/free-solid-svg-icons";

const NavigationBar = () =>{
    return(

        <div className="lecture-navigationbar-container">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="lecture-navigationbar-container-search-icon"/>
                <FontAwesomeIcon icon={faMessage} className="lecture-navigationbar-container-message-icon"/>
                <FontAwesomeIcon icon={faBell} className="lecture-navigationbar-container-notification-icon"/>
        </div>
    );
}

export  default NavigationBar;