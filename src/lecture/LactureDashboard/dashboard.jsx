import React from 'react';
import Sidebar from './component/sidebar';
import './dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        {/* The details section is now above the "Welcome" paragraph */}
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

            <div className="item">Submission</div>
            <div className="item">Item 3</div>
          </div>

          <div className="table-section">
            {/* table goes here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
