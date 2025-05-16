import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import './addDepartment.css';

const AddDepartment = ({ interface: interfaceData = null }) => {
  const [department, setDepartment] = useState('');
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    if (interfaceData) {
      setDepartments(interfaceData);
    } else {
      fetchDepartments();
    }
  }, [interfaceData]);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:5041/api/Getters/GetAllDepartments');

      if (response?.data?.status) {
        console.log(response.data); // Optional: remove in production
        setDepartments(response.data.departments); // Updated key from Swagger
      } else {
        console.log(response?.data?.message);
        toast.error('Failed to load departments.');
        setDepartments([]);
      }
    } catch (error) {
      toast.error('Error fetching departments.');
      setDepartments([]);
    }
  };

  const saveDepartment = async () => {
    const trimmed = department.trim();
    if (!trimmed) {
      toast.error('Please enter a valid department name.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5041/api/Academy/AddDepartment', {
        name: trimmed,
      });

      if (response.status === 200 || response.data?.message) {
        toast.success('Department added successfully.');
        setDepartment('');
        if (!interfaceData) fetchDepartments();
      } else {
        toast.error(response.data.message || 'Failed to save department.');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Error occurred while saving department.';
      toast.error(message);
    }
  };

  const deleteDepartment = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5041/api/Academy/DeleteDepartment/${id}`);
      if (response.status === 200) {
        toast.success('Department deleted.');
        if (!interfaceData) fetchDepartments();
      } else {
        toast.error('Failed to delete department.');
      }
    } catch (error) {
      toast.error('Error deleting department.');
    }
  };

  return (
    <div className="add-interface-page">
      <Toaster />
      <h2>Departments</h2>

      <div className="inline-group">
        <input
          type="text"
          placeholder="Enter department name"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <button className="add-info-btn" onClick={saveDepartment}>Save Department</button>
      </div>

      <div className="roles-list">
        <h3>Existing Departments</h3>
        {departments.length > 0 ? (
          <ul className="department-list">
            {departments.map((dept) => (
              <li key={dept.departmentID} className="department-item">
                <span>{dept.departmentName}</span>
                {!interfaceData && (
                  <button className="delete-btn" onClick={() => deleteDepartment(dept.departmentID)}>Delete</button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No departments found.</p>
        )}
      </div>
    </div>
  );
};

export default AddDepartment;