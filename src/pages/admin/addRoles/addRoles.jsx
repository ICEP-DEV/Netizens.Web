import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import './addRoles.css';

const AddRolesPage = ({ interface: interfaceData = null }) => {
  const [newRole, setNewRole] = useState('');
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    if (interfaceData) {
      setRoles(interfaceData);
    } else {
      fetchRoles();
    }
  }, [interfaceData]);

  const fetchRoles = async () => {
    try {
      const response = await axios.get("http://localhost:5041/api/Getters/GetAllRoles");

      if (response?.data?.status && Array.isArray(response.data.roles)) {
        setRoles(response.data.roles);
      } else {
        toast.error(response?.data?.message || "Failed to load roles.");
        setRoles([]);
      }
    } catch (error) {
      toast.error("Error fetching roles.");
      setRoles([]);
    }
  };

  const saveRole = async () => {
    const trimmed = newRole.trim();
    if (!trimmed) {
      toast.error("Please enter a valid role name.");
      return;
    }

    const exists = roles.some(role => role.roleName.toLowerCase() === trimmed.toLowerCase());
    if (exists) {
      toast.error("Role already exists.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5041/api/Auth/AddRole", {
        roleName: trimmed,
      });

      if (response.status === 200 || response.data?.message) {
        toast.success("Role added successfully.");
        setNewRole('');
        if (!interfaceData) fetchRoles();
      } else {
        toast.error(response.data.message || "Failed to add role.");
      }
    } catch (error) {
      const message = error.response?.data?.message || "An error occurred while adding the role.";
      toast.error(message);
    }
  };

  const deleteRole = async (roleId) => {
    try {
      const response = await axios.delete(`http://localhost:5041/api/Auth/DeleteRole/${roleId}`);
      if (response.status === 200) {
        toast.success("Role deleted successfully.");
        if (!interfaceData) fetchRoles();
      } else {
        toast.error("Failed to delete role.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred while deleting the role.");
    }
  };

  return (
    <div className="add-roles-page">
      <Toaster />
      <h2>Roles</h2>

      <div className="centered-group">
        <div className="inline-group role-input">
          <input
            type="text"
            placeholder="Enter role"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
          />
          <button onClick={saveRole}>Add Role</button>
        </div>
      </div>

      <div className="roles-list">
        <h3>Saved Roles</h3>
        {roles.length > 0 ? (
          <ul>
            {roles.map((role) => (
              <li key={role.roleId}>
                {role.roleName}
                {!interfaceData && (
                  <button
                    className="delete-btn"
                    onClick={() => deleteRole(role.roleId)}
                  >
                    Delete
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No roles found.</p>
        )}
      </div>
    </div>
  );
};

export default AddRolesPage;