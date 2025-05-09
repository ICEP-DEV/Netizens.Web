import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./adminDetails.css";

const AdminDetails = () => {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    staffNumber: "",
    name: "",
    email: "",
    contact: "",
    department: "",
    role: "Admin",
  });

  useEffect(() => {
    // Load saved admin details if available
    const savedAdmin = JSON.parse(localStorage.getItem("adminDetails"));
    if (savedAdmin) {
      setAdmin(savedAdmin);
    }

    // Load email from login (if not already set)
    const loginEmail = localStorage.getItem("loggedInEmail");
    if (loginEmail && !savedAdmin?.email) {
      setAdmin(prev => ({ ...prev, email: loginEmail }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("adminDetails", JSON.stringify(admin));
    alert("✅ Admin details saved successfully.");
    navigate("/admin-dashboard");
  };

  return (
    <div className="admin-details-page">
      <h2>Admin Profile</h2>
      <div className="admin-input-form">
        <input
          type="text"
          name="staffNumber"
          placeholder="Staff Number"
          value={admin.staffNumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={admin.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={admin.contact}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d{0,10}$/.test(value)) handleChange(e);
          }}
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={admin.department}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={admin.email}
          readOnly
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={admin.role}
          readOnly
        />
        <button onClick={handleSubmit}>Save</button>
      </div>
    </div>
  );
};

export default AdminDetails;