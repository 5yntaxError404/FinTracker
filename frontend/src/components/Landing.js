// src/LandingPage.js
import React from 'react';
import '../css/LandingPage.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';




const LandingPage = (props) => {

	const goToLogin = async event =>
	{
		window.location.href = '/login';
	};

    return (
        <div className="landing-container">
            <div className="content">
                <p>Struggling with keeping tabs on your expenses?</p>
                <p>Lost in the maze of monthly bills, savings, and investment options?</p>
                <p>Say hello to <strong>FinTrack+</strong>, the ultimate tool designed specifically to help you master your money.</p>
                <Button onClick={goToLogin} variant="primary">Get Started</Button>
            </div>
        </div>
    );
}

export default LandingPage;