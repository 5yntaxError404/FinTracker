// src/LandingPage.js
import React from 'react';
import '../css/LandingPage.css';
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

			const response = await fetch('https://www.fintech.davidumanzor.com/api/budgets/add/:UserId', {

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
                <p>Struggling with keeping tabs on your expenses?</p>
                <p>Lost in the maze of monthly bills, savings, and investment options?</p>
                <p>Say hello to <strong>FinTrack+</strong>, the ultimate tool designed specifically to help you master your money.</p>
                <Button className="button">Get Started</Button>
                <form>
                <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="inputEmail4">Email</label>
                    <input type="email" class="form-control" id="inputEmail4" placeholder="Email"/>
                    </div>
                    <div class="form-group col-md-6">
                    <label for="inputPassword4">Password</label>
                    <input type="password" class="form-control" id="inputPassword4" placeholder="Password"/>
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputAddress">Address</label>
                    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St"/>
                </div>
                <div class="form-group">
                    <label for="inputAddress2">Address 2</label>
                    <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"/>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="inputCity">City</label>
                    <input type="text" class="form-control" id="inputCity"/>
                    </div>
                    <div class="form-group col-md-4">
                    <label for="inputState">State</label>
                    <select id="inputState" class="form-control">
                        <option selected>Choose...</option>
                        <option>...</option>
                    </select>
                    </div>
                    <div class="form-group col-md-2">
                    <label for="inputZip">Zip</label>
                    <input type="text" class="form-control" id="inputZip"/>
                    </div>
                </div>
                <div class="form-group">
                    <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="gridCheck"/>
                    <label class="form-check-label" for="gridCheck">
                        Check me out
                    </label>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Sign in</button>
                </form>
            </div>
            
        </div>

        
    );
}

export default LandingPage;
