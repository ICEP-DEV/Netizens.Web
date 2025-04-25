import React, { useState } from "react";
import "./resetPage.css";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast'; 
import { useNavigate } from 'react-router-dom';

export const ResetPage = () => {
  
  const [newPassword, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5041/api/Auth/ResetPassword", {
        NewPassword: newPassword, 
        ConfirmPassword: confirmPassword,
      });
  
      if (response?.data.status) {
        toast.success(response?.data.message);
        navigate("/"); 
      } else {
        toast.error(response?.data.message || "Reset failed.");
      }
    } catch (error) {
      toast.error((error.response?.data?.message || "An error occurred"));
    }
  };

  return (
    <div className="reset">
      <Toaster />
      <div className="div">
        <div className="text-wrapper-2">
          Reset Password
        </div>

        <form onSubmit={handleSubmit}>
          <div className="frame-2">
            <div className="text-wrapper-3">Password:</div>
            <input
              type="password"
              className="rectangle"
              value={newPassword}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="frame-3">
            <div className="text-wrapper-3">Confirm Password:</div>
            <input
              type="password"
              className="rectangle-2"
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required
            />
          </div>

          <div className="frame">
            <button type="submit" className="text-wrapper">Reset</button> 
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPage;
