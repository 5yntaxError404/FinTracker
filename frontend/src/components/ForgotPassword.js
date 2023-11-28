import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../css/LoginPage.css';

function ForgotMyPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const startPasswordReset = async (event) => {
    event.preventDefault();

    try {
      // Replace the following line with your actual logic to send reset emails
      // Simulating an asynchronous operation (e.g., API call)
      const response = await fetch(`https://www.fintech.davidumanzor.com/forgot-password-email`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Email: email }),
      });

      if (response.status === 200) {
        setMessage('Password Reset Email Sent. Check your email for a reset link.');
      } else {
        setMessage('Unable to send Password Reset Email.');
      }
    } catch (error) {
      setMessage('Unable to send Password Reset Email.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <form className="form" onSubmit={startPasswordReset}>
          <h3 className="forms_title">Reset Your Password</h3>

          <div className="mb-3 forms_field">
            <label>Email</label>
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

          {/* Display the message to check the email */}
          <p className="forms_field-label">{message}</p>

          <div className="d-grid">
            <button type="submit" className="forms_buttons-action">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotMyPassword;
