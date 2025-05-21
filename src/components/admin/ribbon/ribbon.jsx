import React , {useState,useEffect}from 'react'
import './ribbon.css'
import TutLogo from "../../../assets/TUT_Logo.png"
import Superman from "../../../assets/Superman.jpeg"
import { Bell } from 'lucide-react'
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faHouse,faSuitcase,faFile,faUser,faGear
} from "@fortawesome/free-solid-svg-icons";

export default function Ribbon() {
  const [name, setName] = useState("");
  const [surname,setSurname] = useState("");
  

  useEffect(() => {
    
    axios
      .get(
        "http://localhost:5041/api/Getters/GetUserDetails",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setName(response.data.name);
        setSurname(response.data.surname);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });

      

      axios.get(
        "http://localhost:5041/api/Reports/GetLatestReport",{
          withCredentials:true,
        }
      )

   

  }, []);
  return (
    <div className='ribbon-container'>
      <div className='ribbon-logo-container'>
        <img className='ribbon-logo' src={TutLogo} alt="TUT Logo" />
      </div>
      <div className='notification-profile-container'>
        <div className='bell-icon-container'>
          <Bell className='bell-icon'/>
        </div>
        
        <div className="user-info">
           <img
           className='user-avatar'
            src={Superman} alt='User profile'
          />
          <div className="user-text">
            <p className="user-name">{name +" "+ surname}</p>
          </div>
      </div>
      </div>
      
    </div>
  )
}
