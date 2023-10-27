import React from 'react';
import '../css/Header.css';

function PageTitle()
{

	const goToLanding = async event =>
	{
		window.location.href = '/';
	};

	const OpenMenu = async event =>
	{
		// This is where it will open a drop down menu for other options
	};

return(
<div className="header">
	<div style={{display: 'inline-block', verticalAlign: 'middle', position: 'absolute', left: 10 + 'px'}} className="Title Name">
	<h1 onClick={goToLanding}>FinTrack</h1>
	</div>
	<div style={{display: 'inline-block', position: 'absolute', right: 20 + 'px', down: 20 + 'px'}}>
	<h3>Menu</h3>
	</div>
</div>
);
};
export default PageTitle;