
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './manageUserPage.css';

const ManageUserPage = () => {
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [selectedUserForGroup, setSelectedUserForGroup] = useState(null);
  const [showGroupModal, setShowGroupModal] = useState(false);

  const groupOptions = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);

    if (location.state?.openGroupModal) {
      const lecturer = storedUsers.find(
        (u) => u.role === 'Lecturer' && u.isActive
      );
      if (lecturer) {
        setSelectedUserForGroup(lecturer.email);
        setShowGroupModal(true);
      } else {
        setError('❌ No Active Lecturer Found to Assign Group');
      }
    }

    if (location.state?.error) {
      setError(location.state.error);
    }
  }, [location.state]);

  const saveUsers = (updatedUsers) => {
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
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

  const assignGroup = (user) => {
    if (user.role !== 'Lecturer') {
      setError('User is not a Lecturer');
      return;
    }
    if (!user.isActive) {
      setError('User must be active to assign group');
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

  return (
    <div className="manage-users-page">
      <h2>Manage Users</h2>
      {error && <p className="error-text">{error}</p>}

      <table>
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="10" style={{ textAlign: 'center' }}>
                No users available.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.email}>
                <td>{user.staffNumber || 'N/A'}</td>
                <td>{user.firstName || 'N/A'}</td>
                <td>{user.surname || 'N/A'}</td>
                <td>{user.contactDetails || 'N/A'}</td>
                <td>{user.email}</td>
                <td>{user.role || 'N/A'}</td>
                <td>{Array.isArray(user.departments) ? user.departments.join(', ') : 'N/A'}</td>
                <td>{user.group || 'N/A'}</td>
                <td>
                  <span className={`status-badge ${user.isActive ? 'active' : 'inactive'}`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="user-actions">
                  <button onClick={() => toggleUserStatus(user.email)}>
                    {user.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  <button onClick={() => deleteUser(user.email)}>Delete</button>
                  <button onClick={() => assignGroup(user)}>Assign Group</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showGroupModal && (
        <div className="group-modal">
          <div className="modal-content">
            <h3>Select Group (A-Z)</h3>
            <div className="group-grid">
              {groupOptions.map((group) => (
                <button key={group} onClick={() => handleGroupSelect(group)}>
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
  );
};

export default ManageUserPage;