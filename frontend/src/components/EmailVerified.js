// src/LandingPage.js
import React from 'react';
import '../css/LandingPage.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

// Looking for correct code to import font

const EmailVerifiedPage = (props) => {

    return (

        <div className="landing-container">
            <div className="content">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono"></link>
                <p>Your Email is Verified!</p>
                <p>Go to Login to start saving today!</p>
            </div>
        </div>
    );
}

export default EmailVerifiedPage;
