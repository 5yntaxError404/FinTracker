import React, { useState } from 'react';

import '../css/LoginPage.css';

function ResetMyPassword(){

	var Password, confirmPassword;

	const [message,setMessage] = useState('');
    
	const resetPassword = async () => {
        const verificationToken = new URLSearchParams(window.location.search).get('token');
        if (Password != confirmPassword)
            return;

        var obj = {
            "Password": Password
        }

        var js = JSON.stringify(obj);
  
        if (verificationToken) {
          try {
            const response = await fetch(`https://www.fintech.davidumanzor.com/reset-password?token=${verificationToken}`, {

                body: js,
				method: 'post',
				headers: { 'Content-Type': 'application/json' }
			});
          } catch (error) {
            console.error(error);
            alert('Reset Password failed. verification token: ' + verificationToken);
          }
        } else {
          alert('Invalid verification link.');
        }
      };
	

	return (
		<div className="login-container">
			<div className="login-form">
				<form className='form' onSubmit={resetPassword}>
				<h3>Reset Your Password</h3>

				<div className="mb-3">
				<label>Password</label>
				<input
					type="password"
					id="Password"
					class="user-input-field" 
					placeholder="Password"
					ref={(c) => Password = c}/><br />
				</div>

                <div className="mb-3">
				<label>Confirm Password</label>
				<input
					type="password"
					id="confirmPassword"
					class="user-input-field" 
					placeholder="Confirm Password"
					ref={(c) => confirmPassword = c}/><br />
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
export default ResetMyPassword;
