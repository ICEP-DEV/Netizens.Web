import React from 'react'
import './ribbon.css'
import TutLogo from "../../assets/TUT_Logo.png"

export default function Ribbon() {
  return (
    <div className='ribbon-container'>
      <div className='ribbon-logo-container'>
        <img className='ribbon-logo' src={TutLogo} alt="TUT Logo" />
      </div>
      <div className="user-info">
          {/* <img
            
          /> */}
          <div className="user-text">
            <p className="user-name">Admin 1</p>
            <p className="user-role">Admin</p>
          </div>
        </div>
    </div>
  )
}
