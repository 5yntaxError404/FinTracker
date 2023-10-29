import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/LoginPage.css';

const Login = (props) => {

    const [username,setUserName] = useState()
    const [password, setPassword] = useState()

	const doLogin = async() => {
        axios.post('http://localhost:3000/api/login', {username,password})
        .then(result => console.log(result))
        .catch(err=> console.log(err));
    }

    useEffect(() => {
        doLogin();
    },[])
        
		/*try
		{
            const response = await fetch('http://localhost:3000/api/login', {
            method: "POST",
            headers: {
                'Access-Control-Allow-Origin': '*'
			},
            body: JSON.stringify(obj),
        })
		*/



    return (
	<div className="login-container">
        <div className="login-form">
            <form className='form'>
            <h3>Sign In</h3>

            <div className="mb-3">
            <label>Username</label>
            <input
                type="text"
				id="loginUserName"
                className="form-control"
                placeholder="Enter username"
                name="username"
                onChange={(e) => setUserName(e.target.value)}
            />
            </div>

            <div className="mb-3">
            <label>Password</label>
            <input
				id="loginPassword"
                className="form-control"
                placeholder="Enter password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
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
			<p className="new-account test-right"> 
			New <a href="/signup">account?</a>
			</p>
        </form>
        </div> 
	</div>
);
}
export default Login;