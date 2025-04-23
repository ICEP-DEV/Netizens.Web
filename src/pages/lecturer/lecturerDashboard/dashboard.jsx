import React from 'react';
import Sidebar from '../../../component/sidebar';
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
              <h2>Submission Status</h2>
              <p>All reports are up to date</p>
            </div>
            <div className="item">
              <h1>Upcoming in:</h1>
              
            </div>
          </div>

          <div className="table-section">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
