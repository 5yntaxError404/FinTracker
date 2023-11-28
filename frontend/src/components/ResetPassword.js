import React, { useState } from 'react';
import '../css/LoginPage.css';

function ResetMyPassword() {
  var Password, confirmPassword;
  const [message, setMessage] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handlePasswordChange = () => {
    setPasswordsMatch(Password.value === confirmPassword.value);
  };

  const resetPassword = async (event) => {
    event.preventDefault();

    const verificationToken = new URLSearchParams(window.location.search).get('token');

    if (!passwordsMatch) {
      setMessage('Passwords must match');
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
        setMessage('Password Reset Successful!');
      } else {
        setMessage('Unable to reset password.');
      }
    } catch (e) {
      alert(e.toString());
      return;
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

          {!passwordsMatch && <p className="error-message forms_buttons-forgot">Passwords must match</p>}

          // ...

		<div className="d-grid">
		<button className="forms_buttons-action" type="submit">
			Submit
		</button>
		</div>


          {message && <p className={message.includes('Successful') ? 'success-message' : 'error-message'}>{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default ResetMyPassword;
