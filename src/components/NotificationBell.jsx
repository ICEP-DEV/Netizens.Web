import React, { useState, useEffect, useRef } from 'react';
import './NotificationBell.css';

const NotificationBell = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState([
    '3 Reports Pending Approval',
    '2 Missed Reports',
    'Weekly Summary Available',
  ]);

  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="notification-container" ref={dropdownRef}>
      <div className="notification-bell" onClick={toggleDropdown}>
      <span role="img" aria-label="bell">🔔</span>
        {notifications.length > 0 && (
          <span className="notification-count">{notifications.length}</span>
        )}
      </div>

      {showDropdown && (
        <div className="notification-dropdown">
          <ul>
            {notifications.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
