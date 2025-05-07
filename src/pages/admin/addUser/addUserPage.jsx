
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './addUserPage.css';

const AddUserPage = () => {
  const location = useLocation();
  const showAssignButton = location.state?.showAssignButton || false;
  const incomingError = location.state?.error || '';

  const [error, setError] = useState(incomingError);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('');
  const [newUserDepartments, setNewUserDepartments] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);

  const [staffNumber, setStaffNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [contactDetails, setContactDetails] = useState('');

  const departmentOptions = [
    'Information Technology',
    'Informatics',
    'Computer Science',
    'Multimedia Computing',
    'Computer Systems Engineering',
  ];

  useEffect(() => {
    const savedRoles = JSON.parse(localStorage.getItem('roles')) || [];
    setRoleOptions(savedRoles);
  }, []);

  const addUser = () => {
    const isPhoneValid = /^\d{10}$/.test(contactDetails);
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (!isPhoneValid) {
      setError('Phone Number Length Is Incorrect');
      return;
    }

    if (
      newUserEmail &&
      !users.some((user) => user.email === newUserEmail) &&
      newUserRole &&
      staffNumber &&
      firstName &&
      surname &&
      contactDetails
    ) {
      const newUser = {
        email: newUserEmail,
        role: newUserRole,
        departments: newUserDepartments,
        staffNumber,
        firstName,
        surname,
        contactDetails,
        group: '',
        isActive: true,
      };

      const updatedUsers = [...users, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      // Clear fields
      setNewUserEmail('');
      setNewUserRole('');
      setNewUserDepartments([]);
      setStaffNumber('');
      setFirstName('');
      setSurname('');
      setContactDetails('');
      setError('');
    } else {
      setError('Please fill all required fields or check for duplicate email.');
    }
  };

  return (
    <div className="add-user-page">
      <h2>Add User</h2>
      {error && (
        <p style={{ color: '#ff0000', fontWeight: 'bold', fontSize: '16px' }}>
          {error}
        </p>
      )}

      {showAssignButton && (
        <a href="/manage-users">
          <button>Assign Groups</button>
        </a>
      )}

      <div className="user-input-row">
        <input
          type="text"
          placeholder="Staff Number"
          value={staffNumber}
          onChange={(e) => setStaffNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Contact Details"
          value={contactDetails}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d{0,10}$/.test(value)) {
              setContactDetails(value);
            }
          }}
        />
        <input
          type="email"
          placeholder="Enter user email"
          value={newUserEmail}
          onChange={(e) => setNewUserEmail(e.target.value)}
        />

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
    </div>
  );
};

export default AddUserPage;