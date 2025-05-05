
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './addRoles.css';

const AddRolesPage = () => {
  const [newRole, setNewRole] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedRole = localStorage.getItem('role');
    if (savedRole) {
      setCurrentRole(savedRole);
    }
  }, []);

  const saveRole = () => {
    const trimmedRole = newRole.trim();
    if (trimmedRole) {
      localStorage.setItem('role', trimmedRole);
      setCurrentRole(trimmedRole);
      setNewRole('');
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        navigate('/dashboard/admin');
      }, 1500);
    }
  };

  const deleteRole = () => {
    localStorage.removeItem('role');
    setCurrentRole(null);
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

      {currentRole && (
        <div className="roles-list">
          <h3>Current Role:</h3>
          <p>{currentRole} <button className="delete-btn" onClick={deleteRole}>x</button></p>
        </div>
      )}

      {showSuccessMessage && (
        <p className="success-message">Role Added Successfully</p>
      )}
    </div>
  );
};

export default AddRolesPage;