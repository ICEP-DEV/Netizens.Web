import React, { useEffect, useState } from 'react';
import './manageUserTable.css';

const ManageUserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []); // Load users on component mount

  return (
    <div className="manage-user-container">
      <h2 className="table-title">Manage Users</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Staff Number</th>
            <th>Full Names</th>
            <th>Surname</th>
            <th>Contact Details</th>
            <th>Email</th>
            <th>Role</th>
            <th>Department</th>
            <th> Group</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="9" style={{ textAlign: 'center' }}>No users available.</td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={index}>
                <td>{user.staffNumber}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.contact}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.department}</td>
                <td>{user.group || '-'}</td>
                <td className={user.isActive ? 'status-active' : 'status-inactive'}>
                  {user.isActive ? 'Active' : 'Inactive'}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUserTable;