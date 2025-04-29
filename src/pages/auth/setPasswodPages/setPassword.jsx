
import React, { useState } from 'react';
import './setPassword.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, {Toaster} from 'react-hot-toast';
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
    const navigate =useNavigate();
    const validatePasswordLength = (pwd) => {
        return pwd.length >= 8;
    };

    const validatePasswordNumber = (pwd) => {
        return /\d/.test(pwd);
    };

    const validatePasswordLetter = (pwd) => {
        // Check if the password contains at least one letter (a-z, A-Z)
        return /[a-zA-Z]/.test(pwd);
    };

    const validatePasswordSpecialChar = (pwd) => {
        // Check if the password contains at least one special character
        const regex = /[^a-zA-Z0-9\s]/g;
        return regex.test(pwd);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError({
            lengthError: '',
            numberError: '',
            letterError: '', 
            specialCharError: '',
            matchError: '',
        });

        // Validate password rules
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

        // Check if passwords match
        if (password !== confirmPassword) {
            toast.error("passwords do not match");
        }

        // If everything is valid, set success message
        if(isValid){
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
    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    // Toggle confirm password visibility
    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };



    return (
        <div className="set-password-container">
          <Toaster />
          <div className="set-password-box">
            <h1 className="title">Set Password</h1>
    
            <form onSubmit={
                  handleSubmit} className="form">
              <div className="form-group">
                <label htmlFor="email">Enter password: </label>
                <div className='form-input-container'>
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
                        className="toggle-visibility"
                        onClick={togglePasswordVisibility}
                    >
                        {passwordVisible ? <EyeSlashIcon className="icon" /> : <EyeIcon className="icon" /> }
                    </button> 
                </div>
                {/* {error.lengthError && <p className="error-message">{error.lengthError}</p>}
                {error.numberError && <p className="error-message">{error.numberError}</p>}
                {error.letterError && <p className="error-message">{error.letterError}</p>}
                {error.specialCharError && <p className="error-message">{error.specialCharError}</p>} */}
                 

                <label htmlFor="email">Confirm password: </label>
                <div className='form-input-container'>
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
                        className="toggle-visibility"
                        onClick={toggleConfirmPasswordVisibility}
                    >
                        {confirmPasswordVisible ? <EyeSlashIcon className="icon" /> : <EyeIcon className="icon" />}
                    </button>
                </div>
              </div>
    
              <button type="submit" className="submit-btn">
                Set Password
              </button>
            </form>
    
            <div className="password-rules">
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
};export default SetPasswordPage;