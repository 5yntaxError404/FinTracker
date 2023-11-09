// src/LandingPage.js
import React from 'react';
import '../css/LandingPage.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Dash from '../components/Dash';

const DashPage = (props) => {
    return (
    <div>
    <Header />
    <Dash />
    </div>
    );
}

export default DashPage;
