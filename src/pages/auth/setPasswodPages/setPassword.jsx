

import React, { useState } from 'react';
import './setPassword.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, {Toaster} from 'react-hot-toast';

const SetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState({
        lengthError: '',
        numberError: '',
        letterError: '', // New error state for letter check
        specialCharError: '',
        matchError: '',
    });
    const [success, setSuccess] = useState('');
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
            letterError: '', // Reset the letter error
            specialCharError: '',
            matchError: '',
        });
        setSuccess('');

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
            setError((prevError) => ({
                ...prevError,
                matchError: 'Passwords do not match.',
            }));
            isValid = false;
        }

        // If everything is valid, set success message
        if (isValid) {
            setSuccess('Password has been successfully set!');
        }
        try {
            const response = await axios.post("http://localhost:5041/api/Auth/SetPassword", {
              password,
              confirmPassword
            });
        
            if (response.data.status) {
              toast.success(response.data.message);
              navigate(response?.data?.url);
            } else {
              toast.error(response.data.message);
            }
          } catch (error) {
            toast.error((error.response?.data?.message));
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
        <div className="set-password">
             <Toaster/>
             <div className="container">
               <h1>Create Password</h1> {/* Changed the title */}
                <form onSubmit={handleSubmit}>
                    <div className="password-input-container">
                        <input
                            type={passwordVisible ? 'text' : 'password'} // Toggle between text and password input type
                            placeholder='Password'
                            className="input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="toggle-visibility"
                            onClick={togglePasswordVisibility}
                        >
                            {passwordVisible ? 'Hide' : 'Show'}
                        </button>
                    </div>

                    <div className="password-input-container">
                        <input
                            type={confirmPasswordVisible ? 'text' : 'password'} // Toggle between text and password input type
                            placeholder='Confirm Password'
                            className="input"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="toggle-visibility"
                            onClick={toggleConfirmPasswordVisibility}
                        >
                            {confirmPasswordVisible ? 'Hide' : 'Show'}
                        </button>
                    </div>

                    <button type="submit" className="button" style={{ fontWeight: 'bold' }}>Submit</button> {/* Made the button bold */}

                    {/* Display specific error messages based on the validation results */}
                    {error.lengthError && <p style={{ color: 'red', marginTop: '10px' }}>{error.lengthError}</p>}
                    {error.numberError && <p style={{ color: 'red', marginTop: '10px' }}>{error.numberError}</p>}
                    {error.letterError && <p style={{ color: 'red', marginTop: '10px' }}>{error.letterError}</p>} {/* Error for letters */}
                    {error.specialCharError && <p style={{ color: 'red', marginTop: '10px' }}>{error.specialCharError}</p>}
                    {error.matchError && <p style={{ color: 'red', marginTop: '10px' }}>{error.matchError}</p>}

                    {success && <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>}
                </form>

                {/* Password Rules Section */}
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