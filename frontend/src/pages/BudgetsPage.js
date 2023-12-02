// src/AccountsPage.js
import React from 'react';
import '../css/LandingPage.css';
import Header from '../components/Header';
import Budgets from '../components/Budgets';

const BudgetsPage = (props) => {
    return (
        <div>
    <Header />
    <Budgets/>
    </div>
    );
}

export default BudgetsPage;