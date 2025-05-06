
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './addRoles.css';

const AddRolesPage = () => {
  const [newRole, setNewRole] = useState('');
  const [roles, setRoles] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedRoles = JSON.parse(localStorage.getItem('roles')) || [];
    setRoles(savedRoles);
  }, []);

  const saveRole = async () => {
    const trimmedRole = newRole.trim();
    if (!trimmedRole || roles.includes(trimmedRole)) return;

    try {
      const response = await axios.post("http://localhost:5041/api/Auth/AddRole", {
        roleName: trimmedRole
      });

      if (response.status === 200) {
        const updatedRoles = [...roles, trimmedRole];
        localStorage.setItem('roles', JSON.stringify(updatedRoles));
        setRoles(updatedRoles);
        setNewRole('');
        setShowSuccessMessage(true);

        setTimeout(() => {
          setShowSuccessMessage(false);
          navigate('/add-user');
        }, 1500);
      } else {
        console.error('❌ Failed to add role:', response.statusText);
      }
    } catch (error) {
      console.error('🚨 Error while adding role:', error.message);
    }
  };

  const deleteRole = (roleToDelete) => {
    const updatedRoles = roles.filter((role) => role !== roleToDelete);
    localStorage.setItem('roles', JSON.stringify(updatedRoles));
    setRoles(updatedRoles);
  };

  return (
    <div className="add-roles-page">
      <h2>Add Role</h2>

      <div className="role-input">
        <input
          type="text"
          placeholder="Enter role"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
        />
        <button onClick={saveRole}>Save Role</button>
      </div>

      {roles.length > 0 && (
        <div className="roles-list">
          <h3>Saved Roles:</h3>
          <ul>
            {roles.map((role, index) => (
              <li key={index}>
                {role}
                <button className="delete-btn" onClick={() => deleteRole(role)}>
                  x
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showSuccessMessage && (
        <p className="success-message">Role Added Successfully</p>
      )}
    </div>
  );
};

export default AddRolesPage;
