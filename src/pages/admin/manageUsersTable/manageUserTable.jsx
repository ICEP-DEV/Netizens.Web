import React, { useEffect, useState } from 'react';
import './manageUserTable.css';

const ManageUserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      setUsers(storedUsers);
    }, 500); // Poll every 500ms for live updates

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="manage-user-container">
      <h2 className="table-title">Manage Users</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Staff Number</th>
            <th>First Name</th>
            <th>Surname</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Role</th>
            <th>Departments</th>
            <th>Group</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="9" style={{ textAlign: 'center' }}>
                No users available.
              </td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={index}>
                <td>{user.staffNumber || 'N/A'}</td>
                <td>{user.firstName || 'N/A'}</td>
                <td>{user.surname || 'N/A'}</td>
                <td>{user.contactDetails || 'N/A'}</td>
                <td>{user.email}</td>
                <td>{user.role || 'N/A'}</td>
                <td>{Array.isArray(user.departments) ? user.departments.join(', ') : 'N/A'}</td>
                <td>{user.group || 'N/A'}</td>
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