import React, { useState, useEffect } from 'react';
import './assignDepartment.css';

const departmentOptions = [
  'Computer Science',
  'Information Technology',
  'Software Engineering',
  'Multimedia',
  'Informatics',
];

const AssignDepartment = () => {
  const [lecturers, setLecturers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedLecturer, setSelectedLecturer] = useState(null);
  const [selectedDepts, setSelectedDepts] = useState([]);

  
  useEffect(() => {
    fetch('http://localhost:5000/api/lecturers')  
      .then(res => res.json())
      .then(data => setLecturers(data))
      .catch(err => console.error("Failed to fetch lecturers:", err));
  }, []);

  const openModal = (lecturer) => {
    setSelectedLecturer(lecturer);
    setSelectedDepts(lecturer.departments || []);
    setShowModal(true);
  };

  const handleDeptToggle = (dept) => {
    setSelectedDepts(prev =>
      prev.includes(dept)
        ? prev.filter(d => d !== dept)
        : [...prev, dept]
    );
  };

  const assignDepartments = () => {
    if (!selectedLecturer) return;

    const updatedLecturer = {
      ...selectedLecturer,
      departments: selectedDepts
    };

    
    setLecturers(prev =>
      prev.map(lect =>
        lect.id === selectedLecturer.id ? updatedLecturer : lect
      )
    );

    
    fetch(`http://localhost:5000/api/lecturers/${selectedLecturer.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedLecturer),
    })
      .then(res => res.json())
      .then(() => {
        closeModal();
      })
      .catch(err => {
        console.error('Failed to update lecturer:', err);
        alert('Error assigning department.');
      });
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedLecturer(null);
    setSelectedDepts([]);
  };

  return (
    <div className="lecturer-list-container">
      <h2 className="main-heading">Reviewers Accounts with <span style={{ color: 'gold' }}>Pending</span> Departments</h2>
      <table className="lecturer-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Staff#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {lecturers.map((lecturer, index) => (
            <tr key={lecturer.id}>
              <td>{index + 1}.</td>
              <td>{lecturer.staffNo}</td>
              <td>{lecturer.name}</td>
              <td>{lecturer.email}</td>
              <td style={{ color: lecturer.departments.length === 0 ? 'red' : 'green' }}>
                {lecturer.departments.length > 0 ? lecturer.departments.join(', ') : 'Not Selected'}
              </td>
              <td>
                <button onClick={() => openModal(lecturer)}>Department</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3 className="modal-heading">Assign Departments</h3>
            <div className="checkbox-group">
              {departmentOptions.map((dept) => (
                <label key={dept}>
                  <input
                    type="checkbox"
                    checked={selectedDepts.includes(dept)}
                    onChange={() => handleDeptToggle(dept)}
                  />
                  {dept}
                </label>
              ))}
            </div>
            <div className="modal-actions">
              <button onClick={assignDepartments}>Assign</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
       <button className="back-btn">← Back to Dashboard</button>
    </div>
  );
};

export default AssignDepartment;
