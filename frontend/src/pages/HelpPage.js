// src/AccountsPage.js
import React from 'react';
import '../css/LandingPage.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Help from '../components/Help';

const HelpPage = (props) => {
    return (
        <div>
    <Header />
    <Help/>
    </div>
    );
}

export default HelpPage;
