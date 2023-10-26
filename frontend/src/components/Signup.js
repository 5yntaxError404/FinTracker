import React, { useState } from 'react';
import axios from 'axios';
import '../css/LoginPage.css';
import '../api/Register'

const Login = (props) => {

	var signupEmail;
	var signupPassword;
	const [message,setMessage] = useState('');

	function doSignup() {
		firstName = document.getElementById("signupFirstName").value;
		lastName = document.getElementById("signupLastName").value;

		let username = document.getElementById("signupEmail").value;
		let password = document.getElementById("signupPassword").value;

	//    if (!validSignUpForm(firstName, lastName, username, password)) {
	//        document.getElementById("signupResult").innerHTML = "invalid signup";
	//        return;
	//    }

	}

	return (
		<div className="login-container">
			<div className="login-form">
				<form className='form'>
				<h3>Sign In</h3>

				<div className="mb-3">
				<label>Email address</label>
				<input
					id="loginEmail"
					className="form-control"
					placeholder="Enter email"
					value={loginEmail}
					//onChange={(e) => setEmail(e.target.value)}
				/>
				</div>

				<div className="mb-3">
				<label>Password</label>
				<input
					id="loginPassword"
					className="form-control"
					placeholder="Enter password"
					value={loginPassword}
					//onChange={(e) => setPassword(e.target.value)}
				/>
				</div>

				<div className="mb-3">
				<div className="custom-control custom-checkbox">
					<input
					type="checkbox"
					className="custom-control-input"
					id="customCheck1"
					/>
					<label className="custom-control-label" htmlFor="customCheck1">
					Remember me
					</label>
				</div>
				</div>

				<div className="d-grid">
				<button onclick={doLogin} type="submit" className="btn btn-primary">
					Submit
				</button>
				</div>
				<p className="forgot-password text-right">
				Forgot <a href="#">password?</a>
				</p>
			</form>
			</div> 
		</div>
	);
}
export default Login;