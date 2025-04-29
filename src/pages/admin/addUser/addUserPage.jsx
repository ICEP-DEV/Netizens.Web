
import React, { useState } from 'react';

const AddUserPage = () => {
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
    <div className="add-user-page">
      <h2>Add User</h2>
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

      <div className="manage-users">
        <h3>Manage Users</h3>
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
  );
};

export default AddUserPage;