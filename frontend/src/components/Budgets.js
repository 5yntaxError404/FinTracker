// src/LandingPage.js
import React from 'react';
import '../css/LandingPage.css';
import '../css/BudgetsPage.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

// Looking for correct code to import font


const LandingPage = (props) => {

	const EditBudget = async event =>
	{
        event.preventDefault();

        var rent, utilities, groceries, insurance, phone, car, gas, fun, goal;
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

    return (

        <div className="landing-container">
            
            <div className="content">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono"></link>
                <form className='addBudgetForm'>
                <div class="form-row">
                    <div class="form-group">
                    <label for="inputRent">Rent</label>
                    <input type="number" class="form-control" id="inputRent"/>
                    </div>
                    <div class="form-group">
                    <label for="inputUtilities">Utilities</label>
                    <input type="number" class="form-control" id="inputUtilities"/>
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputGroceries">Groceries</label>
                    <input type="number" class="form-control" id="inputGroceries"/>
                </div>
                <div class="form-group">
                    <label for="inputInsurance">Insurance</label>
                    <input type="number" class="form-control" id="inputInsurance"/>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="inputPhone">Phone</label>
                        <input type="number" class="form-control" id="inputPhone"/>
                    </div>
                    <div class="form-group">
                        <label for="inputCar">Car</label>
                        <input type="number" class="form-control" id="inputCar"/>
                    </div>
                    <div class="form-group">
                        <label for="inputGas">Gas</label>
                        <input type="number" class="form-control" id="inputGas"/>
                    </div>
                    <div class="form-group">
                        <label for="inputFun">Fun</label>
                        <input type="number" class="form-control" id="inputFun"/>
                    </div>
                    <div class="form-group">
                        <label for="inputGoal">Goal</label>
                        <input type="number" class="form-control" id="inputGoal"/>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary" onClick={AddBudget}>Add Budget</button>
                </form>
            </div>
            
        </div>

        
    );
}

export default LandingPage;
