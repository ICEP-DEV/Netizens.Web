import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast, Toaster} from 'react-hot-toast';
import './addRoles.css';

const AddRolesPage = () => {
  const [newRole, setNewRole] = useState('');
  const [roles, setRoles] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [department, setDepartment] = useState('');
  const [modules, setModules] = useState(['']);
  const navigate = useNavigate();

  useEffect(() => {
    const savedRoles = JSON.parse(localStorage.getItem('roles')) || [];
    setRoles(savedRoles);
  }, []);

  const saveRole = async () => {
    const trimmedRole = newRole.trim();

    // No role entered
    if (!trimmedRole) {
      await sendRoleStatusToBackend("", 0);
      return;
    }

    // Role already exists
    if (roles.includes(trimmedRole)) {
      await sendRoleStatusToBackend("", 0);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5041/api/Auth/AddRole", {
        roleName: trimmedRole,
        status: 1
      });

      if (response.status === 200) {
        const updatedRoles = [...roles, trimmedRole];
        localStorage.setItem('roles', JSON.stringify(updatedRoles));
        setRoles(updatedRoles);
        setNewRole('');
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 1500);
      } else {
        console.error('❌ Failed to add role:', response.statusText);
      }
    } catch (error) {
      console.error('🚨 Error while adding role:', error.message);
    }
  };

  const sendRoleStatusToBackend = async (roleName, status) => {
    try {
      await axios.post("http://localhost:5041/api/Auth/AddRole", {
        roleName,
        status
      });
    } catch (error) {
      console.error("🚨 Failed to send role status:", error.message);
    }
  };

  const saveDepartment = async () => {
    // const trimmedDept = department.trim();
    // if (!trimmedDept) {
    //   setErrorMessage('Please Fill In All Details Before Saving');
    //   return null;
    // }

    try {
      const response = await axios.post('http://localhost:5041/api/Academy/AddDepartment', {
        name : department
      });

      if (response.data.status) {
        toast.success(response?.data?.message)
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      toast.error((error.response?.data?.message || "An error occurred"));
      return null;
    }
  };

  const deleteRole = (roleToDelete) => {
    const updatedRoles = roles.filter((role) => role !== roleToDelete);
    localStorage.setItem('roles', JSON.stringify(updatedRoles));
    setRoles(updatedRoles);
  };

  const handleModuleChange = (index, value) => {
    const updated = [...modules];
    updated[index] = value;
    setModules(updated);
  };

  const addModuleField = () => setModules([...modules, '']);
  const removeModuleField = (index) => setModules(modules.filter((_, i) => i !== index));

  const handleSaveModules = async (departmentID) => {
    const savedModuleIDs = [];

    try {
      for (const moduleName of modules) {
        if (moduleName.trim() === '') continue;

        const moduleData = {
          moduleName,
          moduleCode: moduleName.slice(0, 4).toUpperCase() + Math.floor(Math.random() * 9000 + 1000),
          departmentID
        };

        const response = await axios.post('http://localhost:5041/api/Academy/AddModule', moduleData);
        if (response.status === 200 && response.data) {
          savedModuleIDs.push(response.data.moduleID || response.data.id);
        } else {
          console.warn(`⚠️ Failed to add module "${moduleName}"`);
        }
      }
    } catch (error) {
      console.error('🚨 Error saving modules:', error.message);
      alert('❌ Failed to save modules.');
    }

    return savedModuleIDs;
  };

  const handleSaveAll = async () => {
    setErrorMessage('');
    const trimmedRole = newRole.trim();
    const trimmedDept = department.trim();
    const validModules = modules.filter((m) => m.trim() !== '');

    if (!trimmedRole || !trimmedDept || validModules.length === 0) {
      setErrorMessage('Please Fill In All Details Before Saving');
      return;
    }

    await saveRole();

    const departmentID = await saveDepartment();
    if (!departmentID) return;

    const moduleIDs = await handleSaveModules(departmentID);

    console.log('✅ DepartmentID:', departmentID);
    console.log('✅ ModuleIDs:', moduleIDs);

    setModules(['']);
    setDepartment('');
    setNewRole('');
    setErrorMessage('');
    setShowSuccessMessage(true);

    setTimeout(() => {
      setShowSuccessMessage(false);
      navigate('/add-user');
    }, 1500);
  };

  return (
    <div className="add-roles-page">
        <Toaster/>
      <h2>Manage Academic Structure</h2>

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

      {roles.length > 0 && (
        <div className="roles-list">
          <h3>Saved Roles:</h3>
          <ul>
            {roles.map((role, index) => (
              <li key={index}>
                {role}
                <button className="delete-btn" onClick={() => deleteRole(role)}>x</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showSuccessMessage && (
        <p className="success-message">✅ Data Saved Successfully</p>
      )}

      {errorMessage && (
        <p className="error-message">{errorMessage}</p>
      )}

      <div className="centered-group">
        <div className="inline-group department-input">
          <input
            type="text"
            placeholder="Enter department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
          <button className="add-info-btn" onClick={saveDepartment}>
            Add Department
          </button>
        </div>
      </div>

      <div className="modules-interface">
        <h3>Add Modules</h3>
        <p className="small-note">Department: <strong>{department || 'Not set'}</strong></p>
        {modules.map((mod, idx) => (
          <div key={idx} className="module-field">
            <input
              type="text"
              placeholder={`Module ${idx + 1}`}
              value={mod}
              onChange={(e) => handleModuleChange(idx, e.target.value)}
            />
            {modules.length > 1 && (
              <button onClick={() => removeModuleField(idx)}>−</button>
            )}
          </div>
        ))}
        <button className="add-module-btn" onClick={addModuleField}>+ Add Module</button>
      </div>

      <div className="modal-actions">
        <button className="save-btn" onClick={handleSaveAll}>Save All</button>
      </div>
    </div>
  );
};

export default AddRolesPage;