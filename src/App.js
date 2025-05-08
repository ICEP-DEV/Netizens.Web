import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Auth Pages
import LoginPage from "./pages/auth/login/loginPage";
import ResetPasswordPage from "./pages/auth/resettingPages/resetPage";
import VerifyLoginOTPPage from "./pages/auth/verifyLoginOtp/verifyLoginOtp";
import VerifyPasswordResetOTPPage from "./pages/auth/verifyPasswordResetOtpPage/verifyPasswordResetOtp";
import SetPasswordPage from "./pages/auth/setPasswodPages/setPassword";
import ForgotPasswordPage from "./pages/auth/forgotPasswordPage/forgotPasswordPage";

// Dashboard Pages
import LecturerDashboardPage from "./pages/lecturer/lecturerDashboard/dashboard";
import HodDashboardPage from "./pages/departmentHead/hodDashboard/hodDashboard";
import DepartmentHeadDashboard from "./pages/admin/Logout/DepartmentHeadDashboard";

// Admin Pages
import AdminDashboard from "./pages/admin/adminDashboard/adminDashboard";
import EditProfilePage from "./pages/admin/profile/editProfilePage";
import AddRolesPage from "./pages/admin/addRoles/addRoles";

// Updated Add & Manage User Pages
import AddUserPage from "./pages/admin/addUser/addUserPage";
import ManageUserPage from "./pages/admin/manageUser/manageUserPage";


// Lecturer My Report
import ReportHistory from './pages/lecturer/myReport/reportHistory';

const App = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/verify/login-otp" element={<VerifyLoginOTPPage />} />
      <Route path="/set-password" element={<SetPasswordPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route
        path="/verify/password-reset-otp"
        element={<VerifyPasswordResetOTPPage />}
      />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* Dashboard Routes */}
      <Route path="/dashboard/lecturer" element={<LecturerDashboardPage />} />
      <Route path="/dashboard/admin" element={<AdminDashboard />} />
      <Route path="/dashboard/hod" element={<HodDashboardPage />} />
      <Route path="/dashboard/department-head" element={<DepartmentHeadDashboard />} />

      {/* Admin Extra Pages */}
      <Route path="/add-user" element={<AddUserPage />} />
      <Route path="/manage-users" element={<ManageUserPage />} />
      <Route path="/edit-profile" element={<EditProfilePage />} />
      <Route path="/add-role" element={<AddRolesPage />} />

      {/* Lecturer My Report */}
      <Route path="/report-history" element={<ReportHistory />} />
    </Routes>



  );
};

export default App;
