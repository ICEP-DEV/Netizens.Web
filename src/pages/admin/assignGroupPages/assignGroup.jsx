import React, { useState, useEffect } from 'react';
import axios from "axios";
import { toast, Toaster } from 'react-hot-toast';
import './assignGroup.css';

const AssignGroup = () => {
  const [selectedModules, setSelectedModules] = useState([]);
  const [availableModules, setAvailableModules] = useState([
    'CAPF05D',
    'CSM115D',
    'CGAF05D',
    'CMSF05D',
    'PPAF05D/TROF05D',
    'CFAF05D',
    '16P105X',
    'CAPF05X',
  ]);
  const [userId, setUserId] = useState(1); 
  
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        console.log('Fetched lecturer and module data.');
        toast.success('Module assigned successfully!');
      } catch (error) {
        console.error('Error fetching initial data:', error);
        toast.error('Failed to assign module.');
      }
    };

    fetchInitialData();
  }, []);

  const toggleModule = (mod) => {
    setSelectedModules((prev) =>
      prev.includes(mod)
        ? prev.filter((m) => m !== mod)
        : [...prev, mod]
    );
  };

  const handleAssign = async (moduleId) => {
    try {
      const response = await axios.post('https://your-api-url/api/Assigning/AssignModuleToUser', {
        userId: userId, 
        moduleId: moduleId
      });
      console.log('Assignment successful:', response.data);
      toast.success('Module assigned successfully!');
    } catch (error) {
      console.error('Error assigning module:', error);
      toast.error('Failed to assign module.');
    }
  };

  return (
    <div className="form-container">
      <Toaster />
      <h2>Groups allocation form</h2>

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
                   
                    <option value="group1">Group 1</option>
                    <option value="group2">Group 2</option>
                    <option value="group3">Group 3</option>
                  </select>
                </td>
                <td>
                  <div className="assign-action">
                    <span role="img" aria-label="assign">📤</span><br />
                    <button onClick={() => handleAssign(mod)} className="assign-btn">Assign</button>
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
