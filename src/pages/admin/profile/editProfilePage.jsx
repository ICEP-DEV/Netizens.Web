import React, { useState } from 'react';
import './editProfilePage.css';

const EditProfilePage = () => {
  const [name, setName] = useState('Admin');
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [contactDetails, setContactDetails] = useState('');
  const [email] = useState('admin@example.com'); // Read-only

  const handleSave = (e) => {
    e.preventDefault();
    alert('Profile updated!');
  };

  return (
    <div className="edit-profile-page">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSave}>
        <label>Full Name:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter full name"
        />

        <label>First Name:</label>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter first name"
        />

        <label>Surname:</label>
        <input
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          placeholder="Enter surname"
        />

        <label>Contact Details:</label>
        <input
          value={contactDetails}
          onChange={(e) => setContactDetails(e.target.value)}
          placeholder="Enter contact number or details"
        />

        <label>Email (read-only):</label>
        <input
          type="email"
          value={email}
          readOnly
        />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfilePage;
