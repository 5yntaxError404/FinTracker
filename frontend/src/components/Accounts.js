// src/AccountsPage.js
import React, { useState, useEffect } from 'react';
import '../css/LandingPage.css';
import '../css/AccountsPage.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function AccountsPage() {
    const [accounts, setAccounts] = useState([]);
    const [message, setMessage] = useState('');

    const base_url = process.env.NODE_ENV === "production"
        ? `https://www.fintech.davidumanzor.com`
        : `http://localhost:5000`;

    const addAccount = async (event) => {
        event.preventDefault();

        let AccountNum = document.getElementById("inputAccountNum").value;
        let RouteNum = document.getElementById("inputRouteNum").value;
        let BankName = document.getElementById("inputBankName").value;

        var obj = {
            AccountNum: AccountNum,
            RouteNum: RouteNum,
            BankName: BankName,
        };

        var js = JSON.stringify(obj);

        try {
            const userinfo = JSON.parse(localStorage.getItem('user'));
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
                setMessage('Unable to get accounts');
                console.log("Some error");
            } else {
                setMessage('Success');
                GetAccounts();
            }

        } catch (e) {
            alert(e.toString());
            return;
        }
    };

    const GetAccounts = async () => {
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
                }
            );

            var res = JSON.parse(await response.text());
            console.log(res);

            if (res.error) {
                setMessage('Unable to get accounts');
                console.log('Some error');
            } else {
                // Prepend new accounts to the existing list
                setAccounts((prevAccounts) => [...res, ...prevAccounts]);

                setMessage('Success');

                // Scroll to the top of the container
                const accountsContainer = document.querySelector('.accountsInfo');
                if (accountsContainer) {
                    accountsContainer.scrollTop = 0;
                }
            }
        } catch (e) {
            alert(e.toString());
            return;
        }
    };

    const EditAccount = async (AccountNum) => {
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
                setMessage('Unable to get accounts'); // Set an error message
                console.log("Some error");
            } else {
                setMessage('Success');
                GetAccounts();
            }

        } catch (e) {
            alert(e.toString());
            return;
        }
    };

    const deleteAccount = async (id) => {
        try {
            const userinfo = JSON.parse(localStorage.getItem('user'));
            console.log(userinfo);
            console.log(userinfo.UserId);

            const js = JSON.stringify({ AccountNum: id });

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
            } else {
                setMessage('Success');
                GetAccounts();
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
                        {accounts.map((account, index) => (
                            <Row className="account" key={index}>
                                <p>Bank Name: {account.BankName}</p>
                                <p>Account Number: {account.AccountNum}</p>
                                <p>Routing Number: {account.RouteNum}</p>
                                <Col>
                                    <button className="account_button" onClick={() => EditAccount(account.AccountNum)}> Edit Account</button>
                                </Col>
                                <Col>
                                    <button className="account_button" onClick={() => deleteAccount(account.AccountNum)}> Delete Account </button>
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
                                    <input type="number" className="form-control" id="inputAccountNum" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputRouteNum">Route Number</label>
                                    <input type="number" className="form-control" id="inputRouteNum" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputBankName">Bank Name</label>
                                <input type="text" className="form-control" id="inputBankName" />
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
