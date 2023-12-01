import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/DashPage.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Pie } from 'react-chartjs-2'

import CircleProgress from './CircleChart'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PieController,
    ArcElement,
    Tooltip,
    Legend
  } from 'chart.js';

const Dash = (props) => {

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
        savedAmt: 0,
        monthlyExpensesAmt: 0,
        transactionsAmt: 0,
    })
    const [message,setMessage] = useState('');
    const [accounts, setAccounts] = useState([]);
    const [transactions, setTransactions] = useState([]);

    const base_url = process.env.NODE_ENV === "production"
    ? `https://www.fintech.davidumanzor.com`
    : `http://localhost:5000`;

        // Obtains budget from DB and updates webpage
        const GetAccounts = async () =>
        {
            try {
                const userinfo = JSON.parse(localStorage.getItem('user'));
                
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

    // Obtains budget from DB and updates webpage
    const GetBudget = async () =>
    {
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
                setMessage('Unable to get Budget'); // Set an error message
                console.log('Some error');
            } 
            else {
                var temp = {
                    income: res.budgetGot.MonthlyIncome,
                    goalDescription: res.budgetGot.GoalDescription,
                    goalAmt: res.budgetGot.GoalAmt,
                    savedAmt: res.budgetGot.SavedAmt,
                    transactionAmt: res.budgetGot.TransactionAmt,
                    monthlyExpensesAmt: res.budgetGot.MonthlyExpensesAmt
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

    // Obtains budget from DB and updates webpage
    const GetTransactions = async() =>
    {
        try {
            const userinfo = JSON.parse(localStorage.getItem('user'));
            
            const response = await fetch(
                `${base_url}/api/budgets/transactions/get/${userinfo.UserId}`,
                {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userinfo.accessToken}`
                },
                credentials: 'same-origin',
            });
            var check = response.text();
            var res = JSON.parse(await check);
            console.log(res);

            if (res.error) {
                setMessage('Unable to get Budget'); // Set an error message
                console.log('Some error');
            } 
            else {
                setTransactions(res);
                setMessage('Success');
            }
            
        } catch (e) {
            console.log(check);
            if(check.value == "Forbidden")
            {
                window.location.href = '/login';
            }
            alert(e.toString());
            return;
        }
    };

    // Obtains budget from DB and updates webpage
    const GetAchievements = async() =>
    {
        try {
            const userinfo = JSON.parse(localStorage.getItem('user'));
            
            const response = await fetch(
                `${base_url}/api/budgets/transactions/get/${userinfo.UserId}`,
                {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userinfo.accessToken}`
                },
                credentials: 'same-origin',
            });
            var check = response.text();
            var res = JSON.parse(await check);
            console.log(res);

            if (res.error) {
                setMessage('Unable to get Budget'); // Set an error message
                console.log('Some error');
            } 
            else {
                setTransactions(res);
                setMessage('Success');
            }
            
        } catch (e) {
            console.log(check);
            if(check.value == "Forbidden")
            {
                window.location.href = '/login';
            }
            alert(e.toString());
            return;
        }
    };

    useEffect(() => {
        const loadData = async () => {
          try {
            // Delaying the execution to ensure all setups are complete
            await new Promise(resolve => setTimeout(resolve, 1000));
      
            await Promise.all([
              GetBudget(),
              GetAccounts(),
              GetTransactions()
            ]);
      
            console.log('All data fetched successfully');
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        loadData();
    }, []);

    const goToTransaction = async () =>
    {
        window.location.href="/transactions";
    }

    const data = {
        labels: ['Income', 'Expenses'],
        datasets: [
          {
            data: [budget.income, budget.monthlyExpensesAmt],
            backgroundColor: ['#FF6384', '#FFFFFF'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB']
          }
        ]
    };
      
      // Registering the required components
      ChartJS.register(
        CategoryScale,
        LinearScale,
        PieController,
        ArcElement,
        Tooltip,
        Legend
      );

    return (
        <div className="background">
        <Container className='widget-box'>
            <Row>
                <Col md={12} className="widget">
                    <Row>
                        <Col>
                        <h2>Hello User!</h2>
                        <p>Monthly Income: ${budget.income.toLocaleString()}</p>

                        {/* Expenses List */}
                        <div className="expenses-list">
                            <h4>Monthly Expenses:</h4>
                            <ul>
                                {Object.keys(budget).map((key) => {
                                    if (key !== 'income' && key !== 'goal' && key !== 'goalDescription' && key !== 'goalAmt' && key !== 'savedAmt' && key !== 'transactionAmt' && key !== 'monthlyExpensesAmt') {
                                        return <li key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}: ${budget[key]}</li>;
                                    }
                                    return null;
                                })}
                            </ul>
                        </div>
                        </Col>
                        <Col>
                            {/*<CircleProgress spent={(budget.savedAmt)} income={budget.income}/>*/}
                            <Pie data={data} />
                        </Col>
                        <Col>
                            {/* Placeholder for transactions and achievements */}
                            <div className="transactions">
                                <h4>Transactions</h4>
                                {/* Map through transactions and display them */}
                                {transactions.map(transactions => (
                                <Row className="transaction" key={transactions.Transactions.transactionID}>
                                    <p>{transactions.Transactions.transactionCategory} Transaction for: ${transactions.Transactions.transactionAmt}</p>
                                </Row>
                        ))}
                            </div>
                            <button className="btn btn-primary">Add Transaction</button>
                        </Col>

                    </Row>
                </Col>
                {/* Transactions and Achievements could be other <Col> components */}
            </Row>
            <Row>
                <Col className='widget'>
                    {/* Current Budget Goal */}
                    <div className="budget-goal">
                        <h3>Current Budget Goal: {budget.goalDescription}</h3>
                        <p>Total: ${budget.savedAmt.toLocaleString()} / ${budget.goalAmt.toLocaleString()} </p>
                        <ProgressBar now={`${budget.savedAmt/budget.goalAmt}`} label={`${budget.savedAmt/budget.goalAmt}%`} />
                    </div>
                </Col>
                <Col className='widget'>
                    <div className="achievements">
                        <h4>Achievements</h4>
                        {/* Map through achievements and display them */}
                        {/*
                        {achievements.map(achievements => (
                        <Row className="transaction" key={achievements.Transactions.transactionID}>
                            <p>{achievements.Transactions.transactionCategory} Transaction for: ${achievements.Transactions.transactionAmt}</p>
                        </Row>
                        ))};
                        */}
                    </div>
                </Col>
            </Row>
        </Container>
      </div>
);
}
export default Dash;

