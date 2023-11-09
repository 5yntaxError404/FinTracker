import React from 'react';

import '../css/DashPage.css';

function LoggedInName()
{
var _ud = localStorage.getItem('user_data');
var ud = JSON.parse(_ud);
var userId = ud.userId;
var firstName = ud.firstName;
var lastName = ud.lastName;
var accessToken = ud.accessToken; //REQUIRED FOR LOGGING

const doLogout = event =>
{
event.preventDefault();
localStorage.removeItem("user_data")
window.location.href = '/';
};
return(
<div id="loggedInDiv" className='loggedInName'>
	<span id="userName">
		<h2>Welcome!</h2>
		Your budget is looking healthy! {firstName} {lastName}</span><br />
	<button type="button" id="logoutButton" className="buttons"
	onClick={doLogout}> Log Out </button>
</div>
);
};
export default LoggedInName;