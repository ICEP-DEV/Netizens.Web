import React, { useState } from 'react';
import './lecturerViewProfile.css';

const ViewLecturerProfile = () => {
  const [firstName] = useState('John');
  const [surname] = useState('Doe');
  const [contactDetails] = useState('123-456-7890'); // Set default contact info
  const [email] = useState('lecturer@example.com');

  return (
    <div className="edit-profile-page">
      <h2>Lecturer Profile</h2>
      <form>
        <label>First Name:</label>
        <input value={firstName} readOnly />

        <label>Surname:</label>
        <input value={surname} readOnly />

        <label>Contact Details:</label>
        <input value={contactDetails} readOnly />

        <label>Email (read-only):</label>
        <input type="email" value={email} readOnly />

        <button type="submit" disabled>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ViewLecturerProfile;
