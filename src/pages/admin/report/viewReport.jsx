import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './viewReport.css';
import { toast, Toaster } from 'react-hot-toast';
import jsPDF from 'jspdf';
import Papa from 'papaparse';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

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

  const exportToCSV = () => {
    const csv = Papa.unparse(reports);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'reports.csv');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text('Report Summary', 10, 10);

    reports.forEach((report, index) => {
      const top = 20 + index * 50;
      doc.text(`Name: ${report.userModuleName}`, 10, top);
      doc.text(`Group(s): ${report.groupNames}`, 10, top + 10);
      doc.text(`Submitted: ${new Date(report.submissionDate).toLocaleDateString()}`, 10, top + 20);
      doc.text(`Reviewed: ${report.reportStatus ? 'Yes' : 'No'}`, 10, top + 30);
    });

    doc.save('reports.pdf');
  };

  const exportToWord = async () => {
    const paragraphs = reports.map(report =>
      new Paragraph({
        children: [
          new TextRun({ text: `Name: ${report.userModuleName}`, bold: true }),
          new TextRun(`\nGroup(s): ${report.groupNames}`),
          new TextRun(`\nSubmitted: ${new Date(report.submissionDate).toLocaleDateString()}`),
          new TextRun(`\nReviewed: ${report.reportStatus ? 'Yes' : 'No'}`),
          new TextRun('\n\n')
        ]
      })
    );

    const doc = new Document({
      sections: [{ children: [new Paragraph("Report Summary"), ...paragraphs] }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "reports.docx");
  };

  return (
    <div className="viewreport-container">
      <Toaster />
      <h1>View Reports</h1>

      <div className="export-buttons">
        <button onClick={exportToCSV}>Export CSV</button>
        <button onClick={exportToPDF}>Export PDF</button>
        <button onClick={exportToWord}>Export Word</button>
      </div>

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
            <p><strong>User:</strong> {viewedReport.userModuleName || 'N/A'}</p>
            <p><strong>Groups:</strong> {viewedReport.groupNames || 'N/A'}</p>
            <p><strong>Challenges:</strong> {viewedReport.challenges || 'N/A'}</p>
            <p><strong>Suggestions:</strong> {viewedReport.suggestions || 'N/A'}</p>
            <p><strong>Weekly Activity:</strong> {viewedReport.weeklyActivity || 'N/A'}</p>
            <p><strong>Start Date:</strong> {viewedReport.startDate || viewedReport.start_Date || 'N/A'}</p>
            <p><strong>End Date:</strong> {viewedReport.endDate || viewedReport.end_Date || 'N/A'}</p>
            <p><strong>Reviewed By:</strong> {viewedReport.reviewedBy || 'N/A'}</p>
            <p><strong>Status:</strong> {viewedReport.reportStatus ? 'Reviewed' : 'Not Reviewed'}</p>
            <p><strong>Feedback:</strong> {viewedReport.feedback || 'N/A'}</p>
            <button onClick={() => setViewedReport(null)}>Close</button>
          </div>
        </div>
      )}

      <div className="viewreport-back-btn">
        <a href="/dashboard/hod-department">← Back to Dashboard</a>
      </div>
    </div>
  );
};

export default ViewReport;