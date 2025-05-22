import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  FileArchive,
  Clock,
  BookOpen,
  LogOut,
  Settings,
  BarChart3
} from 'lucide-react';
import './hodDashboardSidebar.css';

const HodDashboardSidebar = ({ closeSidebar }) => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      localStorage.clear();
      window.location.href = '/';
    }
  };

  const handleSettingsClick = () => {
    navigate('/settings'); // Adjust route if necessary
  };

  return (
    <div className="hod-sidebar">
      <div className="hod-sidebar-main">
        <div className="hod-sidebar-header">Department Head</div>
        <ul className="hod-sidebar-menu">
          <li>
            <Link to="/dashboard/hod-dash" onClick={closeSidebar}>
              <LayoutDashboard className="hod-icon" />
              Dashboard
            </Link>
          </li>

          <li>
            <button
              onClick={() => setShowPopup((prev) => !prev)}
              className="hod-popup-toggle"
            >
              <FileText className="hod-icon" />
              Reports
            </button>

            {showPopup && (
              <div className="hod-popup">
                <Link
                  to="/all-reports"
                  className="hod-popup-item"
                  onClick={closeSidebar}
                >
                  <FileArchive className="hod-popup-icon" />
                  All Reports
                </Link>
                <Link
                  to="/pending-reports"
                  className="hod-popup-item"
                  onClick={closeSidebar}
                >
                  <Clock className="hod-popup-icon" />
                  Pending Reports
                </Link>
                <Link
                  to="/view-reports"
                  className="hod-popup-item"
                  onClick={closeSidebar}
                >
                  <BookOpen className="hod-popup-icon" />
                  View Reports
                </Link>
              </div>
            )}
          </li>

          <li>
            <Link to="/report-statistics" onClick={closeSidebar}>
              <BarChart3 className="hod-icon" />
              Report Statistics
            </Link>
          </li>
        </ul>
      </div>

      <div className="hod-sidebar-footer">
        <button className="hod-settings-button" onClick={handleSettingsClick}>
          <Settings className="hod-icon" />
          Settings
        </button>
        <button className="hod-logout-button" onClick={handleLogout}>
          <LogOut className="hod-icon" />
          Sign out
        </button>
      </div>
    </div>
  );
};

export default HodDashboardSidebar;
