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
      var res = JSON.parse(await response.text());
      console.log(res);
      if (res.error !== '') {
        setMessage('Unable to reset password.');
      } else {
        setMessage('Password Reset Successful!');
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
          <h3>Reset Your Password</h3>

          <div className="mb-3">
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              id="Password"
              className="user-input-field"
              placeholder="Password"
              ref={(c) => (Password = c)}
              onChange={handlePasswordChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className={`user-input-field ${passwordsMatch ? '' : 'passwords-no-match'}`}
              placeholder="Confirm Password"
              ref={(c) => (confirmPassword = c)}
              onChange={handlePasswordChange}
              required
            />
          </div>

          {!passwordsMatch && <p className="error-message">Passwords must match</p>}

          <div className="d-grid">
            <button className="btn-submit" type="submit">
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
