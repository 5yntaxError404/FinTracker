const nodemailer = require('nodemailer'); 
const jwt = require('jsonwebtoken'); 

const transporter = nodemailer.createTransport({ 
	host: SMTP.mailtrap.io,
	port: 2525,
	auth: { 
		user: secure_configuration.EMAIL_USERNAME, //mailtrap user, 
		pass: secure_configuration.PASSWORD  //mailtrap pass
	} 
}); 

const token = jwt.sign({ 
		data: 'Token Data' . 
	}, 'ourSecretKey', { expiresIn: '10m' } 
);	 

const mailConfigurations = { 

	// It should be a string of sender/server email 
	from: 'SERVEREMAIL@Server.com', 

	to: 'NEWUSER@Provider.com', 

	// Subject of Email 
	subject: 'Email Verification', 
	
	// This would be the text of email body 
	text: `Hi! There, You have recently signed up for FinTracker 
		and entered your email. 
		Please follow the given link to verify your email 
		http://localhost:3000/verify/${token} 
		Thanks` 
	
}; 

transporter.sendMail(mailConfigurations, function(error, info){ 
	if (error) throw Error(error); 
	console.log('Email Sent Successfully'); 
	console.log(info); 
}); 
