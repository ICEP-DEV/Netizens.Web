import React, { useState } from 'react';
import './assignGroup.css';

const AssignGroup = () => {
  const [selectedModules, setSelectedModules] = useState([]);
  const availableModules = [
    'CAPF05D',
    'CSM115D',
    'CGAF05D',
    'CMSF05D',
    'PPAF05D/TROF05D',
    'CFAF05D',
    '16P105X',
    'CAPF05X',
  ];

  const toggleModule = (mod) => {
    setSelectedModules((prev) =>
      prev.includes(mod)
        ? prev.filter((m) => m !== mod)
        : [...prev, mod]
    );
  };

  return (
    <div className="form-container">
      <h2>Groups allocation Form</h2>

      <div className="top-section">
        <div className="lecturer-details">
          <h3>Lecturer Details</h3>
          <ul>
            <li><a href="#">Name(s):</a></li>
            <li><a href="#">Surname:</a></li>
            <li><a href="#">Email Address:</a></li>
            <li><a href="#">Department:</a></li>
          </ul>
        </div>

        <div className="module-selector">
          <label>Select Module:</label>
          <div className="checkbox-list">
            {availableModules.map((mod, index) => (
              <label key={index} className="checkbox-item">
                <input
                  type="checkbox"
                  value={mod}
                  checked={selectedModules.includes(mod)}
                  onChange={() => toggleModule(mod)}
                />
                {mod}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="added-modules">
        <h3>Added Modules:</h3>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Module</th>
              <th>No Of Groups</th>
              <th>Groups</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {selectedModules.map((mod, index) => (
              <tr key={index}>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() =>
                      setSelectedModules(selectedModules.filter((m) => m !== mod))
                    }
                  >
                    ❌
                  </button>
                </td>
                <td><b>{mod}</b></td>
                <td>
                  <select defaultValue="1">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </td>
                <td>
                  <select>
                    <option>Select group(s)</option>
                  </select>
                </td>
                <td>
                  <div className="assign-action">
                    <span role="img" aria-label="assign">📤</span><br />
                    <a href="#">assign</a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="back-btn">← Back to Manage Lecture</button>
    </div>
  );
};

export default AssignGroup;
