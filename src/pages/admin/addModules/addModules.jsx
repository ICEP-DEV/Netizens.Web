import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import './addModules.css';

const AddModule = ({ interface: interfaceData = null }) => {
  const [modules, setModules] = useState([{ name: '', code: '' }]);
  const [departmentId, setDepartmentId] = useState('');
  const [departments, setDepartments] = useState([]);
  const [existingModules, setExistingModules] = useState([]);

  useEffect(() => {
    if (!interfaceData) {
      fetchDepartments();
      fetchModules();
    } else {
      setExistingModules(interfaceData);
    }
  }, [interfaceData]);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:5041/api/Getters/GetAllDepartments');
      if (response?.data?.status) {
        setDepartments(response.data.departments);
      } else {
        toast.error('Failed to load departments.');
      }
    } catch (error) {
      toast.error('Error fetching departments.');
    }
  };

  const fetchModules = async () => {
    try {
      const response = await axios.get('http://localhost:5041/api/Getters/GetAllModules');
      if (response?.data?.status && Array.isArray(response.data.modules)) {
        setExistingModules(response.data.modules);
      } else {
        toast.error('Failed to load modules.');
      }
    } catch (error) {
      toast.error('Error fetching modules.');
    }
  };

  const handleModuleChange = (index, field, value) => {
    const updated = [...modules];
    updated[index][field] = value;
    setModules(updated);
  };

  const addModuleField = () => {
    setModules([...modules, { name: '', code: '' }]);
  };

  const removeModuleField = (index) => {
    setModules(modules.filter((_, i) => i !== index));
  };

  const saveModules = async () => {
    if (!departmentId.trim()) {
      toast.error('Please select a department.');
      return;
    }

    const validModules = modules.filter(
      (mod) => mod.name.trim() && mod.code.trim()
    );

    if (validModules.length === 0) {
      toast.error('Please enter at least one valid module.');
      return;
    }

    try {
      for (const mod of validModules) {
        const moduleData = {
          name: mod.name,
          code: mod.code,
          departmentId: parseInt(departmentId),
        };

        await axios.post('http://localhost:5041/api/Academy/AddModule', moduleData);
      }

      toast.success('Modules added successfully.');
      setModules([{ name: '', code: '' }]);
      if (!interfaceData) fetchModules();
    } catch (error) {
      const message = error.response?.data?.message || 'Error saving modules.';
      toast.error(message);
    }
  };

  return (
    <div className="add-interface-page">
      <Toaster />
      <h2>Add Module</h2>

      <div className="inline-group">
        <select value={departmentId} onChange={(e) => setDepartmentId(e.target.value)}>
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept.departmentID} value={dept.departmentID}>
              {dept.departmentName}
            </option>
          ))}
        </select>
      </div>

      {modules.map((mod, idx) => (
        <div className="inline-group" key={idx}>
          <input
            type="text"
            placeholder={`Module Name ${idx + 1}`}
            value={mod.name}
            onChange={(e) => handleModuleChange(idx, 'name', e.target.value)}
          />
          <input
            type="text"
            placeholder="Module Code"
            value={mod.code}
            onChange={(e) => handleModuleChange(idx, 'code', e.target.value)}
          />
          {modules.length > 1 && !interfaceData && (
            <button type="button" onClick={() => removeModuleField(idx)} className="delete-btn">−</button>
          )}
        </div>
      ))}

      {!interfaceData && (
        <div className="inline-group">
          <button type="button" onClick={addModuleField}>+ Add Another Module</button>
          <button type="button" onClick={saveModules}>Save Modules</button>
        </div>
      )}

      <div className="existing-modules">
        <h3>Existing Modules</h3>
        {existingModules.length > 0 ? (
          <ul className="module-list">
            {existingModules.map((mod) => (
              <li key={mod.moduleID}>
                {mod.moduleName}{' '}
                <span className="code-tag">({mod.moduleCode})</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No modules found.</p>
        )}
      </div>
    </div>
  );
};

export default AddModule;