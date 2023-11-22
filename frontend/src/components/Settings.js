// src/SettingsPage.js
import React, { useState } from 'react';
import '../css/LandingPage.css';
import '../css/SettingsPage.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Looking for correct code to import font

function SettingsPage() {

    const [settings, setSettings] = useState({
        UserName: '',
        Password: '',
        FirstName: '',
        LastName: '',
        Email: '',
    });

    // Constants needed for the page
    const [message,setMessage] = useState('');
    
    const base_url = process.env.NODE_ENV === "production"
    ? `https://www.fintech.davidumanzor.com`
    : `http://localhost:5000`;

    // Adds and Edits Budget in DB and updates webpage
    const EditUser = async event =>
    {
        event.preventDefault();

        let newUsername = document.getElementById("inputUserName").value;
        let newPassword = document.getElementById("inputPassword").value;
        let newFirstName = document.getElementById("inputFirstName").value;
        let newLastName = document.getElementById("inputLastName").value;
        let newEmail = document.getElementById("inputEmail").value;

        console.log(newUsername);

		var obj = {
            UserName: newUsername,
            Password: newPassword,
            FirstName: newFirstName,
            LastName: newLastName,
            Email: newEmail,
		};
		var js = JSON.stringify(obj);
        
		try {
            const userinfo = JSON.parse(localStorage.getItem('user'));

            console.log(userinfo);
            console.log(userinfo.UserId);

            const response = await fetch(
                `${base_url}/api/users/edit/`,
                {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userinfo.accessToken}`
                },
                body: js,
                credentials: 'same-origin',
            });

			var res = JSON.parse(await response.text());
			console.log(res);

			if (res.error) {
                setMessage('Unable to add Budget'); // Set an error message
                console.log("Some error");
            } 
            else {
                await GetUser();
                setMessage('Success');
            }

		} catch (e) {
			alert(e.toString());
			return;
		}
    };

    // Obtains budget from DB and updates webpage
    const DeleteUser = async () =>
    {
        try {
            const userinfo = JSON.parse(localStorage.getItem('user'));
            console.log(userinfo);
            console.log(userinfo.UserId);
            /*
            const response = await fetch(
                `${base_url}/api/user/delete/`,
                {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userinfo.accessToken}`
                },
                credentials: 'same-origin',
            });
            */

			//var res = JSON.parse(await response.text());
            var res = {message: "2000"};
			console.log(res);

			if (res.error) {
                setMessage('Unable to get Budget'); // Set an error message
                console.log('Some error');
            } 
            else {
                setMessage('Success');
                console.log("Reached delete state");
            }
            
		} catch (e) {
			alert(e.toString());
			return;
		}
    };

    const GetUser = async () => {
        try {
            const userinfo = JSON.parse(localStorage.getItem('user'));
            console.log(userinfo);
            console.log(userinfo.UserId);
            
            const response = await fetch(
                `${base_url}/api/info/${userinfo.UserId}`,
                {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userinfo.accessToken}`
                },
                credentials: 'same-origin',
            });

			var res = JSON.parse(await response.text());
			console.log(res);

			if (res.error) {
                setMessage('Unable to get User'); // Set an error message
                console.log('Some error');
            } 
            else {
                setSettings(res.UserAccount);
                setMessage('Success');
            }
            
		} catch (e) {
			alert(e.toString());
			return;
		}
    }

    return (

        <div className="landing-container">
            <Container onLoad={GetUser}>
                <Row>
                    <Col sm={3} md={6} className="budgetInfo">
                        <Row>
                            Username
                            <p>{settings.UserName}</p>
                        </Row>
                        <Row>
                            Password
                            <p>{settings.Password}</p>
                        </Row>
                        <Row>
                            First Name
                            <p>{settings.FirstName}</p>
                        </Row>
                        <Row>
                            Last Name
                            <p>{settings.LastName}</p>
                        </Row>
                        <Row>
                            Email
                            <p>{settings.Email}</p>
                        </Row>

                    </Col>
                    <Col sm={3} md={6} className="content">
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono"></link>
                        <form className='addBudgetForm'>
                        <div className="form-row">
                            <div className="form-group">
                            <label htmlFor="inputUserName">Username</label>
                            <input type="text" className="form-control" id="inputUserName"/>
                            </div>
                            <div className="form-group">
                            <label htmlFor="inputPassword">Password</label>
                            <input type="text" className="form-control" id="inputPassword"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputFirstName">FirstName</label>
                            <input type="text" className="form-control" id="inputFirstName"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputLastName">LastName</label>
                            <input type="text" className="form-control" id="inputLastName"/>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="inputEmail">Email</label>
                                <input type="text" className="form-control" id="inputEmail"/>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={EditUser}>Edit Account</button>
                        <button type="submit" className="btn btn-primary" onClick={DeleteUser}>Delete Account</button>
                        </form>
                    </Col>
                </Row>
            </Container>
        </div>

        
    );
}

export default SettingsPage;
