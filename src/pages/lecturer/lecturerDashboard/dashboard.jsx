import React from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';


import Sidebar from "../../../components/sidebar";
import "./dashboard.css";

const LecturerDashboardPage = () => {
  useEffect(() => {
    const cells = document.querySelectorAll("td");

    cells.forEach((cell) => {
      const text = cell.textContent.trim().toLowerCase();

      if (text === "pending") {
        cell.style.color = "orange";
        cell.style.fontWeight = "bold";
      } else if (text === "approved") {
        cell.style.color = "blue";
        cell.style.fontWeight = "bold";
      }
    });
  }, []);
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <div className="main-header">
          
          <div className="details">
            
            <FontAwesomeIcon icon={faCircleUser}  className="userIcon"/>
            <p> Username</p>
            
          </div>
          <p className="welcome">Welcome, Lecturer</p>
        </div>

        <div className="main-body">
          <div className="vertical-items">
            <div className="item weekly-report">
              <h2>Weekly Report</h2>
              <p>Submit your activity report</p>
              <button>New Report</button>
            </div>

            <div className="item">
              <h2>
                Submission <br /> Status
              </h2>
              <p>
                All reports <br />
                are up to date
              </p>
            </div>
            <div className="item">
              <h1>
                Upcoming <br /> in:
                
              </h1>
              <FontAwesomeIcon icon={faTriangleExclamation}  className="triangle-excl-icon" />
              <p>4 days</p>

              </div>
          </div>

          <div className="table-section">
            <h2 className="table-heading">Recent Submissions:</h2>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Module</th>
                  <th>Submission Date:</th>
                  <th>Review Status:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>COEF05D</td>
                  <td>2025-04-20</td>
                  <td>Approved</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>PPAFO5D</td>
                  <td>2025-04-27</td>
                  <td>Pending</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>PPAFO5D</td>
                  <td>2025-04-27</td>
                  <td>Pending</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>PPAFO5D</td>
                  <td>2025-04-27</td>
                  <td>Pending</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>PPAFO5D</td>
                  <td>2025-04-27</td>
                  <td>Pending</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>PPAFO5D</td>
                  <td>2025-04-27</td>
                  <td>Pending</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>PPAFO5D</td>
                  <td>2025-04-27</td>
                  <td>Pending</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>PPAFO5D</td>
                  <td>2025-04-27</td>
                  <td>Pending</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturerDashboardPage;
