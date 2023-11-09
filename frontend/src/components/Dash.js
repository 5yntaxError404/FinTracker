import React, { useState } from 'react';
import axios from 'axios';
import '../css/DashPage.css';
import LoggedInName from './LoggedInName';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';


const Dash = (props) => {

	const [message,setMessage] = useState('');
    
	const doLogin = async event =>
	{
        let loginEmail = document.querySelector("#loginUserName");
	    let loginPassword = document.querySelector("#loginPassword")
		event.preventDefault();
		var obj = {UserName:loginEmail.value,Password:loginPassword.value};
		//var js = JSON.stringify(obj);
		try
		{
            const response = await fetch('http://localhost:5000/api/login', {
            method: "POST",
            headers: {
                'Access-Control-Allow-Origin': '*'
			},
            body: JSON.stringify(obj),
        })
			var res = response.json;
			if( res.id <= 0 )
			{
				setMessage('User/Password combination incorrect');
			}
			else
			{
				setMessage('Got response use Logged In')
				//window.location.href = '/dash';
			}
		}
		catch(e)
		{
			alert(e.toString());
			return;
		}
	};


    return (
    <div className="background">
    <Container>
        <Row>
            <Col sm={3} md={6} className="widget" class="main">
                <LoggedInName />
            </Col>

            <Col sm={8} md={6} class="bar-chart" className="widget">
                
                <div className='graph'>
                <div/>
                <div class="barGraph">
                    <ul class="graph">
                    Current Progress
                    <span class="graph-barBack">
                        <li class="graph-bar" data-value="28.5">
                        <span class="graph-legend">Mon</span>
                        </li>
                        <ProgressBar now="28.5" max="100" />

                    </span>  

                    <span class="graph-barBack">    
                        <li class="graph-bar" data-value="85">
                        <span class="graph-legend">Tue</span>
                        </li>
                        <ProgressBar now="85" max="100" />
                    </span>

                    <span class="graph-barBack">    
                        <li class="graph-bar" data-value="70">
                        <span class="graph-legend">Wed</span>
                        </li>
                        <ProgressBar now="70" max="100" />
                    </span>

                    <span class="graph-barBack">    
                        <li class="graph-bar" data-value="50">
                        <span class="graph-legend">Thu</span>
                        </li>
                        <ProgressBar now="50" max="100" />
                    </span>

                    <span class="graph-barBack">    
                        <li class="graph-bar" data-value="68">
                        <span class="graph-legend">Fri</span>
                        </li>
                        <ProgressBar now="68" max="100" />
                    </span>      
                    </ul>
                </div>
                </div> 
            </Col>
            <Col sm={8} md="auto" class="budget-list" className="widget">
                <div className="budgets">
                <ul class="graph">
                    <li class="budget-name" data-value="budget1">
                    Budget 1 is at 50% completion
                    </li>
                </ul>
                </div>
                
            </Col>
        </Row>
        <Row>
            <Col md="auto" className="widget">
                <h2 class="text-lg font-medium mb-4">Income</h2>
                <p class="text-gray-600 mb-4">$10,000</p>
                <canvas id="incomeChart" width="90" height="50"></canvas>
            </Col>
            <Col md="auto" className="widget">
                <h2 class="text-lg font-medium mb-4">Expenses</h2>
                <p class="text-gray-600 mb-4">$5,000</p>
                <canvas id="expensesChart" width="90" height="50"></canvas>
            </Col>
            <Col md="auto" className="widget">
                <h2 class="text-lg font-medium mb-4">Net Worth</h2>
                <p class="text-gray-600 mb-4">$50,000</p>
                <canvas id="netWorthChart" width="90" height="50"></canvas>
            </Col>
        </Row>
        <Row>
            <Col md="auto" className="widget">
                <h2 class="text-lg font-medium mb-4">Cash Flow</h2>
                <p class="text-gray-600 mb-4">$2,000</p>
                <canvas id="cashFlowChart" width="90" height="50"></canvas>
            </Col>
            <Col md="auto" class="transations" className="widget">
                <h2 class="text-lg font-medium mb-4">Transactions</h2>
                <table class="w-full">
                    <thead>
                        <tr>
                        <th class="text-left text-gray-600">Date</th>
                        <th class="text-left text-gray-600">Description</th>
                        <th class="text-right text-gray-600">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td class="py-2 text-sm">2021-08-01</td>
                        <td class="py-2 text-sm">Rent Payment</td>
                        <td class="py-2 text-sm text-right">$1,500</td>
                        </tr>
                        <tr>
                        <td class="py-2 text-sm">2021-08-05</td>
                        <td class="py-2 text-sm">Grocery Store</td>
                        </tr>
                        <tr>
                        <td class="py-2 text-sm">2021-08-15</td>
                        <td class="py-2 text-sm">Utility Bill</td>
                        <td class="py-2 text-sm text-right">$200</td>
                        </tr>
                        <tr>
                        <td class="py-2 text-sm">2021-08-25</td>
                        <td class="py-2 text-sm">Dinner</td>
                        <td class="py-2 text-sm text-right">$60</td>
                        </tr>
                        <tr>
                        <td class="py-2 text-sm">2021-08-31</td>
                        <td class="py-2 text-sm">Internet Bill</td>
                        <td class="py-2 text-sm text-right">$100</td>
                        </tr>
                    </tbody>
                </table>
            </Col>
            <Col className="widget">
                <h2 class="text-lg font-medium mb-4">Budget</h2>
                <canvas id="budgetChart" width="90" height="50"></canvas>
            </Col>
        </Row>
    </Container>
    </div>
);
}
export default Dash;