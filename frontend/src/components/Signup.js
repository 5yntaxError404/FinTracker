import React, { useEffect,useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import '../css/LoginPage.css';

import { useNavigate } from 'react-router-dom';

function SignUp(){

	const [FirstName,setFirstName] = useState("")
	const [LastName,setLastName] = useState("")
	const [UserName,setUserName] = useState("")
	const [Password,setPassword] = useState("")
	const [Email,setEmail] = useState("")

	const doSignup = () => {
        axios.post('http://localhost:3000/api/register', {
			FirstName: FirstName,
			LastName: LastName,
			Email: Email,
			UserName: UserName,
			Password: Password})
        .then((response) => {
			alert("USER CREATED");
		})
        .catch(err=> console.log(err));
    }

	
	/*
		useEffect(()
		
		{
			await fetch('http://localhost:3000/api/register', {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(obj),
		})
		
		
	
		
	};
	*/

	return (
		<div className="login-container">
			<div className="login-form" onSubmit={doSignup}>
				<form className='form'>
				<h3>Sign In</h3>

				<div className="mb-3">
				<label>Firstname</label>
				<input
					type="text"
					id="signupFirstName"
					className="form-control"
					placeholder="Enter firstname"
					name="firstname"
					onChange={(event) => setFirstName(event.target.value)}
				/>
				</div>

				<div className="mb-3">
				<label>Lastname</label>
				<input
					type="text"
					id="signupLastName"
					className="form-control"
					placeholder="Enter lastname"
					name="lastname"
					onChange={(event) => setLastName(event.target.value)}
				/>
				</div>

				<div className="mb-3">
				<label>Username</label>
				<input
					type="text"
					id="signupUsername"
					className="form-control"
					placeholder="Enter username"
					name="username"
					onChange={(event) => setUserName(event.target.value)}
				/>
				</div>

				<div className="mb-3">
				<label>Password</label>
				<input
					type="text"
					id="signupPassword"
					className="form-control"
					placeholder="Enter password"
					name="password"
					onChange={(event) => setPassword(event.target.value)}
				/>
				</div>

				<div className="mb-3">
				<label>Email</label>
				<input
					id="signupEmail"
					className="form-control"
					placeholder="Enter email"
					name="email"
					onChange={(event) => setEmail(event.target.value)}
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
				<button onClick={doSignup}>
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