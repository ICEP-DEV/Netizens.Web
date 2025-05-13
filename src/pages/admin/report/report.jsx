import React, { useState, useEffect } from 'react';
import './reports.css';
import { useLocation } from 'react-router-dom';

const staticReports = [
  { id: 1, subject: 'PPAF05D', date: '28-Mar-2025', status: 'done' },
  { id: 2, subject: 'CSM115D', date: '28-Mar-2025', status: 'done' },
  { id: 3, subject: 'PPAF05D', date: '20-Mar-2025', status: 'pending' },
  { id: 4, subject: 'CSM115D', date: '20-Mar-2025', status: 'upcoming' },
  { id: 5, subject: 'CSM115D', date: '14-Mar-2025', status: 'done' },
  { id: 6, subject: 'PPAF05D', date: '14-Mar-2025', status: 'pending' },
  { id: 7, subject: 'CSM115D', date: '06-Mar-2025', status: 'done' },
  { id: 8, subject: 'PPAF05D', date: '06-Mar-2025', status: 'upcoming' }
];

// Sample hardcoded localStorage data
const sampleLocalReports = [
  { id: 101, subject: 'ICT201D', date: '01-Apr-2025', status: 'done', name: 'Mashaba T' },
  { id: 102, subject: 'ICT201D', date: '25-Mar-2025', status: 'pending', name: 'Baloyi R' },
  { id: 103, subject: 'ICT201D', date: '30-Mar-2025', status: 'upcoming', name: 'Khosa N' }
];

const Reports = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const defaultFilter = query.get("filter") || "done";
  const [filter, setFilter] = useState(defaultFilter);

  const [localReports, setLocalReports] = useState([]);

  useEffect(() => {
    // Set initial hardcoded data to local storage once (only if not set)
    const existing = localStorage.getItem('localReports');
    if (!existing) {
      localStorage.setItem('localReports', JSON.stringify(sampleLocalReports));
    }

    // Read and parse localStorage reports
    const stored = JSON.parse(localStorage.getItem('localReports')) || [];
    setLocalReports(stored);
  }, []);

  // Merge static and localStorage reports
  const allReports = [
    ...staticReports.map(r => ({ ...r, name: 'Nevhutaru B' })),
    ...localReports
  ];

  const filteredReports = allReports.filter(report => report.status === filter);

  return (
    <div className="report-container">
      <h1>Reports</h1>

      <div className="view-section">
        <label htmlFor="report-type">View:</label>
        <select id="report-type" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="done">Done Reports</option>
          <option value="pending">Pending Reports</option>
          <option value="upcoming">Upcoming Reports</option>
        </select>
      </div>

      <table className="report-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Surname & Initials</th>
            <th>Subject Code</th>
            <th>Submitted Date</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.map((report, index) => (
            <tr key={report.id}>
              <td>{index + 1}</td>
              <td>{report.name}</td>
              <td>{report.subject}</td>
              <td>{report.date}</td>
              <td><button className="view-btn">View</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="back-btn">
        <a href="/dashboard/department-head">← Back to Dashboard</a>
      </div>
    </div>
  );
};

export default Reports;