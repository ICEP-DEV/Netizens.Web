import React, { useState, useEffect } from "react";
import "./addAcademicProperties.css";
import AdminSideBar from "../../../components/admin/adminSideBar/adminSideBar";
import Ribbon from "../../../components/admin/ribbon/ribbon";
import {
  UserPlus,
  Users,
  ShieldUser,
  LayoutDashboard,
  ActivitySquare,
  ChartColumn,
  Search,
  Landmark,
  BookOpenText,
  Pencil,
  Trash2,
} from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";

const AddAcademicPropertiesPage = ({ interface: interfaceData = null }) => {
  const tab = useLocation();

  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(tab.state.tab || "Departments");
  const sections = [
    "Departments",
    "Modules",
    "Groups",
    "Roles",
    "Communication Channels",
  ];





  

  const renderStats = () => {
    switch (activeSection) {
      case "Departments":
        return (
          <div className="academic-stats-container">
            <div className="admin-stats-card">
              <div className="card-content-1">
                <div className="card-icon-container-departments">
                  <Landmark className="land-mark-icon" />
                </div>
                <div className="card-users-info-container">
                  <p className="stat-name">Total Departments</p>
                  <p className="stat-value"></p>
                </div>
              </div>
              <div className="card-content-2">
                <div className="span-container">
                  <span>Active</span>
                  <span></span>
                </div>
              </div>
            </div>
            <div className="admin-stats-card">
              <div className="card-content-1">
                <div className="card-icon-container-departments">
                  <Landmark className="land-mark-icon" />
                </div>
                <div className="card-users-info-container">
                  <p className="stat-name">Users</p>
                  <p className="stat-value"></p>
                </div>
              </div>
              <div className="card-content-2">
                <div className="span-container">
                  <span>Active</span>
                  <span></span>
                </div>
              </div>
            </div>
            <div className="admin-stats-card">
              <div className="card-content-1">
                <div className="card-icon-container-departments">
                  <Landmark className="land-mark-icon" />
                </div>
                <div className="card-users-info-container">
                  <p className="stat-name">Modules</p>
                  <p className="stat-value"></p>
                </div>
              </div>
              <div className="card-content-2">
                <div className="span-container">
                  <span>Active</span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        );
      case "Modules":
        return (
          <div className="academic-stats-container">
            <div className="admin-stats-card">
              <div className="card-content-1">
                <div className="card-icon-container-modules">
                  <BookOpenText className="book-open-text-icon" />
                </div>
                <div className="card-users-info-container">
                  <p className="stat-name">Total Modules</p>
                  <p className="stat-value"></p>
                </div>
              </div>
            </div>
            <div className="admin-stats-card">
              <div className="card-content-1">
                <div className="card-icon-container-departments">
                  <Landmark className="land-mark-icon" />
                </div>
                <div className="card-users-info-container">
                  <p className="stat-name">Users</p>
                  <p className="stat-value"></p>
                </div>
              </div>
              <div className="card-content-2">
                <div className="span-container">
                  <span>Active</span>
                  <span></span>
                </div>
              </div>
            </div>
            <div className="admin-stats-card">
              <div className="card-content-1">
                <div className="card-icon-container-departments">
                  <Landmark className="land-mark-icon" />
                </div>
                <div className="card-users-info-container">
                  <p className="stat-name">Users</p>
                  <p className="stat-value"></p>
                </div>
              </div>
              <div className="card-content-2">
                <div className="span-container">
                  <span>Active</span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        );
      case "Groups":
        return (
          <div className="academic-stats-container">
            <div className="admin-stats-card">
              <div className="card-content-1">
                <div className="card-icon-container-groups">
                  <Users className="users-icon" />
                </div>
                <div className="card-users-info-container">
                  <p className="stat-name">Total Groups</p>
                  <p className="stat-value"></p>
                </div>
              </div>
            </div>
            <div className="admin-stats-card">
              <div className="card-content-1">
                <div className="card-icon-container-departments">
                  <Landmark className="land-mark-icon" />
                </div>
                <div className="card-users-info-container">
                  <p className="stat-name">Users</p>
                  <p className="stat-value"></p>
                </div>
              </div>
              <div className="card-content-2">
                <div className="span-container">
                  <span>Active</span>
                  <span></span>
                </div>
              </div>
            </div>
            <div className="admin-stats-card">
              <div className="card-content-1">
                <div className="card-icon-container-departments">
                  <Landmark className="land-mark-icon" />
                </div>
                <div className="card-users-info-container">
                  <p className="stat-name">Users</p>
                  <p className="stat-value"></p>
                </div>
              </div>
              <div className="card-content-2">
                <div className="span-container">
                  <span>Active</span>
                  <span></span>
                </div>
              </div>
            </div>
            <div className="admin-stats-card">
              <div className="card-content-1">
                <div className="card-icon-container-departments">
                  <Landmark className="land-mark-icon" />
                </div>
                <div className="card-users-info-container">
                  <p className="stat-name">Users</p>
                  <p className="stat-value"></p>
                </div>
              </div>
              <div className="card-content-2">
                <div className="span-container">
                  <span>Active</span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        );
      case "Roles":
        return (
          <div className="academic-stats-container">
            <div className="admin-stats-card">
              <div className="card-content-1">
                <div className="card-icon-container-roles">
                  <ShieldUser className="shield-user-icon" />
                </div>
                <div className="card-users-info-container">
                  <p className="stat-name">Total Roles</p>
                  <p className="stat-value"></p>
                </div>
              </div>
            </div>
            <div className="admin-stats-card">
              <div className="card-content-1">
                <div className="card-icon-container-departments">
                  <Landmark className="land-mark-icon" />
                </div>
                <div className="card-users-info-container">
                  <p className="stat-name">Users</p>
                  <p className="stat-value"></p>
                </div>
              </div>
              <div className="card-content-2">
                <div className="span-container">
                  <span>Active</span>
                  <span></span>
                </div>
              </div>
            </div>
            <div className="admin-stats-card">
              <div className="card-content-1">
                <div className="card-icon-container-departments">
                  <Landmark className="land-mark-icon" />
                </div>
                <div className="card-users-info-container">
                  <p className="stat-name">Users</p>
                  <p className="stat-value"></p>
                </div>
              </div>
              <div className="card-content-2">
                <div className="span-container">
                  <span>Active</span>
                  <span></span>
                </div>
              </div>
            </div>
            <div className="admin-stats-card">
              <div className="card-content-1">
                <div className="card-icon-container-departments">
                  <Landmark className="land-mark-icon" />
                </div>
                <div className="card-users-info-container">
                  <p className="stat-name">Users</p>
                  <p className="stat-value"></p>
                </div>
              </div>
              <div className="card-content-2">
                <div className="span-container">
                  <span>Active</span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        );
      case "Communication Channels":
        return (
          <div className="academic-stats-container">
            <div className="admin-stats-card">
              <div className="card-content-1">
                <div className="card-icon-container-channels">
                  <ActivitySquare className="activity-icon" />
                </div>
                <div className="card-users-info-container">
                  <p className="stat-name">Total Channels</p>
                  <p className="stat-value"></p>
                </div>
              </div>
            </div>
            <div className="admin-stats-card">
              <div className="card-content-1">
                <div className="card-icon-container-departments">
                  <Landmark className="land-mark-icon" />
                </div>
                <div className="card-users-info-container">
                  <p className="stat-name">Users</p>
                  <p className="stat-value"></p>
                </div>
              </div>
              <div className="card-content-2">
                <div className="span-container">
                  <span>Active</span>
                  <span></span>
                </div>
              </div>
            </div>
            <div className="admin-stats-card">
              <div className="card-content-1">
                <div className="card-icon-container-departments">
                  <Landmark className="land-mark-icon" />
                </div>
                <div className="card-users-info-container">
                  <p className="stat-name">Users</p>
                  <p className="stat-value"></p>
                </div>
              </div>
              <div className="card-content-2">
                <div className="span-container">
                  <span>Active</span>
                  <span></span>
                </div>
              </div>
            </div>
            <div className="admin-stats-card">
              <div className="card-content-1">
                <div className="card-icon-container-departments">
                  <Landmark className="land-mark-icon" />
                </div>
                <div className="card-users-info-container">
                  <p className="stat-name">Users</p>
                  <p className="stat-value"></p>
                </div>
              </div>
              <div className="card-content-2">
                <div className="span-container">
                  <span>Active</span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div className="add-academy-page-container">
      <Ribbon />
      <div className="add-academy-container">
        <AdminSideBar />
        <div className="add-academy-page">
            <div className="academic-header-container">
          <div className="academic-header">
            <h2 className="admin-header-text">Add Academic Properties</h2>
            
          </div>
        </div>
        <div className="academic-content-container">
          <div className="header-tabs">
            {sections.map((section) => (
              <button
                key={section}
                className={`tab-button ${
                  activeSection === section ? "active" : ""
                }`}
                onClick={() => setActiveSection(section)}
              >
                {section}
              </button>
            ))}
          </div>

          <div className="table-area">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.4 }}
                className="table-content"
              >
                <div className="academic-stats-container"><AnimatePresence>{renderStats()}</AnimatePresence></div>
                <div className="academic-list-header">
                  <h3>Add {activeSection}</h3>
                </div>

                {activeSection === "Departments" && (
                  <div>
                    <form action="">
                      <div className="add-academic-input-container">
                        <div className="academic-label-field-container">
                        <label htmlFor="">Department Name:</label>
                      <input type="text" />
                      </div>
                      <div className="add-academic-button-container">
                        <button className="add-academic-button">Add Department</button>
                      </div>

                      </div>
                      

                    </form>

                  </div>
                 )  
                }

                {activeSection === "Modules" && (
                  <div>
                    <form action="">
                      <div className="add-academic-input-container">
                        <div className="academic-label-field-container">
                          <label htmlFor="">Department</label>
                      <select name="" id="">
                        <option value="">--select department--</option>

                      </select>

                        </div>
                        

                      </div>
                      
                      <div className="add-academic-input-container">
                        <div className="academic-label-field-container">
                          <label htmlFor="">Module Name:</label>
                        <input type="text" />
                        </div>
                        

                      </div>
                      <div className="add-academic-input-container">
                        <div className="academic-label-field-container">
                        <label htmlFor="">Module Code:</label>
                      <input type="text" />
                      </div>
                      </div>
                      <div className="add-academic-button-container">
                        <button className="add-academic-button">Add Module</button>
                      </div>


                    </form>

                  </div>
                 )  
                }
                {activeSection === "Groups" && (
                  <div>
                    <form action="">
                      <div className="add-academic-input-container">
                        <div className="academic-label-field-container">
                        <label htmlFor="">Group Name:</label>
                      <input type="text" />
                      </div>
                      <div className="add-academic-button-container">
                        <button className="add-academic-button">Add Group</button>
                      </div>

                      </div>

                    </form>

                  </div>
                 )  
                }

                {activeSection === "Roles" && (
                  <div>
                    <form action="">
                      <div className="add-academic-input-container">
                        <div className="academic-label-field-container">
                        <label htmlFor="">Role Name:</label>
                      <input type="text" />
                      </div>
                      <div className="add-academic-button-container">
                        <button className="add-academic-button">Add Role</button>
                      </div>

                      </div>

                    </form>

                  </div>
                 )  
                }

                {activeSection === "Communication Channels" && (
                  <div>
                    <form action="">
                      <div className="add-academic-input-container">
                        <div className="academic-label-field-container">
                        <label htmlFor="">Channel Name:</label>
                      <input type="text" />
                      </div>
                      <div className="add-academic-button-container">
                        <button className="add-academic-button">Add Channel</button>
                      </div>

                      </div>
                      

                    </form>

                  </div>
                 )  
                }
                
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        </div>
        
      </div>
    </div>
  );
};

export default AddAcademicPropertiesPage;
