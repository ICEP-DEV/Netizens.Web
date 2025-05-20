import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './viewReport.css';
import { toast, Toaster } from 'react-hot-toast';
import jsPDF from 'jspdf';
import Papa from 'papaparse';

const ViewReport = () => {
  const [reports, setReports] = useState([]);
  const [viewedReport, setViewedReport] = useState(null);
  const [feedbackInputs, setFeedbackInputs] = useState({});
  const [feedbackVisible, setFeedbackVisible] = useState({});

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:5041/api/Reports/GetLatestReport');
        setReports(response.data);
      } catch {
        toast.error('Failed to fetch reports');
      }
    };
    fetchReports();
  }, []);

  const handleViewReport = async (reportId) => {
    try {
      const response = await axios.post('http://localhost:5041/api/Reports/ViewReport', {
        reportId
      });

      if (response?.data) {
        setViewedReport(response.data);
      } else {
        toast.error('Report not found');
      }
    } catch {
      toast.error('Error loading report details');
    }
  };

  const handleFeedbackSubmit = async (reportId) => {
    const feedback = feedbackInputs[reportId];
    if (!feedback || feedback.trim() === '') {
      toast.error('Feedback cannot be empty');
      return;
    }

    try {
      await axios.post('http://localhost:5041/api/Reports/ReviewReport', {
        reportId,
        feedback
      });

      toast.success('Feedback submitted successfully');
      setFeedbackVisible((prev) => ({ ...prev, [reportId]: false }));
      setFeedbackInputs((prev) => ({ ...prev, [reportId]: '' }));
    } catch {
      toast.error('Failed to submit feedback');
    }
  };

  const exportSingleToCSV = (report) => {
    const csv = Papa.unparse([report]);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const fileName = `report_${report.reportID}.csv`;
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportSingleToPDF = (report) => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text('Report Details', 10, 10);
    doc.text(`Name: ${report.userModuleName}`, 10, 30);
    doc.text(`Group(s): ${report.groupNames}`, 10, 40);
    doc.text(`Submitted: ${new Date(report.submissionDate).toLocaleDateString()}`, 10, 50);
    doc.text(`Reviewed: ${report.reportStatus ? 'Yes' : 'No'}`, 10, 60);
    doc.save(`report_${report.reportID}.pdf`);
  };

  return (
    <div className="viewreport-container">
      <Toaster />

      <div className="viewreport-nav-buttons">
        <a className="viewreport-nav-back" href="/dashboard/hod-department">Back</a>
        <a className="viewreport-nav-forward" href="/reports/next">Forward</a>
      </div>

      <h1>View Reports</h1>

      <table className="viewreport-table">
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Groups</th>
            <th>Submitted Date</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {reports.length > 0 ? (
            reports.map((report, index) => (
              <tr key={report.reportID}>
                <td>{index + 1}</td>
                <td>{report.userModuleName || 'N/A'}</td>
                <td>{report.groupNames || 'N/A'}</td>
                <td>{new Date(report.submissionDate).toLocaleDateString()}</td>
                <td>
                  <button
                    className="viewreport-btn"
                    onClick={() => handleViewReport(report.reportID)}
                  >
                    View
                  </button>
                  <button
                    className="viewreport-btn feedback-btn"
                    onClick={() =>
                      setFeedbackVisible((prev) => ({
                        ...prev,
                        [report.reportID]: !prev[report.reportID]
                      }))
                    }
                  >
                    Give Feedback
                  </button>
                  <button
                    className="viewreport-btn export-csv-btn"
                    onClick={() => exportSingleToCSV(report)}
                  >
                    CSV
                  </button>
                  <button
                    className="viewreport-btn export-pdf-btn"
                    onClick={() => exportSingleToPDF(report)}
                  >
                    PDF
                  </button>

                  {feedbackVisible[report.reportID] && (
                    <div className="feedback-input-section">
                      <textarea
                        placeholder="Type feedback..."
                        value={feedbackInputs[report.reportID] || ''}
                        onChange={(e) =>
                          setFeedbackInputs((prev) => ({
                            ...prev,
                            [report.reportID]: e.target.value
                          }))
                        }
                      />
                      <button
                        className="submit-feedback-btn"
                        onClick={() => handleFeedbackSubmit(report.reportID)}
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No reports available.</td>
            </tr>
          )}
        </tbody>
      </table>

      {viewedReport && (
        <div className="viewreport-details-popup">
          <div className="viewreport-details">
            <h2>Report Details</h2>
            <p><strong>Name: </strong> {viewedReport.userModuleName}</p>
            <p><strong>Groups: </strong> {viewedReport.groupNames}</p>
            <p><strong>Submitted Date: </strong> {new Date(viewedReport.submissionDate).toLocaleDateString()}</p>
            <p><strong>Status: </strong> {viewedReport.reportStatus ? 'Reviewed' : 'Pending'}</p>
            <p><strong>Feedback: </strong> {viewedReport.feedback || 'N/A'}</p>
            <button onClick={() => setViewedReport(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewReport;