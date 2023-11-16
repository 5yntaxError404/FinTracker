import React, { useState } from 'react';

import '../css/LoginPage.css';

function Login() {

    var username,password;
    const [message,setMessage] = useState('');

    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    }

    const passwordRecovery = async event =>
        {
            window.location.href = '/passwordrecovery';
        };

	const doLogin = async event => 
    {
        event.preventDefault();

		var obj = {
			"UserName": username.value,
			"Password": password.value
		};
		var js = JSON.stringify(obj);
	
		try {

			const response = await fetch('https://www.fintech.davidumanzor.com/api/login', {

				method: 'post',
				body: js,
				headers: 
                { 
                    'Content-Type': 'application/json' 
                }
			});
			var res = JSON.parse(await response.text());
			console.log(res);

			 if (res.error) {
                setMessage('Unable to Login'); // Set an error message
                console.log("Some error");
            } 
            else {
                setMessage('Logged In.'); // Set a success message

                var parsedToken = parseJwt(res.accessToken);
                console.log(parsedToken);
                var user =
                {
                    accessToken:parsedToken.accessToken,
                    UserId:parsedToken.UserId
                }

                localStorage.setItem('user', JSON.stringify(user));

                try {
                    console.log("Making Get Call");
                    const user_response = await fetch('https://www.fintech.davidumanzor.com/api/users/get/', {
                        method: 'get',
                        headers:
                        {
                            'Content-Type':'application/json'
                        }
                    });
                    console.log("Made get call");
                    //console.log(user_response.text());
                    var userInfo = JSON.parse(await user_response.text());
                    console.log("Parsed Info")
                    console.log(userInfo);
                    // GET FIRSTNAME LAST//
                    console.log("Attempting Parse Token")
                    var parsedToken = parseJwt(res.accessToken);
                    
                    var user_data=
                    {
                        firstName:userInfo.firstName,
                        lastName:userInfo.lastName,
                        accessToken:parsedToken.accessToken
                    }
    
                    localStorage.setItem('user', JSON.stringify(user_data));
    
                    setMessage('');
                    window.location.href = '/dash';
                    console.log("Logged In");
                }
                catch (e) {
                    alert(e.toString());
                    return;
                }

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
            Forgot <a href="#" onClick={passwordRecovery}>password?</a>
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