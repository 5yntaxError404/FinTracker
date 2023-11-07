import React, { useState } from 'react';
import axios from 'axios';
import '../css/LoginPage.css';

const Login = (props) => {

	const [message,setMessage] = useState('');
    
	const doLogin = async event =>
	{
        let loginEmail = document.querySelector("#loginUserName");
	    let loginPassword = document.querySelector("#loginPassword")
		event.preventDefault();
		var obj = {UserName:loginEmail.value,Password:loginPassword.value};
		//var js = JSON.stringify(obj);
		try
		{
            const response = await fetch('http://localhost:5000/api/login', {
            method: "POST",
            headers: {
                'Access-Control-Allow-Origin': '*'
			},
            body: JSON.stringify(obj),
        })
			var res = response.json;
			if( res.id <= 0 )
			{
				setMessage('User/Password combination incorrect');
			}
			else
			{
				setMessage('Got response use Logged In')
				//window.location.href = '/dash';
			}
		}
		catch(e)
		{
			alert(e.toString());
			return;
		}
	};


    return (
	<div className="widget-container">

        <div className="widget">
            <div className='graph'>
            </div>

            <div class="barGraph">
                <ul class="graph">
                <span class="graph-barBack">
                    <li class="graph-bar" data-value="28.5">
                    <span class="graph-legend">Mon</span>
                    </li>
                </span>  

                <span class="graph-barBack">    
                    <li class="graph-bar" data-value="85">
                    <span class="graph-legend">Tue</span>
                    </li>
                </span>

                <span class="graph-barBack">    
                    <li class="graph-bar" data-value="70">
                    <span class="graph-legend">Wed</span>
                    </li>
                </span>

                <span class="graph-barBack">    
                    <li class="graph-bar" data-value="50">
                    <span class="graph-legend">Thu</span>
                    </li>
                </span>

                <span class="graph-barBack">    
                    <li class="graph-bar" data-value="68">
                    <span class="graph-legend">Fri</span>
                    </li>
                </span>      
                </ul>
            </div>


        </div> 
	</div>
);
}
export default Login;