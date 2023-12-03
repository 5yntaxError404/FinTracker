// Login.js

import React, { useState } from 'react';
import '../css/LoginPage.css';

function Login() {
  const base_url = process.env.NODE_ENV === 'production' ? 'https://www.fintech.davidumanzor.com' : 'http://localhost:5000';

  var username, password;
  const [message, setMessage] = useState('');
  const [errorMessages, setErrorMessages] = useState('');
  const [errorFields, setErrorFields] = useState([]);
  const [registrationError, setRegistrationError] = useState('');
  const [successMessages, setSuccessMessages] = useState([]);

  // Function to parse JWT token
  function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  }

  const errorPush = (message, fields) => {
    setErrorMessages(message);
    setErrorFields(fields);
    setRegistrationError('');
    setSuccessMessages([]);
  };

  const successPush = (message) => {
    setSuccessMessages([message]);
    setErrorMessages('');
    setErrorFields([]);
    setRegistrationError('');
  };

  // Function to perform login
  const doLogin = async (event) => {
    event.preventDefault();

    // Clear previous error messages
    setErrorMessages('');
    setErrorFields([]);
    setRegistrationError('');

    // Check for empty username
    if (!username.value) {
      errorPush('Username cannot be empty', ['username']);
      return;
    }

    // Check for empty password
    if (!password.value) {
      errorPush('Password cannot be empty', ['password']);
      return;
    }

    const obj = {
      UserName: username.value,
      Password: password.value,
    };

    const js = JSON.stringify(obj);

    try {
      const response = await fetch(`${base_url}/api/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: js,
        credentials: 'same-origin',
      });

      if (response.status === 401) {
        // Invalid credentials
        errorPush('Invalid Username or Password', ['username', 'password']);
      } else if (response.status === 400) {
        // User needs to verify their email
        errorPush('Please verify your email before logging in.', []);
      } else if (response.ok) {
        // Successful login
        setMessage('Logged In.');

        const res = await response.json();
        const parsedToken = parseJwt(res.accessToken);
        const userinfo = {
          accessToken: res.accessToken,
          UserId: parsedToken.UserId,
        };
        localStorage.setItem('user', JSON.stringify(userinfo));

        try {
          const infoResponse = await fetch(`${base_url}/api/info/${userinfo.UserId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userinfo.accessToken}`,
            },
            credentials: 'same-origin',
          });

            const response = await fetch(
                `${base_url}/api/login/`,
                {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: js,
                credentials: 'same-origin',
            });
    
            const res = await response.json();
            console.log(res);
    
            if (res.error) {
                setMessage('Unable to Login');
                console.log("Some error");
            } else {
                setMessage('Logged In.');
    
                const parsedToken = parseJwt(res.accessToken);
                console.log(parsedToken);
    
                const userinfo = {
                    accessToken: res.accessToken,
                    UserId: parsedToken.UserId
                };
                const accessToken = res.accessToken;
                localStorage.setItem('user', JSON.stringify(userinfo));
                res.cookie = `refreshToken=${accessToken};path=/;`
                console.log(localStorage.getItem('user'));
    
                try {
                    console.log("Making Get Call");

                    const infoResponse = await fetch(
                        `${base_url}/api/info/${userinfo.UserId}`,
                        {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${userinfo.accessToken}`
                        },
                        credentials: 'same-origin',
                    });

                    if (!infoResponse.ok) {
                        console.log(infoResponse.status, infoResponse.statusText);
                        throw new Error('Network response was not ok');
                    }
    
                    const data = await infoResponse.json();
                    console.log("Parsed JSON data:", data);
            
                } 
                catch (error) {
                    console.error('There was a problem with the fetch operation:', error);
                }
            window.location.href = '/dash';
            }
        } 
        catch (e) {
        alert(e.toString());
        return;
        }

        // Redirect or perform other actions on successful login
        window.location.href = '/dash';
      } else {
        // Other error scenarios
        errorPush('Unable to Login', []);
      }
    } catch (e) {
      console.error('Error during fetch:', e.message);
      setRegistrationError(e.message || 'Unknown error');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <form className="form" onSubmit={doLogin}>
          <h1>Login</h1>

          <div className={`form-group ${errorFields.includes('username') ? 'error' : ''}`}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" className={`user-input-field ${errorFields.includes('username') ? 'error-border' : ''}`} placeholder="Enter your username" ref={(c) => (username = c)} />
          </div>

          <div className={`form-group ${errorFields.includes('password') ? 'error' : ''}`}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" className={`user-input-field ${errorFields.includes('password') ? 'error-border' : ''}`} placeholder="Enter your password" ref={(c) => (password = c)} />
          </div>

          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="customCheck1" />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign In
            </button>
          </div>

          <p className="forgot-password">
            <a href="/ForgotPassword">Forgot your password?</a>
          </p>

          <p className="new-account">
            Don't have an account? <a href="/signup">Sign up!</a>
          </p>

          {/* Display general login error message at the bottom */}
          <p className="error-messages">{errorMessages}</p>
        </form>
      </div>
    </div>
  );
}

export default Login;
