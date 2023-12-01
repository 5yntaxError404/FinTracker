// ResetMyPassword.js

import React, { useState } from 'react';
import '../css/ResetPassword.css';

function ResetMyPassword() {
  var Password, confirmPassword;
  const [message, setMessage] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handlePasswordChange = () => {
    const newPassword = Password.value;
    const newPasswordStrength = isStrongPassword(newPassword);

    // Check if the password meets the strength criteria
    if (!newPasswordStrength) {
      setMessage('Password must have at least 8 characters, including uppercase, lowercase, digit, and special character.');
    } else {
      setMessage(''); // Clear any previous error messages
    }

    // Check if passwords match
    setPasswordsMatch(newPassword === confirmPassword.value);
  };

  const resetPassword = async (event) => {
    event.preventDefault();

    const verificationToken = new URLSearchParams(window.location.search).get('token');

    if (!passwordsMatch) {
      setMessage('Passwords must match');
      return;
    }

    const newPassword = Password.value;
    const newPasswordStrength = isStrongPassword(newPassword);

    // Check if the password meets the strength criteria
    if (!newPasswordStrength) {
      setMessage('Password must have at least 8 characters, including uppercase, lowercase, digit, and special character.');
      return;
    }

    var obj = {
      Password: newPassword,
    };

    var js = JSON.stringify(obj);

    try {
      const response = await fetch(`https://www.fintech.davidumanzor.com/reset-password?token=${verificationToken}`, {
        method: 'post',
        body: js,
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        setMessage('Password Change Successful!');
        // Clear any previous error messages

        // Redirect to login after 3 seconds
        setTimeout(() => {
          window.location.href = '/Login'; // Change this to the actual login route
        }, 3000);
      } else {
        setMessage('Unable to reset password.');
      }
    } catch (e) {
      setMessage('Unable to reset password.');
      console.error(e);
    }
  };

  const isStrongPassword = (value) => {
    // Check for at least 1 capital letter
    const capitalLetterRegex = /[A-Z]/;
    if (!capitalLetterRegex.test(value)) {
      return false;
    }

    // Check for at least 1 lowercase letter
    const lowercaseLetterRegex = /[a-z]/;
    if (!lowercaseLetterRegex.test(value)) {
      return false;
    }

    // Check for at least 1 digit
    const digitRegex = /\d/;
    if (!digitRegex.test(value)) {
      return false;
    }

    // Check for at least 1 special character
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialCharacterRegex.test(value)) {
      return false;
    }

    // Check for minimum 8 characters in length
    if (value.length < 8) {
      return false;
    }

    return true;
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <form className="form" onSubmit={resetPassword}>
          <h3 className="pass_forms_title">Reset Your Password</h3>

          <div className="mb-3 forms_field">
            <label htmlFor="Password" className="forms_field-label">
              Password
            </label>
            <input
              type="password"
              id="Password"
              className="user-input-field forms_field-input"
              placeholder="Password"
              ref={(c) => (Password = c)}
              onChange={handlePasswordChange}
              required
            />
          </div>

          <div className="mb-3 forms_field">
            <label htmlFor="confirmPassword" className="forms_field-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className={`user-input-field forms_field-input ${passwordsMatch ? '' : 'passwords-no-match'}`}
              placeholder="Confirm Password"
              ref={(c) => (confirmPassword = c)}
              onChange={handlePasswordChange}
              required
            />
          </div>

          {!passwordsMatch && <p className="error-message">Passwords must match</p>}

          {/* Display the password strength message */}
          {message && (
            <p className={`forms_field-label ${message.includes('Successful') ? 'success-message visible' : 'error-message'}`}>
              {message}
            </p>
          )}

          <div className="d-grid">
            <button className="forms_buttons-action" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetMyPassword;
