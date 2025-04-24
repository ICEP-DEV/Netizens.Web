
import React, { useState } from 'react';

import './SetPassword.css';

const SetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const validatePassword = (pwd) => {
        const regex = /[^a-zA-Z0-9\s]/g;
        return pwd.length >= 8 && /\d/.test(pwd) && regex.test(pwd);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validatePassword(password)) {
            setError('Password must be at least 8 characters long and include a number and a special character.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setSuccess('Password has been successfully set!');
    };

    return (
        <div className="set-password">
            <div className="container">
                <h1>Set Password</h1>
                <form onSubmit={handleSubmit}>
                    <label className="label">Password:</label>
                    <input
                        type="password"
                        className="input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <label className="label">Confirm Password:</label>
                    <input
                        type="password"
                        className="input"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <button type="submit" className="button">Set Password</button>

                    {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
                    {success && <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>}
                </form>
            </div>
        </div>
    );
};

export default SetPassword;

