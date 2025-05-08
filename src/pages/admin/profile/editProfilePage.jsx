
import React, { useState } from 'react';
import './editProfilePage.css';

const EditProfilePage = () => {
const [name, setName] = useState('Admin');
const [email, setEmail] = useState('admin@example.com');

const handleSave = (e) => {
    e.preventDefault();
    alert('Profile updated!');
};

return (
    <div className="edit-profile-page">
    <h2>Edit Profile</h2>
    <form onSubmit={handleSave}>
        <label>Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <label>Email:</label>
        <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Save Changes</button>
    </form>
    </div>
);
};

export default EditProfilePage;
