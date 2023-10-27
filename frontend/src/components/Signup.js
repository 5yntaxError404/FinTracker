import React, { useState } from 'react';
import axios from 'axios';
import '../css/LoginPage.css';

const SignUp = (props) => {

	var signupFirstName;
	var signupLastName;
	var signupEmail;
	var signupPassword;
	var signupUsername;
	
	const [message,setMessage] = useState('');

	const doSignup = async event =>
	 {
		let firstName = document.getElementById("signupFirstName").value;
		let lastName = document.getElementById("signupLastName").value;

		let email = document.getElementById("signupEmail").value;
		let username = document.getElementById("signupUsername").value;
		let password = document.getElementById("signupPassword").value;

		event.preventDefault();
		var obj = {FirstName:firstName,LastName:lastName,Email:email,UserName:username,Password:password};
		var js = JSON.stringify(obj);
		try
		{
			const response = await fetch('http://localhost:5000/api/register', {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(obj),
		})
		/*
			var res = JSON.parse(await response.text());
			if( res.id <= 0 )
			{
				setMessage('User/Password combination incorrect');
			}
			else
			{
				var user =
				{firstName:res.firstName,lastName:res.lastName,id:res.id}
				localStorage.setItem('user_data', JSON.stringify(user));
				setMessage('User Created');
				window.location.href = '/dash';
			}
			*/
		}
		catch(e)
		{
			alert(e.toString());
			return;
		}
		
	};

	return (
		<div className="login-container">
			<div className="login-form">
				<form className='form'>
				<h3>Sign In</h3>

				<div className="mb-3">
				<label>Firstname</label>
				<input
					id="signupFirstName"
					className="form-control"
					placeholder="Enter firstname"
					value={signupFirstName}
					//onChange={(e) => setEmail(e.target.value)}
				/>
				</div>

				<div className="mb-3">
				<label>Lastname</label>
				<input
					id="signupLastName"
					className="form-control"
					placeholder="Enter lastname"
					value={signupLastName}
					//onChange={(e) => setEmail(e.target.value)}
				/>
				</div>

				<div className="mb-3">
				<label>Username</label>
				<input
					id="signupUsername"
					className="form-control"
					placeholder="Enter username"
					value={signupUsername}
					//onChange={(e) => setEmail(e.target.value)}
				/>
				</div>

				<div className="mb-3">
				<label>Password</label>
				<input
					id="signupPassword"
					className="form-control"
					placeholder="Enter password"
					value={signupPassword}
					//onChange={(e) => setPassword(e.target.value)}
				/>
				</div>

				<div className="mb-3">
				<label>Email</label>
				<input
					id="signupEmail"
					className="form-control"
					placeholder="Enter password"
					value={signupEmail}
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
				<button onClick={doSignup} type="submit" className="btn btn-primary">
					Submit
				</button>
				</div>
				<p className="forgot-password text-right">
				Forgot <a href="#">password?</a>
				</p>
				<p className="new-account test-right"> 
				Have an <a href="/login">account?</a>
				</p>
			</form>
			</div> 
		</div>
	);
}
export default SignUp;