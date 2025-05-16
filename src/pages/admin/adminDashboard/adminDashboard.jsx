import React, { useState, useEffect } from 'react';
import './adminDashboard.css';
import AdminSideBar from '../../../components/adminSideBar/adminSideBar';
import Ribbon from '../../../components/ribbon/ribbon';
import { format } from 'date-fns';
import { UserPlus, Users, LayoutDashboard, ActivitySquare, ChartColumn } from 'lucide-react';


const AdminDashboard = () => {
  

  return (
    <div className="admin-page-dashboard-container">
      <Ribbon />
      <div className='admin-dashboard-container'>
        <AdminSideBar />
        <div className="admin-dashboard">
            <div className='admin-dashboard-header-container'>
              <div className='admin-dashboard-header'>
                <h2 className='admin-header-text'>Admin Dashboard</h2>
                <p className='admin-date'> {format(new Date(), "EEEE, MMMM do, yyyy")} | System Overview</p>
              </div>
              <div className='header-button'>
                <button className='dashboard-add-user-button'>
                  <UserPlus className='dashboard-button-icon' />
                  <span>Add New User</span>
                </button>
              </div>
            </div>
            <div className='admin-dashboard-stats-container'>
              <div className='admin-stats-card'>
                <div className='card-content-1'>
                  <div className='card-icon-container-users'><Users className='users-icon' /></div>
                  <div className='card-users-info-container'>
                    <p className='stat-name'>Total users</p>
                    <p className='stat-value'>7</p>
                  </div>
                </div>
                <div className='card-content-2'>
                  <div className='span-container'>
                    <span>Active </span>
                    <span>65%</span>
                  </div>
                  <div className='span-container'>
                    <span>bar </span>
                    <span></span>
                  </div>
                </div>
              </div>
              <div className='admin-stats-card'>
                <div className='card-content-1'>
                  <div className='card-icon-container-roles'><LayoutDashboard className='layout-dashboard-icon' /></div>
                  <div className='card-users-info-container'>
                    <p className='stat-name'>User Roles</p>
                    <p className='stat-value'>3</p>
                  </div>
                </div>
                <div className='card-content-2'>
                  <div className='span-container'>
                    <span>Lecturers </span>
                    <span>2</span>
                  </div>
                  <div className='span-container'>
                    <span>Reviewers </span>
                    <span>1</span>
                  </div>
                </div>
              </div>
              <div className='admin-stats-card'>
                <div className='card-content-1'>
                  <div className='card-icon-container-reports'><ActivitySquare className='activity-square-icon'/></div>
                  <div className='card-users-info-container'>
                    <p className='stat-name'>Total Reports </p>
                    <p className='stat-value'>3</p>
                  </div>
                </div>
                <div className='card-content-2'>
                  <div className='span-container'>
                    <span>Viewed </span>
                    <span>1</span>
                  </div>
                  <div className='span-container'>
                    <span>Pending Review </span>
                    <span>2</span>
                  </div>
                </div>
              </div>
              <div className='admin-stats-card'>
                <div className='card-content-1'>
                  <div className='card-icon-container-system'><ChartColumn className='cart-column-icon' /></div>
                  <div className='card-users-info-container'>
                    <p className='stat-name'>System Health </p>
                    <p className='stat-value'>Bad</p>
                  </div>
                </div>
                <div className='card-content-2'>
                  <div className='span-container'>
                    <span>Up time </span>
                    <span>15h32</span>
                  </div>
                  <div className='span-container'>
                    <span>bar</span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
            <div className='admin-dashboard-content-container'>
              <div className='recent-content-container'> recent content</div>
              <div className='activity-actions-container'>
                <div className='system-activity-container'> system activity</div>
                <div className='quick-actions-container'> quick actions</div>
              </div>
            </div>
        </div>
      </div>
    </div>

      
  );
};

export default AdminDashboard;
