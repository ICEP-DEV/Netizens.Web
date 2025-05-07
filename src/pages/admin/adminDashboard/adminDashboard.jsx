
import React, { useState, useEffect } from 'react';
import { FaBell, FaUserCircle, FaPowerOff } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './adminDashboard.css';
import ManageUserTable from '../manageUsersTable/manageUserTable';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [selectedUserForGroup, setSelectedUserForGroup] = useState(null);
  const navigate = useNavigate();

  const groupOptions = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  const saveUsers = (updatedUsers) => {
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const scrollToManageUsers = () => {
    if (users.length === 0) {
      navigate('/manage-users', {
        state: { error: '❌ No Users Available To Assign Groups' },
      });
      return;
    }

    const hasActiveLecturer = users.some(
      (user) => user.role === 'Lecturer' && user.isActive
    );

    if (!hasActiveLecturer) {
      navigate('/manage-users', {
        state: { error: '❌ No Active Lecturers Available To Assign Groups' },
      });
      return;
    }

    navigate('/manage-users', { state: { openGroupModal: true } });
  };

  const toggleUserStatus = (email) => {
    const updated = users.map((user) =>
      user.email === email ? { ...user, isActive: !user.isActive } : user
    );
    saveUsers(updated);
  };

  const deleteUser = (email) => {
    const updated = users.filter((user) => user.email !== email);
    saveUsers(updated);
  };

  const openGroupModal = (user) => {
    if (user.role !== 'Lecturer') {
      setError('❌ User is not a Lecturer');
      return;
    }
    if (!user.isActive) {
      setError('❌ Cannot assign group to inactive user');
      return;
    }
    setSelectedUserForGroup(user.email);
    setShowGroupModal(true);
    setError('');
  };

  const handleGroupSelect = (group) => {
    const updated = users.map((user) =>
      user.email === selectedUserForGroup ? { ...user, group } : user
    );
    saveUsers(updated);
    setShowGroupModal(false);
    setSelectedUserForGroup(null);
  };

  // Counts for management overview
  const totalUsers = users.length;
  const totalLecturers = users.filter(u => u.role === 'Lecturer').length;
  const totalDeptHeads = users.filter(u => u.role === 'Department Head').length;
  const totalActive = users.filter(u => u.isActive).length;
  const totalInactive = users.filter(u => !u.isActive).length;

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <div className="logo"></div>
        <Link to="/admin-details" className="sidebar-btn link-button">Dashboard</Link>
        <Link to="/add-role" className="sidebar-btn link-button">Add Roles</Link>
        <Link to="/add-user" className="sidebar-btn link-button">Add Users</Link>
        <Link to="/manage-users" className="sidebar-btn link-button">Manage Users</Link>
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
            <p>Total Users: <a href="#">{totalUsers}</a></p>
            <p>Total Lecturers: <a href="#">{totalLecturers}</a></p>
            <p>Total Department Heads: <a href="#">{totalDeptHeads}</a></p>
            <p>
              <span className="status-dot active"></span> Active: 
              <a href="#"> {totalActive}</a>
            </p>
            <p>
              <span className="status-dot inactive"></span> Inactive: 
              <a href="#"> {totalInactive}</a>
            </p>
          </div>
        </div>

        <div className="manage-users card">
          <h3>Manage Users</h3>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <ManageUserTable users={users} onAssignGroup={openGroupModal} />
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
