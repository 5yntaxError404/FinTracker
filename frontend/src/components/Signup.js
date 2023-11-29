import React, { useState } from 'react';

import '../css/SignUpPage.css';

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

			  const response = await fetch('https://www.fintech.davidumanzor.com/api/register', {

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
		<div className="signup-container">
			<div className="signup-form">
            <form className='form' onSubmit={doSignup}>
                <h3>Sign Up</h3>

                <div className="mb-3">
                    <label for="fName">First Name</label>
                    <input 
                        type="text" 
                        id="fName" 
                        className="user-input-field" 
                        placeholder="First Name" 
                        ref={(c) => fname = c}/>
                </div>

                <div className="mb-3">
                    <label for="lName">Last Name</label>
                    <input 
                        type="text" 
                        id="lName" 
                        className="user-input-field" 
                        placeholder="Last Name" 
                        ref={(c) => lname = c}/>
                </div>

                <div className="mb-3">
                    <label for="userName">Username</label>
                    <input 
                        type="text" 
                        id="userName" 
                        className="user-input-field" 
                        placeholder="Username" 
                        ref={(c) => username = c}/>
                </div>

                <div className="mb-3">
                    <label for="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="user-input-field" 
                        placeholder="Password"
                        ref={(c) => password = c}/>
                </div>

                <div className="mb-3">
                    <label for="email">Email</label>
                    <input 
                        type="text" 
                        id="email" 
                        className="user-input-field" 
                        placeholder="Email" 
                        ref={(c) => email = c}/>
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>

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
