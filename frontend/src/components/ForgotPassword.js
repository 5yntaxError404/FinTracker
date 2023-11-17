import React, { useState } from 'react';

import '../css/LoginPage.css';

function ForgotMyPassword(){

	var email;

	const [message,setMessage] = useState('');
    
	const startPasswordReset = async event => {

		event.preventDefault();
       
		var obj = {
			"Email": email.value,
		};
		var js = JSON.stringify(obj);
	
		try {
			  const response = await fetch(`https://www.fintech.davidumanzor.com/forgot-password-email`, {
				method: 'post',
				body: js,
				headers: { 'Content-Type': 'application/json' }
			});
			var res = JSON.parse(await response.text());
			console.log(res);
			if (res.error !== '') {
				setMessage('Unable to send Password Reset Email.');
			} else {
				alert('Password Reset Email Sent.');
			}
		} catch (e) {
			alert(e.toString());
			return;
		}
	};
	

	return (
		<div className="login-container">
			<div className="login-form">
				<form className='form' onSubmit={startPasswordReset}>
				<h3>Reset Your Password</h3>

				<div className="mb-3">
				<label>Email</label>
				<input
					type="text"
					id="email"
					class="user-input-field" 
					placeholder="Email"
					ref={(c) => email = c}/><br />
				</div>

				<div className="d-grid">
				<button>
					Submit
				</button>
				</div>
			</form>
			</div> 
		</div>
	);
}
export default ForgotMyPassword;
