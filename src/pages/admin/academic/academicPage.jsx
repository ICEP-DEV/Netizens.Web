import React, { useState, useEffect } from "react";
import "./academicPage.css";
import AdminSideBar from "../../../components/admin/adminSideBar/adminSideBar";
import Ribbon from "../../../components/admin/ribbon/ribbon";
import { format } from "date-fns";
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
  Trash2
} from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const AcademicPage = ({ interface: interfaceData = null }) => {
  const [activeSection, setActiveSection] = useState("Departments");
  const sections = [
    "Departments",
    "Modules",
    "Groups",
    "Roles",
    "Communication Channels",
  ];
  const [departments, setDepartments] = useState([]);
  const [groups, setGroups] = useState([]);
  const [roles, setRoles] = useState([]);
  const [channels, setChannels] = useState([]);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    if (interfaceData) {
      setDepartments(interfaceData);
      setGroups(interfaceData);
      setRoles(interfaceData);
      setChannels(interfaceData);
      setModules(interfaceData);
    } else {
      fetchAcademics();
      fetchModules();
    }
  }, [interfaceData]);

  const fetchAcademics = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5041/api/Academy/GetAllAcademicProperties"
      );

      if (response?.data?.status) {
        setDepartments(response.data.departments);
        setGroups(response.data.groups);
        setRoles(response.data.roles);
        setChannels(response.data.communicationChannels);
      } else {
        toast.error(response?.data?.message);
        setDepartments([]);
        setGroups([]);
        setRoles([]);
        setChannels([]);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      setDepartments([]);
      setGroups([]);
      setRoles([]);
      setChannels([]);
    }
  };

  const fetchModules = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5041/api/Getters/GetAllModules"
      );

      if (response?.data?.status) {
        setModules(response.data.modules);
      } else {
        toast.error(response?.data?.message);
        setModules([]);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      setModules([]);
    }
  };

  return (
    <div className="academic-page-container">
      <Toaster />
      <Ribbon />
      <div className="academic-container">
        <AdminSideBar />
        <div className="academic-page">
          <div className="academic-header-container">
            <div className="academic-header">
              <h2 className="admin-header-text">Academic</h2>
              <p className="admin-date">
                {" "}
                {format(new Date(), "EEEE, MMMM do, yyyy")} | System Overview
              </p>
            </div>
          </div>
          <div className="academic-stats-container">
            <div className="admin-stats-card">
              <div className="card-content-1">
                <div className="card-icon-container-departments">
                  <Landmark className="land-mark-icon" />
                </div>
                <div className="card-users-info-container">
                  <p className="stat-name">Total Departments</p>
                  <p className="stat-value">7</p>
                </div>
              </div>
              <div className="card-content-2">
                <div className="span-container">
                  <span></span>
                  <span></span>
                </div>
                <div className="span-container">
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
            <div className="admin-stats-card">
              <div className="card-content-1">
                <div className="card-icon-container-modules">
                  <BookOpenText className="book-open-text-icon" />
                </div>
                <div className="card-users-info-container">
                  <p className="stat-name">Total Modules</p>
                  <p className="stat-value">3</p>
                </div>
              </div>
              <div className="card-content-2">
                <div className="span-container">
                  <span>Lecturers </span>
                  <span>2</span>
                </div>
                <div className="span-container">
                  <span>Assigned </span>
                  <span>1</span>
                </div>
              </div>
            </div>
            <div className="admin-stats-card">
              <div className="card-content-1">
                <div className="card-icon-container-groups">
                  <Users className="users-icon" />
                </div>
                <div className="card-users-info-container">
                  <p className="stat-name">Total Groups </p>
                  <p className="stat-value">3</p>
                </div>
              </div>
              <div className="card-content-2">
                <div className="span-container">
                  <span>Lecturers </span>
                  <span>2</span>
                </div>
                <div className="span-container">
                  <span>Assigned </span>
                  <span>1</span>
                </div>
              </div>
            </div>
            <div className="admin-stats-card">
              <div className="card-content-1">
                <div className="card-icon-container-roles">
                  <ShieldUser className="shield-user-icon" />
                </div>
                <div className="card-users-info-container">
                  <p className="stat-name">Total Roles </p>
                  <p className="stat-value">3</p>
                </div>
              </div>
              <div className="card-content-2">
                <div className="span-container">
                  <span>Lecturers</span>
                  <span>1</span>
                </div>
                <div className="span-container">
                  <span>Reviewers</span>
                  <span>2</span>
                </div>
              </div>
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
                  <h3>{activeSection}</h3>
                  <table className="academic-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeSection === "Departments" &&
                        departments.map((dept, index) => (
                          <tr key={index}>
                            <td>{dept.departmentName}</td>
                            <td className="user-account-action-buttons">
                              <Pencil className="user-account-edit-icon" size={18} />
                              <Trash2 className="user-account-delete-icon" size={18} />
                            </td>
                          </tr>
                        ))}

                      {activeSection === "Modules" &&
                        modules.map((mod, index) => (
                          <tr key={index}>
                            <td>{mod.moduleName}</td>
                            <td className="user-account-action-buttons">
                              <Pencil className="user-account-edit-icon" size={18} />
                              <Trash2 className="user-account-delete-icon" size={18} />
                            </td>
                          </tr>
                        ))}

                      {activeSection === "Groups" &&
                        groups.map((group, index) => (
                          <tr key={index}>
                            <td>Group {group.groupName}</td>
                            <td className="user-account-action-buttons">
                              <Pencil className="user-account-edit-icon" size={18} />
                              <Trash2 className="user-account-delete-icon" size={18} />
                            </td>
                          </tr>
                        ))}

                      {activeSection === "Roles" &&
                        roles.map((role, index) => (
                          <tr key={index}>
                            <td>{role.roleName}</td>
                            <td className="user-account-action-buttons">
                              <Pencil className="user-account-edit-icon" size={18} />
                              <Trash2 className="user-account-delete-icon" size={18} />
                            </td>
                          </tr>
                        ))}

                      {activeSection === "Communication Channels" &&
                        channels.map((channel, index) => (
                          <tr key={index}>
                            <td>{channel.channelName}</td>
                            <td className="user-account-action-buttons">
                              <Pencil className="user-account-edit-icon" size={18} />
                              <Trash2 className="user-account-delete-icon" size={18} />
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AcademicPage;
