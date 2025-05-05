import React, { useState, useRef } from 'react';
import { FaBell, FaUserCircle, FaPowerOff } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './adminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([
    {
      email: 'lecturer@example.com',
      role: 'Lecturer',
      departments: ['Computer Science'],
      group: '',
      isActive: true,
    },
    {
      email: 'admin@example.com',
      role: 'Admin',
      departments: ['Information Technology'],
      group: '',
      isActive: true,
    },
  ]);

  const [error, setError] = useState('');
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [selectedUserForGroup, setSelectedUserForGroup] = useState(null);
  const manageUsersRef = useRef(null);
  const navigate = useNavigate();

  const groupOptions = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  const handleLogout = () => {
    navigate('/login');
  };

  const scrollToManageUsers = () => {
    manageUsersRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const deleteUser = (emailToRemove) => {
    setUsers(users.filter((u) => u.email !== emailToRemove));
  };

  const toggleUserStatus = (email) => {
    setUsers(
      users.map((u) =>
        u.email === email ? { ...u, isActive: !u.isActive } : u
      )
    );
  };

  const openGroupModal = (user) => {
    if (user.role !== 'Lecturer') {
      setError('User Is Not A Lecturer');
      return;
    }
    if (!user.isActive) {
      setError('Cannot assign group to inactive user');
      return;
    }
    setSelectedUserForGroup(user.email);
    setShowGroupModal(true);
    setError('');
  };

  const handleGroupSelect = (group) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.email === selectedUserForGroup ? { ...user, group } : user
      )
    );
    setShowGroupModal(false);
    setSelectedUserForGroup(null);
  };

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <div className="logo"></div>

        <Link to="/admin-details" className="sidebar-btn link-button">
          Dashboard
        </Link>

        {/* ✅ Add Roles button now directly after Dashboard */}
        <Link to="/add-role" className="sidebar-btn link-button">
          Add Roles
        </Link>

        <Link to="/add-user" className="sidebar-btn link-button">
          Add Users
        </Link>

        <Link to="/manage-users" className="sidebar-btn link-button">
          Manage Users
        </Link>

        <button className="logout-btn" onClick={handleLogout}>
          <FaPowerOff /> Logout
        </button>
      </aside>

      <div className="main-panel">
        <header className="topbar">
          <div className="top-right">
            <FaBell className="icon" />
            <Link to="/edit-profile" className="admin-profile-link">
              <FaUserCircle className="icon user-icon" />
              <span>Admin</span>
            </Link>
          </div>
        </header>

        <div className="welcome">
          <h1>Welcome To Admin Dashboard</h1>
          <p><strong>Current week:</strong> April 14 - April 18, 2025</p>
        </div>

        <div className="quick-management">
          <div className="quick-actions card">
            <h3>Quick Actions:</h3>
            <button onClick={scrollToManageUsers}>Assign Groups</button>
          </div>

          <div className="management-overview card">
            <h3>Management Overview</h3>
            <p>Total Lecturers: <a href="#">58</a></p>
            <p>Total Department Head: <a href="#">5</a></p>
            <p><span className="status-dot active"></span> Active: <a href="#">56</a></p>
            <p><span className="status-dot inactive"></span> Inactive: <a href="#">2</a></p>
          </div>
        </div>

        <div className="manage-users card" ref={manageUsersRef}>
          <h3>Manage Users</h3>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <ul>
            {users.map((user) => (
              <li key={user.email}>
                <strong>{user.email}</strong> | Role: {user.role} | Departments:{' '}
                {user.departments.join(', ')} | Group: {user.group || 'N/A'} | Status:{' '}
                <span className={`status-badge ${user.isActive ? 'active' : 'inactive'}`}>
                  {user.isActive ? 'Active' : 'Inactive'}
                </span>
                <div className="user-actions">
                  <button onClick={() => toggleUserStatus(user.email)}>
                    {user.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  <button onClick={() => deleteUser(user.email)}>Delete</button>
                  <button onClick={() => openGroupModal(user)}>Assign Group</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {showGroupModal && (
          <div className="group-modal">
            <div className="modal-content">
              <h3>Select Group (A-Z)</h3>
              <div className="group-grid">
                {groupOptions.map((group) => (
                  <button
                    key={group}
                    onClick={() => handleGroupSelect(group)}
                    className="group-btn"
                  >
                    {group}
                  </button>
                ))}
              </div>
              <button
                className="close-btn"
                onClick={() => {
                  setShowGroupModal(false);
                  setSelectedUserForGroup(null);
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;