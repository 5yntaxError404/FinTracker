// src/AccountsPage.js
import React from 'react';
import '../css/LandingPage.css';
import Header from '../components/Header';
import Transactions from '../components/Transactions';

const TransactionsPage = (props) => {
    return (
    <div>
    <Header />
    <Transactions/>
    </div>
    );
}

export default TransactionsPage;
