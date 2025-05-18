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
  Notebook,
  GraduationCap
} from 'lucide-react';
import { motion } from 'framer-motion';
import './adminSideBar.css';

function AdminSideBar({ closeSidebar }) {
  
  const location = useLocation();

  const adminNavItems = [
    { name: 'Dashboard', icon: BarChart, path: '/dashboard/admin' },
    { name: 'Manage Users', icon: Users, path: '/manage-users' },
    { name: 'Academic', icon: GraduationCap, path: '/academic' },
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
        <div className="sidebar-actions">
          <Link to="/admin/settings" className="action-link">
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
