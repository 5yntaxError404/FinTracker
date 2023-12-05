// src/SettingsPage.js
import React, { useState, useEffect } from 'react';
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

    useEffect(() => {
        GetUser();
        const handleStorageChange = () => {
            GetUser();
        };
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const validateInput = (inputElement, fieldName) => {
        try {
            const valuelength = inputElement.length;
            const value = inputElement;
            
            if(valuelength == 0){
                throw new Error('Invalid entries: Please enter a non-empty value in each box to successfully edit.');
            }

            return value;
        } catch (error) {
            setMessage(error.message);
            throw error;
        }
    };

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
        
        let validatedUser = validateInput(newUsername, "Username");
        let validatedPass = validateInput(newPassword, "Password");
        let validatedFirst = validateInput(newFirstName, "First Name");
        let validatedLast = validateInput(newLastName, "Last Name");
        let validatedEmail = validateInput(newEmail, "Email");

		var obj = {
            UserName: validatedUser,
            Password: validatedPass,
            FirstName: validatedFirst,
            LastName: validatedLast,
            Email: validatedEmail,
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
        if (!window.confirm("Are you sure you want to delete this user?")) {
            console.log("User deletion cancelled.");
            return; // Exit the function if user cancels
        }

        try {
            const userinfo = JSON.parse(localStorage.getItem('user'));
            console.log(userinfo);
            console.log(userinfo.UserId);
            const response = await fetch(
                `${base_url}/api/user/delete/`,
                {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userinfo.accessToken}`
                },
                credentials: 'same-origin',
            });
            
            var res = JSON.parse(await response.text());
            var res = {message: "2000"};
			console.log(res);

			if (res.error) {
                setMessage('Unable to get Budget'); // Set an error message
                console.log('Some error');
            } 
            else {
                setMessage('Success');
                console.log("Reached delete state");
                window.location.href = '/login';
                localStorage.removeItem("user");
            }
            
		} catch (e) {
			alert(e.toString());
			return;
		}
    };

    const GetUser = async () => {
        try {
            const userinfo = JSON.parse(localStorage.getItem('user') || '{}');
            if (!userinfo || !userinfo.UserId) {
                throw new Error('User information not available');
            }
            const response = await fetch(`${base_url}/api/info/${userinfo.UserId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userinfo.accessToken}`
                },
                credentials: 'same-origin',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            var res = await response.json();

            if (res.error) {
                setMessage('Unable to get User');
            } else {
                setSettings(res.UserAccount);
                setMessage('Success');
            }
        } catch (e) {
            setMessage(`Error: ${e.message}`);
        }
    };


    return (

        <div className="settings-container">
            <Container onLoad={GetUser}>
                <Row>
                    <Col sm={3} md={6} className="settingsInfo">
                        <Row>
                            <h3> Username </h3>
                            <p>{settings.UserName}</p>
                        </Row>
                        <Row>
                            <h3>Password</h3>
                            <p>{settings.Password}</p>
                        </Row>
                        <Row>
                            <h3>First Name</h3>
                            <p>{settings.FirstName}</p>
                        </Row>
                        <Row>
                            <h3>Last Name</h3>
                            <p>{settings.LastName}</p>
                        </Row>
                        <Row>
                            <h3>Email</h3>
                            <p>{settings.Email}</p>
                        </Row>

                    </Col>
                    <Col sm={3} md={6} className="settings-content">
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono"></link>
                        <form className='addBudgetForm'>
                        <div className="form-row">
                            <div className="form-group">
                            <label htmlFor="inputUserName">Username</label>
                            <input type="text" placeholder = {settings.UserName} className="form-control" id="inputUserName"/>
                            </div>
                            <div className="form-group">
                            <label htmlFor="inputPassword">Password</label>
                            <input type="text" placeholder = {settings.Password} className="form-control" id="inputPassword"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputFirstName">First Name</label>
                            <input type="text" placeholder = {settings.FirstName} className="form-control" id="inputFirstName"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputLastName">Last Name</label>
                            <input type="text" placeholder = {settings.LastName} className="form-control" id="inputLastName"/>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="inputEmail">Email</label>
                                <input type="text" placeholder = {settings.Email} className="form-control" id="inputEmail"/>
                            </div>
                        </div>
                        <button type="submit" className="editaccbtn btn-primary" onClick={EditUser}>Edit Account</button>
                        <button type="submit" className="delaccbtn btn-primary" onClick={DeleteUser}>Delete Account</button>
                        {message && !message.startsWith('Success') && (
                <div style={{ color: 'red', marginTop: '10px' }}>{message}</div>)}
                        </form>
                    </Col>
                </Row>
            </Container>
        </div>

        
    );
}

export default SettingsPage;
