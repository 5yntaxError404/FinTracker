import React, { useState } from 'react';

import '../css/LoginPage.css';

function ForgotMyPassword(){

	var password, confirmPass;

	const [message,setMessage] = useState('');
    
	const resetMyPassword = async event => {

        if (password != confirmPass)
            return;

		event.preventDefault();
        const verificationToken = new URLSearchParams(window.location.search).get('token');
	
		var obj = {
			"Password": password.value,
		};
		var js = JSON.stringify(obj);
	
		try {
			  const response = await fetch(`https://www.fintech.davidumanzor.com/reset-password?token=${verificationToken}`, {
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
				<form className='form' onSubmit={resetMyPassword}>
				<h3>Reset Your Password</h3>

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
				<label>Confirm Password</label>
				<input 
						type="password" 
						id="confirmPass" 
						class="user-input-field" 
						placeholder="Confirm Password" 
						ref={(c) => confirmPass = c}/><br />
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
