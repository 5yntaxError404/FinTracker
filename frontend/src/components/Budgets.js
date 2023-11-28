// src/BudgetPage.js
import React, { useState } from 'react';
import '../css/LandingPage.css';
import '../css/BudgetsPage.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Looking for correct code to import font

function BudgetPage() {

    // Constants needed for the page

    const [budget, setBudget] = useState({
        income: 0,
        rent: 0,
        utilities: 0,
        groceries: 0,
        insurance: 0,
        phone: 0,
        car: 0,
        gas: 0,
        fun: 0,
        goal: 0,
        goalDescription: '',
        goalAmt: 0,
        savedAmt: 0
    })
    const [message,setMessage] = useState('');
    
    const base_url = process.env.NODE_ENV === "production"
    ? `https://www.fintech.davidumanzor.com`
    : `http://localhost:5000`;

    // Adds and Edits Budget in DB and updates webpage
    const AddBudget = async event =>
    {
        event.preventDefault();

        let income = document.getElementById("inputIncome");
        let rent = document.getElementById("inputRent");
        let utilities = document.getElementById("inputUtilities");
        let groceries = document.getElementById("inputGroceries");
        let insurance = document.getElementById("inputInsurance");
        let phone = document.getElementById("inputPhone");
        let car = document.getElementById("inputCar");
        let gas = document.getElementById("inputGas");
        let fun = document.getElementById("inputFun");
        let goal = document.getElementById("inputGoal");
        let goalDescription = document.getElementById("inputGoalDescription");
        let goalAmt = document.getElementById("inputGoalAmt");
        let savedAmt = document.getElementById("inputSavedAmt");

		var obj = {
            MonthlyIncome: income.value,
            rent: rent.value,
            utilities: utilities.value,
            groceries: groceries.value,
            insurance: insurance.value,
            phone: phone.value,
            car: car.value,
            gas: gas.value,
            fun: fun.value,
            goal: goal.value,
            GoalDescription: goalDescription.value,
            GoalAmt: goalAmt.value,
            SavedAmt: savedAmt.value,
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
                setBudget(obj);
                setMessage('Success');
            }

		} catch (e) {
			alert(e.toString());
			return;
		}
    };

    // Obtains budget from DB and updates webpage
    const GetBudget = async () =>
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
            console.log(res.budgetGot.MonthlyExpenses);
            console.log(res.budgetGot.MonthlyExpenses.rent);

			if (res.error) {
                setMessage('Unable to get Budget'); // Set an error message
                console.log('Some error');
            } 
            else {
                var temp = {
                    income: res.budgetGot.MonthlyIncome,
                    goalDescription: res.budgetGot.GoalDescription,
                    goalAmt: res.budgetGot.GoalAmt,
                    savedAmt: res.budgetGot.SavedAmt,
                }
                var newBudget = Object.assign({}, temp, res.budgetGot.MonthlyExpenses);

                setBudget(newBudget);
                setMessage('Success');
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
                            <Col>
                                Income
                                <p>{budget.income}</p>
                            </Col>
                            <Col>
                                Rent
                                <p>{budget.rent}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            Utilities
                            <p>{budget.utilities}</p>
                            </Col>
                            <Col>
                            Groceries
                            <p>{budget.groceries}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            Insurance
                            <p>{budget.insurance}</p>
                            </Col>
                            <Col>
                            Phone
                            <p>{budget.phone}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            Car
                            <p>{budget.car}</p>
                            </Col>
                            <Col>
                            Gas
                            <p>{budget.gas}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            Fun
                            <p>{budget.fun}</p>
                            </Col>
                            <Col>
                            Goal
                            <p>{budget.goal}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            Goal Description
                            <p>{budget.goalDescription}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            Goal Amount
                            <p>{budget.goalAmt}</p>
                            </Col>
                            <Col>
                            Amount Saved towards Goal
                            <p>{budget.savedAmt}</p>
                            </Col>
                        </Row>
                        

                    </Col>
                    <Col sm={3} md={6} className="content">
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono"></link>
                        <form className='addBudgetForm'>
                                <Container>
                                    <Row>
                                        <Col>
                                        <label htmlFor="inputIncome">Income</label>
                                        <input type="number" className="form-control" id="inputIncome"/>
                                        </Col>
                                        
                                        <Col>
                                        <label htmlFor="inputRent">Rent</label>
                                        <input type="number" className="form-control" id="inputRent"/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                        <label htmlFor="inputUtilities">Utilities</label>
                                        <input type="number" className="form-control" id="inputUtilities"/>
                                        </Col>
                                        <Col>
                                        <label htmlFor="inputGroceries">Groceries</label>
                                        <input type="number" className="form-control" id="inputGroceries"/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                        <label htmlFor="inputInsurance">Insurance</label>
                                        <input type="number" className="form-control" id="inputInsurance"/>
                                        </Col>
                                        <Col>
                                        <label htmlFor="inputPhone">Phone</label>
                                        <input type="number" className="form-control" id="inputPhone"/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                        <label htmlFor="inputCar">Car</label>
                                        <input type="number" className="form-control" id="inputCar"/>
                                        </Col>
                                        <Col>
                                        <label htmlFor="inputGas">Gas</label>
                                        <input type="number" className="form-control" id="inputGas"/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                        <label htmlFor="inputFun">Fun</label>
                                        <input type="number" className="form-control" id="inputFun"/>
                                        </Col>
                                        <Col>
                                        <label htmlFor="inputGoal">Goal</label>
                                        <input type="number" className="form-control" id="inputGoal"/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                        <label htmlFor="inputGoal">Goal Description</label>
                                        <input type="text" className="form-control" id="inputGoalDescription"/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                        <label htmlFor="inputGoal">Goal Amount</label>
                                        <input type="number" className="form-control" id="inputGoalAmt"/>
                                        </Col>
                                        <Col>
                                        <label htmlFor="inputGoal">Saved Amount</label>
                                        <input type="number" className="form-control" id="inputSavedAmt"/>
                                        </Col>
                                    </Row>
                                    <Row>
                                    <button type="submit" className="btn btn-primary" onClick={AddBudget}>Edit Budget</button>
                                    </Row>
                                </Container>
                        </form>
                    </Col>
                </Row>
            </Container>
        </div>

        
    );
}

export default BudgetPage;