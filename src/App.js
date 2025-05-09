import React from "react";
import { Routes, Route } from "react-router-dom";

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
import AssignGroup from "./pages/admin/assingGroupPages/assignGroup";
import AdminDetails from "./pages/admin/adminDetails/adminDetails";

// User Management Pages
import AddUserPage from "./pages/admin/addUser/addUserPage";
import ManageUserPage from "./pages/admin/manageUser/manageUserPage";

// Lecturer Report Pages
import ReportHistory from "./pages/lecturer/myReport/reportHistory";
import WeeklyReport from "./pages/lecturer/lecturerWeeklyReport/weeklyReprt";

// Department & Module Pages
import AddDepartment from "./pages/admin/addDepartment/addDepartment";
import AddModule from "./pages/admin/addModules/addModules";

const App = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/verify/login-otp" element={<VerifyLoginOTPPage />} />
      <Route path="/set-password" element={<SetPasswordPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/verify/password-reset-otp" element={<VerifyPasswordResetOTPPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* Dashboard Routes */}
      <Route path="/dashboard/lecturer" element={<LecturerDashboardPage />} />
      <Route path="/dashboard/admin" element={<AdminDashboard />} />
      <Route path="/dashboard/hod" element={<HodDashboardPage />} />
      <Route path="/dashboard/department-head" element={<DepartmentHeadDashboard />} />

      {/* Admin Functionality */}
      <Route path="/add-user" element={<AddUserPage />} />
      <Route path="/manage-users" element={<ManageUserPage />} />
      <Route path="/edit-profile" element={<EditProfilePage />} />
      <Route path="/add-role" element={<AddRolesPage />} />
      <Route path="/assign-group" element={<AssignGroup />} />
      <Route path="/admin-details" element={<AdminDetails />} />

      {/* Department & Module Management */}
      <Route path="/add-department" element={<AddDepartment />} />
      <Route path="/add-module" element={<AddModule />} />

      {/* Lecturer Reports */}
      <Route path="/report-history" element={<ReportHistory />} />
      <Route path="/weekly-report" element={<WeeklyReport />} />
    </Routes>
  );
};

export default App;