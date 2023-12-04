// src/TransactionPage.js

import React, { useState } from 'react';
import '../css/LandingPage.css';
import '../css/TransactionPage.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState('');
  const [decimalError, setDecimalError] = useState(false);
  const [negativeError, setNegativeError] = useState(false);

  const base_url =
    process.env.NODE_ENV === 'production'
      ? `https://www.fintech.davidumanzor.com`
      : `http://localhost:5000`;

  const AddTransaction = async (event) => {
    event.preventDefault();

    let transactionAmt = document.getElementById('inputTransactionAmt');
    let transactionCategory = document.getElementById('inputTransactionCategory');

    // Check for decimal places
    const decimalCount = (transactionAmt.value.split('.')[1] || []).length;
    if (decimalCount > 2) {
      setDecimalError(true);
      return;
    }

    // Check for negative values
    if (parseFloat(transactionAmt.value) < 0) {
      setNegativeError(true);
      return;
    }

    setDecimalError(false);
    setNegativeError(false);

    var obj = {
      transactionAmt: parseFloat(transactionAmt.value),
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

  const EditTransaction = async (id) => {
    let transactionAmt = document.getElementById('inputTransactionAmt');
    let transactionCategory = document.getElementById('inputTransactionCategory');

    var obj = {
      transactionID: id,
      transactionAmt: parseFloat(transactionAmt.value),
      transactionCategory: transactionCategory.value,
    };
    var js = JSON.stringify(obj);

    try {
      const userinfo = JSON.parse(localStorage.getItem('user'));

      const response = await fetch(
        `${base_url}/api/budgets/transactions/edit/${userinfo.UserId}`,
        {
          method: 'PUT',
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

  const deleteTransaction = async (id) => {
    try {
      const userinfo = JSON.parse(localStorage.getItem('user'));

      const js = JSON.stringify({ transactionID: id });

      const response = await fetch(
        `${base_url}/api/budgets/transactions/delete/${userinfo.UserId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userinfo.accessToken}`,
          },
          body: js,
          credentials: 'same-origin',
        }
      );

      var res = JSON.parse(await response.text());
      console.log(res);

      if (res.error) {
        setMessage('Unable to delete transaction');
      } else {
        setMessage('Success');
        GetTransactions();
      }
    } catch (e) {
      alert(e.toString());
      return;
    }
  };

  const GetTransactions = async () => {
    try {
      const userinfo = JSON.parse(localStorage.getItem('user'));

      const response = await fetch(
        `${base_url}/api/budgets/transactions/get/${userinfo.UserId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userinfo.accessToken}`,
          },
          credentials: 'same-origin',
        }
      );

      var check = response.text();
      var res = JSON.parse(await check);
      console.log(res);
      console.log(res[0]);
      console.log(res[0].Transactions);

      if (res.error) {
        setMessage('Unable to get Budget');
      } else {
        setTransactions(res);
        setMessage('Success');
      }
    } catch (e) {
      console.log(check);
      if (check.value === 'Forbidden') {
        window.location.href = '/login';
      }
      alert(e.toString());
      return;
    }
  };

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
                      className={`form-control ${decimalError || negativeError ? 'error' : ''}`}
                      id="inputTransactionAmt"
                      min="0" // To prevent negative values
                      step="0.01" // To limit to two decimal places
                    />
                    {decimalError && <p className="error-message">Decimal places must be limited to 2.</p>}
                    {negativeError && <p className="error-message">Value must not be negative.</p>}
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
