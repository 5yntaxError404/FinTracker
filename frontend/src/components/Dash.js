import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../css/DashPage.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; 

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
    const [achievements, setAchievements] = useState([]);

    const base_url = process.env.NODE_ENV === "production"
    ? `https://www.fintech.davidumanzor.com`
    : `http://localhost:5000`;
  
    // Obtains accounts from DB and updates webpage
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
                    transactionsAmt: res.budgetGot.TransactionsAmt,
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

    // Obtains transactions from DB and updates webpage
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

    const GetAchievements = async () => {
        try {
            const userinfo = JSON.parse(localStorage.getItem('user'));
            if (!userinfo || !userinfo.UserId || !userinfo.accessToken) {
                console.error("User info not found in localStorage");
                // Optionally, redirect to login or show an error message
                return;
            }
    
            const response = await fetch(
                `${base_url}/api/achievements/get/${userinfo.UserId}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userinfo.accessToken}`
                    },
                    credentials: 'same-origin',
                }
            );
    
            const responseText = await response.text();
            console.log("Raw response:", responseText); // Log the raw response
    
            if (!response.ok) {
                console.error("HTTP Error: ", response.status);
                // Handle HTTP error, such as showing an error message
                return;
            }
    
            let res;
            try {
                res = JSON.parse(responseText);
            } catch (e) {
                console.error("JSON Parsing Error: ", e);
                // Handle JSON parsing error, such as showing an error message
                return;
            }
    
            if (res.error) {
                console.error('API Error:', res.error);
                setMessage('Unable to get Achievements');
                return;
            }
    
            setAchievements(res);
            setMessage('Success');
        } catch (e) {
            console.error("Catch Error: ", e.message);
            alert(e.toString());
            if (e.message === "User info not found in localStorage" || e.message === "Forbidden") {
                window.location.href = '/login';
            }
            return;
        }
    };
    
    /*

    const RefreshToken = async () => {
        const userinfo = JSON.parse(localStorage.getItem('user'));
        try {
            await fetch(
                `${base_url}/api/token`,
                {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userinfo.accessToken}`
                },
                credentials: 'same-origin',
            });
        }
        catch (e) {
            alert(e.toString());
            return;
        }
    };
    */

    useEffect(() => {
        const loadData = async () => {
          try {
            // Delaying the execution to ensure all setups are complete
            await new Promise(resolve => setTimeout(resolve, 1000));
      
            await Promise.all([

              //  RefreshToken(),

                GetBudget(),
                GetAccounts(),
                GetTransactions(),
                GetAchievements(),
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

    const remainingIncome = (budget.income - budget.transactionsAmt) < 0 ? 0 : (budget.income - budget.transactionsAmt);
    const data = {
        datasets: [
          {
            data: [remainingIncome, budget.transactionsAmt],
            backgroundColor: ['#8f5985', 'red'],
            hoverBackgroundColor: ['green', 'white'],
            borderWidth: 1, // No border to make the chart smoother
            hoverBorderWidth: 0, // Keep edges smooth on hover
            borderColor: 'black'
          }
        ],
        // Include animation options for smooth drawing
        animation: {
          animateScale: true,
          animateRotate: true
        }
      };

    const completedAchievements = achievements.filter(achievement => achievement.achievementAdded.Completed);
      
      // Registering the required components
      ChartJS.register(
        CategoryScale,
        LinearScale,
        PieController,
        ArcElement,
        Tooltip,
        Legend
      );

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
                type: 'pie',
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
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0
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
                    hoverOffset: 20,
                    responsive: true,
                    width : 50,
                    height : 50, // Adjust as needed, this controls the offset on hover
                }
            });
        }
    }, [budget]);
    return (
        <div className="background">
        <Container className='widget-box'>
            <Row>
                <Col md={12} className="widget">
                    <Row>
                        <Col>
                        <h2>Hello User!</h2>
                        <p1>Monthly Income: ${budget.income.toLocaleString()}</p1>

                        {/* Expenses List */}
                        <div>
                            <h44>Monthly Expenses:</h44>
                            <ul>
                                {Object.keys(budget).map((key) => {
                                    if (key !== 'income' && key !== 'goal' && key !== 'goalDescription' && key !== 'goalAmt' && key !== 'savedAmt' && key !== 'transactionsAmt' && key !== 'monthlyExpensesAmt') {
                                        return <li className='expenses-list' key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}: ${budget[key]}</li>;
                                    }
                                    return null;
                                })}
                            </ul>
                        </div>
                        </Col>
                        <Col>
                        {(
                            <div class = "chart-container">
                            <canvas id="budgetChart"></canvas>
                            </div>
                        )}
                            {(
                                <div className='doughnut-chart' style={{ width: '350px', height: '300px'}}>
                                     <Doughnut data={data}/>
                                     <p> ${budget.transactionsAmt} / ${budget.income} </p>
                                </div>
                               
                            )}
                        </Col>
                        <Col>
                            {/* Placeholder for transactions and achievements */}
                            <div className="transactions">
                                <h4>Recent Transactions</h4>
                                {/* Check if there are transactions */}
                                {transactions.length > 0 ? (
                                    transactions.slice(0, 5).map((transaction) => (
                                        <Row className="transactionn" key={transaction.Transactions.transactionID}>
                                            <p> {transaction.Transactions.transactionCategory}: - ${transaction.Transactions.transactionAmt}</p>
                                        </Row>
                                    ))
                                ) : (
                                    // Display a message when there are no transactions
                                    <p1>No recent transactions.</p1>
                                )}
                            </div>
                            <button className="btn btnn-primary" onClick={() => window.location.href='/transactions'}>Add Transaction</button>
                        </Col>

                    </Row>
                </Col>
                {/* Transactions and Achievements could be other <Col> components */}
            </Row>
            <Row>
                <Col className='widget-budget'>
                    {/* Current Budget Goal and Category Expenses */}
                    <div className="budget-goal">
                        <h3>Current Budget Goal: {budget.goalDescription}</h3>
                        <p>Total: ${budget.savedAmt.toLocaleString()} / ${budget.goalAmt.toLocaleString()}</p>
                        <ProgressBar className = "progress-bar-gameified"
                            now={budget.savedAmt}
                            min={0}
                            max={budget.goalAmt}
                            style={{
                                borderRadius: '10px',
                                height: '50px',
                                overflow: 'hidden',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                            }}
                            variant = 'success'
                            label={`${(budget.savedAmt / budget.goalAmt * 100).toFixed(2)}%`}/>
                    </div>
                </Col>
                <Col className='widget-ach'>
                    <div className="achievements">
                        <h4>Achievements</h4>
                        {/* Check if there are any completed achievements */}
                        {completedAchievements.length > 0 ? (
                            completedAchievements.map(achievement => (
                                <Row className="achievement" key={achievement.achievementAdded.achievementId}>
                                    <p>{achievement.achievementAdded.AchievementName}: {achievement.achievementAdded.Description}</p>
                                </Row>
                            ))
                        ) : (
                            // Display a default message if there are no completed achievements
                            <Row className="achievement">
                                <p>No achievements completed yet. Keep going!</p>
                            </Row>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
      </div>
);
}
export default Dash;

