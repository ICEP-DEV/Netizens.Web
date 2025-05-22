import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import './reports.css';
import { useLocation } from 'react-router-dom';

const Reports = ({ interface: interfaceData = null }) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const defaultFilter = query.get("filter") || "done";

  const [filter, setFilter] = useState(defaultFilter);
  const [reports, setReports] = useState([]);
  const [viewedReport, setViewedReport] = useState(null);

  useEffect(() => {
    if (!interfaceData) {
      fetchReports(filter);
    } else {
      setReports(interfaceData);
    }
  }, [filter, interfaceData]);

  const fetchReports = async (status) => {
    try {
      let response;

      if (status === 'pending') {
        response = await axios.post('http://localhost:5041/api/PendingReport/GetDetail', {
          reportId: 0
        });
        if (response.data && response.data.status) {
          setReports([response.data]);
        } else {
          toast.error(response.data?.message || 'No pending reports found.');
          setReports([]);
        }
      } else if (status === 'done') {
        response = await axios.get('http://localhost:5041/api/Reports/GetAll');
        if (response.data && Array.isArray(response.data)) {
          setReports(response.data);
        } else {
          toast.error('No reviewed reports found.');
          setReports([]);
        }
      }
    } catch (error) {
      toast.error('Error fetching reports.');
      setReports([]);
    }
  };

  const handleViewReport = async (reportId) => {
    try {
      const response = await axios.post('http://localhost:5041/api/Reports/ReviewReport', {
        reportId,
        feedback: ''
      });

      if (response?.data) {
        setViewedReport(response.data);
      } else {
        toast.error('Report details not found.');
      }
    } catch (error) {
      toast.error('Failed to load report details.');
    }
  };

  return (
    <div className="report-container">
      <Toaster />
      <h1>Reports</h1>

      <div className="view-section">
        <label htmlFor="report-type">View:</label>
        <select
          id="report-type"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="done">Done Reports</option>
          <option value="pending">Pending Reports</option>
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
          {reports.length > 0 ? (
            reports.map((report, index) => (
              <tr key={report.reportId || report.id}>
                <td>{index + 1}</td>
                <td>
                  {report.userModule?.user?.userSurname ||
                   report.reviewerSurname ||
                   report.name ||
                   'N/A'}
                </td>
                <td>
                  {report.userModule?.module?.moduleCode ||
                   report.module ||
                   report.subject ||
                   'N/A'}
                </td>
                <td>
                  {report.submissionDate
                    ? new Date(report.submissionDate).toLocaleDateString()
                    : report.date || 'N/A'}
                </td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() => handleViewReport(report.reportId || report.id)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No reports to display.</td>
            </tr>
          )}
        </tbody>
      </table>

      {viewedReport && (
        <div className="report-details-popup">
          <div className="report-details">
            <h2>Report Details</h2>
            <p><strong>Challenges:</strong> {viewedReport.challenges || 'N/A'}</p>
            <p><strong>Suggestions:</strong> {viewedReport.suggestions || 'N/A'}</p>
            <p><strong>Weekly Activity:</strong> {viewedReport.weeklyActivity || 'N/A'}</p>
            <p><strong>Start Date:</strong> {viewedReport.start_Date || viewedReport.startDate || 'N/A'}</p>
            <p><strong>End Date:</strong> {viewedReport.end_Date || viewedReport.endDate || 'N/A'}</p>
            <p><strong>Reviewed By:</strong> {viewedReport.reviewedBy || 'N/A'}</p>
            <p><strong>Status:</strong> {viewedReport.reportStatus ? 'Reviewed' : 'Not Reviewed'}</p>
            <p><strong>Feedback:</strong> {viewedReport.feedback || 'N/A'}</p>
            <button onClick={() => setViewedReport(null)}>Close</button>
          </div>
        </div>
      )}

      <div className="back-btn">
        <a href="/dashboard/hod-dash">← Back to Dashboard</a>
      </div>
    </div>
  );
};

export default Reports;