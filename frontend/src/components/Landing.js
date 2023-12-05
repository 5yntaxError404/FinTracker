// src/LandingPage.js
import React from 'react';
import '../css/LandingPage.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import dashboardImage from '../css/icons/dashboard.png'; // Adjust the path as necessary

// Looking for correct code to import font


const LandingPage = (props) => {

	const goToLogin = async event =>
	{
		window.location.href = '/login';
	};

    return (

        <div className="landing-container">
            <div className="landing-content">
                <img src={dashboardImage} alt="Dashboard" className="dashboard-image" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono"></link>
                    <p>Struggling with keeping tabs on your expenses?</p>
                    <p>Lost in the maze of monthly bills, savings, and investment options?</p>
                    <p>Say hello to <strong>FinTracker</strong>, the ultimate tool designed specifically to help you master your money.</p>
                    <Button className="button" onClick={goToLogin}>Get Started</Button>
                </div>
        </div>
    );
}

export default LandingPage;
