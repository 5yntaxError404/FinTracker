import React from 'react';
import '../css/Header.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header()
{

	const doLogout = async event =>
	{
	event.preventDefault();
	localStorage.removeItem("user")
	window.location.href = '/';
	};

    // Check if user is logged in
    const user = localStorage.getItem("user");

    // No need for async here since localStorage API is synchronous
    const userMenu = user ? (
        <NavDropdown title="Menu" id="basic-nav-dropdown">
            <NavDropdown.Item href="/dash">Dash</NavDropdown.Item>
            <NavDropdown.Item href="/accounts">Accounts</NavDropdown.Item>
            <NavDropdown.Item href="/budgets">Budgets</NavDropdown.Item>
            <NavDropdown.Item href="/transactions">Transactions</NavDropdown.Item>
            <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
            <NavDropdown.Item href="/help">Help</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={doLogout}>Log Out</NavDropdown.Item>
        </NavDropdown>
    ) : null;

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">FinTracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/signup">Get Started</Nav.Link>
                        {userMenu} {/* This will only render if user is logged in */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;