// ForgotMyPassword.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/ForgotPassword.css';

function ForgotMyPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const startPasswordReset = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`https://www.fintech.davidumanzor.com/forgot-password-email`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Email: email }),
      });

      if (response.status === 200) {
        setMessage('If this email is registered to an account, you will receive an email momentarily.');
      } else {
        const data = await response.json();

        // Check if the error message includes a string indicating an internal server error
        if (data.message && data.message.includes('internal server error')) {
          setMessage('Internal Server Error. Please try again later.');
        } else {
          setMessage(data.message || 'Unable to send Password Reset Email.');
        }
      }
    } catch (error) {
      setMessage('Unable to send Password Reset Email.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <form className="form" onSubmit={startPasswordReset}>
          <h3 className="pass2_forms_title">Forget Your Password?</h3>

          <p className="instructions">
            Please Enter Your Email Below. <br />
            If you have an account with us, we will go ahead and send you a reset link.
          </p>

          <div className="mb-3 forms_field">
            <input
              type="text"
              id="email"
              className="user-input-field forms_field-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="forms_buttons-action">
              Submit
            </button>
          </div>

          {/* Separate container for the message at the bottom */}
          <div className="message-container">
            {/* Display the message at the bottom */}
            {message && <p className="forms_field-label">{message}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotMyPassword;
