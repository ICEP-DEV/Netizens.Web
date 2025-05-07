import React from 'react';
import './sidebar.css';
import Icon from '../assets/TUTicon1.jpeg';

const Sidebar = () => {
  return (
    <div className="sidebar-content">
      
      <ul>
        <img className="logo" alt="TUT icon" src={Icon}/>
        <li>Dashboard</li>
        <li>New Report</li>
        <li>My Report </li>
        
      </ul>
      <button>LOGOUT</button>
    </div>
  );
};

export default Sidebar;
