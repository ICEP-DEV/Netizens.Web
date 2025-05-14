import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BookOpen,
  Landmark,
  User,
  Users,
  UsersRound,
  BarChart,
  FileText,
  Settings,
  ClipboardCheck,
  UserPlus,
  LogOut,
  FileEdit,
  Notebook
} from 'lucide-react';
import { motion } from 'framer-motion';
import './adminSideBar.css';

function AdminSideBar({ closeSidebar }) {
  
  const location = useLocation();

  const adminNavItems = [
    { name: 'Dashboard', icon: BarChart, path: '/admin/dashboard' },
    { name: 'Manage Users', icon: Users, path: '/admin/users' },
    { name: 'Lecturers', icon: UserPlus, path: '/admin/users' },
    { name: 'Reviewers', icon: UserPlus, path: '/admin/users' },
    { name: 'Departments', icon: Landmark, path: '/admin/users' },
    { name: 'Roles', icon: User, path: '/admin/users' },
    { name: 'Groups', icon: UsersRound, path: '/admin/users' },
    { name: 'Modules', icon: Notebook, path: '/admin/users' },
  ];

  let navItems = adminNavItems;


  const handleLogout = () => {
    
    if (closeSidebar) {
      closeSidebar();
    }
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-main">
        {/* <div className="sidebar-header">
          <Link to="/" className="sidebar-logo">
            <BookOpen className="icon-primary" />
            <span className="logo-text">TUTReportHub</span>
          </Link>
        </div> */}

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`sidebar-link ${isActive ? 'active' : ''}`}
                onClick={closeSidebar}
              >
                <item.icon className={`sidebar-icon ${isActive ? 'active-icon' : ''}`} />
                <span>{item.name}</span>

                {isActive && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="sidebar-indicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-footer">
        <div className="user-info">
          {/* <img
            src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}`}
            alt={user?.name}
            className="user-avatar"
          /> */}
          <div className="user-text">
            <p className="user-name">Admin 1</p>
            <p className="user-role">Admin</p>
          </div>
        </div>

        <div className="sidebar-actions">
          <Link to="#" className="action-link">
            <Settings className="action-icon" />
            Settings
          </Link>
          <button className="action-link">
            <LogOut className="action-icon" />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminSideBar;
