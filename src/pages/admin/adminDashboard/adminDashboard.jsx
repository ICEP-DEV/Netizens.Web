import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './adminDashboard.css';

const AdminDashboard = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [addUserVisible, setAddUserVisible] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('');
  const [newUserDepartments, setNewUserDepartments] = useState('');
  const [users, setUsers] = useState([]);

  // Add User Functionality
  const addUser = () => {
    if (newUserEmail && !users.some((user) => user.email === newUserEmail)) {
      const departmentsArray = newUserDepartments.split(',').map((dep) => dep.trim()).filter((dep) => dep);
      const newUser = {
        email: newUserEmail,
        role: newUserRole,
        departments: departmentsArray,
        isActive: true,
      };
      setUsers([...users, newUser]);
      setNewUserEmail('');
      setNewUserRole('');
      setNewUserDepartments('');
    }
  };

  // Delete User Functionality
  const deleteUser = (emailToRemove) => {
    setUsers(users.filter((u) => u.email !== emailToRemove));
  };

  // Toggle User Status (Active/Inactive)
  const toggleUserStatus = (email) => {
    setUsers(
      users.map((u) =>
        u.email === email ? { ...u, isActive: !u.isActive } : u
      )
    );
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar Toggle Button */}
      <button
        className="toggle-sidebar"
        onClick={() => setSidebarVisible(!sidebarVisible)}
      >
        ☰ Menu
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarVisible ? 'visible' : ''}`}>
        <h2>Menu</h2>
        <nav>
          <ul>
            <li><a href="/admin">Admin</a></li>
            <li><Link to="/edit-profile">Edit Profile</Link></li>
            <li>
              <button onClick={() => setAddUserVisible(!addUserVisible)}>
                Add User
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <nav className="navbar">
          <div className="title">Admin</div>
          <button
            className="toggle-sidebar"
            onClick={() => setSidebarVisible(!sidebarVisible)}
          >
            ☰ Menu
          </button>
        </nav>

        {/* Admin Details Section */}
        <div className="dashboard-content">
          <div className="card">
            <h2 className="section-title">Admin Details</h2>
            <ul>
              <li>
                <strong>Name:</strong> John Doe
              </li>
              <li>
                <strong>Email:</strong> admin@example.com
              </li>
              <li>
                <strong>Role:</strong> Administrator
              </li>
            </ul>
          </div>
        </div>

        {/* Add User Section */}
        {addUserVisible && (
          <div className="dashboard-content">
            <div className="card" id="add-user">
              <h2 className="section-title">Add User</h2>
              <div className="user-input-row">
                <input
                  type="email"
                  placeholder="Enter user email"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Enter role (e.g. Manager)"
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Enter departments (comma-separated)"
                  value={newUserDepartments}
                  onChange={(e) => setNewUserDepartments(e.target.value)}
                />
                <button onClick={addUser}>Add</button>
              </div>
            </div>
          </div>
        )}

        {/* Manage Users Section */}
        <div className="dashboard-content">
          <h2 className="section-title">Manage Users</h2>
          <div className="card">
            <ul>
              {users.map((user) => (
                <li key={user.email}>
                  <strong>{user.email}</strong> | Role: {user.role} | Departments: {user.departments.join(', ')} | Status: {user.isActive ? 'Active' : 'Inactive'}
                  <div className="user-actions">
                    <button onClick={() => toggleUserStatus(user.email)}>
                      {user.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button onClick={() => deleteUser(user.email)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;