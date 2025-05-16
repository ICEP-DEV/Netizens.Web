import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './addUserPage.css';
import { toast, Toaster } from 'react-hot-toast';

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

  useEffect(() => {
    if (!interfaceData) {
      fetchRoles();
    } else {
      setRoleOptions(interfaceData);
    }
  }, [interfaceData]);

  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://localhost:5041/api/Getters/GetAllRoles');
      if (response?.data?.status && Array.isArray(response.data.roles)) {
        setRoleOptions(response.data.roles);
      } else {
        toast.error('Failed to load roles.');
        setRoleOptions([]);
      }
    } catch (error) {
      toast.error('Error fetching roles.');
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

  const resetForm = () => {
    setStaffNumber('');
    setFirstName('');
    setSurname('');
    setContactDetails('');
    setEmail('');
    setSelectedRole('');
    setError('');
  };

  const addUser = async () => {
    if (!validateInputs()) return;

    const payload = {
      staffNo: parseInt(staffNumber),
      userName: firstName.trim(),
      userSurname: surname.trim(),
      contacts: contactDetails.trim(),
      email: email.trim(),
      roleId: parseInt(selectedRole),
    };

    try {
      const results = await axios.post('http://localhost:5041/api/Auth/AddUserAccount', payload);

      if (results?.data?.status) {
        toast.success(results?.data?.message);
        resetForm();
      } else {
        toast.error(results?.data?.message);
      }
    } catch (err) {
      toast.error(err.results?.data?.message || 'An error occurred.');
    }
  };

  return (
    <div className="add-user-page">
      <Toaster />
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
          {roleOptions.map((role) => (
            <option key={role.roleId || role.RoleId} value={role.roleId || role.RoleId}>
              {role.roleName || role.RoleName}
            </option>
          ))}
        </select>

        <button onClick={addUser}>Add</button>
      </div>
    </div>
  );
};

export default AddUserPage;
