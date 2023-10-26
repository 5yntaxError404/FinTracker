import React, { useState } from 'react';
import axios from 'axios';
import '../css/LoginPage.css';

const Login = (props) => {

	var loginEmail = "NotALizard";
	var loginPassword = "Luvzards";
	const [message,setMessage] = useState('');
    
	const doLogin = async event =>
	{
		event.preventDefault();
		var obj = {UserName:loginEmail.value,Password:loginPassword.value};
		//var js = JSON.stringify(obj);
		try
		{
			const response = await fetch('http://localhost:3000/api/login',
			{method:'POST',body:obj,headers:{'Content-Type':
			'application/json'}});
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
				setMessage('');
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
            <label>Email address</label>
            <input
				id="loginEmail"
                className="form-control"
                placeholder="Enter email"
                value={loginEmail}
                //onChange={(e) => setEmail(e.target.value)}
            />
            </div>

            <div className="mb-3">
            <label>Password</label>
            <input
				id="loginPassword"
                className="form-control"
                placeholder="Enter password"
                value={loginPassword}
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
            <button onClick={doLogin} type="submit" className="btn btn-primary">
                Submit
            </button>
            </div>
            <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
            </p>
        </form>
        </div> 
	</div>
);
}
export default Login;