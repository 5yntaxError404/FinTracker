// src/BudgetPage.js
import React, { useState } from 'react';
import '../css/LandingPage.css';
import '../css/TransactionPage.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState('');

  const base_url =
    process.env.NODE_ENV === 'production'
      ? `https://www.fintech.davidumanzor.com`
      : `http://localhost:5000`;

  const AddTransaction = async (event) => {
    event.preventDefault();

    let transactionAmt = document.getElementById('inputTransactionAmt');
    let transactionCategory = document.getElementById('inputTransactionCategory');

    var obj = {
      transactionAmt: transactionAmt.value,
      transactionCategory: transactionCategory.value,
    };
    var js = JSON.stringify(obj);

    try {
      const userinfo = JSON.parse(localStorage.getItem('user'));

      const response = await fetch(
        `${base_url}/api/budgets/transactions/${userinfo.UserId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userinfo.accessToken}`,
          },
          body: js,
          credentials: 'same-origin',
        }
      );

      var res = JSON.parse(await response.text());

      if (res.error) {
        setMessage('Unable to add Budget');
      } else {
        GetTransactions();
        setMessage('Success');
      }
    } catch (e) {
      alert(e.toString());
      return;
    }
  };

  // Other functions remain unchanged...

  return (
    <div className="landing-container">
      <Container onLoad={GetTransactions}>
        <Row>
          <Col sm={1} md={3} className="accountsInfo">
            {transactions.map((transaction) => (
              <Row className="account" key={transaction.Transactions.transactionID}>
                <p>Transaction</p>
                <p>Amount: ${transaction.Transactions.transactionAmt}</p>
                <p>Category: {transaction.Transactions.transactionCategory}</p>
                <Col>
                  <button className="account_button" onClick={() => EditTransaction(transaction.Transactions.transactionID)}>
                    Edit Transaction
                  </button>
                </Col>
                <Col>
                  <button className="account_button" onClick={() => deleteTransaction(transaction.Transactions.transactionID)}>
                    Delete Transaction
                  </button>
                </Col>
              </Row>
            ))}
          </Col>
          <Col sm={3} md={6} className="content">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono"></link>
            <form className="addBudgetForm">
              <Container>
                <Row>
                  <Col>
                    <label htmlFor="inputTransactionAmt">Transaction Amount</label>
                    <input
                      type="number"
                      className="form-control"
                      id="inputTransactionAmt"
                      min="0"    // To prevent negative values
                      step="0.01" // To limit to two decimal places
                    />
                  </Col>
                  <Col>
                    <label htmlFor="inputTransactionCategory">Transaction Category</label>
                    <select type="text" className="form-control" id="inputTransactionCategory">
                      <option value="Car">Car</option>
                      <option value="Rent">Rent</option>
                      <option value="Gas">Gas</option>
                      <option value="Groceries">Groceries</option>
                      <option value="Fun">Fun</option>
                      <option value="Insurance">Insurance</option>
                      <option value="Utilities">Utilities</option>
                    </select>
                  </Col>
                </Row>
              </Container>
              <button type="submit" className="btn btn-primary" onClick={AddTransaction}>
                Add Transaction
              </button>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TransactionsPage;
