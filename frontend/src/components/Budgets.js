// src/BudgetPage.js

import React, { useState, useEffect } from 'react';
import '../css/BudgetsPage.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Chart from 'chart.js/auto'; 
import ChartDataLabels from 'chartjs-plugin-datalabels';

function BudgetPage() {
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
    });

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
            const value = parseFloat(inputElement.value);

            if (value < 0) {
                throw new Error(`Invalid ${fieldName}: Please enter a non-negative number.`);
            }
            
            if(isNaN(value) && fieldName == "Income"){
                throw new Error(`Invalid ${fieldName}: Please enter a positive number for your income.`);
            }else if (isNaN(value)){
                inputElement.value = 0;
            }

            if (value.toString().includes('.') && (value.toString().split('.')[1].length > 2)) {
                throw new Error(`Invalid ${fieldName}: Please enter up to two decimal places.`);
            }
            return value.toFixed(2);
        } catch (error) {
            setMessage(error.message);
            throw error;
        }
    };

    const AddBudget = async (event) => {
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

            const validatedIncome = parseFloat(validateInput(income, 'Income'));
            const validatedRent = parseFloat(validateInput(rent, 'Rent'));
            const validatedUtilities = parseFloat(validateInput(utilities, 'Utilities'));
            const validatedGroceries = parseFloat(validateInput(groceries, 'Groceries'));
            const validatedInsurance = parseFloat(validateInput(insurance, 'Insurance'));
            const validatedPhone = parseFloat(validateInput(phone, 'Phone'));
            const validatedCar = parseFloat(validateInput(car, 'Car'));
            const validatedGas = parseFloat(validateInput(gas, 'Gas'));
            const validatedFun = parseFloat(validateInput(fun, 'Entertainment'));
            const validatedGoal = parseFloat(validateInput(goal, 'Monthly Savings'));
            const validatedGoalAmt = parseFloat(validateInput(goalAmt, 'Goal Amount'));
            const validatedSavedAmt = parseFloat(validateInput(savedAmt, 'Saved Amount'));

            var obj = {
                MonthlyIncome: validatedIncome,
                rent: validatedRent,
                utilities: validatedUtilities,
                groceries: validatedGroceries,
                insurance: validatedInsurance,
                phone: validatedPhone,
                car: validatedCar,
                gas: validatedGas,
                fun: validatedFun,
                goal: validatedGoal,
                GoalDescription: goalDescription.value.slice(0, 500), // Limit to 500 characters
                GoalAmt: validatedGoalAmt,
                SavedAmt: validatedSavedAmt,
            };

            const response = await fetch(
                `${base_url}/api/budgets/add/${userinfo.UserId}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userinfo.accessToken}`
                    },
                    body: JSON.stringify(obj),
                    credentials: 'same-origin',
                });

            var res = JSON.parse(await response.text());
            console.log(res);

            if (res.error) {
                setMessage('Unable to add Budget');
                console.log("Some error");
            } 
            else {
                var temp = {
                    income: res.budgetGot.MonthlyIncome,
                    goalDescription: res.budgetGot.GoalDescription,
                    goalAmt: res.budgetGot.GoalAmt,
                    savedAmt: res.budgetGot.SavedAmt,
                }
                var newBudget = Object.assign({}, temp, res.budgetGot.MonthlyExpenses);
                RefreshToken();
                setBudget(newBudget);
                setMessage('Success');
            }

        } catch (e) {
            console.error(e);
            return;
        }
        window.location.href = '/budgets';
    };

    const GetBudget = async () => {
        try {
            const userinfo = JSON.parse(localStorage.getItem('user'));
            
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

            if (res.error) {
                setMessage('Unable to get Budget');
                console.log('Some error');
            } else {
                var temp = {
                    income: res.budgetGot.MonthlyIncome,
                    goalDescription: res.budgetGot.GoalDescription,
                    goalAmt: res.budgetGot.GoalAmt,
                    savedAmt: res.budgetGot.SavedAmt,
                }
                var newBudget = Object.assign({}, temp, res.budgetGot.MonthlyExpenses);
                RefreshToken();
                setBudget(newBudget);
                setMessage('');
            }
            
        } catch (e) {
            alert(e.toString());
            return;
        }
    };

    useEffect(() => {
        const budgetData = {
            income: budget.income,
            rent: budget.rent,
            utilities: budget.utilities,
            groceries: budget.groceries,
            insurance: budget.insurance,
            phone: budget.phone,
            car: budget.car,
            gas: budget.gas,
            fun: budget.fun,
            goal: budget.goal,
        };

        const budgetLabels = Object.keys(budgetData);
        const budgetValues = Object.values(budgetData);

        const ctx = document.getElementById('budgetChart');
        
        if (ctx && ctx.chart) {
            ctx.chart.destroy();
        }
        
        if (ctx) {
            ctx.chart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ["Income", "Rent", "Utilities", "Groceries", "Insurance", "Phone", "Gas", "Car", "Entertainment", "Goal"],
                    datasets: [{
                        data: budgetValues,
                        backgroundColor: [
                            '#FF6384', // Vivid Pink
                            '#36A2EB', // Bright Blue
                            '#FFCE56', // Soft Yellow
                            '#4BC0C0', // Turquoise
                            '#9966FF', // Amethyst Purple
                            '#FF9F40', // Tangerine Orange
                            '#7CDDDD', // Powder Blue
                            '#C9CB3A', // Olive Green
                            '#FF9999', // Light Coral
                            '#99C24D'  // Apple Green
                        ],
                        
                        borderWidth: 1, // Width of the border between segments
                        borderColor: 'white', // Color of the border, white creates visible gaps
                        borderRadius: 5,
                    }],
                },
                options: {
                    layout: {
                        padding: {
                            top: 20,
                            right: 20,
                            bottom: 20,
                            left: 20
                        }
                    },
                    plugins: {                    
                        legend: {
                            display: false,
                            labels: {
                                color: '#f1f1f1'
                            },
                            fonts: {
                                size: 24
                            }
                        },
                        animation: {
                            animateRotate: true,
                            animateScale: true,
                        },
                    },
                    onHover: (event, chartElement) => {
                        event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
                    },
                    hoverOffset: 20, // Adjust as needed, this controls the offset on hover
                }
            });
        }
    }, [budget]);

    return (
        <div className="budget-container">
            <Container onLoad={GetBudget}>
                <Row>
                    <Col sm={3} md={6} className="budgetInfo">
                        <canvas id="budgetChart"></canvas>
                        <p> {budget.transactionsAmt} / {budget.income} </p>
                    </Col>
                    <Col sm={3} md={6} className="budget-content">
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
                                        <label htmlFor="inputFun">Entertainment</label>
                                        <input type="number" className="form-control" id="inputFun"/>
                                    </Col>

                                    <Col>
                                        <label htmlFor="inputGoal">Monthly Savings</label>
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
                                    <button type="submit" className="btn btn-primary" onClick={AddBudget}>Save Budget</button>
                                </Row>
                                {message && <div style={{ color: 'red', marginTop: '10px' }}>{message}</div>}
                            </Container>
                        </form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default BudgetPage;
