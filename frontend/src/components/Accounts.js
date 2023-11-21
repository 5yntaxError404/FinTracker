// src/LandingPage.js
import React, {useState} from 'react';
import '../css/LandingPage.css';
import '../css/AccountsPage.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Looking for correct code to import font


function AccountsPage() {

    // Constants needed for the page
    const [accounts, setAccounts] = useState([])
    const [message,setMessage] = useState('');
    
    const base_url = process.env.NODE_ENV === "production"
    ? `https://www.fintech.davidumanzor.com`
    : `http://localhost:5000`;

    // Adds and Edits Budget in DB and updates webpage
    const addAccount = async event =>
    {
        event.preventDefault();

        let AccountNum = document.getElementById("inputAccountNum");
        let RouteNum = document.getElementById("inputRouteNum");
        let BankName = document.getElementById("inputBankName");

		var obj = {
            AccountNum: AccountNum.value,
            RouteNum: RouteNum.value,
            BankName: BankName.value,
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
                setMessage('Success');
                GetAccounts();
            }

		} catch (e) {
			alert(e.toString());
			return;
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

			var res = JSON.parse(await response.text());
			console.log(res);

			if (res.error) {
                setMessage('Unable to get accounts'); // Set an error message
                console.log('Some error');
            } 
            else {
                setAccounts(res);
                setMessage('Success');
            }
            
		} catch (e) {
			alert(e.toString());
			return;
		}
    };

    const EditAccount = async () => 
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

			var res = JSON.parse(await response.text());
			console.log(res);

			if (res.error) {
                setMessage('Unable to get accounts'); // Set an error message
                console.log('Some error');
            } 
            else {
                setAccounts(res);
                setMessage('Success');
            }
            
		} catch (e) {
			alert(e.toString());
			return;
		}
    };

    const deleteAccount = async () => 
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

			var res = JSON.parse(await response.text());
			console.log(res);

			if (res.error) {
                setMessage('Unable to get accounts'); // Set an error message
                console.log('Some error');
            } 
            else {
                setAccounts(res);
                setMessage('Success');
            }
            
		} catch (e) {
			alert(e.toString());
			return;
		}
    };

    return (

        <div className="landing-container">
            <Container onLoad={GetAccounts}>
                <Row>

                    <Col sm={1} md={3} className="accountsInfo">
                        {accounts.map(accounts => (
                            <Row className="account" key={accounts._id}>
                                <p>Bank Name: {accounts.BankName}</p>
                                <p>Account Number: {accounts.AccountNum}</p>
                                <p>Routing Number: {accounts.RouteNum}</p>
                                <Col>
                                <button className="account_button" onClick={() => EditAccount(accounts._id)}> Edit Account</button>
                                </Col>
                                <Col>
                                <button className="account_button" onClick={() => deleteAccount(accounts._id)}> Delete Account </button>
                                </Col>
                                
                            </Row>
                        ))}
                    </Col>
                    <Col sm={3} md={6} className="content">
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
                        <button type="submit" className="btn btn-primary" onClick={addAccount}>Add Budget</button>
                        </form>
                    </Col>
                </Row>
            </Container>
        </div>

        
    );
}

export default AccountsPage;
