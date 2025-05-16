// src/components/DepartmentHeadDashboard.js
import React from "react";
import "./DepartmentHeadDashboard.css";
import { useNavigate } from "react-router-dom";
import DepartmentHeadDashboardSideBar from "../../../components/DepartmentHeadDashboardSideBar";

const noSubmissions = [
  { name: "Nkosi SM", group: "A", module: "CSM115D", lastSubmitted: "04-04-2025" },
  { name: "Nevhutaru B", group: "M", module: "PPAF05D", lastSubmitted: "29-03-2025" }
];

const DepartmentHeadDashboard = () => {
  const navigate = useNavigate();

  const goToReports = (filter) => {
    navigate(`/dashboard/department-head/reports?filter=${filter}`);
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        <DepartmentHeadDashboardSideBar />

        <main className="main-content">
          <header className="header">
            <h1>Welcome To Department Head Dashboard</h1>
            <div className="user-profile">
              <span role="img" aria-label="bell">🔔</span>
              <div className="avatar"></div>
              <span>Username</span>
            </div>
          </header>

          <section className="summary-section">
            <div className="quick-actions card">
              <h3>Quick Actions:</h3>
              <button className="action-btn" onClick={() => goToReports("done")}>📘 View Reports</button>
              <button className="action-btn" onClick={() => goToReports("pending")}>⏳ Pending Approval</button>
            </div>

            <div className="overview card">
              <h3>System Overview:</h3>
              <p>Total Lecturers: <span className="blue">36</span></p>
              <p>Reports Submitted: <span className="blue">25 (This week)</span></p>
              <p>Reports Pending Approval: <span className="orange">3</span></p>
              <p>Missed Reports: <span className="red">2</span></p>
            </div>
          </section>

          <section className="no-submissions">
            <h2>Lecturers with <span className="red">No</span> Submissions this week:</h2>
            <table>
              <thead>
                <tr>
                  <th>Surname & Initials</th>
                  <th>Group</th>
                  <th>Module Code</th>
                  <th>Last Submitted</th>
                </tr>
              </thead>
              <tbody>
                {noSubmissions.map((lecturer, index) => (
                  <tr key={index}>
                    <td>{lecturer.name}</td>
                    <td><strong>{lecturer.group}</strong></td>
                    <td>{lecturer.module}</td>
                    <td>{lecturer.lastSubmitted}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </div>
  );
};

export default DepartmentHeadDashboard;