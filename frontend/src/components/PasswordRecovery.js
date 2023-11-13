// src/LandingPage.js
import React from 'react';
import '../css/LandingPage.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

// Looking for correct code to import font


const PasswordRecoveryPage = (props) => {

    return (

        <div className="landing-container">
            <div className="content">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono"></link>
                <p>Lost Password?</p>
                <p>We just sent you a email for password recovery!</p>
                <p>Check your email inbox and spam folder!</p>
            </div>
        </div>
    );
}

export default PasswordRecoveryPage;
