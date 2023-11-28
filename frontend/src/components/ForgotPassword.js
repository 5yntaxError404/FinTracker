// ResetMyPassword.js

import React, { useState } from 'react';
import '../css/ResetPassword.css';

function ResetMyPassword() {
  var Password, confirmPassword;
  const [message, setMessage] = useState('');
  const [verificationMessage, setVerificationMessage] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handlePasswordChange = () => {
    setPasswordsMatch(Password.value === confirmPassword.value);
  };

  const resetPassword = async (event) => {
    event.preventDefault();

    const verificationToken = new URLSearchParams(window.location.search).get('token');

    if (!passwordsMatch) {
      setMessage('Passwords must match');
      setVerificationMessage(''); // Clear any previous verification message
      return;
    }

    var obj = {
      Password: Password.value,
    };

    var js = JSON.stringify(obj);

    try {
      const response = await fetch(`https://www.fintech.davidumanzor.com/reset-password?token=${verificationToken}`, {
        method: 'post',
        body: js,
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        setVerificationMessage('Password Change Successful!');
        setMessage(''); // Clear any previous error messages

        // Redirect to login after 3 seconds
        setTimeout(() => {
          window.location.href = '/login'; // Change this to the actual login route
        }, 3000);
      } else {
        setMessage('Unable to reset password.');
        setVerificationMessage(''); // Clear any previous verification message
      }
    } catch (e) {
      setMessage('Unable to reset password.');
      setVerificationMessage(''); // Clear any previous verification message
      console.error(e);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <form className="form" onSubmit={resetPassword}>
          <h3 className="forms_title">Reset Your Password</h3>

          <div className="mb-3 forms_field">
            <label htmlFor="Password" className="forms_field-label">Password</label>
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
            <label htmlFor="confirmPassword" className="forms_field-label">Confirm Password</label>
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

          <div className="d-grid">
            <button className="forms_buttons-action" type="submit">
              Submit
            </button>
          </div>

          {message && (
            <p className={`forms_field-label ${message.includes('Successful') ? 'success-message visible' : 'error-message'}`}>
              {message}
            </p>
          )}

          {verificationMessage && (
            <p className={`forms_field-label ${verificationMessage.includes('Successful') ? 'success-message visible' : 'error-message'}`}>
              {verificationMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default ResetMyPassword;
