// src/LandingPage.js
import React from 'react';
import '../css/LandingPage.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Landing from '../components/Landing';

const LandingPage = (props) => {
    return (
        <div>
    <Header />
    <Landing />
    </div>
    );
}

export default LandingPage;
