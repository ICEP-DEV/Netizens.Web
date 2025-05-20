import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./addUserPage.css";
import { toast, Toaster } from "react-hot-toast";
import AdminSideBar from "../../../components/admin/adminSideBar/adminSideBar";
import Ribbon from "../../../components/admin/ribbon/ribbon";
import {
  UserPlus,
  Users,
  LayoutDashboard,
  ActivitySquare,
  ChartColumn,
  Search,
  FilePen,
  FileChartColumn,
  FileText,
  ChevronRight,
  BarChart2,
  ShieldUser,
} from "lucide-react";

const AddUserPage = ({ interface: interfaceData = null }) => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const incomingError = location.state?.error || "";

  const [error, setError] = useState(incomingError);
  const [staffNumber, setStaffNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [contactDetails, setContactDetails] = useState("");
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [roleOptions, setRoleOptions] = useState([]);

  useEffect(() => {
    if (!interfaceData) {
      fetchRoles();
    } else {
      setRoleOptions(interfaceData);
    }
  }, [interfaceData]);

  const fetchRoles = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5041/api/Getters/GetAllRoles"
      );
      if (response?.data?.status && Array.isArray(response.data.roles)) {
        setRoleOptions(response.data.roles);
      } else {
        toast.error("Failed to load roles.");
        setRoleOptions([]);
      }
    } catch (error) {
      toast.error("Error fetching roles.");
      setRoleOptions([]);
    }
  };

  const isPhoneValid = (phone) => /^\d{10}$/.test(phone);

  const validateInputs = () => {
    if (
      !staffNumber ||
      !firstName ||
      !surname ||
      !contactDetails ||
      !email ||
      !selectedRole
    ) {
      setError("Please fill all required fields.");
      return false;
    }

    if (!isPhoneValid(contactDetails)) {
      setError("Phone number must be exactly 10 digits.");
      return false;
    }

    return true;
  };

  const resetForm = () => {
    setStaffNumber("");
    setFirstName("");
    setSurname("");
    setContactDetails("");
    setEmail("");
    setSelectedRole("");
    setError("");
  };

  const addUser = async () => {
    if (!validateInputs()) return;
    setLoading(true);

    const payload = {
      staffNo: parseInt(staffNumber),
      userName: firstName.trim(),
      userSurname: surname.trim(),
      contacts: contactDetails.trim(),
      email: email.trim(),
      roleId: parseInt(selectedRole),
    };

    try {
      const results = await axios.post(
        "http://localhost:5041/api/Auth/AddUserAccount",
        payload
      );

      if (results?.data?.status) {
        toast.success(results?.data?.message);
        resetForm();
      } else {
        toast.error(results?.data?.message);
      }
    } catch (err) {
      toast.error(err.results?.data?.message || "An error occurred.");
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-users-page-container">
      <Toaster />
      <Ribbon />
      <div className="add-users-container">
        <AdminSideBar />
        <div className="add-users-page">
          <div className="add-users-header-container">
            <div className="add-users-header">
              <h2 className="admin-header-text">Add New Users</h2>
            </div>
          </div>
          <div className="admin-dashboard-stats-container">
            <div className="admin-stats-card">
              <div className="card-content-1">
                <div className="card-icon-container-lecturers">
                  <FilePen className="file-pen-icon" />
                </div>
                <div className="card-users-info-container">
                  <p className="stat-name">Total Lectures</p>
                  <p className="stat-value">7</p>
                </div>
              </div>
              <div className="card-content-2">
                <div className="span-container">
                  <span>Active </span>
                  <span>7</span>
                </div>
                <div className="span-container">
                  <span>In Active </span>
                  <span>0</span>
                </div>
              </div>
            </div>
            <div className="admin-stats-card">
              <div className="card-content-1">
                <div className="card-icon-container-reviewers">
                  <FileChartColumn className="file-chart-column-icon" />
                </div>
                <div className="card-users-info-container">
                  <p className="stat-name">Total Reviewers</p>
                  <p className="stat-value">3</p>
                </div>
              </div>
              <div className="card-content-2">
                <div className="span-container">
                  <span>Active </span>
                  <span>2</span>
                </div>
                <div className="span-container">
                  <span>In Active </span>
                  <span>1</span>
                </div>
              </div>
            </div>
            <div className="admin-stats-card">
              <div className="card-content-1">
                <div className="card-icon-container-admin">
                  <ChartColumn className="chart-column-icon" />
                </div>
                <div className="card-users-info-container">
                  <p className="stat-name">Total Admins </p>
                  <p className="stat-value">3</p>
                </div>
              </div>
              <div className="card-content-2">
                <div className="span-container">
                  <span>Active </span>
                  <span>1</span>
                </div>
                <div className="span-container">
                  <span>In Active </span>
                  <span>2</span>
                </div>
              </div>
            </div>
          </div>
          <div className="add-users-main-content-container">
              <div className="add-users-content-container">
                <form onSubmit={(e) => { e.preventDefault(); addUser(); }}>
                  <div className="add-user-form-input-container">
                    <div className="add-user-input-container">
                      <div className="label-field-container">
                        <label htmlFor="staffNumber">Staff Number </label>
                        <input
                          id="staffNumber"
                          type="text"
                          value={staffNumber}
                          onChange={(e) => setStaffNumber(e.target.value)}
                        />
                      </div>
                      <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                      >
                        <option value="">Select Role</option>
                        {roleOptions.map((role) => (
                          <option
                            key={role.roleId || role.RoleId}
                            value={role.roleId || role.RoleId}
                          >
                            {role.roleName || role.RoleName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="add-user-input-container">
                      <div className="label-field-container">
                        <label htmlFor="firstName">First Name</label>
                        <input
                          id="firstName"
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div className="label-field-container">
                        <label htmlFor="surname">Last Name</label>
                        <input
                          id="surname"
                          type="text"
                          value={surname}
                          onChange={(e) => setSurname(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="add-user-input-container">
                      <div className="label-field-container">
                        <label htmlFor="email">Email</label>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="label-field-container">
                        <label htmlFor="contacts">Contacts</label>
                        <input
                          id="contacts"
                          type="text"
                          value={contactDetails}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d{0,10}$/.test(value)) setContactDetails(value);
                          }}
                        />
                      </div>
                    </div>
                    
                    <div className="add-user-button-container">
                      {error && <p className="form-error-message">{error}</p>}
                      <button type="submit" disabled={loading} className="dashboard-add-user-button">
                        {loading ? "Adding..." : (
                          <>
                            <UserPlus className="dashboard-button-icon" />
                            <span>Add User</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  
                </form>
              </div>
              <div className="other-actions-container">
                  <div className="add-multiple-users-container">
                    <div className="quick-actions-header">Add Multiple Users</div>
                    <div className="add-multiple-users-item">
                        <input type="file" />
                    </div>
                  </div>
                  <div className="quick-actions-container">
                    <div className="quick-actions-header">Quick Actions</div>
                        <div className="quick-action-item">
                          <div className="quick-action-left">
                            <ShieldUser className="quick-action-icon" />
                            <span>Add New Role</span>
                          </div>
                          <ChevronRight className="quick-action-chevron" />
                        </div>

                        <div className="quick-action-item">
                          <div className="quick-action-left">
                            <Users className="quick-action-icon" />
                            <span>Manage Users</span>
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
              </div>
              
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default AddUserPage;
