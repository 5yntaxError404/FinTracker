// src/BudgetPage.js
import React, { useState } from 'react';
import '../css/LandingPage.css';
import '../css/BudgetsPage.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Looking for correct code to import font

function TransactionsPage() {

    // Constants needed for the page
    const [transactions, setTransactions] = useState([]);
    const [message,setMessage] = useState('');
    
    const base_url = process.env.NODE_ENV === "production"
    ? `https://www.fintech.davidumanzor.com`
    : `http://localhost:5000`;

    // Adds and Edits Budget in DB and updates webpage
    const AddTransactions = async event =>
    {
        event.preventDefault();

        let rent = document.getElementById("inputRent");
        let utilities = document.getElementById("inputUtilities");
        let groceries = document.getElementById("inputGroceries");
        let insurance = document.getElementById("inputInsurance");
        let phone = document.getElementById("inputPhone");
        let car = document.getElementById("inputCar");
        let gas = document.getElementById("inputGas");
        let fun = document.getElementById("inputFun");
        let goal = document.getElementById("inputGoal");

		var obj = {
            rent: rent.value,
            utilities: utilities.value,
            groceries: groceries.value,
            insurance: insurance.value,
            phone: phone.value,
            car: car.value,
            gas: gas.value,
            fun: fun.value,
            goal: goal.value,
		};
		var js = JSON.stringify(obj);
        
		try {
            const userinfo = JSON.parse(localStorage.getItem('user'));

            console.log(userinfo);
            console.log(userinfo.UserId);

            const response = await fetch(
                `${base_url}/api/budgets/add/${userinfo.UserId}`,
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
                setMessage('Unable to add Budget'); // Set an error message
                console.log("Some error");
            } 
            else {
                setTransactions(obj);
                setMessage('Success');
            }

		} catch (e) {
			alert(e.toString());
			return;
		}
    };

    // Obtains budget from DB and updates webpage
    const GetTransactions = async () =>
    {
        try {
            const userinfo = JSON.parse(localStorage.getItem('user'));
            console.log(userinfo);
            console.log(userinfo.UserId);
            
            const response = await fetch(
                `${base_url}/api/budgets/get/${userinfo.UserId}`,
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
            console.log(res.budgetGot.Transactions);
            console.log(res.budgetGot.TransactionsAmt);

			if (res.error) {
                setMessage('Unable to get Budget'); // Set an error message
                console.log('Some error');
            } 
            else {
                setTransactions(res.budgetGot.Transactions);
                setMessage('Success');
            }
            
		} catch (e) {
			alert(e.toString());
			return;
		}
    };

    return (

        <div className="landing-container">
            <Container onLoad={GetTransactions}>
                <Row>
                <Col sm={1} md={3} className="accountsInfo">
                        {transactions.map(transactions => (
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
                    <Col sm={3} md={6} className="content">
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono"></link>
                        <form className='addBudgetForm'>
                        <div className="form-row">
                            <div className="form-group">
                            <label htmlFor="inputRent">Rent</label>
                            <input type="number" className="form-control" id="inputRent"/>
                            </div>
                            <div className="form-group">
                            <label htmlFor="inputUtilities">Utilities</label>
                            <input type="number" className="form-control" id="inputUtilities"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputGroceries">Groceries</label>
                            <input type="number" className="form-control" id="inputGroceries"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputInsurance">Insurance</label>
                            <input type="number" className="form-control" id="inputInsurance"/>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="inputPhone">Phone</label>
                                <input type="number" className="form-control" id="inputPhone"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputCar">Car</label>
                                <input type="number" className="form-control" id="inputCar"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputGas">Gas</label>
                                <input type="number" className="form-control" id="inputGas"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputFun">Fun</label>
                                <input type="number" className="form-control" id="inputFun"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputGoal">Goal</label>
                                <input type="number" className="form-control" id="inputGoal"/>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={AddBudget}>Add Budget</button>
                        </form>
                    </Col>
                </Row>
            </Container>
        </div>

        
    );
}

export default BudgetPage;