
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './adminDashboard.css'; // Your custom stylesheet
// import logo from "../../assets/TUT-logo97.png";

const AdminDashboard = () => {
  const [newUserEmail, setNewUserEmail] = useState('');
  const [users, setUsers] = useState([]);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const addUser = () => {
    if (newUserEmail && !users.includes(newUserEmail)) {
      setUsers([...users, newUserEmail]);
      setNewUserEmail('');
    }
  };

  const deleteUser = (emailToRemove) => {
    setUsers(users.filter((u) => u !== emailToRemove));
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
            <li><a href="#add-user">Add Users</a></li>
            <li><Link to="/edit-profile">Edit Profile</Link></li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="main-content">
        {/* Navbar */}
        <nav className="navbar">
          <h1 className="title">Admin Dashboard</h1>
          {/* <img src={logo} alt="TUT Logo" className="logo" /> */}
        </nav>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          <h2 className="section-title">Welcome, Admin!</h2>

          {/* User Management */}
          <div className="card" id="add-user">
            <h3 className="section-title">Manage Users</h3>
            <div className="user-input-row">
              <input
                type="email"
                placeholder="Enter user email"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
              />
              <button onClick={addUser}>Add</button>
            </div>
            <ul>
              {users.map((user) => (
                <li key={user}>
                  {user}
                  <button onClick={() => deleteUser(user)}>Delete</button>
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