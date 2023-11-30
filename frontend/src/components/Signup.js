import React, { useState } from 'react';
import '../css/SignUpPage.css';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessages, setErrorMessages] = useState('');
  const [errorFields, setErrorFields] = useState([]);
  const [registrationError, setRegistrationError] = useState('');

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

  const doSignup = async (event) => {
    event.preventDefault();

    // Validate form fields
    const errors = [];
    const fieldsWithErrors = [];
    if (!fname) {
      errors.push('First Name is required.');
      fieldsWithErrors.push('fName');
    }
    if (!lname) {
      errors.push('Last Name is required.');
      fieldsWithErrors.push('lName');
    }
    if (!username) {
      errors.push('Username is required.');
      fieldsWithErrors.push('userName');
    }
    if (!password) {
      errors.push('Password is required.');
      fieldsWithErrors.push('password');
    } else if (!isStrongPassword(password)) {
      errors.push('Password must be strong (at least 1 uppercase, 1 lowercase, 1 digit, 1 special character, and minimum 8 characters).');
      fieldsWithErrors.push('password');
    }
    if (!email) {
      errors.push('Email is required.');
      fieldsWithErrors.push('email');
    }

    if (errors.length > 0) {
      setErrorMessages(errors.join('\n'));
      setErrorFields(fieldsWithErrors);
      setRegistrationError('');
      return;
    }

    // Reset error messages and fields
    setErrorMessages('');
    setErrorFields([]);
    setRegistrationError('');

    try {
      // Check for existing username and email
      const checkResponse = await fetch('https://www.fintech.davidumanzor.com/api/register', {
        method: 'post',
        body: JSON.stringify({ UserName: username, Email: email }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!checkResponse.ok) {
        if (checkResponse.status === 400) {
          // Username already exists
          errors.push('Username is already in use.');
          fieldsWithErrors.push('userName');
        } else if (checkResponse.status === 401) {
          // Email already exists
          errors.push('Email is already in use.');
          fieldsWithErrors.push('email');
        } else {
          // Handle other errors
          throw new Error(`Server responded with status ${checkResponse.status}`);
        }

        setErrorMessages(errors.join('\n'));
        setErrorFields(fieldsWithErrors);
        return;
      }

      // Continue with form submission if no existing username or email
      const obj = {
        FirstName: fname,
        LastName: lname,
        Email: email,
        UserName: username,
        Password: password,
      };
      const js = JSON.stringify(obj);

      const response = await fetch('https://www.fintech.davidumanzor.com/api/register', {
        method: 'post',
        body: js,
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const res = await response.json();
      console.log(res);

      if (res.error !== '') {
        setRegistrationError('Unable to Register');
      } else {
        setRegistrationError('');
        alert('Registered.');
      }
    } catch (e) {
      console.error('Error during fetch:', e.message);
      setRegistrationError(e.message || 'Unknown error');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <form className="form" onSubmit={doSignup}>
          <h3>Sign Up</h3>

          <div className={`mb-3 ${errorFields.includes('fName') ? 'error' : ''}`}>
            <label htmlFor="fName" className="required-field">First Name</label>
            <input 
                type="text" 
                id="fName" 
                className={`user-input-field ${errorFields.includes('fName') ? 'error-border' : ''}`} 
                placeholder="First Name" 
                value={fname}
                onChange={(e) => setFname(e.target.value)}
            />
          </div>

          <div className={`mb-3 ${errorFields.includes('lName') ? 'error' : ''}`}>
            <label htmlFor="lName" className="required-field">Last Name</label>
            <input 
                type="text" 
                id="lName" 
                className={`user-input-field ${errorFields.includes('lName') ? 'error-border' : ''}`} 
                placeholder="Last Name" 
                value={lname}
                onChange={(e) => setLname(e.target.value)}
            />
          </div>

          <div className={`mb-3 ${errorFields.includes('userName') ? 'error' : ''}`}>
            <label htmlFor="userName" className="required-field">Username</label>
            <input 
                type="text" 
                id="userName" 
                className={`user-input-field ${errorFields.includes('userName') ? 'error-border' : ''}`} 
                placeholder="Username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className={`mb-3 ${errorFields.includes('password') ? 'error' : ''}`}>
            <label htmlFor="password" className="required-field">Password</label>
            <input
                type="password"
                id="password"
                className={`user-input-field ${errorFields.includes('password') ? 'error-border' : ''}`} 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={`mb-3 ${errorFields.includes('email') ? 'error' : ''}`}>
            <label htmlFor="email" className="required-field">Email</label>
            <input 
                type="text" 
                id="email" 
                className={`user-input-field ${errorFields.includes('email') ? 'error-border' : ''}`} 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>

          <p className="error-messages">{errorMessages}</p>
          <p className="error-messages">{registrationError}</p>

          <p className="forgot-password text-right">
            <a href="/ForgotPassword"> Forgot password?</a>
          </p>
          
          <p className="new-account test-right"> 
            <a href="/login"> Already have an account?</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;