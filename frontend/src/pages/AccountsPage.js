// src/AccountsPage.js
import React from 'react';
import '../css/LandingPage.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Accounts from '../components/Accounts';

const AccountsPage = (props) => {
    return (
    <div>
    <Header />
    <Accounts/>
    </div>
    );
}

export default AccountsPage;
