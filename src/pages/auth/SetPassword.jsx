
import React, { useState } from 'react';

const SetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const validatePassword = (pwd) => {
    
    const regex = /[^a-zA-Z0-9\s]/g;
    return regex.test(pwd);
};
const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validatePassword(password)) {
        setError('Password must be at least 8 characters long and include a number and a Special Character(@,^,_,e.t.c).');
        return;
    }

    if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
    }

    
    setSuccess('Password has been successfully set!');
};

return (
<div style={{ maxWidth: '400px', margin: 'auto' }}>

    <h2>Set Password</h2>
    <form onSubmit={handleSubmit}>
        <div>
        <label>Password:</label><br />
        <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        />
        
        </div>
        <div style={{ marginTop: '10px' }}>
        <label>Confirm Password:</label><br />
        <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        />
        </div>
        <button type="submit" style={{ marginTop: '15px' }}>Set Password</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        </form>
    </div>
    );
};

export default SetPassword;