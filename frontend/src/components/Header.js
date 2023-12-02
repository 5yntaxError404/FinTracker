import React from 'react';
import '../css/Header.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import doLogout from '../components/LoggedInName';

function Header()
{
	const isLoggedIn = async event =>
	{
		if(localStorage()){
			<NavDropdown title="Menu" id="basic-nav-dropdown">
				<NavDropdown.Item href="#action/3.1">Menu</NavDropdown.Item>
				<NavDropdown.Item href="#action/3.2">
				Another action
				</NavDropdown.Item>
				<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
				<NavDropdown.Divider />
				<NavDropdown.Item onClick={doLogout}>
				Log Out
				</NavDropdown.Item>
			</NavDropdown>
		}
	};

	const goToLanding = async event =>
	{
		window.location.href = '/';
	};

	const OpenMenu = async event =>
	{
		// This is where it will open a drop down menu for other options\
		window.location.href = '/dash'
	};

return(
	<Navbar expand="lg" className="bg-body-tertiary">
		<Container>
		  <Navbar.Brand href="/">FinTracker</Navbar.Brand>
		  <Navbar.Toggle aria-controls="basic-navbar-nav" />
		  <Navbar.Collapse id="basic-navbar-nav">
			<Nav className="me-auto">
			  <Nav.Link href="#home">Get Started</Nav.Link>
			  <Nav.Link href="#link">About Us</Nav.Link>

				<NavDropdown title="Menu" id="basic-nav-dropdown">
					<NavDropdown.Item href="/dash">
						Dash
					</NavDropdown.Item>
					<NavDropdown.Item href="/accounts">
						Accounts
					</NavDropdown.Item>
					<NavDropdown.Item href="/budgets">
						Budgets
					</NavDropdown.Item>
					<NavDropdown.Item href="/transactions">
						Transactions
					</NavDropdown.Item>
					<NavDropdown.Item href="/settings">
						Settings
					</NavDropdown.Item>
					<NavDropdown.Item href="/help">
						Help
					</NavDropdown.Item>
					<NavDropdown.Divider />
					<NavDropdown.Item onClick={< doLogout />}> 
						Log Out
					</NavDropdown.Item>
				</NavDropdown>

			</Nav>
		  </Navbar.Collapse>
		</Container>
	  </Navbar>

/*
<div className="header">
	<div style={{display: 'inline-block', verticalAlign: 'middle', position: 'absolute', left: 10 + 'px'}} className="Title Name">
	<h1 onClick={goToLanding}>FinTrack</h1>
	</div>
	<div style={{display: 'inline-block', position: 'absolute', right: 20 + 'px', down: 20 + 'px'}}>
	<h3 onClick={OpenMenu}>Menu</h3>
	</div>
</div>
*/
);
};
export default Header;