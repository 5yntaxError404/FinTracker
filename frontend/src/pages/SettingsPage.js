// src/AccountsPage.js
import React from 'react';
import '../css/LandingPage.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Settings from '../components/Settings';

const SettingsPage = (props) => {
    return (
        <div>
    <Header />
    <Settings/>
    </div>
    );
}

export default SettingsPage;
