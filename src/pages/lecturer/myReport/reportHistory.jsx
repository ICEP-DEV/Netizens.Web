import React from 'react';
import './reportHistory.css'; // 
const ReportHistory = () => {
  const reports = [
    { id: 1, subject: 'PPAF05D', date: '28-Mar-2025' },
    { id: 2, subject: 'CSM115D', date: '28-Mar-2025' },
    { id: 3, subject: 'PPAF05D', date: '20-Mar-2025' },
    { id: 4, subject: 'CSM115D', date: '20-Mar-2025' },
    { id: 5, subject: 'CSM115D', date: '14-Mar-2025' },
    { id: 6, subject: 'PPAF05D', date: '14-Mar-2025' },
    { id: 7, subject: 'CSM115D', date: '06-Mar-2025' },
    { id: 8, subject: 'PPAF05D', date: '06-Mar-2025' }
  ];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="report-container">
      <h1>Report History</h1>

      <div className="view-section">
        <label htmlFor="view-by">View By:</label>
        <select id="view-by">
          {months.map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>

      <h2>March 2025</h2>

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
          {reports.map((report, index) => (
            <tr key={report.id}>
              <td>{index + 1}</td>
              <td>Nevhutaru B</td>
              <td>{report.subject}</td>
              <td>{report.date}</td>
              <td><button className="view-btn">View</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="back-btn">
        <a href="/dashboard">← Back to Dashboard</a>
      </div>
    </div>
  );
};

export default ReportHistory;
