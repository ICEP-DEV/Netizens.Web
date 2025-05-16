import React, { useState } from 'react';
import './ReportsPage.css';

const ReportsPage = () => {
  const [filter, setFilter] = useState('Pending Reports');

  // Mock data
  const reportData = [
    {
      id: 1,
      surname: 'Nkosi SM',
      subjectCode: 'CSM115D',
      date: '04-04-2025',
      status: 'Pending Reports',
    },
    {
      id: 2,
      surname: 'Nevhutaru B',
      subjectCode: 'PPAF05D',
      date: '29-03-2025',
      status: 'Approved Reports',
    },
  ];

  const filteredReports = reportData.filter(report => report.status === filter);

  return (
    <div className="reports-page">
      <div className="reports-container">
        <h2>Reports</h2>
        <div className="view-filter">
          <label htmlFor="reportFilter">View:</label>
          <select
            id="reportFilter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>Pending Reports</option>
            <option>Approved Reports</option>
            <option>Rejected Reports</option>
          </select>
        </div>

        <table className="reports-table">
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
            {filteredReports.length > 0 ? (
              filteredReports.map((report, index) => (
                <tr key={report.id}>
                  <td>{index + 1}</td>
                  <td>{report.surname}</td>
                  <td>{report.subjectCode}</td>
                  <td>{report.date}</td>
                  <td>
                    <button className="action-button">View</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">No reports to display.</td>
              </tr>
            )}
          </tbody>
        </table>

        <button className="back-button" onClick={() => window.history.back()}>
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ReportsPage;
