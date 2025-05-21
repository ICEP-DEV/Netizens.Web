import React, { useState, useEffect } from 'react';
import './manageUserPage.css';
import AdminSideBar from '../../../components/admin/adminSideBar/adminSideBar';
import Ribbon from '../../../components/admin/ribbon/ribbon';
import { format } from 'date-fns';
import { UserPlus, Users, ChevronRight, FileText, BarChart2, Search ,Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from "react-hot-toast";


const ManageUserPage = () => {
  const users = [
  {
    initials: 'JD',
    name: 'John Doe',
    email: 'lecturer@example.com',
    role: 'Lecturer',
    position: 'Associate Professor',
    department: 'Computer Science',
    status: 'active',
    created: '1/15/2025',
    avatarColor: 'red',
  },
  {
    initials: 'JS',
    name: 'Jane Smith',
    email: 'reviewer@example.com',
    role: 'Reviewer',
    position: 'Senior Academic Coordinator',
    department: 'Academic Affairs',
    status: 'active',
    created: '1/10/2025',
    avatarColor: 'blue',
  },
  {
    initials: 'AJ',
    name: 'Alex Johnson',
    email: 'admin@example.com',
    role: 'Admin',
    position: 'System Administrator',
    department: '-',
    status: 'active',
    created: '1/5/2025',
    avatarColor: 'yellow',
  },
  {
    initials: 'SW',
    name: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    role: 'Lecturer',
    position: 'Assistant Professor',
    department: 'Mathematics',
    status: 'inactive',
    created: '2/20/2025',
    avatarColor: 'purple',
  },
 
];

 const navigate = useNavigate();
   const handleAddUser = () => {
     navigate("/add-user");
   } 

  return (
    <div className="manage-users-page-container">
      <Toaster />
      <Ribbon />
      <div className='manage-users-container'>
        <AdminSideBar />
        <div className='manage-users-page'>
            <div className='manage-users-header-container'>
                <div className='manage-users-header'>
                  <h2 className='admin-header-text'>Manage Users</h2>
                  <p className='admin-date'> {format(new Date(), "EEEE, MMMM do, yyyy")}</p>
                </div>
                <div className='header-button'>
                  <button className='dashboard-add-user-button' onClick={handleAddUser}>
                    <UserPlus className='dashboard-button-icon' />
                    <span>Add New User</span>
                  </button>
                </div>
            </div>
            <div className='manage-users-content'>
              <div className='manage-users-list-container'>
                <div className='users-list-search-container'>
                  <div className="admin-search-box">
                    <div className="admin-search-icon">
                      <Search className="icon" />
                    </div>
                      <input type="search" placeholder="Search users..." />
                    </div>

                    <select className="admin-dropdown">
                      <option>All Roles</option>
                      <option value="">Admins</option>
                      <option value="">Lecturers</option>
                      <option value="">Reviewers</option>
                    </select>

                    <select className="admin-dropdown">
                      <option>All Status</option>
                      <option value="">Active</option>
                      <option value="">In Active</option>
                    </select>

                    <button className="admin-filter-button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 4h18M6 8h12M10 12h4M12 16h0" />
                      </svg>
                      Filter
                    </button>
                </div>
                <div className='users-list-container'>
                  <div className="users-list-table-container">
                    <table className="user-account-table">
                      <thead>
                        <tr>
                          <th>NAME</th>
                          <th>ROLE</th>
                          <th>DEPARTMENT</th>
                          <th>STATUS</th>
                          <th>CREATED</th>
                          <th>ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user, i) => (
                          <tr key={i}>
                            <td>
                              <div className="user-account-name-info">
                                {/* <div className={`user-account-avatar ${user.avatarColor}`}>{user.initials}</div> */}
                                <div>
                                  <div className="user-account-name">{user.name}</div>
                                  <div className="user-account-email">{user.email}</div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="user-account-role">{user.role}</div>
                            </td>
                            <td>{user.department}</td>
                            <td>
                              <span className={`user-account-status-badge ${user.status === 'active' ? 'active' : 'inactive'}`}>
                                {user.status}
                              </span>
                            </td>
                            <td>{user.created}</td>
                            <td className="user-account-action-buttons">
                              <Pencil className="user-account-edit-icon" size={18} />
                              <Trash2 className="user-account-delete-icon" size={18} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className='manage-users-extra-container'>
                <div className="manage-users-quick-actions-container">
                    <div className="quick-actions-header">Quick Actions</div>

                    <div className="quick-action-item">
                      <div className="quick-action-left">
                        <Users className="quick-action-icon" />
                        <span>View Lecturer</span>
                      </div>
                      <ChevronRight className="quick-action-chevron" />
                    </div>

                    <div className="quick-action-item">
                      <div className="quick-action-left">
                        <Users className="quick-action-icon" />
                        <span>View Reviewers</span>
                      </div>
                      <ChevronRight className="quick-action-chevron" />
                    </div>

                    <div className="quick-action-item">
                      <div className="quick-action-left">
                        <BarChart2 className="quick-action-icon" />
                        <span>Users Activities</span>
                      </div>
                      <ChevronRight className="quick-action-chevron" />
                    </div>
                </div>
                <div className='manage-users-stats-container'>Stats</div>
                
              </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ManageUserPage;