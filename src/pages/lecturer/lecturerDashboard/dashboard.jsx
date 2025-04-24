import React from 'react';
import Sidebar from '../../../components/sidebar';
import './dashboard.css';

const DashboardPage = () => {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        
        <div className="main-header">
          <div className="details">
            <p>Username</p>
          </div>
          <p className="welcome">Welcome, Lecture</p>
        </div>

        <div className="main-body">
          <div className="vertical-items">
          <div className="item weekly-report">
           <h2>Weekly Report</h2>
           <p>Submit your activity report</p>
           <button>New Report</button>
           </div>

            <div className="item">
              <h2>Submission <br /> Status</h2>
              <p>All reports <br/>are up to date</p>
            </div>
            <div className="item">
              <h1>Upcoming <br /> in:</h1>
              
            </div>
          </div>

          
          <div className="table-section">
  <h2 className="table-heading">Recent Submissions Status</h2>
  <table>
    <thead>
      <tr>
        
        <th>Submission Date:</th>
        <th>Review Status:</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        
        <td>2025-04-20</td>
        <td>Reviewed</td>
      </tr>
      <tr>
        
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

export default DashboardPage;
