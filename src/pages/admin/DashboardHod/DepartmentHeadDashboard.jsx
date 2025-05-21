import React from "react";
import "./DepartmentHeadDashboard.css";
import DepartmentHeadDashboardSideBar from "../../../components/DepartmentHeadDashboardSideBar";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";

const noSubmissions = [
  { name: "Nkosi SM", group: "A", module: "CSM115D", lastSubmitted: "04-04-2025" },
  { name: "Nevhutaru B", group: "M", module: "PPAF05D", lastSubmitted: "29-03-2025" }
];

const DepartmentHeadDashboard = () => {
  const navigate = useNavigate();

  const goToReports = (filter) => {
    navigate(`/dashboard/department-head/reports?filter=${filter}`);
  };

  const goToViewReportsPage = () => {
    navigate("/view-reports");
  };

  const goToNotifications = () => {
    navigate("/notifications");
  };

  return (
    <div className="dh-dashboard-page-container">
      <div className="dh-dashboard-container">
        <DepartmentHeadDashboardSideBar />

        <div className="dh-dashboard">
          {/* Header */}
          <div className="dh-dashboard-header-container">
            <div className="dh-dashboard-header">
              <h1 className="dh-header-text">Welcome To Reviewer Dashboard</h1>
              <p className="dh-date">{new Date().toLocaleDateString()}</p>
            </div>

            {/* Notification Bell */}
            <div className="notification-container">
              <button
                className="notification-bell"
                onClick={goToNotifications}
                title="View Notifications"
              >
                <FaBell />
              </button>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="dh-dashboard-stats-container">
            <div className="dh-stats-card">
              <div className="card-content-1">
                <div className="card-icon-container-users">👨‍🏫</div>
                <div className="card-users-info-container">
                  <p>Total Lecturers</p>
                  <h3>36</h3>
                </div>
              </div>
            </div>

            <div className="dh-stats-card">
              <div className="card-content-1">
                <div className="card-icon-container-reports">✅</div>
                <div className="card-users-info-container">
                  <p>Reports Submitted</p>
                  <h3>25 (This week)</h3>
                </div>
              </div>
            </div>

            <div className="dh-stats-card">
              <div className="card-content-1">
                <div className="card-icon-container-pending">⏳</div>
                <div className="card-users-info-container">
                  <p>Pending Approvals</p>
                  <h3>3</h3>
                </div>
              </div>
            </div>

            <div className="dh-stats-card">
              <div className="card-content-1">
                <div className="card-icon-container-missed">⚠️</div>
                <div className="card-users-info-container">
                  <p>Missed Reports</p>
                  <h3>2</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="dh-dashboard-header-container">
            <h2 className="dh-header-text">Quick Actions:</h2>
            <div className="header-button">
              <button
                className="dashboard-view-reports-button"
                onClick={() => goToReports("done")}
              >
                📘 View Reports
              </button>
              <button
                className="dashboard-view-reports-button"
                onClick={() => goToReports("pending")}
              >
                ⏳ Pending Approval
              </button>
              <button
                className="dashboard-view-reports-button"
                onClick={goToViewReportsPage}
              >
                📄 View Full Report
              </button>
            </div>
          </div>

          {/* Lecturers with No Submissions Table */}
          <section className="no-submissions">
            <h2>
              Lecturers with <span className="red">No</span> Submissions this week:
            </h2>
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
        </div>
      </div>
    </div>
  );
};

export default DepartmentHeadDashboard;