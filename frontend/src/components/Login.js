import React, { useState } from 'react';

import '../css/LoginPage.css';

function Login() {

    var username,password;
    const [message,setMessage] = useState('');

	const doLogin = async event => {

		var obj = {
			"UserName": username.value,
			"Password": password.value
		};
		var js = JSON.stringify(obj);
	
		try {
			const response = await fetch('http://localhost:4000/api/login', {
				method: 'post',
				body: js,
				headers: { 'Content-Type': 'application/json' }
			});
			var res = JSON.parse(await response.text());
			console.log(res);

			 if (res.error) {
                setMessage('Unable to Login'); // Set an error message
                console.log("Some error");
            } 
            else {
                setMessage('Logged In.'); // Set a success message
                console.log("Logged In");
            }
		} catch (e) {
			alert(e.toString());
			return;
		}
    }

    return (
	<div className="login-container">
        <div className="login-form">
            <form className='form' onSubmit={doLogin}>
            <h3>Sign In</h3>

            <div className="mb-3">
            <label>Username</label>
            <input 
						type="text" 
						id="username" 
						className="user-input-field" 
						placeholder="Username" 
						ref={(c) => username = c}/><br />
            </div>

            <div className="mb-3">
            <label>Password</label>
            <input 
						type="password" 
						id="password" 
						className="user-input-field" 
						placeholder="Password" 
						ref={(c) => password = c}/><br />
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
            <button onClick={doLogin} type="submit" className="btn btn-primary">
                Submit
            </button>
            </div>
            <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
            </p>
			<p className="new-account test-right"> 
			New <a href="/signup">account?</a>
			</p>
        </form>
        </div> 
	</div>
);
}
export default Login;