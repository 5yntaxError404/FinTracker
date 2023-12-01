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
        setMessage({
          text: 'If this email is registered to an account, you will receive an email momentarily.',
          color: 'success', // Set color to green
        });
      } else {
        const data = await response.json();

        // Check if the error message includes a string indicating an internal server error
        if (data.message && data.message.includes('internal server error')) {
          setMessage({
            text: 'Internal Server Error. Please try again later.',
            color: 'error', // Set color to red for error messages
          });
        } else {
          setMessage({
            text: data.message || 'Unable to send Password Reset Email.',
            color: 'error',
          });
        }
      }
    } catch (error) {
      setMessage({
        text: 'Unable to send Password Reset Email.',
        color: 'error',
      });
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

          {/* Separate container for the success message */}
          <div className="message-container">
            {/* Display the message with the specified color */}
            {message.text && (
              <p className={`forms_field-label ${message.color === 'success' ? 'success-message' : 'error-message'}`}>
                {message.text}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotMyPassword;
