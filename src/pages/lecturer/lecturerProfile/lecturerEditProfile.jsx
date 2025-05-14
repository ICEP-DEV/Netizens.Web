import React, { useState } from 'react';
import './lecturerEditProfile.css';

const EditLecturerProfile = () => {
  const [firstName] = useState('John');
  const [surname] = useState('Doe');
  const [contactDetails, setContactDetails] = useState('');
  const [newContactDetails, setNewContactDetails] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [email] = useState('lecturer@example.com'); // Read-only

  const handleSave = (e) => {
    e.preventDefault();

    // You can add your logic here for submitting the form (e.g., send data to an API)
    console.log('Current Contact:', contactDetails);
    console.log('New Contact:', newContactDetails);
    console.log('Current Password:', currentPassword);
    console.log('New Password:', newPassword);

    // Password validation
    if (newPassword) {
      if (!currentPassword) {
        alert('Please enter your current password before setting a new one.');
        return;
      }

      if (currentPassword === newPassword) {
        alert('New password cannot be the same as the current password.');
        return;
      }
    }

    // Simulate update logic
    let message = 'Profile updated!\n';

    if (newContactDetails) {
      message += `Contact changed from "${contactDetails}" to "${newContactDetails}".\n`;
      setContactDetails(newContactDetails); // Simulate update
    }

    if (newPassword) {
      message += 'Password changed successfully.\n';
      // You can simulate setting the password if needed
    }

    if (!newPassword && !newContactDetails) {
      message = 'No changes made.';
    }

    alert(message);

    // Reset the change fields
    setNewContactDetails('');
    setCurrentPassword('');
    setNewPassword('');
  };

  return (
    <div className="edit-profile-page">
      <h2>Edit Lecturer Profile</h2>
      <form onSubmit={handleSave}>
        <label>First Name:</label>
        <input value={firstName} readOnly />

        <label>Surname:</label>
        <input value={surname} readOnly />

        <label>Current Contact Details:</label>
        <input
          value={contactDetails}
          onChange={(e) => setContactDetails(e.target.value)}
          placeholder="Enter current contact"
        />

        <label>New Contact Details:</label>
        <input
          value={newContactDetails}
          onChange={(e) => setNewContactDetails(e.target.value)}
          placeholder="Enter new contact"
        />

        <label>Current Password:</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Enter current password"
        />

        <label>New Password Details:</label>
      <input
        type="text"
        value={newContactDetails}
        onChange={(e) => setNewContactDetails(e.target.value)}
        placeholder="Enter new contact"
      />

        <label>Email (read-only):</label>
        <input type="email" value={email} readOnly />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditLecturerProfile;
