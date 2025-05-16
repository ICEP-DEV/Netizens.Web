import React from 'react'
import './ribbon.css'
import TutLogo from "../../assets/TUT_Logo.png"
import Superman from "../../assets/Superman.jpeg"
import { Bell } from 'lucide-react'

export default function Ribbon() {
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
            <p className="user-name">Superman</p>
          </div>
      </div>
      </div>
      
    </div>
  )
}
