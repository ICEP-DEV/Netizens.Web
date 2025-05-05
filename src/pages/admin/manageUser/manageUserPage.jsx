
import React, { useState } from 'react';

const ManageUsers = ({ users, setUsers }) => {
  const [error, setError] = useState('');
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [selectedUserForGroup, setSelectedUserForGroup] = useState(null);

  const groupOptions = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

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
      setError('User is not a Lecturer');
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
    <div className="manage-users-page">
      <h2>Manage Users</h2>
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

      {/* Group Assignment Modal */}
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
  );
};

export default ManageUsers;