import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './addUserPage.css';

const AddUserPage = ({ interface: interfaceData = null }) => {
  const location = useLocation();
  const showAssignButton = location.state?.showAssignButton || false;
  const incomingError = location.state?.error || '';

  const [error, setError] = useState(incomingError);
  const [staffNumber, setStaffNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [contactDetails, setContactDetails] = useState('');
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [roleOptions, setRoleOptions] = useState([]);
  const [roleIdMap, setRoleIdMap] = useState({});

  useEffect(() => {
    if (interfaceData) {
      const idMap = {};
      const roles = interfaceData.map(role => {
        idMap[role.roleName] = role.roleId;
        return role.roleName;
      });
      setRoleOptions(roles);
      setRoleIdMap(idMap);
    } else {
      fetchRoles();
    }
  }, [interfaceData]);

  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://localhost:5041/api/Auth/GetAllRoles');
      if (Array.isArray(response.data)) {
        const idMap = {};
        const roles = response.data.map(role => {
          idMap[role.roleName] = role.roleId;
          return role.roleName;
        });
        setRoleOptions(roles);
        setRoleIdMap(idMap);
      } else {
        setRoleOptions([]);
      }
    } catch {
      setRoleOptions([]);
    }
  };

  const isPhoneValid = (phone) => /^\d{10}$/.test(phone);

  const validateInputs = () => {
    if (!staffNumber || !firstName || !surname || !contactDetails || !email || !selectedRole) {
      setError('Please fill all required fields.');
      return false;
    }

    if (!isPhoneValid(contactDetails)) {
      setError('Phone number must be exactly 10 digits.');
      return false;
    }

    return true;
  };

  const addUser = async () => {
    if (!validateInputs()) return;

    const payload = {
      staffNo: parseInt(staffNumber),
      userName: firstName.trim(),
      userSurname: surname.trim(),
      contacts: contactDetails.trim(),
      email: email.trim(),
      roleId: roleIdMap[selectedRole] || 0,
    };

    try {
      await axios.post('http://localhost:5041/api/Auth/AddUserAccount', payload);

      setStaffNumber('');
      setFirstName('');
      setSurname('');
      setContactDetails('');
      setEmail('');
      setSelectedRole('');
      setError('');
      alert('User successfully added.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add user. Check input or backend.');
    }
  };

  return (
    <div className="add-user-page">
      <h2>Registration</h2>

      {error && (
        <p style={{ color: '#ff0000', fontWeight: 'bold', fontSize: '16px' }}>{error}</p>
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
          placeholder="Contact Number (10 digits)"
          value={contactDetails}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d{0,10}$/.test(value)) setContactDetails(value);
          }}
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="">Select Role</option>
          {roleOptions.map((role, idx) => (
            <option key={idx} value={role}>
              {role}
            </option>
          ))}
        </select>

        <button onClick={addUser}>Add</button>
      </div>
    </div>
  );
};

export default AddUserPage;