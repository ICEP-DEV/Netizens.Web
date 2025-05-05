
import React, { useState, useRef, useEffect } from 'react';

const AddUserPage = () => {
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('');
  const [newUserDepartments, setNewUserDepartments] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [selectedUserForGroup, setSelectedUserForGroup] = useState(null);
  const [roleOptions, setRoleOptions] = useState([]); // ✅ New state for roles

  const manageUsersRef = useRef(null);

  const departmentOptions = [
    'Information Technology',
    'Informatics',
    'Computer Science',
    'Multimedia Computing',
    'Computer Systems Engineering',
  ];

  const groupOptions = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  useEffect(() => {
    const savedRoles = JSON.parse(localStorage.getItem('roles')) || [];
    setRoleOptions(savedRoles);
  }, []);

  const scrollToManageUsers = () => {
    if (manageUsersRef.current) {
      manageUsersRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const addUser = () => {
    if (
      newUserEmail &&
      !users.some((user) => user.email === newUserEmail) &&
      newUserRole
    ) {
      const newUser = {
        email: newUserEmail,
        role: newUserRole,
        departments: newUserDepartments,
        group: '',
        isActive: true,
      };

      setUsers([...users, newUser]);
      setNewUserEmail('');
      setNewUserRole('');
      setNewUserDepartments([]);
      setError('');
    } else {
      setError('Please fill all required fields or check for duplicate email.');
    }
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
    <div className="add-user-page">
      <h2>Add User</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button onClick={scrollToManageUsers}>Assign Groups</button>

      <div className="user-input-row">
        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter user email"
          value={newUserEmail}
          onChange={(e) => setNewUserEmail(e.target.value)}
        />

        {/* Role Selector from localStorage */}
        {roleOptions.length > 0 && (
          <select
            value={newUserRole}
            onChange={(e) => setNewUserRole(e.target.value)}
          >
            <option value="">Select role</option>
            {roleOptions.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        )}

        {/* Department Selector */}
        <select
          multiple
          value={newUserDepartments}
          onChange={(e) =>
            setNewUserDepartments(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
        >
          {departmentOptions.map((dep) => (
            <option key={dep} value={dep}>
              {dep}
            </option>
          ))}
        </select>

        <button onClick={addUser}>Add</button>
      </div>

      {/* Manage Users Section */}
      <div className="manage-users" ref={manageUsersRef}>
        <h3>Manage Users</h3>
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

export default AddUserPage;