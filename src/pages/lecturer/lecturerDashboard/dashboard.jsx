import React from 'react';
import Sidebar from '../../../components/sidebar';
import './dashboard.css';

const LecturerDashboardPage = () => {
  return (
    <div className="dashboard">
     

     <Sidebar />
        
      <div className="main-content">
        
        <div className="main-header">
          <div className="details">
            <p>Username</p>
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
              <h2>Submission <br /> Status</h2>
              <p>All reports <br/>are up to date</p>
            </div>
            <div className="item">
              <h1>Upcoming <br /> in:</h1>
              
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
        <td>Reviewed</td>
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
