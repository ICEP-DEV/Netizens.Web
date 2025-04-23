import React, { useState } from "react";
import "./resetPage.css";

export const ResetPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    
    setErrors({
      newPassword: "",
      confirmPassword: "",
    });

    let formIsValid = true;
    const newErrors = { ...errors };

    
    if (!newPassword) {
      newErrors.newPassword = "New password is required.";
      formIsValid = false;
    }

    
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required.";
      formIsValid = false;
    }

    
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      formIsValid = false;
    }

    setErrors(newErrors);

    if (formIsValid) {
      console.log("Password reset to:", newPassword);
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="reset">
      <div className="div">
        <div className="text-wrapper-2">Reset</div>

        <form onSubmit={handleSubmit}>
          <div className="frame-2">
            <div className="text-wrapper-3">Enter New Password:</div>
            <input
              type="password"
              className={`rectangle ${errors.newPassword ? "input-error" : ""}`}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            {errors.newPassword && (
              <div className="error-message">{errors.newPassword}</div>
            )}
          </div>

          <div className="frame-3">
            <div className="text-wrapper-3">Confirm Password:</div>
            <input
              type="password"
              className={`rectangle-2 ${errors.confirmPassword ? "input-error" : ""}`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {errors.confirmPassword && (
              <div className="error-message">{errors.confirmPassword}</div>
            )}
          </div>

          <div className="frame">
            <button className="text-wrapper">Confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPage;
