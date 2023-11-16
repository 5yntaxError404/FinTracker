import React, { useState } from 'react';

import '../css/LoginPage.css';

function SignUp(){

	var username,password,fname,lname,email;

	const [message,setMessage] = useState('');
    
	const doSignup = async event => {
		event.preventDefault();
	
		var obj = {
			"FirstName": fname.value,
			"LastName": lname.value,
			"Email": email.value,
			"UserName": username.value,
			"Password": password.value
		};
		var js = JSON.stringify(obj);
	
		try {

			  const response = await fetch('https://localhost:3000/api/register', {

				method: 'post',
				body: js,
				headers: { 'Content-Type': 'application/json' }
			});
			var res = JSON.parse(await response.text());
			console.log(res);
			if (res.error !== '') {
				setMessage('Unable to Register');
			} else {
				alert('Registered.');
			}
		} catch (e) {
			alert(e.toString());
			return;
		}
	};
	

	return (
		<div className="login-container">
			<div className="login-form">
				<form className='form' onSubmit={doSignup}>
				<h3>Sign Up</h3>

				<div className="mb-3">
					<label>Firstname</label>
					
					<input 
						type="text" 
						id="fName" 
						class="user-input-field" 
						placeholder="First Name" 
						ref={(c) => fname = c}/><br />
					
				</div>

				<div className="mb-3">
				<label>Lastname</label>
				<input 
						type="text" 
						id="lName" 
						class="user-input-field" 
						placeholder="Last Name" 
						ref={(c) => lname = c}/><br />
				</div>

				<div className="mb-3">
				<label>Username</label>
				<input 
						type="text" 
						id="userName" 
						class="user-input-field" 
						placeholder="Username" 
						ref={(c) => username = c}/><br />
				</div>

				<div className="mb-3">
				<label>Password</label>
				<input
					type="password"
					id="password"
					class="user-input-field" 
					placeholder="Password"
					ref={(c) => password = c}/><br />
				</div>

				<div className="mb-3">
				<label>Email</label>
				<input 
						type="text" 
						id="email" 
						class="user-input-field" 
						placeholder="Email" 
						ref={(c) => email = c}/><br />
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
				<button>
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
