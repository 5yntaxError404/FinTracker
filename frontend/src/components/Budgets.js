// src/BudgetPage.js
import React, { useState, useEffect } from 'react';
import '../css/LandingPage.css';
import '../css/BudgetsPage.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';

// Looking for correct code to import font


const BudgetPage = (props) => {

    const rentRef = React.useRef(null);
    const utilitiesRef = React.useRef(null);
    const groceriesRef = React.useRef(null);
    const insuranceRef = React.useRef(null);
    const phoneRef = React.useRef(null);
    const carRef = React.useRef(null);
    const gasRef = React.useRef(null);
    const funRef = React.useRef(null);
    const goalRef = React.useRef(null);

    const [budget, setBudget] = useState({
        rent: 0,
        utilities: 0,
        groceries: 0,
        insurance: 0,
        phone: 0,
        car: 0,
        gas: 0,
        fun: 0,
        goal: 0
    })
    const [message,setMessage] = '';

	const EditBudget = async event =>
	{
        event.preventDefault();

        var rent, utilities, groceries, insurance, phone, car, gas, fun, goal;

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

			const response = await fetch('https://www.fintech.davidumanzor.com/api/budgets/edit/:UserId', {

				method: 'post',
				body: js,
				headers: 
                { 
                    'Content-Type': 'application/json' 
                }
			});
			var res = JSON.parse(await response.text());
			console.log(res);

			 if (res.error) {
                setMessage('Unable to Login'); // Set an error message
                console.log("Some error");
            } 
            else {
                setMessage('Budget Edited.'); // Set a success message

            }
		} catch (e) {
			alert(e.toString());
			return;
		}
	};

    const AddBudget = async event =>
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
        const [message,setMessage] = '';

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
            let response;
            let requestInit = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userinfo.accessToken}`
                },
                body: js,
                credentials: 'same-origin',
            }

            if (process.env.NODE_ENV === "production") {
                response = await fetch(
                    "https://www.fintech.davidumanzor.com/api/budgets/add/" + userinfo.UserId,
                    requestInit
                    );
                console.log("Made Call in Production");
            } 
            else {
                response = await fetch(
                    "http://localhost:5000/api/budgets/add/" + userinfo.UserId, 
                    requestInit
                    );
                console.log("Made Call in Local");
            };
            

			var res = JSON.parse(await response.text());
			console.log(res);

			 if (res.error) {
                setMessage('Unable to add Budget'); // Set an error message
                console.log("Some error");
            } 
            else {
                setMessage('Budget Added.'); // Set a success message

            }
		} catch (e) {
			alert(e.toString());
			return;
		}
        
    };

    const RemoveBudget = async event =>
    {

    };

    const GetBudget = async event =>
    {
        event.preventDefault();

        const [message,setMessage] = '';
        try {
            const userinfo = JSON.parse(localStorage.getItem('user'));
            console.log(userinfo);
            console.log(userinfo.UserId);
            let response;
            let requestInit = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userinfo.accessToken}`
                },
                credentials: 'same-origin',
            }

            if (process.env.NODE_ENV === "production") {
                response = await fetch(
                    "https://www.fintech.davidumanzor.com/api/budgets/get/" + userinfo.UserId,
                    requestInit
                    );
                console.log("Made Call in Production");
            } 
            else {
                response = await fetch(
                    "http://localhost:5000/api/budgets/get/" + userinfo.UserId, 
                    requestInit
                    );
                console.log("Made Call in Local");
            };
            

			var res = JSON.parse(await response.text());
			console.log(res);
            console.log(res.budgetGot.MonthlyExpenses);
            console.log(res.budgetGot.MonthlyExpenses.rent);

			if (res.error) {
                setMessage('Unable to get Budget'); // Set an error message
                console.log("Some error");
            } 
            else {
                //setMessage('Budget Got');
                const budget = res.budgetGot.MonthlyExpenses;
                setBudget(budget);
            }
            
		} catch (e) {
			alert(e.toString());
			return;
		}
        
    };

    return (

        <div className="landing-container">
            <Container onLoad={GetBudget}>
                <Row>
                    <Col sm={3} md={6} className="budgetInfo">
                        <Row>
                            Rent
                            <p>{budget.rent}</p>
                        </Row>
                        <Row>
                            Utilities
                            <p>{budget.utilities}</p>
                        </Row>
                        <Row>
                            Groceries
                            <p>{budget.groceries}</p>
                        </Row>
                        <Row>
                            Insurance
                            <p>{budget.insurance}</p>
                        </Row>
                        <Row>
                            Phone
                            <p>{budget.phone}</p>
                        </Row>
                        <Row>
                            Gas
                            <p>{budget.gas}</p>
                        </Row>
                        <Row>
                            Fun
                            <p>{budget.fun}</p>
                        </Row>
                        <Row>
                            Goal
                            <p>{budget.goal}</p>
                        </Row>
                        

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