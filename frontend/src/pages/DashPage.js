// src/LandingPage.js
import React from 'react';
import '../css/LandingPage.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Dash from '../components/Dash';
import LoggedInName from '../components/LoggedInName';

const DashPage = (props) => {
    return (
        <div>
    <Header />
    <LoggedInName />
    <Dash />
    </div>
    );
}

export default DashPage;
