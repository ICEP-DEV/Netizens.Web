
import React, { useState } from 'react';
import './setPassword.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/16/solid';

const SetPasswordPage = () => {
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [error, setError] = useState({
    lengthError: '',
    numberError: '',
    letterError: '',
    specialCharError: '',
    matchError: '',
});
const [passwordVisible, setPasswordVisible] = useState(false);
const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
const navigate = useNavigate();

const validatePasswordLength = (pwd) => {
    return pwd.length >= 8;
};

const validatePasswordNumber = (pwd) => {
    return /\d/.test(pwd);
};

const validatePasswordLetter = (pwd) => {
    return /[a-zA-Z]/.test(pwd);
};

const validatePasswordSpecialChar = (pwd) => {
    const regex = /[^a-zA-Z0-9\s]/g;
    return regex.test(pwd);
};

const handleSubmit = async (e) => {
    e.preventDefault();
    setError({
    lengthError: '',
    numberError: '',
    letterError: '',
    specialCharError: '',
    matchError: '',
    });

    let isValid = true;

    if (!validatePasswordLength(password)) {
    setError((prevError) => ({
        ...prevError,
        lengthError: 'Password must be at least 8 characters long.',
    }));
    isValid = false;
    }

    if (!validatePasswordNumber(password)) {
    setError((prevError) => ({
        ...prevError,
        numberError: 'Password must contain at least one number.',
    }));
    isValid = false;
    }

    if (!validatePasswordLetter(password)) {
    setError((prevError) => ({
        ...prevError,
        letterError: 'Password must contain at least one letter (a-z or A-Z).',
    }));
    isValid = false;
    }

    if (!validatePasswordSpecialChar(password)) {
    setError((prevError) => ({
        ...prevError,
        specialCharError: 'Password must contain at least one special character (e.g., @, #, &).',
    }));
    isValid = false;
    }

    if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    }

    if (isValid) {
    try {
        const response = await axios.post("http://localhost:5041/api/Auth/SetPassword", {
        password,
        confirmPassword
        }, {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
          }
          
        },);

        if (response.data.status) {
        toast.success(response.data.message);
        navigate(response?.data?.url);
        } else {
        toast.error(response?.data?.message);
        }
    } catch (error) {
        toast.error((error.response?.data?.message || "An error occurred"));
    }
    }
};

const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
};

const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
};

return (
    <div className="set-password-container">
    <Toaster />
    <div className="set-password-box">
        <h1 className="set-password-title">Create Password</h1>
        <form onSubmit={handleSubmit} className="set-password-form">
        <div className="set-password-form-group">
            <label htmlFor="email">Enter password: </label>
            <div className='set-password-form-input-container'>
            <input
                id="password"
                type={passwordVisible ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`password-input ${error.lengthError || error.numberError || error.letterError || error.specialCharError ? 'input-error' : ''}`}
                required
            />
            <button
                type="button"
                className="set-password-toggle-visibility"
                onClick={togglePasswordVisibility}
            >
                {passwordVisible ? <EyeSlashIcon className="set-password-icon" /> : <EyeIcon className="set-password-icon" />}
            </button>
            </div>

            <label htmlFor="email">Confirm password: </label>
            <div className='set-password-form-input-container'>
            <input
                id="confirmPassword"
                type={confirmPasswordVisible ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`confirm-password-input ${password !== confirmPassword && confirmPassword ? 'input-error' : ''}`}
                required
            />
            <button
                type="button"
                className="set-password-toggle-visibility"
                onClick={toggleConfirmPasswordVisibility}
        >
                {confirmPasswordVisible ? <EyeSlashIcon className="set-password-icon" /> : <EyeIcon className="set-password-icon" />}
            </button>
            </div>

        </div>

          <button type="submit" className="set-password-submit-btn">Submit</button>
        </form>

        <div className="set-password-password-rules">
        <h3>Password Requirements:</h3>
        <ul>
            <li>Password must be 8 characters or more.</li>
            <li>Password must contain both numbers and letters.</li>
            <li>Password must contain at least one special character (e.g., @, #, &).</li>
        </ul>
        </div>
    </div>
    </div>
);
};

export default SetPasswordPage;
