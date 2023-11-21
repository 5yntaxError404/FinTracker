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

        const doLogin = async event => {
            event.preventDefault();
        
            const obj = {
                "UserName": username.value,
                "Password": password.value
            };
        
            try {
                let response;

                if (process.env.NODE_ENV === "production") {
                    response = await fetch("https://www.fintech.davidumanzor.com/api/login", {
                        method: 'POST',
                        body: JSON.stringify(obj),
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                  } 
                else {
                response = await fetch("http://localhost:5000/api/login", {
                    method: 'POST',
                    body: JSON.stringify(obj),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                };
        
                const res = await response.json();
                console.log(res);
        
                if (res.error) {
                    setMessage('Unable to Login');
                    console.log("Some error");
                } else {
                    setMessage('Logged In.');
        
                    const parsedToken = parseJwt(res.accessToken);
                    console.log(parsedToken);
        
                    const userinfo = {
                        accessToken: res.accessToken,
                        UserId: parsedToken.UserId
                    };
                    const accessToken = res.accessToken;
                    localStorage.setItem('user', JSON.stringify(userinfo));
        
                    console.log(localStorage.getItem('user'));
        
                    try {
                        console.log("Making Get Call");
                        let infoResponse;
                        if (process.env.NODE_ENV === "production") {
                            infoResponse = await fetch(
                                "https://www.fintech.davidumanzor.com/api/info/" + userinfo.UserId, 
                            {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${accessToken}`
                                }
                            });
                        } 
                        else {
                            infoResponse = await fetch(
                                "http://localhost:5000/api/info/" + userinfo.UserId, 
                            {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${accessToken}`
                                }
                            });
                        };
        
                        if (!infoResponse.ok) {
                            console.log(infoResponse.status, infoResponse.statusText);
                            throw new Error('Network response was not ok');
                        }
        
                        const data = await infoResponse.json();
                        console.log("Parsed JSON data:", data);
                  
                } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
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