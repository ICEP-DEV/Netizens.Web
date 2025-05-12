import React, { useState } from 'react';
import './assignDepartment.css';

function AssignDepartment() {
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');
  const [modules, setModules] = useState(['']);

  const handleAddModule = () => {
    setModules([...modules, '']);
  };

  const handleModuleChange = (index, value) => {
    const updatedModules = [...modules];
    updatedModules[index] = value;
    setModules(updatedModules);
  };

  const handleSave = () => {
    console.log('Role:', role);
    console.log('Department:', department);
    console.log('Modules:', modules);
    alert('Data saved (see console)');
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Manage Academic Structure</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Enter role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <button className="btn blue">Add Role</button>
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="Enter department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
          <button className="btn green">Add Department</button>
        </div>

        <div className="module-section">
          <h3>Add Modules</h3>
          <p>Department: <span className="not-set">{department || 'Not set'}</span></p>
          {modules.map((module, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Module ${index + 1}`}
              value={module}
              onChange={(e) => handleModuleChange(index, e.target.value)}
            />
          ))}
          <button className="btn blue small" onClick={handleAddModule}>+ Add Module</button>
        </div>

        <div className="save-button">
          <button className="btn green" onClick={handleSave}>Save All</button>
        </div>
      </div>
    </div>
  );
}

export default AssignDepartment;
