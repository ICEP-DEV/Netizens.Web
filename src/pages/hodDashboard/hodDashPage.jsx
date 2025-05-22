import React from "react";
import "./hodDashPage.css";
import HodDashboardSidebar from "../../components/hodDashboardSidebar/hodDashboardSidebar";
import Ribbon from "../../components/admin/ribbon/ribbon";
import { format } from "date-fns";
import {
  Users,
  LayoutDashboard,
  ActivitySquare,
  ChartColumn,
  FileText,
  UserPlus,
  CheckCircle,
  ChevronRight,
  BarChart2,
} from "lucide-react";

const HodDashPage = () => {
  return (
    <div className="hod-page-dashboard-container">
      <Ribbon />
      <div className="hod-dashboard-layout">
        <HodDashboardSidebar />
        <div className="hod-dashboard">
          <div className="hod-dashboard-header-container">
            <div className="hod-dashboard-header">
              <h2 className="hod-header-text">Welcome To The Reviewer Dashboard</h2>
              <p className="hod-date">
                {format(new Date(), "EEEE, MMMM do, yyyy")} | Department Overview
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="hod-dashboard-stats-container">
            {/* Department Users */}
            <div className="hod-stats-card">
              <div className="card-content-1">
                <div className="card-icon-container users">
                  <Users />
                </div>
                <div className="card-info">
                  <p className="stat-name">Department Users</p>
                  <p className="stat-value">12</p>
                </div>
              </div>
              <div className="card-content-2">
                <div className="span-container">
                  <span>Active</span>
                  <span>75%</span>
                </div>
              </div>
            </div>

            {/* User Roles */}
            <div className="hod-stats-card">
              <div className="card-content-1">
                <div className="card-icon-container roles">
                  <LayoutDashboard />
                </div>
                <div className="card-info">
                  <p className="stat-name">User Roles</p>
                  <p className="stat-value">3</p>
                </div>
              </div>
              <div className="card-content-2">
                <div className="span-container">
                  <span>Lecturers</span>
                  <span>6</span>
                </div>
                <div className="span-container">
                  <span>Assistants</span>
                  <span>3</span>
                </div>
              </div>
            </div>

            {/* Reports */}
            <div className="hod-stats-card">
              <div className="card-content-1">
                <div className="card-icon-container reports">
                  <ActivitySquare />
                </div>
                <div className="card-info">
                  <p className="stat-name">Reports</p>
                  <p className="stat-value">5</p>
                </div>
              </div>
              <div className="card-content-2">
                <div className="span-container">
                  <span>Pending</span>
                  <span>3</span>
                </div>
                <div className="span-container">
                  <span>Reviewed</span>
                  <span>2</span>
                </div>
              </div>
            </div>

            {/* System Health */}
            <div className="hod-stats-card">
              <div className="card-content-1">
                <div className="card-icon-container system">
                  <ChartColumn />
                </div>
                <div className="card-info">
                  <p className="stat-name">System Health</p>
                  <p className="stat-value">Stable</p>
                </div>
              </div>
              <div className="card-content-2">
                <div className="span-container">
                  <span>Up time</span>
                  <span>24h</span>
                </div>
              </div>
            </div>

            {/* View Reports */}
            <div className="hod-stats-card">
              <div className="card-content-1">
                <div className="card-icon-container view-reports">
                  <FileText />
                </div>
                <div className="card-info">
                  <p className="stat-name">View Reports</p>
                  <p className="stat-value">8</p>
                </div>
              </div>
              <div className="card-content-2">
                <div className="span-container">
                  <span>Reviewed</span>
                  <span>5</span>
                </div>
                <div className="span-container">
                  <span>Unread</span>
                  <span>3</span>
                </div>
              </div>
            </div>

            {/* Pending Reports */}
            <div className="hod-stats-card">
              <div className="card-content-1">
                <div className="card-icon-container pending-reports">
                  <ActivitySquare />
                </div>
                <div className="card-info">
                  <p className="stat-name">Pending Reports</p>
                  <p className="stat-value">4</p>
                </div>
              </div>
              <div className="card-content-2">
                <div className="span-container">
                  <span>Needs Review</span>
                  <span>4</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Content Section */}
          <div className="recent-content-container">
            <p className="recent-title">Recent Content</p>
            <div className="recent-placeholder">recent content</div>
          </div>

          {/* Side Panels */}
          <div className="right-side-widgets">
            {/* System Activity */}
            <div className="system-activity">
              <h3>System Activity</h3>
              <ul>
                <li><UserPlus className="activity-icon green" /> New user was created <span className="time">5 minutes ago</span></li>
                <li><FileText className="activity-icon blue" /> New report was submitted <span className="time">1 hour ago</span></li>
                <li><CheckCircle className="activity-icon gold" /> Report review was completed <span className="time">3 hours ago</span></li>
              </ul>
              <a href="#" className="view-all">View all activity</a>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <ul>
                <li><ChevronRight /> View Reports</li>
                <li><ChevronRight /> Pending Reports</li>
                <li><ChevronRight /> Done Reports</li>
                <li><ChevronRight /> Deadlines</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HodDashPage;
