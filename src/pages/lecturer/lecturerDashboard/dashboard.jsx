import React from "react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import Sidebar from "../../../components/sidebar";
import "./dashboard.css";

const LecturerDashboardPage = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    axios
      .post(
        "http://localhost:5041/api/Auth/GetUserDetails",
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setName(response.data.name);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });

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
    <div className="lecture-dashboard">
      <Sidebar />

      <div className="lecture-dashboard-main-contents">
        <div className="lecture-dashboard-main-header">
          <div className="lecture-dashboard-details">
            <FontAwesomeIcon icon={faCircleUser} className="lecture-dashboard-userIcon" />
            <p> {name}</p>
          </div>
          <p className="lecture-dashboard-welcome">Welcome, Lecturer</p>
        </div>

        <div className="lecture-dashboard-main-body">
          <div className="lecture-dashboard-vertical-items">
            <div className="lecture-dashboard-item weekly-report">
              <h2>Weekly Report</h2>
              <p>Submit your activity report</p>
              <button>New Report</button>
            </div>

            <div className="lecture-dashboard-item">
              <h2>
                Submission <br /> Status
              </h2>
              <p>
                All reports <br />
                are up to date
              </p>
            </div>
            <div className="lecture-dashboard-item">
              <h1>
                Upcoming <br /> in:
              </h1>
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                className="lecture-dashboard-triangle-excl-icon"
              />
              <p>4 days</p>
            </div>
          </div>

          <div className="lecture-dashboard-table-section">
            <h2 className="lecture-dashboard-table-heading">Recent Submissions:</h2>
            <table className="lecture-dashboard-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Module</th>
                  <th>Submission Date:</th>
                  <th>Review Status:</th>
                </tr>
              </thead>
              <tbody className="lecture-dashboard-tbody">
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
