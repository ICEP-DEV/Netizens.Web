import React from "react";
import { Routes, Route } from "react-router-dom";

// Auth Pages
import LoginPage from "./pages/auth/login/loginPage";
import ResetPasswordPage from "./pages/auth/resettingPages/resetPage";
import VerifyLoginOTPPage from "./pages/auth/verifyLoginOtp/verifyLoginOtp";
import VerifyPasswordResetOTPPage from "./pages/auth/verifyPasswordResetOtpPage/verifyPasswordResetOtp";
import SetPasswordPage from "./pages/auth/setPasswordPages/setPassword";
import ForgotPasswordPage from "./pages/auth/forgotPasswordPage/forgotPasswordPage";
import ReportsPage from "./pages/auth/reports/ReportsPage";

// Dashboard Pages
import LecturerDashboardPage from "./pages/lecturer/lecturerDashboard/dashboard";
import HodDashboardPage from "./pages/departmentHead/hodDashboard/hodDashboard";


// Admin Pages
import AdminDashboard from "./pages/admin/adminDashboard/adminDashboard";
import EditProfilePage from "./pages/admin/profile/editProfilePage";
import AddRolesPage from "./pages/admin/addRoles/addRoles";
import AssignGroup from "./pages/admin/assignGroupPages/assignGroup";
import AssignDepartment from "./pages/assignDepartment/assignDepartment";
import AdminDetails from "./pages/admin/adminDetails/adminDetails";
import AcademicPage from "./pages/admin/academic/academicPage";
import AdminSettingsPage from "./pages/admin/settings/adminSettings";



// Updated Add & Manage User Pages

// User Management Pages

import AddUserPage from "./pages/admin/addUser/addUserPage";
import ManageUserPage from "./pages/admin/manageUser/manageUserPage";

// Lecturer Report Pages
import ReportHistory from "./pages/lecturer/myReport/reportHistory";
import WeeklyReport from "./pages/lecturer/lecturerWeeklyReport/weeklyReport";

// Lecture Profile Pages
import ViewLecturerProfile from "./pages/lecturer/lecturerProfile/lecturerVIewProfile";

// Department & Module Pages
import AddDepartment from "./pages/admin/addDepartment/addDepartment";
import AddModule from "./pages/admin/addModules/addModules";

// Report Management Page 
import Reports from "./pages/admin/report/report";
import EditLecturerProfile from "./pages/lecturer/lecturerProfile/lecturerEditProfile";
import ViewReport from "./pages/admin/report/viewReport";

//Notifications
import Notifications from "./pages/notifications/notifications";
import NotificationsLecturer from "./pages/notifications/notificationsLecturer";


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
      <Route path="/dashboard/hod-department" element={<HodDashboardPage />} />

      {/* Admin Functionality */}
      <Route path="/add-user" element={<AddUserPage />} />
      <Route path="/manage-users" element={<ManageUserPage />} />
      <Route path="/academic" element={<AcademicPage />} />
      <Route path="/edit-profile" element={<EditProfilePage />} />
      <Route path="/add-role" element={<AddRolesPage />} />

      <Route path="/reports-page" element={<ReportsPage />} />
      

      <Route path="/assign-group" element={<AssignGroup />} />
      <Route path="/admin-details" element={<AdminDetails />} />
      <Route path="/assign-department" element={<AssignDepartment />} />
      <Route path="/admin/settings" element={<AdminSettingsPage />} />


      {/* Department & Module Management */}
      <Route path="/add-department" element={<AddDepartment />} />
      <Route path="/add-module" element={<AddModule />} />

      {/* Lecturer Reports */}
      <Route path="/report-history" element={<ReportHistory />} />
      <Route path="/weekly-report" element={<WeeklyReport />} />

      {/* Lecturer Edit Profile */}
      <Route path="/lecturer-edit-profile" element={<EditLecturerProfile />} />
      <Route path="/view-lecturer-profile" element={<ViewLecturerProfile />} />

      {/* Department Head Report Management */}
      <Route path="/dashboard/department-head/reports" element={<Reports />} />
      <Route path="/view-reports" element={<ViewReport />} />

      {/* Notifications */}
      <Route path ="/notifications" element ={<Notifications/>}/>
      <Route path="/lecturer-notifications" element ={<NotificationsLecturer/>}/>

      



    </Routes>
  );
};

export default App;