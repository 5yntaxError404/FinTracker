// src/LandingPage.js
import React, {useState} from 'react';
import '../css/AccountsPage.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Error } from 'mongoose';

// Looking for correct code to import font


function AccountsPage() {

    // Constants needed for the page
    const [accounts, setAccounts] = useState([]);
    const [message, setMessage] = useState('');
    
    const base_url = process.env.NODE_ENV === "production"
    ? `https://www.fintech.davidumanzor.com`
    : `http://localhost:5000`;

    const RefreshToken = async () => {
        const userinfo = JSON.parse(localStorage.getItem('refresh'));
        console.log(userinfo);
        try {
            
            var js = JSON.stringify({ refreshToken: userinfo.refreshToken }); 
            console.log(js);
            const response = await fetch(
                `${base_url}/api/token`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userinfo.accessToken}`
                    },
                    body: js,
                    credentials: 'same-origin',
                });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const res = await response.json(); // Use the .json() method to parse the JSON response
    
            console.log(res);
            console.log("Token Refreshed");
        }
        catch (e) {
            alert(e.toString());
            return;
        }
    };

    const validateInput = (inputElement, fieldName) => {
        try {
            const valuelength = inputElement.length;
            const value = inputElement;

            if ((valuelength < 8 || valuelength > 12) && fieldName == 'Account Number') {
                throw new Error(`Invalid ${fieldName}: Account numbers must be 8-12 digits long.`);
            }

            if ((valuelength != 9) && fieldName == 'Route Number') {
                throw new Error(`Invalid ${fieldName}: Route numbers must be 9 digits long.`);
            }
            
            if(valuelength == 0){
                throw new Error(`Invalid ${fieldName}: Please enter an account number, route number, and bank name.`);
            }

            return value;
        } catch (error) {
            setMessage(error.message);
            throw error;
        }
    };

    // Adds and Edits Budget in DB and updates webpage
    const addAccount = async event =>
    {
        event.preventDefault();

        let AccountNum = document.getElementById("inputAccountNum").value;
        let RouteNum = document.getElementById("inputRouteNum").value;
        let BankName = document.getElementById("inputBankName").value;
        
        const validatedAccountNum = validateInput(AccountNum, "Account Number");
        const validatedRouteNum = validateInput(RouteNum, "Route Number");
        const validatedBankName = validateInput(BankName, "Bank Name");
		
        var obj = {
            AccountNum: String(validatedAccountNum),
            RouteNum: String(validatedRouteNum),
            BankName: String(validatedBankName),
		};
		var js = JSON.stringify(obj);
        
		try {
            const userinfo = JSON.parse(localStorage.getItem('user'));

            console.log(userinfo);
            console.log(userinfo.UserId);

            const response = await fetch(
                `${base_url}/api/accounts/add/${userinfo.UserId}`,
                {
                method: 'POST',
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
                setMessage('Unable to get accounts'); // Set an error message
                console.log("Some error");
            } 
            else {
                RefreshToken();
                setMessage('Success');
                GetAccounts();
            }

		} catch (e) {
			console.error(e);
			setMessage('An error occurred while adding the account.');
		}
    };

    // Obtains budget from DB and updates webpage
    const GetAccounts = async () =>
    {
        try {
            const userinfo = JSON.parse(localStorage.getItem('user'));
            console.log(userinfo);
            console.log(userinfo.UserId);
            
            const response = await fetch(
                `${base_url}/api/accounts/`,
                {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userinfo.accessToken}`
                },
                credentials: 'same-origin',
            });

            if (!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            if (response.headers.get('Content-Type').includes('application/json')) {
                var res = JSON.parse(await response.text());
                console.log(res);
    
                if (res.error) {
                    setMessage('Unable to get accounts'); // Set an error message
                    console.log('Some error');
                } 
                else {
                    RefreshToken();
                    setAccounts(res);
                    setMessage('Success');
                }
            } else {
                throw new Error('Did not receive JSON');
            }
            
		} catch (e) {
			console.error(e.toString());
            setMessage('An error occurred while fetching accounts.');
		}
    };

    const EditAccount = async (AccountNum) => 
    {
        const NewAccountNum = parseInt(document.getElementById("inputAccountNum").value);
        const NewRouteNum = parseInt(document.getElementById("inputRouteNum").value);
        const NewBankName = document.getElementById("inputBankName").value;
        
		var obj = {
            newAccountNum: NewAccountNum,
            newRouteNum: NewRouteNum,
            newBankName: NewBankName,
            oldAccountNum: AccountNum,
		};
		var js = JSON.stringify(obj);
        
		try {
            const userinfo = JSON.parse(localStorage.getItem('user'));

            console.log(userinfo);
            console.log(userinfo.UserId);

            const response = await fetch(
                `${base_url}/api/accounts/edit/${userinfo.UserId}`,
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
                setMessage('There was an error in your inputs.'); // Set an error message
                console.log("Some error");
            } 
            else {
                RefreshToken();
                setMessage('Success');
                GetAccounts();
            }

		} catch (e) {
			console.error(e.toString());
            setMessage('An error occurred while editing the account.');
		}
    };

    const deleteAccount = async (id) => 
    {
        try {
            const userinfo = JSON.parse(localStorage.getItem('user'));
            console.log(userinfo);
            console.log(userinfo.UserId);

            const js = JSON.stringify({AccountNum: id})
            
            const response = await fetch(
                `${base_url}/api/accounts/delete/`,
                {
                method: 'DELETE',
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
                setMessage('Unable to delete account'); // Set an error message
                console.log('Some error');
            } 
            else {
                RefreshToken();
                setMessage('Success');
                GetAccounts();
            }
            
		} catch (e) {
			console.error(e.toString());
            setMessage('An error occurred while deleting the account.');
		}
    };

    return (

        <div className="accounts-container">
            <Container onLoad={GetAccounts}>
                <Row>

                    <Col md={3} className="accountsInfo">
                        {accounts.map(accounts => (
                            <Row className="account" key={accounts._id}>
                                <p>Bank Name: {accounts.BankName}</p>
                                <p>Account Number: {accounts.AccountNum}</p>
                                <p>Routing Number: {accounts.RouteNum}</p>
                                <Col>
                                <button className="account_button" onClick={() => EditAccount(accounts.AccountNum)}> Edit Account</button>
                                </Col>
                                <Col>
                                <button className="account_button" onClick={() => deleteAccount(accounts.AccountNum)}> Delete Account </button>
                                </Col>
                            </Row>
                        ))}
                    </Col>
                    <Col className="accounts-content">
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono"></link>
                        <form className='addBudgetForm'>
                        <div className="form-row">
                            <div className="form-group">
                            <label htmlFor="inputAccountNum">Account Number</label>
                            <input type="number" className="form-control" id="inputAccountNum"/>
                            </div>
                            <div className="form-group">
                            <label htmlFor="inputRouteNum">Route Number</label>
                            <input type="number" className="form-control" id="inputRouteNum"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputBankName">Bank Name</label>
                            <input type="text" className="form-control" id="inputBankName"/>
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={addAccount}>Add Account</button>
                        {message && !message.startsWith('Success') && (
                <div style={{ color: 'red', marginTop: '10px' }}>{message}</div>
            )}
                        </form>
                    </Col>
                </Row>
            </Container>
        </div>

        
    );
}

export default AccountsPage;
